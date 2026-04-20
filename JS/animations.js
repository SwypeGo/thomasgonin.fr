
//////////////////////////////////////
/////// Scroll trigger vidéo /////////
//////////////////////////////////////

gsap.registerPlugin(ScrollTrigger);

const etapes = document.querySelectorAll('.process-etape');

// Cache tout au départ
gsap.set(etapes, { opacity: 0, y: 60 });

// Timeline liée au scroll
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#process',
    start: 'top top',
    end: '+=2000vh',
    pin: true,
    pinSpacing: true,
    scrub: 1,
  }
});

// Enchaîne les étapes dans l'ordre
etapes.forEach((etape, index) => {


  tl
    .to(etape, { opacity: 1, y: 0, duration: 1 })    // apparition
    .to(etape, { opacity: 1, y: 0, duration: 30 })    // pause visible
    .to(etape, { opacity: 0, y: -60, duration: 10 }); // disparition
});


////////////////////////////////////
/////// Switch bouton prix /////////
////////////////////////////////////

const filtresBtns = document.querySelectorAll('.prix-filter-btn');
const essentielles = document.getElementById('essentielles');
const complete = document.getElementById('complete');

// État initial
gsap.set(complete, { x: '100vw', visibility: 'hidden' });

filtresBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    filtresBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtre = btn.dataset.filtre;

    if (filtre === 'essentielles') {

      // Complete sort vers la droite
      gsap.to(complete, {
        x: '100vw',
        duration: 1,
        ease: 'power1.inOut',
        onComplete: () => gsap.set(complete, { visibility: 'hidden' })
      });

      // Essentielles entre depuis la gauche
      gsap.set(essentielles, { visibility: 'visible', x: '-100vw' });
      gsap.to(essentielles, {
        x: 0,
        duration: 1,
        ease: 'power1.inOut'
      });

    } else if (filtre === 'complete') {

      // Essentielles sort vers la gauche
      gsap.to(essentielles, {
        x: '-100vw',
        duration: 1,
        ease: 'power1.inOut',
        onComplete: () => gsap.set(essentielles, { visibility: 'hidden' })
      });

      // Complete entre depuis la droite
      gsap.set(complete, { visibility: 'visible', x: '100vw' });
      gsap.to(complete, {
        x: 0,
        duration: 1,
        ease: 'power1.inOut'
      });
    }
  });
});