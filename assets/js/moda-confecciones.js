document.getElementById('modaLandingCurrentYear').textContent = new Date().getFullYear();

const scrollElementsModa = document.querySelectorAll(".animate-on-scroll");
const elementInViewModa = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};

const displayScrollElementModa = (element) => {
    element.classList.add("is-visible");
};

const handleScrollAnimationModa = () => {
    scrollElementsModa.forEach((el) => {
        if (elementInViewModa(el, 1.15)) {
            displayScrollElementModa(el);
        }
    });
};

window.addEventListener("scroll", handleScrollAnimationModa);
handleScrollAnimationModa(); // Para elementos visibles al cargar 