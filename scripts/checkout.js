import { cart, removeFromCart, updateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from '../data/products.js';
import { currencyFormatter } from './utils/money.js';
import { deliveryOptions } from "../data/deliveryOptions.js";

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

  let selectedDeliveryDate;
  
  deliveryOptions.forEach((deliveryOption)=>{
      if(item.deliveryOptionsId === deliveryOption.id){
        selectedDeliveryDate = deliveryOption;
      }
  });

  const todayDate = dayjs();
  const deliveryDate = todayDate.add(selectedDeliveryDate.deliveryDate,'days').format('dddd, MMMM D');
  // console.log(deliveryDate);


  cartItems += `
        <div class="cart-item-container js-cart-item-container-${matching.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDate}
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
                ${deliveryOptionsHTML(matching.id, item)}
              </div>
            </div>
          </div>
    `;
});



function deliveryOptionsHTML(productId, cartItem){
      let html='';

  deliveryOptions.forEach((deliveryOption)=>{

    const todayDate = dayjs();
    const deliveryDate = todayDate.add(deliveryOption.deliveryDate,'days').format('dddd, MMMM D');


    const priceString = deliveryOption.priceCents === 0
              ? 'FREE'
              : `$${currencyFormatter(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionsId ? 'checked' : '';
    
    html+=
    
    `
        <div class="delivery-option">
          <input type="radio" 
              ${isChecked}
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date ">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
    `

  });
  return html;
}

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

      const currentQuantity = document.querySelector(`.js-quantity-label-${productId}`).innerText;

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

      if (quantityInput) {
        quantityInput.value = currentQuantity.trim();
      }
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