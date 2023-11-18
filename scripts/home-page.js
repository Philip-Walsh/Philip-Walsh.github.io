var headerHtml = `
<a id="logo" class="flex">
    <h1>Portfolio Coming Soon!</h1>
</a>
`
var flex = "flex"

function getImage(src, alt) {
    img = document.createElement("img");
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

function addHeader() {
    let header = document.createElement("header");
    header.innerHTML = headerHtml;
    header.className = flex
    document.body.prepend(header);

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
    footer.innerHTML = "<section></section><section>&copy; <i>Philip Walsh 2023</i></section>";
    footer.className = flex;

    let socials = document.createElement("section");
    socials.classList.add(flex, 'socials');

    for (btn of [
        { src: 'linkedin', alt: 'Linkedin link', href: 'https://www.linkedin.com/in/philip-walsh-01' },
        { src: 'github', alt: 'Github link', href: 'https://github.com/Philip-Walsh' }
    ]) {
        socials.prependSvg(btn.src, btn.alt, 'click', function (event) {
            event.preventDefault();
            window.location.href = btn.href;
        });;
    }
    socials.appendChild(getImage('', ''))
    footer.appendChild(socials);
    document.body.appendChild(footer);
}


document.querySelector('main')
    .addEventListener('mouseover', function hover(event) {
        addHeader();
        addFooter();
        event.currentTarget
            .removeEventListener('mouseover', hover);
    });
