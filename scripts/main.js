document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

function typeWriter(element, text, speed) {
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

window.addEventListener("load", () => {
  const nameTitle = document.querySelector("h1");
  const originalText = nameTitle.textContent;
  typeWriter(nameTitle, originalText, 100);
});

let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScrollTop = scrollTop;
});

document.querySelector("form").addEventListener("submit", function (e) {
  const button = this.querySelector("button");
  const name = this.querySelector('input[name="name"]').value;
  const email = this.querySelector('input[name="email"]').value;
  const message = this.querySelector('textarea[name="message"]').value;

  const subject = encodeURIComponent(`Порака од ${name}`);
  const body = encodeURIComponent(
    `Име: ${name}\nЕ-пошта: ${email}\n\nПорака:\n${message}`
  );
  const mailtoURL = `mailto:izabela@example.com?subject=${subject}&body=${body}`;

  button.textContent = "Испратено!";
  button.classList.add("sent");

  window.location.href = mailtoURL;

  setTimeout(() => {
    button.textContent = "Испрати";
    button.classList.remove("sent");
    this.reset();
  }, 2000);
});

document.querySelectorAll(".hobby-item").forEach((item) => {
  item.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 150);
  });
});

document.querySelectorAll(".country-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const originalText = stat.textContent;
    if (originalText === "∞") return;

    const targetNumber = parseInt(originalText.replace("+", ""));
    let currentNumber = 0;
    const increment = targetNumber / 30;
    const isPlus = originalText.includes("+");

    const timer = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= targetNumber) {
        stat.textContent = originalText;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(currentNumber) + (isPlus ? "+" : "");
      }
    }, 50);
  });
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const travelStats = document.querySelector(".travel-stats");
if (travelStats) {
  statsObserver.observe(travelStats);
}

const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll(
          ".hobby-item, .project-card, .country-card"
        );
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, index * 100);
        });
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".hobbies-grid, .projects-container, .countries-grid")
  .forEach((container) => {
    const items = container.querySelectorAll(
      ".hobby-item, .project-card, .country-card"
    );
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";
      item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    staggerObserver.observe(container);
  });
