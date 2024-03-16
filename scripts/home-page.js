
window.onload = () => {
    addHeader();
    addFooter();
    // addNav();
    // addBlobPointer();
}

var headerHtml = `<a id="logo"><h1>PHILIP WALSH</h1><h1 class="blink">_</h1><h1 id="title"></h1></a>`;

var script = document.currentScript;


var socialButtons = [
    { src: 'linkedin', alt: 'Linkedin link', href: 'https://www.linkedin.com/in/philip-walsh-01' },
    { src: 'github', alt: 'Github link', href: 'https://github.com/Philip-Walsh' },
    { src: 'codepen', alt: 'Codepen link', href: 'https://codepen.io/Philip-Walsh' }
]
var navButtons = [
    // { src: 'home', alt: 'Home link', href: '/' },
    // { src: 'projects', alt: 'Projects link', href: 'https://codepen.io/Philip-Walsh/pens/showcase' }
]

function visible(isVisible) {
    if (script.dataset.loadonstart === 'true') {
        return 'visible';
    }
    return isVisible ? 'visible' : 'hidden';
}



function addHeader() {
    let header = document.createElement("header");
    header.innerHTML = headerHtml;
    header.style.visibility = visible();
    let secondElement = document.body.children[1];
    if (secondElement) {
        document.body.insertBefore(header, secondElement);
    } else {
        document.body.appendChild(header);
    }
    if (script.dataset.headertitle) {
        document.querySelector('#title').innerHTML = script.dataset.headertitle.toUpperCase();
    }
    let logoElem = document.querySelector('#logo');
    if (logoElem) {
        logoElem.prependSvg('code', 'Logo Image');
        logoElem.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = '/';
        });
    }
}

function addFooter() {
    let footer = document.createElement("footer");
    let year = new Date().getFullYear()
    footer.innerHTML = `<section>&copy; <i>Philip Walsh ${year}</i></section>`;
    footer.style.visibility = visible();

    let socials = document.createElement("section");
    socials.classList.add('socials');
    for (let btn of socialButtons) {
        (function (btn) {
            socials.prependSvg(btn.src, btn.alt, 'click', function (event) {
                event.preventDefault();
                window.location.href = `${btn.href}`;
            });
        })(btn);
    }
    footer.appendChild(socials);
    document.body.appendChild(footer);
}

function addNav() {
    let ul = document.createElement("ul");

    for (let btn of navButtons) {
        let li = document.createElement("li");
        (function (btn) {

            li.prependSvg(btn.src, btn.alt, 'click', function (event) {
                event.preventDefault();
                window.location.href = `${btn.href}`;
            });
        })(btn);

        ul.appendChild(li)
    }
    let nav = document.createElement("nav");
    nav.style.visibility = visible();
    nav.appendChild(ul);
    document.body.appendChild(nav);
}


function getImage(src, alt) {
    let img = document.createElement("img");
    img.src = '/assets/icons/' + src;
    img.alt = alt;
    img.onerror = function () {
        console.error('Error loading the image');
    };
    return img;
}

HTMLElement.prototype.prependSvg = function (path, ariaLabel, eventType, eventCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/assets/icons/${path}.svg`, true);
    xhr.responseType = 'document';

    xhr.onload = () => {
        if (xhr.status === 200) {
            let svgElement = xhr.response.documentElement;
            svgElement.setAttribute('aria-label', ariaLabel);
            svgElement.setAttribute('title', ariaLabel);
            this.prepend(svgElement);
            if (eventType && typeof eventCallback === 'function') {
                svgElement.addEventListener(eventType, eventCallback);
            }
        } else {
            console.error('Error loading SVG:', xhr.statusText);
        }
    };
    xhr.send();
}

function toggleContent() {
    for (let elem of ['header', 'footer', 'nav']) {
        document.querySelector(elem)
            .style.visibility = visible(true);
    }
}

function addBlobPointer() {
    const blobWidth = 20;
    const blobHeight = 3 * blobWidth;
    const blurFactor = 5;
    const widthOffset = 18;
    const heightOffset = 40;

    let blob = document.createElement("div");
    blob.className = 'blob';
    blob.style.position = 'absolute';
    blob.style.top = `-${2 * blobHeight}px`;
    blob.style.left = `-${2 * blobHeight}px`;


    blob.style.width = blobWidth + 'px';
    blob.style.height = blobHeight + 'px';
    blob.style.backgroundColor = '#6cc417';
    blob.style.borderRadius = '50%';
    blob.style.opacity = '50%';
    blob.style.filter = `blur(${blurFactor}px)`;

    document.body.append(blob);

    let prevMouseX = 0;
    let prevMouseY = 0;

    document.addEventListener('mousemove', updateBlob);

    function updateBlob(e) {
        const mouseX = e.pageX;
        const mouseY = e.pageY;

        const deltaX = mouseX - (blob.style.left + blobWidth / 2);
        const deltaY = mouseY - (blob.style.top + 0);
        const angleRad = Math.atan2(deltaY, deltaX);
        const angleDeg = angleRad * (180 / Math.PI);

        blob.style.transform = `rotate(${angleDeg}deg)`;


        clearTimeout(blob.updateTimer);
        blob.style.transition = 'transform 0.05s';
        blob.style.left = mouseX - (blobWidth / 2) + widthOffset + 'px';
        blob.style.top = mouseY - (blobHeight / 2) + heightOffset + 'px';

        blob.updateTimer = setTimeout(() => {
            blob.style.transition = '';
        }, 5);

        prevMouseX = mouseX;
        prevMouseY = mouseY;
    }
}
