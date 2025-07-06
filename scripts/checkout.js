import { cart, removeFromCart, updateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from '../data/products.js';
import { currencyFormatter } from './utils/money.js';

updateQuantity();

let cartItems = '';

cart.forEach((item) => {

  const productId = item.productId;
  let matching;
  products.forEach((product) => {
    if (product.id === productId) {
      matching = product;
    }
  });

  cartItems += `
        <div class="cart-item-container js-cart-item-container-${matching.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matching.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matching.name}
                </div>
                <div class="product-price">
                  $${currencyFormatter(matching.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matching.id}">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" 
                    data-product-id = "${matching.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matching.id}">
                  <span class="save-quantity-link link-primary js-save-link"
                    data-product-id="${matching.id}">
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" 
                    data-product-id = "${matching.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matching.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matching.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matching.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
});

document.querySelector('.js-order-summary').innerHTML = cartItems;

document.querySelectorAll('.js-delete-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateQuantity();
    })
  })

document.querySelectorAll('.js-update-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
    });
  });

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const quantity = document.querySelector(`.js-quantity-input-${productId}`).value;
      updateCartQuantity(productId,Number(quantity));
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = quantity;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');
    });
  });