import products from "./products.js";

// Selecting the necessary elements from the DOM
let cart = []; // Initialize cart array at the top

const cartContainer = document.querySelector("#cartContent");
const yourCartButton = document.querySelector("#yourCart");
const cartContent = document.querySelector("#cartContent");
const connectWalletButton = document.querySelector("#connectWalletButton");
const completeOrderButton = document.querySelector("#completeOrder");
const modal = document.querySelector('#product-modal');

// Products
const createProductElement = (product) => {
  const productElement = document.createElement("a");
  productElement.className = "product";
 
  const imageElement = document.createElement("div");
  imageElement.className = "product-image";
  const image = document.createElement("img");
  image.src = product.image[0].src;
  image.alt = product.image[0].alt;
  imageElement.appendChild(image);

  const contentElement = document.createElement("div");
  contentElement.className = "product-content";

  const infoElement = document.createElement("div");
  infoElement.className = "product-info";

  const titleElement = document.createElement("h2");
  titleElement.className = "product-title";
  titleElement.textContent = product.name;
  infoElement.appendChild(titleElement);

  const priceElement = document.createElement("p");
  priceElement.className = "product-price";
  priceElement.textContent = "XMR 0.7";
  infoElement.appendChild(priceElement);

  const buyButton = document.createElement("button");
  buyButton.className = "buy-button";
  buyButton.textContent = "Buy";
  infoElement.appendChild(buyButton);

  contentElement.appendChild(infoElement);
  productElement.appendChild(imageElement);
  productElement.appendChild(contentElement);

  return productElement;
};

const productContainer = document.querySelector("#productContainer");

// Create a product element for each product in the products array,
// append it to the product container
products.forEach((product, index) => {
  const productElement = createProductElement(product);
  productContainer.appendChild(productElement);

  // Event listener for the "Buy" button of each product
  const buyButton = productElement.querySelector(".buy-button");
  buyButton.addEventListener("click", () => {
    // Get the corresponding product from the products array
    const product = products[index];

    // Add the product to the cart and mark the element as a cart item
    cart.push(product);
    productElement.classList.add("cart-item");

    // Update the cart dropdown with the new product
    const cartItem = document.createElement("div");
    cartItem.textContent = product.name;
    cartContainer.appendChild(cartItem);
  });

  // Event listener for the product image
  const productImage = productElement.querySelector(".product-image img");
  productImage.addEventListener("click", () => {
    const modalImage = document.querySelector('#modal-image');
    modalImage.src = product.image[0].src;
    modal.style.display = "block";
  });
});

// Function to hide the cart dropdown
const hideCartDropdown = () => {
  cartContent.style.display = "none";
};

// Function to show the cart dropdown
const showCartDropdown = () => {
  cartContent.style.display = "block";
};

// Load cart data from localStorage
const loadCart = () => {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    cart = JSON.parse(cartData);

    // Mark cart items in the product list
    cart.forEach((product) => {
      const index = products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        const productElement = productContainer.children[index];
        productElement.classList.add("cart-item");
      }
    });

    // Update the cart dropdown with the cart items
    cart.forEach((product) => {
      const cartItem = document.createElement("div");
      cartItem.textContent = product.name;
      cartContainer.appendChild(cartItem);
    });
  }
};

// Event Listener for the "Your Cart" button
yourCartButton.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevents event from bubbling up to the document
  cartContent.style.display = cartContent.style.display !== "block" ? "block" : "none";
});

// Event Listener for document click to hide the cart dropdown if clicked outside
document.addEventListener("click", (event) => {
  const target = event.target;
  if (!cartContent.contains(target) && !yourCartButton.contains(target)) {
    hideCartDropdown();
  }
});

hideCartDropdown(); // Initially hide the cart dropdown

// Function to clear the cart
const clearCart = () => {
  // Remove cart items from the cartContainer
  const cartItems = document.querySelectorAll("#cartContent > div");
  cartItems.forEach((item) => {
    item.remove();
  });

  // Clear the cart array
  cart = [];

  // Update local storage with the cleared cart array
  localStorage.removeItem("cart");
};

// Event listener for the "Clear Cart" button
const clearCartButton = document.querySelector(".clear-cart-button");
clearCartButton.addEventListener("click", () => {
  clearCart();
});

// Event listener for the "Complete Order" button
completeOrderButton.addEventListener("click", () => {
  // Store the cart array in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  cartContainer.innerHTML = ""; // Clear the cart contents on the "order.html" page
  location.href = "order.html";
});

// Connect Wallet
if (connectWalletButton) {
  // Add event listener only if connectWalletButton exists
  connectWalletButton.addEventListener("click", () => {
    alert("Nice picks! However this is a test site and this is the end...");
  });
}

// Load cart data from localStorage when the page loads
window.addEventListener("load", loadCart);

// X <SPAN> CLOSE
document.querySelector('.close').addEventListener('click', (e) => {
  e.stopPropagation();
  document.querySelector('#product-modal').style.display = 'none';
});

// CLICK OUTSIDE TO CLOSE
document.addEventListener('click', (e) => {
  const main = document.querySelector('main');
  const modal = document.querySelector('#product-modal');
  if (e.target == main && modal.style.display !== 'none') {
    modal.style.display = 'none';
  }
});