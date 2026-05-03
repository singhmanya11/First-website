const cursor = document.querySelector(".cursor");

if (cursor) {
  document.addEventListener("mousemove", e => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
  });

  document.addEventListener("mousedown", () => {
    cursor.style.width = "15px";
    cursor.style.height = "15px";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
  });
}

// PARTICLES
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 189, 248, 0.5)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// TYPING EFFECT
const typingEl = document.getElementById("typing");
if (typingEl) {
  const roles = ["Manya Singh", "a BCA Graduate", "a Programmer"];
  let i = 0, j = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[i];
    
    if (isDeleting) {
      typingEl.innerHTML = currentRole.substring(0, j - 1);
      j--;
    } else {
      typingEl.innerHTML = currentRole.substring(0, j + 1);
      j++;
    }

    let typeSpeed = 100;
    if (isDeleting) typeSpeed /= 2;

    if (!isDeleting && j === currentRole.length) {
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }
  setTimeout(type, 500);
}

// 3D TILT EFFECT
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    let rect = card.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let rotateX = -(y / rect.height - 0.5) * 15;
    let rotateY = (x / rect.width - 0.5) * 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  });
});

// NAV HIGHLIGHT
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a.nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 300) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Initialize AOS (Animate on Scroll)
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });
}
