export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart = [
    {
      productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity : 1
    },{
      productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity : 1
    }
];
}

function toStoreCart(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
      let matching;  
      cart.forEach((item)=> {
          if(item.productId===productId) matching=item;
        });

        if(matching){
            matching.quantity++;
          }
        else{
          cart.push(
            {
              productId : productId,
              quantity : 1
            }
          );
        }
        toStoreCart();
}

export function removeFromCart(productId){
  let newCart = [];
  cart.forEach((item)=>{
      if(item.productId !== productId){
        newCart.push(item);
      }
  });
  cart = newCart;
  toStoreCart();
}

export function updateQuantity(){

        let cartQuantity = 0;
        cart.forEach((item)=>{
            cartQuantity += item.quantity;
        });
        localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity));
        const cartQuantityElement = document.querySelector('.js-cart-quantity');

        if(cartQuantityElement){
          document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        }

        const displayCartQuantityElement = document.querySelector('.js-display-cart-quantity');
        
        if(displayCartQuantityElement){
          document.querySelector('.js-display-cart-quantity')
           .innerHTML = `${cartQuantity} items`;
        }
        console.log(cart);
}