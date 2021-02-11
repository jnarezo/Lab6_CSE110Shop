// Script.js
const CART_ID = 'cart-count';
const PRODUCT_LIST_ID = 'product-list';
const STORAGE_PRODUCTS_KEY = 'products';
const STORAGE_CART_ITEMS_KEY = 'cart-items';

const productList = document.getElementById(PRODUCT_LIST_ID);
const cartElement = document.getElementById(CART_ID);

const storedProducts = window.localStorage.getItem(STORAGE_CART_ITEMS_KEY);
const addedProducts = storedProducts ? storedProducts.split(',') : [];

window.addEventListener('DOMContentLoaded', () => {
  const products = window.localStorage.getItem(STORAGE_PRODUCTS_KEY);

  if (products) {
    createProducts(JSON.parse(products));
  } else {
    fetch('https://fakestoreapi.com/products').then((res) => {
      return res.json();
    }).then((data) => {
      window.localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(data));
      createProducts(data);
    });
  }

  loadCart();
});

function loadCart() {
  for (const id of addedProducts) {
    const product = document.body.querySelector(`product-item[data-id='${id}']`);
    product.isInCart = true;
    cartElement.textContent = Number(cartElement.textContent) + 1;
  }
}

function createProducts(products) {
  for (const p of products) {
    let productCard = productList.appendChild(document.createElement('product-item'));
    productCard.setAttribute('data-id', p.id);
    productCard.title = p.title;
    productCard.src = p.image;
    productCard.alt = p.title;
    productCard.price = p.price;
    productCard.onAddCart = storeCartItem;
    productCard.onRemoveCart = removeCartItem;
  }
}

function storeCartItem() {
  const productID = this.getAttribute('data-id');
  addedProducts.push(productID);
  window.localStorage.setItem(STORAGE_CART_ITEMS_KEY, addedProducts);
}

function removeCartItem() {
  const productID = this.getAttribute('data-id');
  const itemIDX = addedProducts.findIndex(pid => pid == productID);
  addedProducts.splice(itemIDX, 1);
  window.localStorage.setItem(STORAGE_CART_ITEMS_KEY, addedProducts);
}