const CHANNEL_CHANGE_INTERVAL = 4000;
const imageUrls = [];
let canvas;
let ctx;

const shadowColor = '#ffffff94'
const bigShadow = `0 0 .8em ${shadowColor}, inset 0 0 1em ${shadowColor}`
const smallShadow = `0 0 .6em ${shadowColor}, inset 0 0 .5em ${shadowColor}`

async function preloadImages() {
  canvas = document.getElementById("crtCanvas");
  ctx = canvas.getContext("2d");
  canvas.style.transition = `box-shadow .1s ease-out`

  const firstUrl = await getRandomImageUrl();
  imageUrls.push(firstUrl);

  drawImageOnCRT(firstUrl);

  for (let i = 1; i < 10; i++) {
    const url = await getRandomImageUrl();
    imageUrls.push(url);
  }
}

function getRandomImageUrl() {
  return fetch("https://picsum.photos/400/300").then((response) => response.url);
}

function drawImageOnCRT(imageUrl) {
  const img = new Image();
  img.onload = function () {
    canvas.style.boxShadow = bigShadow;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const scanlines = document.querySelector(".scanlines");
    scanlines.style.backgroundSize = `${canvas.width}px ${canvas.height}px`;
    
    setTimeout(() => {
      canvas.style.boxShadow = smallShadow;
    }, CHANNEL_CHANGE_INTERVAL - 1000);
  };

  img.src = imageUrl;
}

let currentIndex = 0;

function changeImage() {
  drawImageOnCRT(imageUrls[currentIndex]);
  currentIndex = (currentIndex + 1) % imageUrls.length;
}

preloadImages().then(() => {
  setInterval(changeImage, CHANNEL_CHANGE_INTERVAL);
});
