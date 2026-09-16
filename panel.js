// ==========================================================================
// Diamond Beauty — Panel privado de citas (panel.html)
// La contraseña se valida en el servidor (Edge Function "panel-citas"),
// nunca aquí: este archivo nunca contiene ni compara la contraseña real.
// ==========================================================================

// SUPABASE_ANON_KEY, HORARIOS_URL, SERVICES, TEAM, SUPABASE_SERVICE_IDS y
// SUPABASE_STAFF_IDS ya están definidas por script.js (cargado antes que
// este archivo en panel.html); se reutilizan tal cual, sin redeclararlas.
const PANEL_FUNCTION_URL = "https://jjwvlggbzcdwcbuyeuky.supabase.co/functions/v1/panel-citas";

const loginSection = document.getElementById("panelLogin");
const contentSection = document.getElementById("panelContent");
const loginForm = document.getElementById("panelLoginForm");
const loginStatusEl = document.getElementById("panelLoginStatus");
const tableBody = document.getElementById("panelTableBody");
const listStatusEl = document.getElementById("panelListStatus");
const refreshBtn = document.getElementById("panelRefresh");
// El año del footer (#year) ya lo fija script.js al cargar la página.

// Se guarda solo en memoria (variable de JS), nunca en localStorage/cookies:
// se pierde al recargar la página, momento en el que hay que volver a
// introducir la contraseña.
let sessionPassword = null;

