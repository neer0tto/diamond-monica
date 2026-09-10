// ==========================================================================
// Diamond Beauty — datos y comportamiento
// ==========================================================================

// TODO: sustituir por el número real de WhatsApp del negocio
const WHATSAPP_NUMBER = "34600000000";

const ZONE_LABELS = {
  manos: "Manos",
  pies: "Pies",
  cejasPestanas: "Cejas y pestañas",
  rostro: "Rostro",
  cuerpo: "Cuerpo"
};

const SERVICES = {
  manos: [
    { name: "Manicura tradicional + cutícula", desc: "Limado, cutículas y esmaltado clásico para unas manos cuidadas.", price: "12€", duration: "45 min" },
    { name: "Manicura semipermanente", desc: "Color de larga duración con acabado brillante hasta 3 semanas.", price: "17€", duration: "40 min" },
    { name: "Esmaltado tradicional", desc: "Aplicación de esmalte clásico en el color que elijas.", price: "8€", duration: "25 min" },
    { name: "Manicura francesa", desc: "El clásico esmaltado blanco y nude de punta francesa.", price: "2,50€", duration: "10 min" },
    { name: "Manicura infantil", desc: "Manicura suave y divertida pensada para las más pequeñas.", price: "5€", duration: "30 min" },
    { name: "Manicura con refuerzo color", desc: "Refuerzo de la uña natural combinado con color semipermanente.", price: "20€", duration: "50 min" },
    { name: "Retirado de semipermanente", desc: "Retirada segura del esmaltado semipermanente sin dañar la uña.", price: "3€", duration: "30 min" },
    { name: "Base rubber", desc: "Base elástica que fortalece la uña antes del esmaltado.", price: "3€", duration: "10 min" },
    { name: "Uñas soft gel", desc: "Extensión en gel flexible de acabado natural y ligero.", price: "25€", duration: "1h 10min" },
    { name: "Relleno soft gel", desc: "Mantenimiento y relleno de tus uñas de soft gel.", price: "23€", duration: "55 min" },
    { name: "Uñas acrílicas con TIP", desc: "Extensión de uñas acrílicas con molde tip.", price: "Desde 28€", duration: "—" },
    { name: "Uñas acrílicas extra largas", desc: "Extensión acrílica de largo extra para un look llamativo.", price: "42–45€", duration: "—" },
    { name: "Uñas acrygel", desc: "Técnica mixta acrílico-gel, resistente y de acabado natural.", price: "30€", duration: "1h 45min" },
    { name: "Acrílicos babyboomer", desc: "Degradado suave entre blanco y nude en acrílico.", price: "35€", duration: "1h 45min" },
    { name: "Baño acrílico", desc: "Capa fina de acrílico sobre la uña natural para reforzarla.", price: "24€", duration: "1h 20min" },
    { name: "Relleno de uñas", desc: "Mantenimiento de tus uñas acrílicas o de gel.", price: "25€", duration: "1h 30min" },
    { name: "Reconstrucción de 1 uña", desc: "Reparación puntual de una uña rota o dañada.", price: "3€", duration: "15 min" },
    { name: "Decoración de uñas", desc: "Diseños, pedrería o nail art a partir de un precio.", price: "Desde 1€", duration: "—" }
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
// Tabs de servicios
// --------------------------------------------------------------------------
const tabs = document.querySelectorAll(".tab");
const servicesGrid = document.getElementById("servicesGrid");

function renderServices(zone) {
  const items = SERVICES[zone];
  servicesGrid.innerHTML = "";

  let lastGroup = null;

  items.forEach((item) => {
    if (item.group && item.group !== lastGroup) {
      const groupTitle = document.createElement("h3");
      groupTitle.className = "services__group-title";
      groupTitle.textContent = item.group;
      servicesGrid.appendChild(groupTitle);
      lastGroup = item.group;
    }

    const card = document.createElement("article");
    card.className = "service-card";
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p class="service-card__desc">${item.desc}</p>
      <div class="service-card__meta">
        <span class="service-card__price">${item.price}</span>
        <span class="service-card__duration">${item.duration}</span>
      </div>
    `;
    servicesGrid.appendChild(card);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    renderServices(tab.dataset.zone);
  });
});

renderServices("manos");

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
