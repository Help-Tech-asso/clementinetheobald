// 1. CURSEUR PERSONNALISÉ
const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");

let mouseX = 0,
  mouseY = 0;
let curX = 0,
  curY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";
});

// 2. CANVAS ÉTOILES/PARTICULES
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
const NUM_STARS = 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createStars() {
  stars = [];
  for (let i = 0; i < NUM_STARS; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    });
  }
}
createStars();

function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((s) => {
    const a = 0.2 + 0.5 * Math.abs(Math.sin(s.phase + t * s.speed));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201, 169, 110, ${a})`;
    ctx.fill();
  });
}

let lastTime = 0;
function loopStars(t) {
  drawStars(t * 0.001);
  requestAnimationFrame(loopStars);
}
requestAnimationFrame(loopStars);

// 3. NAVBAR SCROLL
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 4. MENU MOBILE
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

navToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

// 5. REVEAL AU SCROLL
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 },
);

reveals.forEach((el) => revealObserver.observe(el));

// 6. SMOOTH SCROLL (liens internes)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// 7. CONFIGURATION DES INFOS DE CONTACT 
const CONFIG = {
  telephone: "+33 6 59 45 83 89",
  email: "clem.theobald@yahoo.fr",
  instagram: "@clementinetheobald",
  instaUrl: "https://instagram.com/clementinetheobald?igsh=eWhpNjJodnd6OBp",
};

// Application automatique :
document.getElementById("phone-display").textContent = CONFIG.telephone;
document.getElementById("tel-link").href =
  "tel:" + CONFIG.telephone.replace(/\s/g, "");

document.getElementById("email-display").textContent = CONFIG.email;
document.getElementById("mail-link").href = "mailto:" + CONFIG.email;

document.getElementById("insta-display").textContent = CONFIG.instagram;
document.getElementById("insta-link").href = CONFIG.instaUrl;

// 8. EFFET PARALLAXE LÉGER SUR LA LUNE
const moonContainer = document.querySelector(".moon-container");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (moonContainer && scrollY < window.innerHeight) {
    moonContainer.style.transform = `translateX(-50%) translateY(${scrollY * 0.15}px)`;
  }
});

// 9. BOUGIES FLOTTANTES (petites particules dorées)
function createFloatingParticle() {
  const sections = document.querySelectorAll(".service-section");
  if (!sections.length) return;

  const section = sections[Math.floor(Math.random() * sections.length)];
  const particle = document.createElement("div");

  const size = Math.random() * 4 + 2;
  const startX = Math.random() * 100;
  const duration = Math.random() * 6 + 6;
  const delay = Math.random() * 3;

  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(201, 169, 110, ${Math.random() * 0.4 + 0.2});
    border-radius: 50%;
    left: ${startX}%;
    bottom: 0;
    pointer-events: none;
    z-index: 0;
    animation: float-particle ${duration}s ${delay}s ease-in forwards;
  `;

  section.style.position = "relative";
  section.appendChild(particle);

  setTimeout(() => particle.remove(), (duration + delay) * 1000);
}

// Injection CSS pour l'animation
const style = document.createElement("style");
style.textContent = `
  @keyframes float-particle {
    0%   { transform: translateY(0) scale(1); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 0.5; }
    100% { transform: translateY(-120px) scale(0.3) translateX(${Math.random() > 0.5 ? "" : "-"}20px); opacity: 0; }
  }
`;
document.head.appendChild(style);

setInterval(createFloatingParticle, 800);
