/* ===== PRODUCT DATA =====
   Names, prices and images are placeholders — swap in real data later.
   Each product has:
     - id, category, badge, stars, reviews  (structural, keep these)
     - name: null  → renders as a skeleton bar
     - price: null → renders as a skeleton bar
     - oldPrice: null
     - image: null → renders as a dark placeholder box with category icon
   ============================= */
const products = [
  // ── WATCHES ──
  { id:1,  category:'watches',  name:null, price:null, oldPrice:null, badge:'hot',  stars:5, reviews:null, icon:'fa-regular fa-clock' },
  { id:2,  category:'watches',  name:null, price:null, oldPrice:null, badge:'new',  stars:5, reviews:null, icon:'fa-regular fa-clock' },
  { id:3,  category:'watches',  name:null, price:null, oldPrice:null, badge:'sale', stars:4, reviews:null, icon:'fa-regular fa-clock' },
  { id:4,  category:'watches',  name:null, price:null, oldPrice:null, badge:'new',  stars:4, reviews:null, icon:'fa-regular fa-clock' },
  { id:5,  category:'watches',  name:null, price:null, oldPrice:null, badge:'sale', stars:5, reviews:null, icon:'fa-regular fa-clock' },
  { id:6,  category:'watches',  name:null, price:null, oldPrice:null, badge:'new',  stars:4, reviews:null, icon:'fa-regular fa-clock' },

  // ── GADGETS ──
  { id:7,  category:'gadgets',  name:null, price:null, oldPrice:null, badge:'sale', stars:5, reviews:null, icon:'fa-solid fa-headphones' },
  { id:8,  category:'gadgets',  name:null, price:null, oldPrice:null, badge:'hot',  stars:5, reviews:null, icon:'fa-solid fa-headphones' },
  { id:9,  category:'gadgets',  name:null, price:null, oldPrice:null, badge:'sale', stars:4, reviews:null, icon:'fa-solid fa-headphones' },
  { id:10, category:'gadgets',  name:null, price:null, oldPrice:null, badge:'new',  stars:4, reviews:null, icon:'fa-solid fa-headphones' },
  { id:11, category:'gadgets',  name:null, price:null, oldPrice:null, badge:'hot',  stars:5, reviews:null, icon:'fa-solid fa-headphones' },
  { id:12, category:'gadgets',  name:null, price:null, oldPrice:null, badge:'new',  stars:4, reviews:null, icon:'fa-solid fa-headphones' },

  // ── PERFUMES ──
  { id:13, category:'perfumes', name:null, price:null, oldPrice:null, badge:'hot',  stars:5, reviews:null, icon:'fa-solid fa-spray-can-sparkles' },
  { id:14, category:'perfumes', name:null, price:null, oldPrice:null, badge:'new',  stars:5, reviews:null, icon:'fa-solid fa-spray-can-sparkles' },
  { id:15, category:'perfumes', name:null, price:null, oldPrice:null, badge:'sale', stars:4, reviews:null, icon:'fa-solid fa-spray-can-sparkles' },
  { id:16, category:'perfumes', name:null, price:null, oldPrice:null, badge:'new',  stars:4, reviews:null, icon:'fa-solid fa-spray-can-sparkles' },
  { id:17, category:'perfumes', name:null, price:null, oldPrice:null, badge:'sale', stars:5, reviews:null, icon:'fa-solid fa-spray-can-sparkles' },
  { id:18, category:'perfumes', name:null, price:null, oldPrice:null, badge:'hot',  stars:5, reviews:null, icon:'fa-solid fa-spray-can-sparkles' },
];

/* ===== CURRENCY FORMATTER ===== */
function fmt(amount) {
  if (amount === null || amount === undefined) return null;
  return '৳' + amount.toLocaleString('en-BD');
}

/* ===== CART ===== */
let cart = JSON.parse(localStorage.getItem('sir_cart') || '[]');
function saveCart() { localStorage.setItem('sir_cart', JSON.stringify(cart)); }

/* ===== HELPERS ===== */
function renderStars(count) {
  return '★'.repeat(count) + '☆'.repeat(5 - count);
}
function phClass(category) {
  return { watches:'ph-watches', gadgets:'ph-gadgets', perfumes:'ph-perfumes' }[category] || 'ph-watches';
}

