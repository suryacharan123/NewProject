
function addToCart(newBooks,existingBooks){
    newBooks.forEach(book2 => {
        const index = existingBooks.findIndex(book1 => book1.id === book2.id);
        if (index !== -1) {
            existingBooks[index].qty += book2.qty;
        }
        else{
            existingBooks.push(book2)
        }
    })
    return existingBooks;
}

module.exports = {addToCart}