// Mobile navigation toggle
function toggleMenu() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('active');
  }
}

// Close mobile menu automatically when a nav link is clicked
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const links = navbar.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        navbar.classList.remove('active');
      });
    });
  }
});

const API_BASE_URL = 'http://localhost:5000/api';

// Returns the Authorization header if the user is logged in, otherwise
// an empty object - spread this into any fetch() headers.
function getAuthHeaders() {
  const token = localStorage.getItem('shopsphere_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Builds one product card's HTML (shared by Shop page + Related Products)
function buildProductCard(product) {
  const imgSrc = product.image ? `images/${product.image}` : 'images/f1.jpeg';
  return `
    <div class="pro" onclick="window.location.href='sproduct.html?id=${product._id}';">
        <img src="${imgSrc}" alt="${product.name}">
        <div class="des">
            <span>${product.category || ''}</span>
            <h5>${product.name}</h5>
            <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <h4>Rs:${product.price}</h4>
        </div>
        <a href="#" class="add-to-cart-icon" data-id="${product._id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image || ''}">
            <img src="images/carticon.png" alt="Add to cart" style="width: 24px; height: 24px;" class="cart">
        </a>
    </div>`;
}

//Shop page: fetch and render all products 
async function loadShopProducts() {
  const container = document.getElementById('shop-products');
  if (!container) return; // not on the Shop page

  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    const result = await res.json();
    const products = result.data || [];

    if (products.length === 0) {
      container.innerHTML = '<p>No products found. Run "node seed.js" in the server folder to add sample products.</p>';
      return;
    }

    container.innerHTML = products.map(buildProductCard).join('');
  } catch (err) {
    console.error('Failed to load products:', err);
    container.innerHTML = `<p>Could not load products. Make sure the backend server is running at ${API_BASE_URL} (see README for setup steps).</p>`;
  }
}

//Single Product page: fetch and render one product by ?id= 
async function loadSingleProduct() {
  const detailsSection = document.getElementById('single-pro-details');
  if (!detailsSection) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    document.getElementById('pd-name').textContent = 'No product selected';
    document.getElementById('pd-description').textContent = 'Go back to the Shop page and choose a product to view its details.';
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    const result = await res.json();
    const product = result.data;

    document.getElementById('pd-category').textContent = product.category || 'Product';
    document.getElementById('pd-name').textContent = product.name;
    document.getElementById('pd-price').textContent = `Rs:${product.price}`;
    document.getElementById('pd-description').textContent = product.description || 'No description available.';

    const mainImg = document.getElementById('MainImg');
    if (mainImg) mainImg.src = product.image ? `images/${product.image}` : 'images/f1.jpeg';

    const addBtn = document.getElementById('pd-add-cart');
    if (addBtn) {
      addBtn.dataset.id = product._id;
      addBtn.dataset.name = product.name;
      addBtn.dataset.price = product.price;
      addBtn.dataset.image = product.image || '';
    }

    loadRelatedProducts(product.category, product._id);
  } catch (err) {
    console.error('Failed to load product:', err);
    document.getElementById('pd-name').textContent = 'Product could not be loaded';
    document.getElementById('pd-description').textContent = `Make sure the backend server is running at ${API_BASE_URL}.`;
  }
}

// ---- Related products on the Single Product page ----
async function loadRelatedProducts(category, excludeId) {
  const container = document.getElementById('related-products');
  if (!container) return;

  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    const result = await res.json();
    let products = result.data || [];

    products = products.filter((p) => p._id !== excludeId);
    if (category) {
      const sameCategory = products.filter((p) => p.category === category);
      if (sameCategory.length > 0) products = sameCategory;
    }
    products = products.slice(0, 4);

    container.innerHTML = products.length
      ? products.map(buildProductCard).join('')
      : '<p>No related products found.</p>';
  } catch (err) {
    console.error('Failed to load related products:', err);
    container.innerHTML = '<p>Could not load related products.</p>';
  }
}

// ---- Home page: fetch and render Featured + New Arrivals ----
async function loadHomeProducts() {
  const featured = document.getElementById('featured-products');
  const newArrivals = document.getElementById('new-arrivals');
  if (!featured && !newArrivals) return;

  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    const result = await res.json();
    const products = result.data || [];

    if (products.length === 0) {
      const msg = '<p>No products found. Run "node seed.js" in the server folder to add sample products.</p>';
      if (featured) featured.innerHTML = msg;
      if (newArrivals) newArrivals.innerHTML = msg;
      return;
    }

    const half = Math.ceil(products.length / 2);
    if (featured) featured.innerHTML = products.slice(0, half).map(buildProductCard).join('');
    if (newArrivals) newArrivals.innerHTML = products.slice(half).map(buildProductCard).join('') || '<p>More new arrivals coming soon.</p>';
  } catch (err) {
    console.error('Failed to load home products:', err);
    const msg = `<p>Could not load products. Make sure the backend server is running at ${API_BASE_URL}.</p>`;
    if (featured) featured.innerHTML = msg;
    if (newArrivals) newArrivals.innerHTML = msg;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  loadShopProducts();
  loadSingleProduct();
  loadHomeProducts();
});

