let precio = document.querySelectorAll("[data-precio]");
precio.forEach(p => {
    console.log(p.getAttribute("data-precio"));
    console.log(p.textContent);
})