/* ===== CREATE PRODUCT CARD ===== */
function createProductCard(product, containerEl) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.category = product.category;
  card.dataset.id = product.id;

  /* ── image area: always a placeholder box ── */
  const imgHTML = `
    <div class="product-img ${phClass(product.category)}">
      <div class="img-placeholder">
        <div class="ph-icon"><i class="${product.icon}"></i></div>
        <span class="ph-label">${product.category}</span>
      </div>
      <span class="product-badge badge-${product.badge}">${product.badge}</span>
      <button class="wishlist-btn" data-id="${product.id}" title="Wishlist">
        <i class="fa-regular fa-heart"></i>
      </button>
    </div>`;

  /* ── name: shimmer skeleton if null ── */
  const nameHTML = product.name
    ? `<div class="product-name">${product.name}</div>`
    : `<div class="product-name"><span class="skel skel-name"></span></div>`;

  /* ── desc: always a placeholder line ── */
  const descHTML = `<div class="product-desc"><span class="skel skel-desc"></span><span class="skel skel-desc skel-desc-short"></span></div>`;

  /* ── stars ── */
  const starsHTML = `
    <div class="product-stars">
      <span class="stars">${renderStars(product.stars)}</span>
      <span class="review-count">${product.reviews ? '(' + product.reviews + ')' : ''}</span>
    </div>`;

  /* ── price: shimmer skeleton if null ── */
  const priceHTML = product.price !== null
    ? `<div class="product-price">
         <span class="price-current">${fmt(product.price)}</span>
         ${product.oldPrice ? `<span class="price-old">${fmt(product.oldPrice)}</span>` : ''}
       </div>`
    : `<div class="product-price">
         <span class="skel skel-price"></span>
       </div>`;

  card.innerHTML = `
    ${imgHTML}
    <div class="product-info">
      <div class="product-category">${product.category}</div>
      ${nameHTML}
      ${descHTML}
      ${starsHTML}
      <div class="product-footer">
        ${priceHTML}
        <button class="add-btn" data-id="${product.id}">
          <i class="fa-solid fa-bag-shopping"></i> Add to Cart
        </button>
      </div>
    </div>`;

  card.addEventListener('click', (e) => {
    if (!e.target.closest('.add-btn') && !e.target.closest('.wishlist-btn')) openModal(product);
  });
  card.querySelector('.add-btn').addEventListener('click', (e) => {
    e.stopPropagation(); addToCart(product);
  });
  card.querySelector('.wishlist-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    btn.classList.toggle('active');
    btn.querySelector('i').className = btn.classList.contains('active') ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    showToast(btn.classList.contains('active') ? '❤️ Added to wishlist' : 'Removed from wishlist');
  });

  containerEl.appendChild(card);
}

/* ===== CART FUNCTIONS ===== */
function addToCart(product) {
  const label = product.name || `Item #${product.id}`;
  const existing = cart.find(i => i.id === product.id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  saveCart(); updateCartUI();
  showToast(`✓ ${label} added to cart`);
}
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); updateCartUI();
}
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartUI(); }
}

function updateCartUI() {
  const count    = cart.reduce((s, i) => s + i.qty, 0);
  const total    = cart.reduce((s, i) => s + (i.price || 0) * i.qty, 0);
  const countEl  = document.getElementById('cartCount');
  const totalEl  = document.getElementById('cartTotal');
  const itemsEl  = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (!countEl) return;
  countEl.textContent = count;
  countEl.classList.toggle('show', count > 0);
  if (totalEl) totalEl.textContent = total > 0 ? fmt(Math.round(total)) : '—';
  if (footerEl) footerEl.style.display = cart.length ? 'block' : 'none';
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your cart is empty</p>
        <a href="index.html#offers" class="btn btn-primary" id="shopNowBtn">Shop Now</a>
      </div>`;
    document.getElementById('shopNowBtn')?.addEventListener('click', closeCart);
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-img ${phClass(item.category)}">
        <i class="${item.icon}" style="font-size:1.2rem;color:var(--accent2)"></i>
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">
          ${item.name ? item.name : `<span class="skel skel-cart-name"></span>`}
        </div>
        <div class="cart-item-price">
          ${item.price ? fmt(item.price) : '<span class="skel skel-cart-price"></span>'}
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn minus" data-id="${item.id}">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn plus" data-id="${item.id}">+</button>
          <button class="remove-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </div>`).join('');

  itemsEl.querySelectorAll('.minus').forEach(b => b.addEventListener('click', () => changeQty(+b.dataset.id, -1)));
  itemsEl.querySelectorAll('.plus').forEach(b => b.addEventListener('click', () => changeQty(+b.dataset.id, 1)));
  itemsEl.querySelectorAll('.remove-btn').forEach(b => b.addEventListener('click', () => removeFromCart(+b.dataset.id)));
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

