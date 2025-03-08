document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.hamburger');
    const menu = document.querySelector('nav ul');



menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
    
});
});
