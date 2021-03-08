const spanContainers = document.querySelectorAll('.name-carousel__title-wrapper div');
const spans = document.querySelectorAll('.name-carousel__title-wrapper div span');


spanContainers.forEach(element => {
    element.addEventListener('mousemove', function(cursor) {
        element.classList.add('active');
        let span = element.querySelector('span');
        let spanContPos = getSpanContainerPos(element);
        let cursorPos = getCursorPos(cursor);
        let translation = (cursorPos.y - Math.floor(spanContPos.bottom)) + 'px';
        span.style.transform = "translate3d(0, " + translation + ", 0)";
    });
});


spanContainers.forEach(element => {
    element.addEventListener('mouseleave', function(cursor) {
        element.classList.remove('active');
        let span = element.querySelector('span');
        let style = window.getComputedStyle(span);
        let oldTransform = new WebKitCSSMatrix(style.transform);
        oldTransform = oldTransform.m42;
        var repeatInterval = setInterval(() => {
            span.style.transform = "translate3d(0, " + (oldTransform) + "px, 0)";
            oldTransform = oldTransform * (1 - 0.03);
            if (oldTransform > -0.1 || element.classList.contains('active')) { 
                clearInterval(repeatInterval);
                element.classList.remove('active');
            }
        }, 3);
    });
});



function getSpanContainerPos(el) {
    let spanRect = el.getBoundingClientRect();
    return span = {
        left: spanRect.left,
        right: spanRect.right,
        top: spanRect.top,
        bottom: spanRect.bottom
    }
}

function getCursorPos(cur) {
    return cursor = {
        x: cur.clientX,
        y: cur.clientY
    }
}