var headerHtml = `
<a id="logo" class="flex">
    <h1 id="title">Portfolio Coming Soon!</h1>
</a>
`
var flex = "flex";
var script = document.currentScript;
function visible(isVisible) {
    console.log(script.dataset)
    console.log(script.dataset.loadonstart === 'true');
    console.log(script.dataset.headertitle)
    if (script.dataset.loadonstart === 'true'){
        console.log('here')
        return 'visible'
    }
    return isVisible? 'visible': 'hidden';
}

var socialButtons = [
    { src: 'linkedin', alt: 'Linkedin link', href: 'https://www.linkedin.com/in/philip-walsh-01' },
    { src: 'github', alt: 'Github link', href: 'https://github.com/Philip-Walsh' }
]
var navButtons = [
    { src: 'home', alt: 'Home link', href: '/' },
    { src: 'projects', alt: 'Projects link', href: '/projects/' }

]

window.onload = () => {
    console.log('1')
    addHeader();
    addFooter();
    addNav();
    
}

function addHeader() {
    let header = document.createElement("header");
    header.innerHTML = headerHtml;
    header.style.visibility = visible();
    header.className = flex;
    document.body.prepend(header);
    if (script.dataset.headertitle) {
        document.querySelector('#title').innerHTML = script.dataset.headertitle;

    }
    let logoElem = document.querySelector('#logo');
    if (logoElem) {
        logoElem.prependSvg('favicon', 'Logo Image');
        logoElem.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = '/';
        });
    }
}

function addFooter() {
    let footer = document.createElement("footer");
    let year = new Date().getFullYear()
    footer.innerHTML = `<section></section><section>&copy; <i>Philip Walsh ${year}</i></section>`;
    footer.className = flex;
    footer.style.visibility = visible();

    let socials = document.createElement("section");
    socials.classList.add(flex, 'socials');

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
    nav.className = flex;
    nav.style.visibility = visible();
    nav.appendChild(ul);
    document.body.appendChild(nav);
}


function getImage(src, alt) {
    let img = document.createElement("img");
    img.src = '/assets/' + src;
    img.alt = alt;
    img.onerror = function () {
        console.error('Error loading the image');
    };
    return img;
}

HTMLElement.prototype.prependSvg = function (path, ariaLabel, eventType, eventCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/assets/${path}.svg`, true);
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

