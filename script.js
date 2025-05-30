
console.log('Script chargé');

document.querySelector('.scroll-link').addEventListener('click', function (e) {
    e.preventDefault();  // Empêche le comportement par défaut du lien
    

    const target = document.querySelector(this.getAttribute('href'));
    

    target.scrollIntoView({
        behavior: 'smooth',  // Anime le défilement
        block: 'start'      // L'élément cible apparaîtra en haut de la fenêtre
    });
});
