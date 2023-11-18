var headerHtml = `
<a id="logo" class="flex">
    <h1>Portfolio Site</h1>
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

function addHeader() {
    let header = document.createElement("header");
    header.innerHTML = headerHtml;
    header.className = flex
    document.body.prepend(header);
    logoElem = document.querySelector('#logo')
    logoElem.prepend(getImage('favicon.svg', 'Logo Images'));
    logoElem.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = '/';
    });
}

function addFooter() {
    let footer = document.createElement("footer");
    footer.innerHTML = "<p>&copy; <i>Philip Walsh 2023</i></p>";
    footer.className = flex;

    let socials = document.createElement("section");
    socials.classList.add(flex, 'socials');

    for (btn of [
        { src: 'linkedin.svg', alt: 'Linkedin link', href: 'https://www.linkedin.com/in/philip-walsh-01' },
        { src: 'github.svg', alt: 'Github link', href: 'https://github.com/Philip-Walsh' }
    ]) {
        let img = getImage(btn.src, btn.alt);
        img.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = btn.href;
        })
        socials.appendChild(img);
    }
    socials.appendChild(getImage('', ''))
    footer.appendChild(socials);
    document.body.appendChild(footer);
}


document.querySelector('.card')
    .addEventListener('mouseover', function hover(event) {
        addHeader();
        addFooter();
        event
            .currentTarget
            .removeEventListener('mouseover', hover);
    });