// Cart functionality — requires login. Add to Cart is blocked
// entirely if the user isn't signed in.
async function fetchCart() {
  const res = await fetch(`${API_BASE_URL}/cart`, {
    headers: { ...getAuthHeaders() },
  });
  const result = await res.json();
  return result.data;
}

async function updateCartBadge() {
  if (!localStorage.getItem('shopsphere_token')) {
    document.querySelectorAll('#cart-count').forEach((el) => { el.textContent = '0'; });
    return;
  }
  try {
    const cart = await fetchCart();
    const count = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    document.querySelectorAll('#cart-count').forEach((el) => { el.textContent = count; });
  } catch (err) {
    console.error('Failed to update cart badge:', err);
  }
}

async function addToCart(product, quantity) {
  if (!localStorage.getItem('shopsphere_token')) {
    alert('Please log in to add items to your cart.');
    window.location.href = 'signup.html';
    return;
  }

  quantity = quantity && quantity > 0 ? quantity : 1;
  try {
    const res = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({
        productId: product.id, name: product.name,
        price: product.price, image: product.image, quantity,
      }),
    });
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    await updateCartBadge();
    alert(`${product.name} added to cart!`);
  } catch (err) {
    console.error('Add to cart failed:', err);
    alert('Could not add to cart. Make sure the backend server is running.');
  }
}

document.addEventListener('click', function (e) {
  const cartBtn = e.target.closest('.add-to-cart-icon');
  if (cartBtn) {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: cartBtn.dataset.id, name: cartBtn.dataset.name,
      price: Number(cartBtn.dataset.price), image: cartBtn.dataset.image,
    }, 1);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const addBtn = document.getElementById('pd-add-cart');
  if (addBtn) {
    addBtn.addEventListener('click', function () {
      const qtyInput = document.getElementById('pd-qty');
      const qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;
      addToCart({
        id: addBtn.dataset.id, name: addBtn.dataset.name,
        price: Number(addBtn.dataset.price), image: addBtn.dataset.image,
      }, qty);
    });
  }
  updateCartBadge();
  renderCartPage();
});

async function renderCartPage() {
  const tbody = document.getElementById('cart-body');
  if (!tbody) return;

  if (!localStorage.getItem('shopsphere_token')) {
    tbody.innerHTML = '<tr><td colspan="6">Please <a href="signup.html">log in</a> to view your cart.</td></tr>';
    updateCartTotalsDisplay(0);
    return;
  }

  try {
    const cart = await fetchCart();
    if (cart.items.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6">Your cart is empty. <a href="shop.html">Go shopping →</a></td></tr>';
      updateCartTotalsDisplay(0);
      return;
    }
    tbody.innerHTML = cart.items.map((item) => {
      const imgSrc = item.image ? `images/${item.image}` : 'images/f1.jpeg';
      const subtotal = item.price * item.quantity;
      return `
        <tr data-id="${item.product}">
          <td data-label="Remove"><img src="images/cross.png" style="width:24px;height:24px;cursor:pointer;" class="remove-item" data-id="${item.product}"></td>
          <td data-label="Image"><img src="${imgSrc}" style="width:60px;"></td>
          <td data-label="Product">${item.name}</td>
          <td data-label="Price">Rs:${item.price}</td>
          <td data-label="Quantity"><input type="number" min="1" value="${item.quantity}" class="cart-qty-input" data-id="${item.product}"></td>
          <td data-label="SubTotal">Rs:${subtotal}</td>
        </tr>`;
    }).join('');
    updateCartTotalsDisplay(cart.subtotal);
  } catch (err) {
    console.error('Failed to load cart:', err);
    tbody.innerHTML = `<tr><td colspan="6">Could not load cart. Make sure the backend server is running at ${API_BASE_URL}.</td></tr>`;
  }
}

function updateCartTotalsDisplay(subtotal) {
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  if (subtotalEl) subtotalEl.textContent = `Rs:${subtotal}`;
  if (totalEl) totalEl.textContent = `Rs:${subtotal}`;
}

document.addEventListener('click', async function (e) {
  const removeBtn = e.target.closest('.remove-item');
  if (removeBtn) {
    try {
      await fetch(`${API_BASE_URL}/cart/item/${removeBtn.dataset.id}`, {
        method: 'DELETE',
        headers: { ...getAuthHeaders() },
      });
      await renderCartPage();
      await updateCartBadge();
    } catch (err) {
      console.error('Remove item failed:', err);
    }
  }
});

