// product-item.js
class ProductItem extends HTMLElement {
  #titleElement = null;
  #priceElement = null;
  #imageElement = null;
  #cartButtonElement = null;
  
  onAddCart = null;
  onRemoveCart = null;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    let wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');
    
    let image = wrapper.appendChild(document.createElement('img'));
    image.src = this.hasAttribute('data-src') ? this.getAttribute('data-src') : '';
    image.alt = this.hasAttribute('data-alt') ? this.getAttribute('data-alt') : '';
    this.#imageElement = image;
    
    let title = wrapper.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    title.textContent = this.hasAttribute('data-title') ? this.getAttribute('data-title') : '';
    this.#titleElement = title;
    
    let price = wrapper.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    price.textContent = this.hasAttribute('data-price') ? this.getAttribute('data-price') : '';
    this.#priceElement = price;
    
    let cartButton = wrapper.appendChild(document.createElement('button'));
    cartButton.setAttribute('onclick', "alert('Added to Cart!')");
    cartButton.textContent = 'Add to Cart';
    this.#cartButtonElement = cartButton;
    this.isInCart = false;

    const style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }

    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }

    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }

    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }

    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }

    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;
    
    shadow.append(style, wrapper);
    this
  }

  set title(title) {
    this.#titleElement.textContent = title;
  }

  set src(src) {
    this.#imageElement.src = src;
  }
  
  set alt(alt) {
    this.#imageElement.alt = alt;
  }
  
  set price(price) {
    this.#priceElement.textContent = price;
  }

  set isInCart(value) {
    if (value) {
      this.#cartButtonElement.textContent = 'Remove from Cart';
      this.#cartButtonElement.onclick = this.removeFromCart;
    } else {
      this.#cartButtonElement.textContent = 'Add to Cart';
      this.#cartButtonElement.onclick = this.addToCart;
    }
  }

  addToCart = () => {
    const cartElement = document.getElementById('cart-count');
    cartElement.textContent = Number(cartElement.textContent) + 1;
    this.isInCart = true;
    if (this.onAddCart) this.onAddCart();
  }
  
  removeFromCart = () => {
    const cartElement = document.getElementById('cart-count');
    cartElement.textContent = Number(cartElement.textContent) - 1;
    this.isInCart = false;
    if (this.onRemoveCart) this.onRemoveCart();
  }
}

customElements.define('product-item', ProductItem);