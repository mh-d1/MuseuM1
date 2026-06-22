const featuredImage = document.getElementById("featuredImage");
const featuredName = document.getElementById("featuredName");
const featuredYear = document.getElementById("featuredYear");
const featuredBio = document.getElementById("featuredBio");

const gallery = document.getElementById("galleryGrid");
const card = document.querySelector(".featured-card");

const themeBtn = document.getElementById("themeBtn");
const soundBtn = document.getElementById("soundBtn");

function showFigure(index) {
  const figure = figures[index];

  card.classList.add("fade");

  setTimeout(() => {
    featuredImage.src = figure.image;
    featuredName.textContent = figure.name;
    featuredYear.textContent = figure.year;
    featuredBio.textContent = figure.bio;

    card.classList.remove("fade");
  }, 120);
}

figures.forEach((figure, index) => {
  gallery.innerHTML += `
    <article class="gallery-card" onclick="showFigure(${index})">

      <div class="gallery-image">
        <img src="${figure.image}" alt="${figure.name}">
      </div>

      <div class="gallery-content">
        <h3>${figure.name}</h3>
        <p>${figure.year}</p>
      </div>

    </article>
  `;
});

showFigure(0);

themeBtn.onclick = () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");

  themeBtn.textContent = isLight ? "Dark" : "Light";
};

const ambientSound = new Audio("assets/audio/museum-museum.mp3");
ambientSound.loop = true;
ambientSound.volume = 0.4;

let soundOn = false;

soundBtn.onclick = () => {
  soundOn = !soundOn;

  if (soundOn) {
    ambientSound.play();
    soundBtn.textContent = "Sound On";
  } else {
    ambientSound.pause();
    soundBtn.textContent = "Sound Off";
  }
};
