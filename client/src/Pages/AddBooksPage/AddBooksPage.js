import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { checkBookExistsAPI, addBookDetailsAPI } from '../../utils/apicalls'
import BooksFormLayout from '../../Components/Layout/BooksFormLayout/BooksFormLayout'
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios'
function AdminAddBooksPage() {

  let handleAddBook = async (bookDetails) => {

    // toast.loading();
    // let res = await checkBookExistsAPI(bookDetails);//checkBookExists
    // toast.dismiss();

    // let resLen = res.data.length;
    // if (resLen) {
    //   toast.error("Book already exists.");
    // }
    // { title, author, description, image, price, genre }
    const formData = new FormData();
    // console.log(bookDetails.image)
    // let bookObj = {
    //   title: bookDetails.title,
    //   author: bookDetails.author,
    //   description: bookDetails.description,
    //   genere: bookDetails.genre,
    //   price: bookDetails.price
    // }
    // console.log(type(bookDetails.image))

    // formData.append("bookObj",JSON.stringify(bookObj));
    // formData.append('image',bookDetails.image);

    // try {
    //     let res = await axios.post("http://localhost:4000/book-api/add-books",formData);
    // } catch (error) {
    //     console.log(error);
    // }\

    console.log(bookDetails.image);
    formData.append("title", bookDetails.title);
    formData.append("author", bookDetails.author);
    formData.append("description", bookDetails.description);
    formData.append("genere", bookDetails.genere);
    formData.append("price", bookDetails.price);
    formData.append("image",bookDetails.image)
    // toast.loading();
    // await addBookDetailsAPI(bookDetails);
    // toast.dismiss();
    // toast.success("Book Data Added");
    try {
      const response = await fetch("http://localhost:4000/book-api/add-books", {
        method: "POST",
        body: formData
      })
      const data = await response.json();
    }
    catch (e) {
      console.log(e)
    }

  }


  return (
    <div>
      <Navbar theme={true} />
      <div>
        <Toaster />
        <div className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: "94vh" }}>
          <div className='container p-4 text-white'>
            <BooksFormLayout heading="Add Book Details" onSubmit={handleAddBook} isEdit={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAddBooksPage