// ===== Sticky Navbar and Scroll-to-Top Button =====
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');
const scrollTopBtn = document.querySelector('.scroll-top');
const backToHomeBtn = document.getElementById('back-to-home'); // optional element

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroBottom = hero.offsetTop + hero.offsetHeight;

  // Show navbar only after scrolling past hero, and never hide after
  if (scrollY > heroBottom) {
    navbar.classList.add('visible');
  } else {
    navbar.classList.remove('visible');
  }

  if (scrollTopBtn) {
    scrollTopBtn.style.display = scrollY > 300 ? 'block' : 'none';
  }

  if (backToHomeBtn) {
    const galleryPreview = document.querySelector('.gallery-preview');
    const galleryTop = galleryPreview ? galleryPreview.offsetTop : 0;
    const bottomScroll = scrollY + window.innerHeight;

    if (bottomScroll >= galleryTop) {
      backToHomeBtn.style.position = 'absolute';
      backToHomeBtn.style.top = `${scrollY + 20}px`;
    } else {
      backToHomeBtn.style.position = 'fixed';
      backToHomeBtn.style.top = '20px';
    }
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

  textarea.style.overflowY = 'auto';
  textarea.style.maxHeight = '120px';
}

// ===== Lightbox ESC Key Support =====
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && window.location.hash.startsWith('#img')) {
    history.pushState('', document.title, window.location.pathname + window.location.search);
  }
});

// ===== Gallery Preview on Home Page =====
document.addEventListener("DOMContentLoaded", () => {
  const previewGrid = document.getElementById("previewGrid");

  if (previewGrid) {
    const previewImages = [
      { src: "images/gallery1.jpg", alt: "Rick Photo 1" },
      { src: "images/gallery2.2.jpg", alt: "Rick Photo 2" },
      { src: "images/gallery3.jpg", alt: "Rick Photo 3" }
    ];

    const shuffled = previewImages.sort(() => 0.5 - Math.random());
    shuffled.forEach(img => {
      const el = document.createElement("img");
      el.src = img.src;
      el.alt = img.alt;
      el.loading = "lazy";
      previewGrid.appendChild(el);
    });
  }
});
