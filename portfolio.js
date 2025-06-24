document.addEventListener("DOMContentLoaded", () => {
  console.log("Script chargé !");

  const leftSpan = document.querySelector(".name .left");
  const rightSpan = document.querySelector(".name .right");
  const aboutText = document.querySelector(".about-text");
  const projectCardsLeft = document.querySelectorAll(".project-card.left");
  const projectCardsRight = document.querySelectorAll(".project-card.right");

  if (
    !(leftSpan instanceof HTMLElement) ||
    !(rightSpan instanceof HTMLElement)
  ) {
    console.error("Les éléments du titre ne sont pas trouvés.");
    return;
  }

  console.log("Éléments trouvés, animation en cours...");

  leftSpan.style.opacity = "0";
  rightSpan.style.opacity = "0";
  leftSpan.style.transform = "translateX(0)";
  rightSpan.style.transform = "translateX(0)";

  setTimeout(() => {
    leftSpan.style.transition = "transform 1s ease-out, opacity 1s ease-out";
    rightSpan.style.transition = "transform 1s ease-out, opacity 1s ease-out";

    leftSpan.style.opacity = "1";
    rightSpan.style.opacity = "1";
    leftSpan.style.transform = "translateX(-50px)";
    rightSpan.style.transform = "translateX(50px)";
  }, 500);

  // Animation du paragraphe about-text au scroll
  if (aboutText instanceof HTMLElement) {
    aboutText.style.opacity = "0";
    aboutText.style.transform = "translateX(100px)";
    aboutText.style.transition = "transform 2s ease-out, opacity 2s ease-out";

    const handleScroll = () => {
      const rect = aboutText.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.75) {
        aboutText.style.opacity = "1";
        aboutText.style.transform = "translateX(0)";
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }

  function animateOnScroll() {
    const triggerBottom = window.innerHeight * 0.85; // 85% du viewport

    projectCardsLeft.forEach((card) => {
      if (card instanceof HTMLElement) {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
          card.style.opacity = "1";
          card.style.transform = "translateX(0)";
          card.style.transition = "opacity 1s ease-out, transform 1s ease-out";
        }
      }
    });

    projectCardsRight.forEach((card) => {
      if (card instanceof HTMLElement) {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
          card.style.opacity = "1";
          card.style.transform = "translateX(0)";
          card.style.transition = "opacity 1s ease-out, transform 1s ease-out";
        }
      }
    });
  }

  // Réinitialise l'opacité et la transformation au chargement
  projectCardsLeft.forEach((card) => {
    if (card instanceof HTMLElement) {
      card.style.opacity = "0";
      card.style.transform = "translateX( -100px)";
    }
  });

  projectCardsRight.forEach((card) => {
    if (card instanceof HTMLElement) {
      card.style.opacity = "0";
      card.style.transform = "translateX( 100px)";
    }
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Vérifie dès le chargement
});

document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");
  const popup = document.createElement("div");
  popup.classList.add("popup-overlay");
  popup.innerHTML = `
    <div class="popup-content">
        <span class="close-btn">&times;</span>
        <img class="popup-img" src="" alt="">
        <h2 class="popup-title"></h2>
        <p class="popup-desc"></p>
    </div>
  `;
  document.body.appendChild(popup);

  const popupImg = popup.querySelector(".popup-img");
  const popupTitle = popup.querySelector(".popup-title");
  const popupDesc = popup.querySelector(".popup-desc");
  const closeBtn = popup.querySelector(".close-btn");

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      popupImg.src = card.getAttribute("data-img");
      popupTitle.textContent = card.getAttribute("data-title");
      popupDesc.textContent = card.getAttribute("data-description");

      popup.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
