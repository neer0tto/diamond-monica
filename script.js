// ==========================================================================
// Diamond Beauty — datos y comportamiento
// ==========================================================================

// TODO: sustituir por el número real de WhatsApp del negocio
const WHATSAPP_NUMBER = "34600000000";

const ZONE_META = [
  {
    key: "manos",
    label: "Manos",
    icon: '<svg class="accordion-header__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 26V14a2.5 2.5 0 0 1 5 0v8"/><path d="M19 22v-9a2.5 2.5 0 0 1 5 0v9"/><path d="M24 22v-8a2.5 2.5 0 0 1 5 0v9"/><path d="M29 23v-5a2.5 2.5 0 0 1 5 0v13c0 6-4 10-10 10h-2c-5 0-7-2-9-6l-4-8a2.3 2.3 0 0 1 4-2.2l3 4.2"/></svg>'
  },
  {
    key: "pies",
    label: "Pies",
    icon: '<svg class="accordion-header__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 40c-3 0-5-2-5-5 0-4 2-6 2-11 0-5-2-7-2-11a7 7 0 0 1 14 0c0 3-1 5-1 8 0 4 2 5 4 8 2 3 3 5 3 8a3 3 0 0 1-3 3z"/><circle cx="16" cy="10" r="1.3" fill="currentColor" stroke="none"/><circle cx="20" cy="8" r="1.3" fill="currentColor" stroke="none"/><circle cx="24" cy="8" r="1.3" fill="currentColor" stroke="none"/><circle cx="27" cy="10" r="1.3" fill="currentColor" stroke="none"/></svg>'
  },
  {
    key: "cejasPestanas",
    label: "Cejas y pestañas",
    icon: '<svg class="accordion-header__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 25c5-8 13-12 18-12s13 4 18 12c-5 8-13 12-18 12S11 33 6 25z"/><circle cx="24" cy="25" r="4.5"/><path d="M30 14l2-4M35 17l3-3M38 22l4-2"/></svg>'
  },
  {
    key: "rostro",
    label: "Rostro",
    icon: '<svg class="accordion-header__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="15"/><circle cx="18" cy="21" r="1.5" fill="currentColor" stroke="none"/><circle cx="30" cy="21" r="1.5" fill="currentColor" stroke="none"/><path d="M17 30c2 3 5 4.5 7 4.5s5-1.5 7-4.5"/></svg>'
  },
  {
    key: "cuerpo",
    label: "Cuerpo",
    icon: '<svg class="accordion-header__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="10" r="5"/><path d="M14 40l3-14a7 7 0 0 1 14 0l3 14"/><path d="M17 26h14"/></svg>'
  }
];

const ZONE_LABELS = ZONE_META.reduce((acc, zone) => {
  acc[zone.key] = zone.label;
  return acc;
}, {});

// Categorías de filtro dentro de la zona "Manos"
const MANOS_CATEGORIES = ["Todos", "Básicos", "Semipermanente", "Acrílicas y gel", "Extras"];

