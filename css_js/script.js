function handleLinkClick(event, url) {
    event.preventDefault(); 

    // Vi letar efter de element som ska animeras
    const container = document.querySelector('.center-container');
    const about = document.querySelector('.about-section');

    // Lägg till animationerna (kontrollera att elementen faktiskt finns)
    if (container) container.classList.add('reverse-slide');
    if (about) about.classList.add('reverse-fade');

    // Vänta 1 sekund (animationens längd) innan vi byter sida
    setTimeout(() => {
        window.location.href = url;
    }, 1000);
}

function initSpinner() {
    const spinner = document.querySelector('.spinner');
    if (!spinner) return;

    let rotation = parseFloat(localStorage.getItem('rotation')) || 0;
    spinner.style.transform = `rotateY(${rotation}deg)`;

    let lastTime = performance.now();

    function rotate(time) {
        const delta = time - lastTime;
        lastTime = time;
        rotation += (360 / 4000) * delta;
        const currentRotation = rotation % 360;
        spinner.style.transform = `rotateY(${currentRotation}deg)`;
        localStorage.setItem('rotation', currentRotation);
        requestAnimationFrame(rotate);
    }
    requestAnimationFrame(rotate);
}

document.addEventListener('DOMContentLoaded', () => {
    initSpinner();

    // 1. Hantera "Tillbaka"-länkar
    const backBtn = document.getElementById('tillbaka');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            const destination = backBtn.getAttribute('href');
            handleLinkClick(e, destination);
        });
    }

    // 2. Hantera ALLA projektlänkar på index-sidan automatiskt
    // Vi letar efter alla <a> taggar inuti .about-section på index-sidan
    const projectLinks = document.querySelectorAll('.about-section a');
    
    projectLinks.forEach(link => {
        // Om länken inte är tillbaka-knappen (för säkerhets skull)
        if (link.id !== 'tillbaka') {
            link.addEventListener('click', (e) => {
                const destination = link.getAttribute('href');
                handleLinkClick(e, destination);
            });
        }
    });
});