export let cart = [
    {
      productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity : 1
    },{
      productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity : 1
    }
];

export function addToCart(productId){
      let matching;  
      cart.forEach((item)=> {
          if(item.id===productId) matching=item;
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
}

export function removeFromCart(productId){
  let newCart = [];
  cart.forEach((item)=>{
      if(item.productId !== productId){
        newCart.push(item);
      }
  });
  cart = newCart;
}