const SERVICES = {
  manos: [
    { category: "Básicos", name: "Manicura tradicional + cutícula", desc: "Limado, cutículas y esmaltado clásico para unas manos cuidadas.", price: "12€", duration: "45 min" },
    { category: "Básicos", name: "Manicura semipermanente", desc: "Color de larga duración con acabado brillante hasta 3 semanas.", price: "17€", duration: "40 min" },
    { category: "Básicos", name: "Esmaltado tradicional", desc: "Aplicación de esmalte clásico en el color que elijas.", price: "8€", duration: "25 min" },
    { category: "Básicos", name: "Manicura francesa", desc: "El clásico esmaltado blanco y nude de punta francesa.", price: "2,50€", duration: "10 min" },
    { category: "Básicos", name: "Manicura infantil", desc: "Manicura suave y divertida pensada para las más pequeñas.", price: "5€", duration: "30 min" },
    { category: "Básicos", name: "Manicura con refuerzo color", desc: "Refuerzo de la uña natural combinado con color semipermanente.", price: "20€", duration: "50 min" },
    { category: "Básicos", name: "Retirado de semipermanente", desc: "Retirada segura del esmaltado semipermanente sin dañar la uña.", price: "3€", duration: "30 min" },
    { category: "Básicos", name: "Base rubber", desc: "Base elástica que fortalece la uña antes del esmaltado.", price: "3€", duration: "10 min" },

    { category: "Semipermanente", name: "Uñas soft gel", desc: "Extensión en gel flexible de acabado natural y ligero.", price: "25€", duration: "1h 10min" },
    { category: "Semipermanente", name: "Relleno de soft gel", desc: "Mantenimiento y relleno de tus uñas de soft gel.", price: "23€", duration: "55 min" },

    { category: "Acrílicas y gel", name: "Uñas acrílicas con TIP", desc: "Extensión de uñas acrílicas con molde tip.", price: "Desde 28€", duration: "—" },
    { category: "Acrílicas y gel", name: "Uñas acrílicas extra largas", desc: "Extensión acrílica de largo extra para un look llamativo.", price: "42–45€", duration: "—" },
    { category: "Acrílicas y gel", name: "Uñas acrygel", desc: "Técnica mixta acrílico-gel, resistente y de acabado natural.", price: "30€", duration: "1h 45min" },
    { category: "Acrílicas y gel", name: "Acrílicos babyboomer", desc: "Degradado suave entre blanco y nude en acrílico.", price: "35€", duration: "1h 45min" },
    // TODO: pedir al cliente precio y duración reales (servicio nuevo, sin datos todavía)
    { category: "Acrílicas y gel", name: "Uñas acrílicas con molde", desc: "Extensión acrílica esculpida directamente con molde, sin tip.", price: "Consultar", duration: "—" },
    { category: "Acrílicas y gel", name: "Relleno de uñas", desc: "Mantenimiento de tus uñas acrílicas o de gel.", price: "25€", duration: "1h 30min" },
    { category: "Acrílicas y gel", name: "Baño acrílico", desc: "Capa fina de acrílico sobre la uña natural para reforzarla.", price: "24€", duration: "1h 20min" },
    // TODO: pedir al cliente precio y duración reales (servicio nuevo, sin datos todavía)
    { category: "Acrílicas y gel", name: "Encapsulados en acrílico", desc: "Diseños o glitter encapsulados dentro de la capa de acrílico.", price: "Consultar", duration: "—" },
    // TODO: pedir al cliente precio y duración reales (servicio nuevo, sin datos todavía)
    { category: "Acrílicas y gel", name: "Retirada de uñas acrílicas", desc: "Retirada segura de la extensión acrílica sin dañar la uña natural.", price: "Consultar", duration: "—" },

    { category: "Extras", name: "Decoración de uñas", desc: "Diseños, pedrería o nail art a partir de un precio.", price: "Desde 1€", duration: "—" },
    { category: "Extras", name: "Reconstrucción de una uña", desc: "Reparación puntual de una uña rota o dañada.", price: "3€", duration: "15 min" },
    // TODO: pedir al cliente precio y duración reales (servicio nuevo, sin datos todavía)
    { category: "Extras", name: "Diseño 3D", desc: "Nail art con volumen y relieve para un acabado único.", price: "Consultar", duration: "—" }
  ],

  pies: [
    { name: "Esmaltado en pies", desc: "Esmaltado clásico para unos pies impecables.", price: "15€", duration: "20 min" },
    { name: "Cortar uñas", desc: "Corte y limado de las uñas de los pies.", price: "10€", duration: "20 min" },
    { name: "Pedicura SPA", desc: "Tratamiento completo con exfoliación, hidratación y esmaltado.", price: "26€", duration: "50 min" },
    { name: "Pedicura SPA sin esmaltado", desc: "Pedicura completa de cuidado sin aplicación de color.", price: "22€", duration: "40 min" },
    { name: "Combo manicura + pedicura", desc: "El pack completo para manos y pies en una sola sesión.", price: "38€", duration: "1h 30min" }
  ],

  cejasPestanas: [
    { name: "Depilación cejas hilo", desc: "Diseño y depilación de cejas con técnica de hilo.", price: "12€", duration: "10 min" },
    { name: "Depilación cejas cera", desc: "Diseño y depilación de cejas con cera.", price: "8€", duration: "15 min" },
    { name: "Laminado de cejas", desc: "Cejas peinadas y fijadas con efecto lleno y ordenado.", price: "27€", duration: "1h" },
    { name: "Diseño cejas henna", desc: "Diseño y tinte con henna para cejas más definidas.", price: "20€", duration: "15 min" },
    { name: "Cejas henna", desc: "Tinte de henna para dar color y densidad a las cejas.", price: "12€", duration: "15 min" },
    { name: "Lifting de pestañas", desc: "Curvatura y tinte natural sin necesidad de extensiones.", price: "27€", duration: "1h" },
    { name: "Pelo a pelo", desc: "Extensión de pestañas clásica, pelo a pelo.", price: "40€", duration: "1h 45min" },
    { name: "Extensión de pestañas 2D", desc: "Volumen ligero, dos pelos por pestaña natural.", price: "46€", duration: "1h 45min" },
    { name: "Extensión de pestañas 3D", desc: "Volumen medio para una mirada más intensa.", price: "49€", duration: "1h 45min" },
    { name: "Extensión de pestañas 4D", desc: "Mayor densidad para un efecto más marcado.", price: "55€", duration: "1h 45min" },
    { name: "Extensión de pestañas 5D", desc: "Volumen alto para una mirada muy definida.", price: "59€", duration: "1h 45min" },
    { name: "Extensión de pestañas 6D", desc: "Volumen extra para un efecto glamuroso.", price: "64€", duration: "1h 45min" },
    { name: "Extensión de pestañas 7D", desc: "El máximo volumen disponible en extensión.", price: "67€", duration: "1h 45min" },
    { name: "Volumen ruso", desc: "Técnica de abanicos múltiples para un volumen intenso y ligero.", price: "70€", duration: "1h 45min" },
    { name: "Relleno de pestañas", desc: "Mantenimiento de tus extensiones ya aplicadas.", price: "Variable", duration: "—" }
  ],

  rostro: [
    { name: "Limpieza facial", desc: "Limpieza en profundidad para una piel renovada y luminosa.", price: "50€", duration: "1h" },
    { name: "Depilación hilo labio", desc: "Depilación precisa del labio superior con hilo.", price: "8€", duration: "—" },
    { name: "Depilación hilo facial", desc: "Depilación facial completa con técnica de hilo.", price: "25€", duration: "—" },
    { name: "Depilación cera cara", desc: "Depilación facial con cera para pieles resistentes.", price: "23€", duration: "—" },
    { name: "Depilación cera barbilla", desc: "Depilación puntual de la zona de la barbilla.", price: "4€", duration: "—" }
  ],

  cuerpo: [
    { group: "Depilación con cera", name: "Medias piernas", desc: "Depilación con cera de la media pierna.", price: "15€", duration: "—" },
    { group: "Depilación con cera", name: "Pierna entera", desc: "Depilación con cera de la pierna completa.", price: "25€", duration: "—" },
    { group: "Depilación con cera", name: "Brazo entero", desc: "Depilación con cera del brazo completo.", price: "10€", duration: "—" },
    { group: "Depilación con cera", name: "Medio brazo", desc: "Depilación con cera de medio brazo.", price: "7€", duration: "—" },
    { group: "Depilación con cera", name: "Axilas", desc: "Depilación con cera de axilas.", price: "10€", duration: "—" },
    { group: "Depilación con cera", name: "Ingles", desc: "Depilación con cera de la zona de ingles.", price: "15€", duration: "—" },
    { group: "Depilación con cera", name: "Brasileña", desc: "Depilación con cera brasileña.", price: "18€", duration: "—" },
    { group: "Depilación con cera", name: "Espalda", desc: "Depilación con cera de la espalda completa.", price: "12€", duration: "—" },
    { group: "Depilación con cera", name: "Glúteo", desc: "Depilación con cera de la zona de glúteos.", price: "15€", duration: "—" },
    { group: "Depilación con cera", name: "Pecho", desc: "Depilación con cera de la zona del pecho.", price: "Variable", duration: "—" },
    { group: "Depilación con cera", name: "Completa (ingles + perianal + brasileña)", desc: "Depilación con cera de la zona íntima completa.", price: "30€", duration: "—" },
    { group: "Masajes y tratamientos corporales", name: "Maderoterapia", desc: "Masaje con herramientas de madera para modelar y tonificar. Pack 3 sesiones 100€ · Pack 5 sesiones 120€.", price: "27€/sesión", duration: "—" },
    { group: "Masajes y tratamientos corporales", name: "Masaje reductor", desc: "Masaje enfocado en reducir volumen y modelar la silueta.", price: "20€", duration: "—" },
    { group: "Masajes y tratamientos corporales", name: "Masaje circulatorio", desc: "Masaje para favorecer la circulación sanguínea.", price: "25€", duration: "—" },
    { group: "Masajes y tratamientos corporales", name: "Masaje descontracturante", desc: "Masaje de alivio para tensiones y contracturas musculares.", price: "25€", duration: "—" },
    { group: "Masajes y tratamientos corporales", name: "Quiromasaje", desc: "Masaje terapéutico manual de cuerpo completo.", price: "30€", duration: "—" },
    { group: "Masajes y tratamientos corporales", name: "Masaje linfático", desc: "Masaje de drenaje para reducir la retención de líquidos.", price: "30€", duration: "—" },
    { group: "Masajes y tratamientos corporales", name: "Presoterapia", desc: "Tratamiento de compresión para mejorar la circulación y reducir la hinchazón.", price: "Variable", duration: "—" }
  ]
};

