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

// ---- Shop page: fetch and render all products ----
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

// ---- Single Product page: fetch and render one product by ?id= ----
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

// Home page: fetch and render Featured + New Arrivals 
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

// Cart functionality — now backed by the real Cart API
// (guest cart identified by a random sessionId in localStorage)
// =========================================================
const SESSION_ID_KEY = 'shopsphere_session_id';

function getSessionId() {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = 'guest-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

async function fetchCart() {
  const res = await fetch(`${API_BASE_URL}/cart/${getSessionId()}`);
  const result = await res.json();
  return result.data;
}

async function updateCartBadge() {
  try {
    const cart = await fetchCart();
    const count = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    document.querySelectorAll('#cart-count').forEach((el) => { el.textContent = count; });
  } catch (err) {
    console.error('Failed to update cart badge:', err);
  }
}

async function addToCart(product, quantity) {
  quantity = quantity && quantity > 0 ? quantity : 1;
  try {
    const res = await fetch(`${API_BASE_URL}/cart/${getSessionId()}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      await fetch(`${API_BASE_URL}/cart/${getSessionId()}/item/${removeBtn.dataset.id}`, { method: 'DELETE' });
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
      await fetch(`${API_BASE_URL}/cart/${getSessionId()}/item/${e.target.dataset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: qty }),
      });
      await renderCartPage();
      await updateCartBadge();
    } catch (err) {
      console.error('Update quantity failed:', err);
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signup-form'); // add id="signup-form" to your <form> in signup.html
  if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      try {
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const result = await res.json();
        if (!res.ok) {
          alert(result.message || 'Signup failed');
          return;
        }
        alert('Account created! You can now log in.');
      } catch (err) {
        console.error('Signup failed:', err);
        alert('Could not reach the server. Make sure the backend is running.');
      }
    });
  }
});