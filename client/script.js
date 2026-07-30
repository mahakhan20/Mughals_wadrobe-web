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


// Cart functionality (localStorage-based for now — a full
// backend Cart API is planned for Module 3)
const CART_KEY = 'shopsphere_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cart-count').forEach((el) => {
    el.textContent = count;
  });
}

function addToCart(product, quantity) {
  quantity = quantity && quantity > 0 ? quantity : 1;
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  saveCart(cart);
  alert(`${product.name} added to cart!`);
}

// Wires up "Add to Cart" click handlers for product cards (Shop page +
// Related Products), using event delegation so it works for dynamically
// rendered cards too.
document.addEventListener('click', function (e) {
  const cartBtn = e.target.closest('.add-to-cart-icon');
  if (cartBtn) {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: cartBtn.dataset.id,
      name: cartBtn.dataset.name,
      price: Number(cartBtn.dataset.price),
      image: cartBtn.dataset.image,
    }, 1);
  }
});

// Wires up the "Add To Cart" button on the Single Product page
document.addEventListener('DOMContentLoaded', function () {
  const addBtn = document.getElementById('pd-add-cart');
  if (addBtn) {
    addBtn.addEventListener('click', function () {
      const qtyInput = document.getElementById('pd-qty');
      const qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;
      addToCart({
        id: addBtn.dataset.id,
        name: addBtn.dataset.name,
        price: Number(addBtn.dataset.price),
        image: addBtn.dataset.image,
      }, qty);
    });
  }

  updateCartBadge();
  renderCartPage();
});

//Cart Page: render items from localStorage
function renderCartPage() {
  const tbody = document.getElementById('cart-body');
  if (!tbody) return; // not on the Cart page

  const cart = getCart();

  if (cart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">Your cart is empty. <a href="shop.html">Go shopping →</a></td></tr>';
    updateCartTotals();
    return;
  }

  tbody.innerHTML = cart.map((item) => {
    const imgSrc = item.image ? `images/${item.image}` : 'images/f1.jpeg';
    const subtotal = item.price * item.quantity;
    return `
      <tr data-id="${item.id}">
        <td data-label="Remove"><img src="images/cross.png" style="width: 24px; height: 24px; cursor: pointer;" class="remove-item" data-id="${item.id}"></td>
        <td data-label="Image"><img src="${imgSrc}" style="width: 60px;"></td>
        <td data-label="Product">${item.name}</td>
        <td data-label="Price">Rs:${item.price}</td>
        <td data-label="Quantity"><input type="number" min="1" value="${item.quantity}" class="cart-qty-input" data-id="${item.id}"></td>
        <td data-label="SubTotal">Rs:${subtotal}</td>
      </tr>`;
  }).join('');

  updateCartTotals();
}

function updateCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  if (subtotalEl) subtotalEl.textContent = `Rs:${subtotal}`;
  if (totalEl) totalEl.textContent = `Rs:${subtotal}`;
}

// Remove item from cart
document.addEventListener('click', function (e) {
  const removeBtn = e.target.closest('.remove-item');
  if (removeBtn) {
    const id = removeBtn.dataset.id;
    const cart = getCart().filter((item) => item.id !== id);
    saveCart(cart);
    renderCartPage();
  }
});

// Update quantity in cart
document.addEventListener('change', function (e) {
  if (e.target.classList && e.target.classList.contains('cart-qty-input')) {
    const id = e.target.dataset.id;
    let qty = parseInt(e.target.value, 10);
    if (!qty || qty < 1) qty = 1;

    const cart = getCart();
    const item = cart.find((p) => p.id === id);
    if (item) {
      item.quantity = qty;
      saveCart(cart);
      renderCartPage();
    }
  }
});