// Especialidades a confirmar con el cliente
const TEAM = [
  { name: "Irma", specialty: "Uñas" },
  { name: "Daniela", specialty: "Pestañas" },
  { name: "Dori", specialty: "Depilación y cejas" },
  { name: "Lina Rojas", specialty: "Masajes" }
];

// --------------------------------------------------------------------------
// Menú móvil
// --------------------------------------------------------------------------
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// --------------------------------------------------------------------------
// Acordeón de servicios (cabecera por zona + filas de servicio)
// --------------------------------------------------------------------------
const accordionEl = document.getElementById("servicesAccordion");

let openZone = "manos";
let activeCategory = "Todos";

function parsePrice(priceStr) {
  const match = priceStr.replace(",", ".").match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
}

function formatPrice(value) {
  return Number.isInteger(value) ? `${value}€` : `${value.toFixed(2).replace(".", ",")}€`;
}

function zoneMinPrice(zoneKey) {
  const values = SERVICES[zoneKey].map((item) => parsePrice(item.price)).filter((n) => n !== null);
  if (values.length === 0) return null;
  return formatPrice(Math.min(...values));
}

function renderRows(zoneKey) {
  const items = SERVICES[zoneKey].filter((item) => {
    if (zoneKey !== "manos" || activeCategory === "Todos") return true;
    return item.category === activeCategory;
  });

  let lastGroup = null;
  let html = "";

  items.forEach((item) => {
    if (item.group && item.group !== lastGroup) {
      html += `<h3 class="services__group-title">${item.group}</h3>`;
      lastGroup = item.group;
    }

    html += `
      <div class="service-row">
        <span class="service-row__name">${item.name}</span>
        <span class="service-row__meta">
          <span class="service-row__price">${item.price}</span>
          <span class="service-row__duration">${item.duration}</span>
        </span>
      </div>
    `;
  });

  return html;
}

