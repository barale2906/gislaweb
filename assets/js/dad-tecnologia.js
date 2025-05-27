document.getElementById('dadLandingCurrentYear').textContent = new Date().getFullYear();

const scrollElements = document.querySelectorAll(".animate-on-scroll");
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add("is-visible");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.15)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener("scroll", handleScrollAnimation);
handleScrollAnimation(); // Para elementos visibles al cargar 