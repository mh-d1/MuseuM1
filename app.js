const featuredSection = document.getElementById("featuredSection");
const featuredCard = document.querySelector(".featured-card");

const featuredImage = document.getElementById("featuredImage");
const featuredTitle = document.getElementById("featuredTitle");
const featuredYear = document.getElementById("featuredYear");
const featuredBio = document.getElementById("featuredBio");

const gallery = document.getElementById("galleryGrid");

const themeBtn = document.getElementById("themeBtn");
const soundBtn = document.getElementById("soundBtn");

let selectedIndex = 0;

/* ------------------------------
   FEATURED FIGURE
------------------------------ */

function showFigure(index, shouldScroll = false) {
  const figure = figures[index];

  if (!figure) return;

  selectedIndex = index;

  featuredCard.classList.remove("is-changing");

  void featuredCard.offsetWidth;

  featuredCard.classList.add("is-changing");

  featuredImage.style.opacity = "0";

  setTimeout(() => {
    featuredImage.src = figure.image;

    featuredImage.alt = `Portrait of ${figure.name}`;

    featuredTitle.textContent = figure.name;

    featuredYear.textContent = figure.year;

    featuredBio.textContent = figure.bio;

    featuredImage.onload = () => {
      featuredImage.style.opacity = "1";
    };
  }, 100);

  updateSelectedCard(index);

  if (shouldScroll) {
    setTimeout(() => {
      featuredSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 180);
  }
}

/* ------------------------------
   SELECTED CARD
------------------------------ */

function updateSelectedCard(index) {
  const cards = document.querySelectorAll(".gallery-card");

  cards.forEach((card, cardIndex) => {
    const isSelected = cardIndex === index;

    card.classList.toggle("is-selected", isSelected);

    card.setAttribute("aria-selected", isSelected);
  });
}

/* ------------------------------
   CREATE GALLERY
------------------------------ */

figures.forEach((figure, index) => {
  const card = document.createElement("button");

  card.type = "button";

  card.className = "gallery-card";

  card.setAttribute("aria-label", `Explore ${figure.name}`);

  card.setAttribute("aria-selected", "false");

  card.innerHTML = `
    <div class="gallery-image">
      <img
        src="${figure.image}"
        alt="${figure.name}"
        loading="lazy"
      />
    </div>

    <div class="gallery-content">
      <h3>${figure.name}</h3>
      <p>${figure.year}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    showFigure(index, true);
  });

  gallery.appendChild(card);
});

/* ------------------------------
   INITIAL FIGURE
------------------------------ */

showFigure(0);

/* ------------------------------
   THEME
------------------------------ */

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");

  themeBtn.textContent = isLight ? "Dark" : "Light";

  themeBtn.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme",
  );
});

/* ------------------------------
   AMBIENT SOUND
------------------------------ */

const ambientSound = new Audio("assets/audio/museum-museum.mp3");

ambientSound.loop = true;
ambientSound.volume = 0.4;

let soundOn = false;

soundBtn.addEventListener("click", async () => {
  soundOn = !soundOn;

  if (soundOn) {
    try {
      await ambientSound.play();

      soundBtn.textContent = "Sound On";

      soundBtn.setAttribute("aria-pressed", "true");
    } catch (error) {
      soundOn = false;

      soundBtn.textContent = "Sound Off";

      soundBtn.setAttribute("aria-pressed", "false");
    }
  } else {
    ambientSound.pause();

    soundBtn.textContent = "Sound Off";

    soundBtn.setAttribute("aria-pressed", "false");
  }
});
