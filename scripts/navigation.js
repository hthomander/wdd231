const menuToggle = document.querySelector('.hamburger');
const menu = document.getElementById('menu');

menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
});

