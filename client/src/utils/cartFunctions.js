export const isBookInCart = (bookDetails, cartItems) => {
    console.log(bookDetails);

    let bookInCart = cartItems.find((item) => bookDetails._id === item._id);
    console.log(bookInCart);
    if (bookInCart === undefined) { return undefined; }
    return bookInCart;

}

export const addQtyOnLogin = (userCartData, cartItems) => {
    cartItems.forEach(book2 => {
        const index = userCartData.findIndex(book1 => book1._id === book2._id);
        if (index !== -1) {
            userCartData[index].qty += book2.qty;
        }
        else{
            userCartData.push(book2)
        }
    })
    return userCartData;
}