document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.hamburger');
    const menu = document.getElementById('menu');

    console.log(menuToggle);
    console.log(menu);

menuToggle.addEventListener("click", function () {
    console.log("Hamburger button clicked!");
    menu.classList.toggle("show");
    
});
});