/* ===== TOAST ===== */
let toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  document.getElementById('toastMsg').textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

/* ===== MODAL ===== */
function openModal(product) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  if (!overlay || !content) return;

  const modalName  = product.name  || '<span class="skel skel-modal-name"></span>';
  const modalPrice = product.price ? fmt(product.price) : '<span class="skel skel-modal-price"></span>';
  const modalOld   = product.oldPrice ? `<div class="modal-old-price">Was ${fmt(product.oldPrice)}</div>` : '';

  content.innerHTML = `
    <div class="modal-img ${phClass(product.category)}">
      <div class="img-placeholder">
        <div class="ph-icon" style="width:90px;height:90px;font-size:2.5rem;border-radius:22px;">
          <i class="${product.icon}"></i>
        </div>
        <span class="ph-label">${product.category}</span>
      </div>
    </div>
    <div class="modal-category">${product.category}</div>
    <div class="modal-name">${modalName}</div>
    <div class="modal-desc">
      <span class="skel skel-modal-desc"></span>
      <span class="skel skel-modal-desc" style="width:70%;margin-top:6px;"></span>
    </div>
    <div class="product-stars" style="margin:16px 0;">
      <span class="stars">${renderStars(product.stars)}</span>
    </div>
    <div class="modal-meta">
      <div>
        <div class="modal-price">${modalPrice}</div>
        ${modalOld}
      </div>
      <div class="modal-actions">
        <button class="btn btn-primary modal-add-btn">
          <i class="fa-solid fa-bag-shopping"></i> Add to Cart
        </button>
      </div>
    </div>`;

  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
  content.querySelector('.modal-add-btn').addEventListener('click', () => {
    addToCart(product); closeModal();
  });
}
function closeModal() {
  document.getElementById('modalOverlay')?.classList.remove('show');
  document.body.style.overflow = '';
}

/* ===== NAVBAR SCROLL ===== */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
}

/* ===== HAMBURGER ===== */
function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => { btn.classList.toggle('open'); links.classList.toggle('mobile-open'); });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open'); links.classList.remove('mobile-open');
  }));
}

/* ===== SEARCH ===== */
function initSearch() {
  const toggle   = document.getElementById('searchToggle');
  const bar      = document.getElementById('searchBar');
  const input    = document.getElementById('searchInput');
  const closeBtn = document.getElementById('searchClose');
  if (!toggle || !bar || !input) return;
  toggle.addEventListener('click', () => {
    bar.classList.toggle('open');
    if (bar.classList.contains('open')) setTimeout(() => input.focus(), 300);
  });
  closeBtn?.addEventListener('click', () => { bar.classList.remove('open'); input.value = ''; });
}

/* ===== COUNTDOWN ===== */
function initCountdown() {
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  if (!hoursEl) return;
  const target = new Date(Date.now() + (8 * 3600 + 45 * 60) * 1000);
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) { hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = '00'; return; }
    hoursEl.textContent   = String(Math.floor(diff / 3600000)).padStart(2, '0');
    minutesEl.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    secondsEl.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }
  tick(); setInterval(tick, 1000);
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast("✓ Message sent! We'll reply within 24 hours.");
    e.target.reset();
  });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
  if (!document.getElementById('sir-anim-style')) {
    const s = document.createElement('style');
    s.id = 'sir-anim-style';
    s.textContent = `
      .reveal { opacity:0; transform:translateY(22px); transition:opacity 0.55s ease,transform 0.55s ease; }
      .reveal.visible { opacity:1; transform:translateY(0); }
    `;
    document.head.appendChild(s);
  }
  const sel = '.product-card:not(.reveal),.feature-card:not(.reveal),.section-header:not(.reveal),.contact-info:not(.reveal),.contact-form:not(.reveal),.deals-text:not(.reveal),.deals-countdown:not(.reveal),.cat-card:not(.reveal)';
  document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initSearch();
  initCountdown();
  initContactForm();
  updateCartUI();
  initScrollAnimations();

  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(); closeCart();
      document.getElementById('searchBar')?.classList.remove('open');
    }
  });
});
