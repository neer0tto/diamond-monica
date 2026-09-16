// ==========================================================================
// Diamond Beauty — Panel privado de citas (panel.html)
// La contraseña se valida en el servidor (Edge Function "panel-citas"),
// nunca aquí: este archivo nunca contiene ni compara la contraseña real.
// ==========================================================================

const PANEL_FUNCTION_URL = "https://jjwvlggbzcdwcbuyeuky.supabase.co/functions/v1/panel-citas";
const SUPABASE_ANON_KEY = "sb_publishable_LKE15EUfevuLDiANK_LmHA_Y6darUox";

const loginSection = document.getElementById("panelLogin");
const contentSection = document.getElementById("panelContent");
const loginForm = document.getElementById("panelLoginForm");
const loginStatusEl = document.getElementById("panelLoginStatus");
const tableBody = document.getElementById("panelTableBody");
const listStatusEl = document.getElementById("panelListStatus");
const refreshBtn = document.getElementById("panelRefresh");
const yearEl = document.getElementById("panelYear");

if (yearEl) yearEl.textContent = new Date().getFullYear();

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
