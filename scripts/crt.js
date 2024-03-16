const CHANNEL_CHANGE_INTERVAL = 4000;
const imageUrls = [];

async function preloadImages() {
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
  const canvas = document.getElementById("crtCanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const scanlines = document.querySelector(".scanlines");
    scanlines.style.backgroundSize = `${canvas.width}px ${canvas.height}px`;
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
