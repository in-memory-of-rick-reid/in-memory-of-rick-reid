// Show navbar after scrolling past hero
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');

window.addEventListener('scroll', () => {
  if (window.scrollY > hero.offsetHeight - 50) {
    navbar.classList.add('show');
  } else {
    navbar.classList.remove('show');
  }
});

// Simple form handler
const form = document.getElementById('memory-form');
const postsContainer = document.getElementById('posts-container');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const title = this.title.value.trim();
  const message = this.message.value.trim();
  const files = this.images.files;

  if (!name || !message) return;

  const post = document.createElement('div');
  post.classList.add('post');

  post.innerHTML = `
    <h3>${title ? title : 'Untitled'}</h3>
    <p>${message}</p>
    <p><strong>- ${name}</strong></p>
    ${files.length > 0 ? '<div class="thumbs">' + [...files].slice(0, 3).map(file => `<img src="${URL.createObjectURL(file)}" class="thumb" />`).join('') + '</div>' : ''}
    <small>${new Date().toLocaleDateString()}</small>
    <br><a href="gallery.html">Gallery</a>
  `;

  postsContainer.prepend(post);
  form.reset();
});

// Optional: make image previews clickable or scrollable here later
