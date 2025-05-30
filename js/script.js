// ===== Sticky Navbar and Scroll-to-Top Button =====
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  const scrolledPastHero = window.scrollY > hero.offsetHeight - 50;

  if (window.innerWidth > 768) {
    if (scrolledPastHero) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  } else {
    if (scrolledPastHero) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Message Form Logic (Wall Posts) =====
const form = document.getElementById('memory-form');
const postsContainer = document.getElementById('posts-container');

if (form && postsContainer) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const title = this.title.value.trim();
    const message = this.message.value.trim();
    const files = this.images.files;

    if (!name || !message) return;

    const post = document.createElement('div');
    post.classList.add('post');

    const date = new Date();
    const dateString = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let thumbs = '';
    if (files.length > 0) {
      thumbs =
        '<div class="thumbs">' +
        [...files]
          .slice(0, 3)
          .map(
            file => `<img src="${URL.createObjectURL(file)}" class="thumb" style="max-width: 60px; border-radius: 6px; margin-right: 6px;" />`
          )
          .join('') +
        '</div>';
    }

    post.innerHTML = `
      <p><strong>${name}</strong></p>
      ${title ? `<p><em>${title}</em></p>` : ''}
      <p>${message}</p>
      ${thumbs}
      <small>${dateString}</small>
    `;

    postsContainer.prepend(post);
    form.reset();

    const charCount = document.getElementById('charCount');
    if (charCount) charCount.textContent = '0 / 750';
  });
}

// ===== Character Counter on Textarea =====
const textarea = document.querySelector('textarea');
const charCount = document.getElementById('charCount');

if (textarea && charCount) {
  textarea.addEventListener('input', () => {
    charCount.textContent = `${textarea.value.length} / 750`;
  });
}

// ===== Lightbox ESC Key Support =====
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && window.location.hash.startsWith('#img')) {
    history.pushState('', document.title, window.location.pathname + window.location.search);
  }
});
