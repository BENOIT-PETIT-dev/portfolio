const main = document.querySelector('main');

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    repeat: false,
    lerp: 0.12,
    class: "in-view",
    multiplier: 1,
    reloadOnContextChange: false,
    direction: "horizontal"
});