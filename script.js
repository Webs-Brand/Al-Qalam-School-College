// Simple nav toggles for each page header
document.querySelectorAll('.nav-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const nav = btn.nextElementSibling;
    nav.classList.toggle('show');
  });
});

// Hide nav on scroll or outside click
window.addEventListener('scroll', () => {
  document.querySelectorAll('.main-nav').forEach(nav => {
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
    }
  });
});

document.addEventListener('click', (e) => {
  document.querySelectorAll('.main-nav').forEach(nav => {
    const toggle = nav.previousElementSibling; // assuming toggle is before nav
    if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('show')) {
      nav.classList.remove('show');
    }
  });
});

// Lightbox logic used on gallery page
const thumbs = Array.from(document.querySelectorAll('.thumb'));
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbClose = document.getElementById('lb-close');
const lbNext = document.getElementById('lb-next');
const lbPrev = document.getElementById('lb-prev');

let currentIndex = -1;

if(thumbs.length){
  thumbs.forEach((t, idx) => {
    t.addEventListener('click', () => {
      openLightbox(idx);
    });
  });
  function openLightbox(i){
    const t = thumbs[i];
    lbImg.src = t.src;
    lbImg.alt = t.alt || '';
    lbCaption.textContent = t.dataset.caption || '';
    lb.setAttribute('aria-hidden','false');
    currentIndex = i;
  }
  function closeLightbox(){
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
    currentIndex = -1;
  }
  function navigate(offset){
    const next = (currentIndex + offset + thumbs.length) % thumbs.length;
    openLightbox(next);
  }
  lbClose && lbClose.addEventListener('click', closeLightbox);
  lbNext && lbNext.addEventListener('click', () => navigate(1));
  lbPrev && lbPrev.addEventListener('click', () => navigate(-1));
  document.addEventListener('keydown', (e) => {
    if(lb.getAttribute('aria-hidden') === 'false'){
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowRight') navigate(1);
      if(e.key === 'ArrowLeft') navigate(-1);
    }
  });
}
