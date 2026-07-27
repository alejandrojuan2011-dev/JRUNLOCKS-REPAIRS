// Cambia este número por tu WhatsApp, usando código de país y sin símbolos.
// Ejemplo Puerto Rico: 17870000000
const whatsappNumber = "17870000000";

const products = [
  {
    name: "NitroView GX24",
    badge: "MEJOR PRECIO",
    size: "24",
    resolution: "1920 × 1080",
    panel: "IPS",
    refresh: "144 Hz",
    response: "1 ms MPRT",
    sync: "Adaptive-Sync",
    ports: "HDMI + DisplayPort",
    price: 149.99,
    image: "assets/images/monitor-gx24.svg",
    description: "Monitor compacto Full HD con colores vivos, baja latencia y excelente rendimiento para juegos competitivos."
  },
  {
    name: "ApexCore F24",
    badge: "ESPORTS",
    size: "24",
    resolution: "1920 × 1080",
    panel: "Fast IPS",
    refresh: "144 Hz",
    response: "1 ms GTG",
    sync: "FreeSync compatible",
    ports: "2× HDMI + DP",
    price: 179.99,
    image: "assets/images/monitor-f24.svg",
    description: "Fast IPS para movimientos rápidos, excelente visibilidad y un soporte ajustable ideal para largas sesiones."
  },
  {
    name: "Velocity V27",
    badge: "MÁS VENDIDO",
    size: "27",
    resolution: "1920 × 1080",
    panel: "IPS",
    refresh: "144 Hz",
    response: "1 ms MPRT",
    sync: "Adaptive-Sync",
    ports: "HDMI + DisplayPort",
    price: 199.99,
    image: "assets/images/monitor-v27.svg",
    description: "Pantalla amplia de 27 pulgadas con diseño de bordes delgados y experiencia fluida para gaming y productividad."
  },
  {
    name: "ShadowCurve C27",
    badge: "CURVO",
    size: "27",
    resolution: "1920 × 1080",
    panel: "VA 1500R",
    refresh: "144 Hz",
    response: "1 ms MPRT",
    sync: "FreeSync compatible",
    ports: "HDMI + DisplayPort",
    price: 219.99,
    image: "assets/images/monitor-c27.svg",
    description: "Curvatura 1500R y contraste profundo para una sensación más envolvente en carreras, acción y simuladores."
  },
  {
    name: "Quantum Q27",
    badge: "QHD",
    size: "27",
    resolution: "2560 × 1440",
    panel: "IPS",
    refresh: "144 Hz",
    response: "1 ms MPRT",
    sync: "Adaptive-Sync",
    ports: "2× HDMI + DP",
    price: 289.99,
    image: "assets/images/monitor-q27.svg",
    description: "Resolución QHD para mayor detalle, espacio de trabajo adicional y una imagen nítida en juegos modernos."
  },
  {
    name: "TitanCurve Q32",
    badge: "PANTALLA GRANDE",
    size: "32",
    resolution: "2560 × 1440",
    panel: "VA 1500R",
    refresh: "144 Hz",
    response: "1 ms MPRT",
    sync: "Adaptive-Sync",
    ports: "2× HDMI + DP",
    price: 349.99,
    image: "assets/images/monitor-q32.svg",
    description: "Monitor curvo QHD de 32 pulgadas para una experiencia inmersiva con alto contraste y gran presencia visual."
  }
];

const grid = document.getElementById("productGrid");
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function productCard(product) {
  const message = encodeURIComponent(`Hola, me interesa el monitor ${product.name} de ${product.size} pulgadas por ${money.format(product.price)}. ¿Está disponible?`);
  return `
    <article class="product-card" data-size="${product.size}" data-resolution="${product.resolution.includes("2560") ? "qhd" : "fhd"}">
      <div class="product-image"><img src="${product.image}" alt="${product.name}, monitor gaming de ${product.refresh}" loading="lazy"></div>
      <div class="product-body">
        <div class="product-topline"><span class="product-badge">${product.badge}</span><span class="stock">Disponible</span></div>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <ul class="spec-list">
          <li><strong>${product.size}\"</strong><br>Tamaño</li>
          <li><strong>${product.refresh}</strong><br>Frecuencia</li>
          <li><strong>${product.resolution}</strong><br>Resolución</li>
          <li><strong>${product.panel}</strong><br>Panel</li>
          <li><strong>${product.response}</strong><br>Respuesta</li>
          <li><strong>${product.sync}</strong><br>Sincronización</li>
        </ul>
        <div class="product-footer">
          <span class="price">${money.format(product.price)}</span>
          <a class="product-button" href="https://wa.me/${whatsappNumber}?text=${message}" target="_blank" rel="noopener">Ordenar</a>
        </div>
      </div>
    </article>`;
}

function render(filter = "all") {
  const filtered = products.filter(p => filter === "all" || p.size === filter || (filter === "qhd" && p.resolution.includes("2560")));
  grid.innerHTML = filtered.map(productCard).join("");
}

render();

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    render(button.dataset.filter);
  });
});

document.querySelector(".menu-button").addEventListener("click", () => document.querySelector("nav").classList.toggle("open"));
document.getElementById("generalWhatsapp").href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, deseo información sobre los monitores gaming de 144 Hz.")}`;
document.getElementById("year").textContent = new Date().getFullYear();
