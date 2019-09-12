export function createRipple(e) {
    if (this.getElementsByClassName('ripple').length > 0) {
        this.removeChild(this.childNodes[1]);
    }

    const circle = document.createElement('div');
    this.appendChild(circle);

    const d = Math.max(this.clientWidth, this.clientHeight);
    circle.style.width = circle.style.height = d + 'px';

    circle.style.left = e.clientX - this.offsetLeft - d / 2 + 'px';
    circle.style.top = e.clientY - this.offsetTop - d / 2 + 'px';

    circle.classList.add('ripple');
}