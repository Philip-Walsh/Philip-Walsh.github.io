var isHeaderFooterAdded = false;

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        if (!isHeaderFooterAdded) {
            var header = document.createElement("header");
            header.innerHTML = "<h1>This is the header</h1>";
            document.body.appendChild(header);

            var footer = document.createElement("footer");
            footer.innerHTML = "<p>This is the footer</p>";
            document.body.appendChild(footer);

            isHeaderFooterAdded = true;
        }
    }
};
