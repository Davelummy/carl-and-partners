const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
}

const carousels = document.querySelectorAll('[data-carousel]');

const initCarousel = (root) => {
  const track = root.querySelector('.carousel-track');
  const items = Array.from(root.querySelectorAll('.carousel-item'));
  const prevBtn = root.querySelector('.carousel-prev');
  const nextBtn = root.querySelector('.carousel-next');
  const dotsWrap = root.querySelector('.carousel-dots');
  const maxItems = Number(root.dataset.items) || 1;
  let index = 0;
  let itemsPerView = maxItems;
  let itemWidth = 0;
  let maxIndex = 0;

  const getItemsPerView = () => {
    if (window.innerWidth < 700) return 1;
    if (window.innerWidth < 1000) return Math.min(2, maxItems);
    return maxItems;
  };

  const buildDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === index) dot.classList.add('active');
      dot.addEventListener('click', () => {
        index = i;
        update();
      });
      dotsWrap.appendChild(dot);
    }
  };

  const update = () => {
    const offset = -(index * itemWidth);
    track.style.transform = `translateX(${offset}px)`;
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index >= maxIndex;
    if (dotsWrap) {
      dotsWrap.querySelectorAll('button').forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === index);
      });
    }
  };

  const layout = () => {
    itemsPerView = getItemsPerView();
    root.style.setProperty('--items-per-view', itemsPerView);
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    itemWidth = items[0].getBoundingClientRect().width + gap;
    maxIndex = Math.max(items.length - itemsPerView, 0);
    index = Math.min(index, maxIndex);
    buildDots();
    update();
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      update();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      index = Math.min(maxIndex, index + 1);
      update();
    });
  }

  window.addEventListener('resize', () => {
    layout();
  });

  layout();
};

carousels.forEach((carousel) => initCarousel(carousel));

const form = document.querySelector('.contact-form');
if (form) {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }
    if (status) {
      status.textContent = 'Sending your message...';
    }
  });
}
