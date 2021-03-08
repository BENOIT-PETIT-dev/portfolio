const main = document.querySelector('main');

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    repeat: true,
    lerp: 0.12,
    class: "in-view",
    multiplier: 1,
    reloadOnContextChange: true
});

scroll.on('call', (call, arg, el) => {
    console.log('basic');
});


scroll.on('scroll', (args) => {
    if(typeof args.currentElements['case-study-img'] === 'object') {
        let progress = args.currentElements['case-study-img'].progress;
        progress = Math.round((1 + (progress / 4)) * Math.pow(10, 4)) / Math.pow(10, 4);
        const img = args.currentElements['case-study-img'].el.querySelector('img');
        img.style.transform = "translate(-50%, -50%) scale("+ progress +")";
    }

    if(typeof args.currentElements['case-study-bg'] === 'object') {
        let progress = args.currentElements['case-study-bg'].progress;
        const bg = args.currentElements['case-study-bg'].el;
        let width = bg.offsetWidth;
        let multiplier = width*1.2;
        let borderRadius = (width/2) - (progress*multiplier);
        bg.style.borderRadius = borderRadius + "px " + borderRadius + "px 0 0";
    }
});



document.querySelectorAll('.work-btn').forEach(element => {
    element.addEventListener('click', function() {
        scrollToWorks();
    });
});

const params = new URLSearchParams(window.location.search);
for (const param of params) {
    if (param) {
        scrollToWorks();
    }
}

function scrollToWorks() {
    scroll.scrollTo("#anchor", {
        duration: 700,
        easing: [.77,0,.18,1],
        offset: 1
    });
}