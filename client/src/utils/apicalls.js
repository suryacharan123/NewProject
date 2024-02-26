import axios from "axios";
let API_URL = "http://localhost:5000";

export const checkUserNameAPI = async (username) => {
    return await axios.get(API_URL + `/users?username=${username}`);
}

export const signUpAPI = async (userObj) => {
    return await axios.post(API_URL + `/users`, userObj);
}

// export const updateUserCartAPI = async (currentUser) => {
//     return await axios.put(API_URL + `/users/${currentUser.id}`, currentUser);
// }

export const updateUserCartAPI = async (currentUser) => {
    return await axios.put(`http://localhost:4000/user-api/update-cart`, currentUser);
}

// export const getAllBookDetailsAPI = async () => {
//     return await axios.get(API_URL + `/books`);
// }

export const getAllBookDetailsAPI = async () => {
    return await axios.get(`http://localhost:4000/book-api/get-books`);
}

export const deleteBookDataAPI = async (id) => {
    return await axios.delete(API_URL + `/books/${id}`);
}

// export const getBookDetailsAPI = async (id) => {
//     return await axios.get(API_URL + `/books?id=${id}`);
// }

export const getBookDetailsAPI = async (id) => {
    return await axios.get(API_URL + `/get-book-details`,{id:id});
}
export const checkBookExistsAPI = async (bookDetails) => {
    return await axios.get(API_URL + `/books?title=${bookDetails.bookname}`);
}

// export const addBookDetailsAPI = async (bookDetails) => {
//     return await axios.post(API_URL + "/books", bookDetails);
// }
export const addBookDetailsAPI = async (bookDetails) => {
    return await axios.post(`http://localhost:4000/book-api/add-books`,bookDetails);
}

export const updateBookDetailsAPI = async (location, bookDetails) => {
    return await axios.put(API_URL + `/books/${location.state[0].id}`, bookDetails)
}

// export const processOrder = async (updatedOrders) =>{
//     return await axios.put(API_URL + `/orders/${updatedOrders.id}`, updatedOrders)
// }

export const processOrder = async (updatedOrders) =>{
    console.log(updatedOrders)
    return await axios.put("http://localhost:4000/order-api/process-order",updatedOrders);
}

export const getPreviousOrders = async (username) =>{
    return await axios.get(API_URL + `/orders?username=${username}`);
}
