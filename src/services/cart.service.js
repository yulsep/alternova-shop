export function addToCart(cartItems, product) {
  const itemIndex = cartItems.value.findIndex((item) => item.id === product.id);
  if (itemIndex > -1) {
    cartItems.value[itemIndex].quantity++;
  } else {
    cartItems.value.push({
      id: product.name,
      name: product.name,
      price: product.unit_price,
      quantity: 1,
    });
  }
}
