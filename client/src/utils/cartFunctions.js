export const isBookInCart = (bookDetails, cartItems) => {
    let bookInCart = cartItems.find((item) => bookDetails.id === item.id);
    if (bookInCart === undefined) { return undefined; }
    return bookInCart;

}

export const addQtyOnLogin = (userCartData, cartItems) => {
    cartItems.forEach(book2 => {
        const index = userCartData.findIndex(book1 => book1.id === book2.id);
        if (index !== -1) {
            userCartData[index].qty += book2.qty;
        }
        else{
            userCartData.push(book2)
        }
    })
    return userCartData;
}