function renderRowsInto(zoneKey) {
  const rowsEl = document.getElementById(`rows-${zoneKey}`);
  if (rowsEl) rowsEl.innerHTML = renderRows(zoneKey);
}

function renderAccordion() {
  accordionEl.innerHTML = ZONE_META.map((zone, index) => {
    const isOpen = zone.key === openZone;
    const count = SERVICES[zone.key].length;
    const fromPrice = zoneMinPrice(zone.key);

    const chipsMarkup = zone.key === "manos"
      ? `<div class="chips" id="chips-manos">
          ${MANOS_CATEGORIES.map((category) => `
            <button type="button" class="chip${category === activeCategory ? " is-active" : ""}" data-category="${category}">${category}</button>
          `).join("")}
        </div>`
      : "";

    const item = `
      <div class="accordion-item${isOpen ? " is-open" : ""}" data-zone="${zone.key}">
        <button type="button" class="accordion-header" aria-expanded="${isOpen}">
          <span class="accordion-header__left">
            ${zone.icon}
            <span class="accordion-header__title">${zone.label} <span class="accordion-header__count">(${count})</span></span>
          </span>
          <span class="accordion-header__right">
            ${fromPrice ? `<span class="accordion-header__from">Desde ${fromPrice}</span>` : ""}
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
        <div class="accordion-panel">
          <div class="accordion-panel__inner">
            ${chipsMarkup}
            <div id="rows-${zone.key}">${renderRows(zone.key)}</div>
          </div>
        </div>
      </div>
    `;

    const separator = index < ZONE_META.length - 1 ? `<div class="accordion-separator" aria-hidden="true">◆</div>` : "";
    return item + separator;
  }).join("");
}