function formatFecha(fecha) {
  return new Date(`${fecha}T00:00:00`).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatHora(hora) {
  return hora ? hora.slice(0, 5) : "—";
}

async function callPanel(action, extra) {
  const body = Object.assign({ password: sessionPassword, action: action }, extra || {});
  const response = await fetch(PANEL_FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data: data };
}

function showLogin(message) {
  sessionPassword = null;
  contentSection.hidden = true;
  loginSection.hidden = false;
  loginStatusEl.textContent = message || "";
}

function renderAppointments(appointments) {
  if (appointments.length === 0) {
    tableBody.innerHTML = "";
    listStatusEl.textContent = "No hay citas todavía.";
    return;
  }

  listStatusEl.textContent = "";
  tableBody.innerHTML = appointments.map((apt) => {
    const isCancelled = apt.status === "cancelada";
    const servicio = apt.services && apt.services.name ? apt.services.name : "—";
    const empleada = apt.staff && apt.staff.name ? apt.staff.name : "Sin preferencia";

    return `
      <tr class="${isCancelled ? "is-cancelled" : ""}">
        <td>${formatFecha(apt.appointment_date)}</td>
        <td>${formatHora(apt.appointment_time)}</td>
        <td>${apt.client_name}</td>
        <td>${apt.client_phone || "—"}</td>
        <td>${servicio}</td>
        <td>${empleada}</td>
        <td>${apt.origen === "manual" ? "Manual" : "Web"}</td>
        <td>${isCancelled ? "Cancelada" : "Confirmada"}</td>
        <td>
          <button type="button" class="panel__cancel-btn" data-id="${apt.id}" ${isCancelled ? "disabled" : ""}>
            ${isCancelled ? "Cancelada" : "Cancelar cita"}
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

async function loadAppointments() {
  listStatusEl.textContent = "Cargando citas...";

  const result = await callPanel("list");

  if (result.status === 401) {
    showLogin("Sesión no válida, vuelve a introducir la contraseña.");
    return;
  }

  if (!result.ok || !result.data.success) {
    listStatusEl.textContent = "No se pudieron cargar las citas. Inténtalo de nuevo.";
    return;
  }

  renderAppointments(result.data.appointments);
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const passwordInput = document.getElementById("panelPassword");
  sessionPassword = passwordInput.value;
  loginStatusEl.textContent = "Comprobando...";

  const result = await callPanel("list");

  if (result.status === 401) {
    sessionPassword = null;
    loginStatusEl.textContent = "Contraseña incorrecta.";
    return;
  }

  if (!result.ok || !result.data.success) {
    sessionPassword = null;
    loginStatusEl.textContent = "No se pudo conectar, inténtalo de nuevo.";
    return;
  }

  loginStatusEl.textContent = "";
  passwordInput.value = "";
  loginSection.hidden = true;
  contentSection.hidden = false;
  renderAppointments(result.data.appointments);
});

refreshBtn.addEventListener("click", loadAppointments);

tableBody.addEventListener("click", async (event) => {
  const btn = event.target.closest(".panel__cancel-btn");
  if (!btn || btn.disabled) return;

  const confirmed = window.confirm("¿Seguro que quieres cancelar esta cita? Esta acción no se puede deshacer.");
  if (!confirmed) return;

  const originalLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Cancelando...";

  const result = await callPanel("cancel", { appointment_id: btn.dataset.id });

  if (result.status === 401) {
    showLogin("Sesión no válida, vuelve a introducir la contraseña.");
    return;
  }

  if (!result.ok || !result.data.success) {
    btn.disabled = false;
    btn.textContent = originalLabel;
    window.alert("No se pudo cancelar la cita. Inténtalo de nuevo.");
    return;
  }

  await loadAppointments();
});

// --------------------------------------------------------------------------
// Nueva cita manual (llamadas/citas en persona). Reutiliza los selects
// "servicio"/"empleada" (poblados por script.js con el mismo catálogo que
// el formulario público) y la Edge Function "horarios-disponibles", para
// respetar exactamente las mismas reglas de horario/antelación/solapes que
// una reserva hecha desde la web.
// --------------------------------------------------------------------------
const manualToggleBtn = document.getElementById("manualBookingToggle");
const manualSection = document.getElementById("manualBookingSection");
const manualForm = document.getElementById("manualBookingForm");
const manualCancelBtn = document.getElementById("manualBookingCancel");
const manualStatusEl = document.getElementById("manualBookingStatus");
const manualServicioSelect = document.getElementById("servicio");
const manualEmpleadaSelect = document.getElementById("empleada");
const manualFechaInput = document.getElementById("fecha");
const manualHoraSelect = document.getElementById("hora");
const manualHoraHintEl = document.getElementById("horaHint");

if (manualToggleBtn) {
  manualFechaInput.min = new Date().toLocaleDateString("en-CA");

  function setManualStatus(message, type) {
    manualStatusEl.textContent = message || "";
    manualStatusEl.classList.remove("is-error", "is-success");
    if (type) manualStatusEl.classList.add(type);
  }

  function setManualHoraHint(text) {
    if (manualHoraHintEl) manualHoraHintEl.textContent = text || "";
  }

  function setManualHoraPlaceholder(text) {
    manualHoraSelect.innerHTML = "";
    const opt = document.createElement("option");
    opt.value = "";
    opt.disabled = true;
    opt.selected = true;
    opt.textContent = text;
    manualHoraSelect.appendChild(opt);
    manualHoraSelect.disabled = true;
  }

  let manualHorariosRequestId = 0;

  async function refreshManualHorarios() {
    const fecha = manualFechaInput.value;
    const servicioNombre = manualServicioSelect.value;
    const empleadaNombre = manualEmpleadaSelect.value;
    const service_id = SUPABASE_SERVICE_IDS[servicioNombre];
    const staff_id = empleadaNombre && empleadaNombre !== "Sin preferencia"
      ? SUPABASE_STAFF_IDS[empleadaNombre]
      : null;

    if (!fecha || !service_id) {
      setManualHoraPlaceholder("Selecciona fecha y servicio");
      setManualHoraHint("");
      return;
    }

    const selectedDay = new Date(`${fecha}T00:00:00`).getDay();
    if (selectedDay === 0) {
      setManualHoraPlaceholder("Domingo: cerrado");
      setManualHoraHint("Los domingos permanecemos cerradas.");
      return;
    }

    setManualHoraPlaceholder("Cargando horarios...");
    setManualHoraHint("");

    const requestId = ++manualHorariosRequestId;

    try {
      const response = await fetch(HORARIOS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ fecha, service_id, staff_id }),
      });

      if (requestId !== manualHorariosRequestId) return;

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setManualHoraPlaceholder("No se pudieron cargar los horarios");
        setManualHoraHint("Inténtalo de nuevo.");
        return;
      }

      if (!data.slots || data.slots.length === 0) {
        setManualHoraPlaceholder("Sin horarios disponibles");
        setManualHoraHint(data.message || "No hay huecos disponibles este día.");
        return;
      }

      manualHoraSelect.innerHTML = "";
      const placeholderOpt = document.createElement("option");
      placeholderOpt.value = "";
      placeholderOpt.disabled = true;
      placeholderOpt.selected = true;
      placeholderOpt.textContent = "Selecciona una hora";
      manualHoraSelect.appendChild(placeholderOpt);

      data.slots.forEach((slot) => {
        const opt = document.createElement("option");
        opt.value = slot;
        opt.textContent = slot;
        manualHoraSelect.appendChild(opt);
      });

      manualHoraSelect.disabled = false;
      setManualHoraHint("");
    } catch (err) {
      if (requestId !== manualHorariosRequestId) return;
      setManualHoraPlaceholder("No se pudieron cargar los horarios");
      setManualHoraHint("Inténtalo de nuevo.");
    }
  }

  manualFechaInput.addEventListener("change", refreshManualHorarios);
  manualServicioSelect.addEventListener("change", refreshManualHorarios);
  manualEmpleadaSelect.addEventListener("change", refreshManualHorarios);

  function openManualForm() {
    manualSection.hidden = false;
    manualToggleBtn.hidden = true;
  }

  function closeManualForm() {
    manualSection.hidden = true;
    manualToggleBtn.hidden = false;
    manualForm.reset();
    setManualHoraPlaceholder("Selecciona fecha y servicio");
    setManualHoraHint("");
    setManualStatus("", null);
  }

  manualToggleBtn.addEventListener("click", openManualForm);
  manualCancelBtn.addEventListener("click", closeManualForm);

  manualForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const client_name = document.getElementById("manualNombre").value.trim();
    const client_phone = document.getElementById("manualTelefono").value.trim();
    const servicioNombre = manualServicioSelect.value;
    const empleadaNombre = manualEmpleadaSelect.value;
    const fecha = manualFechaInput.value;
    const hora = manualHoraSelect.value;

    const service_id = SUPABASE_SERVICE_IDS[servicioNombre];
    const staff_id = empleadaNombre && empleadaNombre !== "Sin preferencia"
      ? SUPABASE_STAFF_IDS[empleadaNombre]
      : null;

    if (!client_name || !client_phone) {
      setManualStatus("Rellena nombre y teléfono.", "is-error");
      return;
    }
    if (!service_id) {
      setManualStatus("Selecciona un servicio.", "is-error");
      return;
    }
    if (!hora) {
      setManualStatus("Selecciona una hora disponible.", "is-error");
      return;
    }

    const submitBtn = manualForm.querySelector("button[type=submit]");
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Guardando...";
    setManualStatus("", null);

    const result = await callPanel("create", { client_name, client_phone, service_id, staff_id, fecha, hora });

    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;

    if (result.status === 401) {
      showLogin("Sesión no válida, vuelve a introducir la contraseña.");
      return;
    }

    if (result.status === 409) {
      setManualStatus("Esa hora ya no está disponible, elige otra.", "is-error");
      refreshManualHorarios();
      return;
    }

    if (!result.ok || !result.data.success) {
      setManualStatus("No se pudo guardar la cita. Inténtalo de nuevo.", "is-error");
      return;
    }

    closeManualForm();
    await loadAppointments();
  });
}