document.addEventListener('change', async function (e) {
  if (e.target.classList && e.target.classList.contains('cart-qty-input')) {
    let qty = parseInt(e.target.value, 10);
    if (!qty || qty < 1) qty = 1;
    try {
      await fetch(`${API_BASE_URL}/cart/item/${e.target.dataset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ quantity: qty }),
      });
      await renderCartPage();
      await updateCartBadge();
    } catch (err) {
      console.error('Update quantity failed:', err);
    }
  }
});

// Auth (Login / Signup) — Module 3
function showAuthForm(which) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const heading = document.getElementById('auth-heading');
  const subheading = document.getElementById('auth-subheading');

  if (!loginForm || !signupForm) return;

  if (which === 'signup') {
    loginForm.style.display = 'none';
    signupForm.style.display = 'flex';
    tabLogin.classList.remove('active-tab');
    tabSignup.classList.add('active-tab');
    heading.textContent = 'Create Your Account';
    subheading.textContent = 'Sign up to start shopping with Mughals Wardrobe.';
  } else {
    signupForm.style.display = 'none';
    loginForm.style.display = 'flex';
    tabSignup.classList.remove('active-tab');
    tabLogin.classList.add('active-tab');
    heading.textContent = 'Welcome Back';
    subheading.textContent = 'Log in to your account, or create a new one.';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const msgEl = document.getElementById('signup-message');

      try {
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const result = await res.json();

        if (!res.ok) {
          msgEl.textContent = result.message || 'Signup failed';
          msgEl.className = 'auth-message error';
          return;
        }

        msgEl.textContent = 'Account created! You can now log in.';
        msgEl.className = 'auth-message success';
        signupForm.reset();
        setTimeout(() => showAuthForm('login'), 1200);
      } catch (err) {
        console.error('Signup failed:', err);
        msgEl.textContent = 'Could not reach the server. Make sure the backend is running.';
        msgEl.className = 'auth-message error';
      }
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const msgEl = document.getElementById('login-message');

      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const result = await res.json();

        if (!res.ok) {
          msgEl.textContent = result.message || 'Login failed';
          msgEl.className = 'auth-message error';
          return;
        }

        // Store token + basic user info for later use (protecting routes, showing "Hi, Name" etc.)
        localStorage.setItem('shopsphere_token', result.token);
        localStorage.setItem('shopsphere_user', JSON.stringify(result.data));

        // Merge anything added to the cart before logging in into the
        // real account cart, so it isn't lost.
        try {
          await fetch(`${API_BASE_URL}/cart/${getSessionId()}/merge`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${result.token}` },
          });
          await updateCartBadge();
        } catch (mergeErr) {
          console.error('Cart merge failed:', mergeErr);
        }

        msgEl.textContent = `Welcome back, ${result.data.name}!`;
        msgEl.className = 'auth-message success';
        setTimeout(() => { window.location.href = 'index.html'; }, 800);
      } catch (err) {
        console.error('Login failed:', err);
        msgEl.textContent = 'Could not reach the server. Make sure the backend is running.';
        msgEl.className = 'auth-message error';
      }
    });
  }
});

// Contact form
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;
      const msgEl = document.getElementById('contact-form-message');

      try {
        const res = await fetch(`${API_BASE_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message }),
        });
        const result = await res.json();

        if (!res.ok) {
          msgEl.textContent = result.message || 'Something went wrong';
          msgEl.className = 'auth-message error';
          return;
        }

        msgEl.textContent = result.message;
        msgEl.className = 'auth-message success';
        contactForm.reset();
      } catch (err) {
        console.error('Contact form submit failed:', err);
        msgEl.textContent = 'Could not reach the server. Make sure the backend is running.';
        msgEl.className = 'auth-message error';
      }
    });
  }
});

// Navbar login state — "Hi, Name" + Logout (runs on every page)
function updateNavbarAuthState() {
  const userJson = localStorage.getItem('shopsphere_user');
  const navLinks = document.querySelectorAll('#navbar a[href="signup.html"]');

  if (!userJson || navLinks.length === 0) return;

  const user = JSON.parse(userJson);
  const firstName = user.name.split(' ')[0];

  navLinks.forEach((link) => {
    const li = link.closest('li');
    if (!li) return;

    li.innerHTML = `
      <span class="navbar-greeting">Hi, ${firstName}</span>
      <a href="#" id="logout-link">Logout</a>
    `;
  });

  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('shopsphere_token');
      localStorage.removeItem('shopsphere_user');
      window.location.href = 'index.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', updateNavbarAuthState);

// Session expiry handling
function decodeJwtPayload(token) {
  try {
    const payloadBase64 = token.split('.')[1];
    const decoded = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = decodeJwtPayload(token);
  if (!payload || !payload.exp) return true;
  return Date.now() >= payload.exp * 1000;
}

// Runs on every page load - clears a dead session before anything else renders.
function checkSessionValidity() {
  const token = localStorage.getItem('shopsphere_token');
  if (token && isTokenExpired(token)) {
    localStorage.removeItem('shopsphere_token');
    localStorage.removeItem('shopsphere_user');
  }
}

// Call from any fetch's error handling when the backend itself returns 401
// (e.g. token expired mid-session) - logs out and sends the user to log back in.
function handleAuthError(status) {
  if (status === 401) {
    localStorage.removeItem('shopsphere_token');
    localStorage.removeItem('shopsphere_user');
    alert('Your session has expired. Please log in again.');
    window.location.href = 'signup.html';
    return true;
  }
  return false;
}

document.addEventListener('DOMContentLoaded', checkSessionValidity, { once: true });