accordionEl.addEventListener("click", (event) => {
  const chip = event.target.closest(".chip");
  if (chip) {
    activeCategory = chip.dataset.category;
    chip.parentElement.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
    renderRowsInto("manos");
    return;
  }

  const header = event.target.closest(".accordion-header");
  if (!header) return;

  const item = header.closest(".accordion-item");
  const zoneKey = item.dataset.zone;
  const willOpen = openZone !== zoneKey;

  openZone = willOpen ? zoneKey : null;

  accordionEl.querySelectorAll(".accordion-item").forEach((el) => {
    const isOpen = el.dataset.zone === openZone;
    el.classList.toggle("is-open", isOpen);
    el.querySelector(".accordion-header").setAttribute("aria-expanded", isOpen);
  });
});

renderAccordion();

// --------------------------------------------------------------------------
// Selects del formulario (servicio agrupado por zona + empleada)
// --------------------------------------------------------------------------
const servicioSelect = document.getElementById("servicio");
const empleadaSelect = document.getElementById("empleada");

Object.keys(SERVICES).forEach((zone) => {
  const optgroup = document.createElement("optgroup");
  optgroup.label = ZONE_LABELS[zone];

  SERVICES[zone].forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = `${item.name} (${item.price})`;
    optgroup.appendChild(option);
  });

  servicioSelect.appendChild(optgroup);
});

TEAM.forEach((member) => {
  const option = document.createElement("option");
  option.value = member.name;
  option.textContent = `${member.name} — ${member.specialty}`;
  empleadaSelect.appendChild(option);
});

// --------------------------------------------------------------------------
// Equipo
// --------------------------------------------------------------------------
const teamGrid = document.getElementById("teamGrid");

TEAM.forEach((member) => {
  const card = document.createElement("div");
  card.className = "team-card fade-in";
  card.innerHTML = `
    <!-- IMG: sustituir por foto real de la profesional -->
    <div class="team-card__avatar">${member.name.charAt(0)}</div>
    <h3>${member.name}</h3>
    <p>${member.specialty}</p>
  `;
  teamGrid.appendChild(card);
});

// --------------------------------------------------------------------------
// Formulario de reserva → WhatsApp
// TODO: sustituir por integración con Supabase cuando esté listo el calendario automático
// --------------------------------------------------------------------------
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const servicio = servicioSelect.value;
  const empleada = empleadaSelect.value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  const fechaFormateada = fecha
    ? new Date(fecha + "T00:00:00").toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "";

  const mensaje =
    `Hola, quiero reservar: ${servicio} con ${empleada} el ${fechaFormateada} a las ${hora}. ` +
    `Mi nombre es ${nombre}. Mi teléfono es ${telefono}.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
});

// --------------------------------------------------------------------------
// Animaciones fade-in al hacer scroll
// --------------------------------------------------------------------------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

function observeFadeIns() {
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

observeFadeIns();

// --------------------------------------------------------------------------
// Año del footer
// --------------------------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();
