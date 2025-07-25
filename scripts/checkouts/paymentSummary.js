import { calculateCartQuantity, calculateTotalAmount, deliveryCharge } from "../../data/cart.js";
import { currencyFormatter } from "../utils/money.js";

export function renderPaymentSummary(){

    let html;
    let cartQuantity = calculateCartQuantity();
    let totalAmount = calculateTotalAmount();
    let charge = deliveryCharge();
    let totalAmountBeforeTax = currencyFormatter(totalAmount + charge);
    html = `
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div class="js-payment-summary-item-count">Items (${cartQuantity}):</div>
                <div class="payment-summary-money">$${currencyFormatter(totalAmount)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${currencyFormatter(charge)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${totalAmountBeforeTax}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${currencyFormatter((totalAmount+charge) * 0.1)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${currencyFormatter(totalAmount + charge + ((totalAmount+charge) * 0.1))}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = html;
}