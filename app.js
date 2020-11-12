const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const shirts = document.querySelectorAll('.shirt');
const gradients = document.querySelectorAll('.gradient');
const shirtBg = document.querySelector('.shirtBackground');

let prevColor = "gray"
let animationEnd = true

function changeSize() {
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

function changeColor() {
    if(!animationEnd) return;

    let primary = this.getAttribute('primary');
    let color = this.getAttribute('color');
    let shirt = document.querySelector(`.shirt[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`)

    colors.forEach(c => c.classList.remove('active'));
    this.classList.add('active');

    document.documentElement.style.setProperty('--primary', primary);

    shirts.forEach(s => s.classList.remove('show'));
    shirt.classList.add('show');

    gradients.forEach(g => g.classList.remove('first', 'second'));
    gradient.classList.add('first')
    prevGradient.classList.add('second')

    prevColor = color;
    animationEnd = false;

    gradient.addEventListener('animationend', () => {
        animationEnd = true
    })
}

sizes.forEach(size => size.addEventListener('click', changeSize));
colors.forEach(c => c.addEventListener('click', changeColor));

let x = window.matchMedia("(max-width: 1000px)");

function changeHeight() {
    if(x.matches) {
        let shirtHeight = shirts[0].offsetHeight;
        shirtBg.style.height = `${shirtHeight}px`;
    } else {
        shirtBg.style.height = '475px';
    }
}

window.addEventListener('resize', changeHeight)
window.addEventListener('DOMContentLoaded', changeHeight)