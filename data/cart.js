export const cart = [
    
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
