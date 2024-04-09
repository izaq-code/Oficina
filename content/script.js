document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("bnte");
    var header = document.getElementById("header");
    var nav = document.querySelector(".nav");

    button.addEventListener("click", toggleHeaderStyle);

    function toggleHeaderStyle() {
        var isCollapsed = header.classList.contains("collapsed");

        if (isCollapsed) {
            header.classList.remove("collapsed");
            nav.style.display = "block";
        } else {
            header.classList.add("collapsed");
            nav.style.display = "none";
        }
    }

    button.addEventListener("click", toggleHeaderStyle2);

    function toggleHeaderStyle2() {
        var header = document.getElementById("header");

        if (header.classList.contains("hd")) {
            header.classList.remove("hd");
            header.classList.add("hd1");
        } else {
            header.classList.remove("hd1");
            header.classList.add("hd");
        }
    }
});
