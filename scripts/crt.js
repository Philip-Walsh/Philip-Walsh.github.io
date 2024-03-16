var CHANNEL_CHANGE_INTERVAL = 4000;

function getRandomImageUrl() {
    return fetch("https://picsum.photos/400/300").then(
      (response) => response.url
    );
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
  
  setInterval(() => {
    getRandomImageUrl().then((url) => {
      drawImageOnCRT(url);
    });
  }, CHANNEL_CHANGE_INTERVAL);
  
  getRandomImageUrl().then((url) => {
    drawImageOnCRT(url);
  });
  