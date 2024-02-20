import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { checkBookExistsAPI, addBookDetailsAPI } from '../../utils/apicalls'
import BooksFormLayout from '../../Components/Layout/BooksFormLayout/BooksFormLayout'
import { Toaster, toast } from 'react-hot-toast';
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

      formData.append('image',bookDetails.image);
      formData.append("title",bookDetails.title);
      formData.append("author",bookDetails.author);
      formData.append("description",bookDetails.description);
      formData.append("genere",bookDetails.genre);
      formData.append("price",bookDetails.price);

      // toast.loading();
      // await addBookDetailsAPI(bookDetails);
      // toast.dismiss();
      toast.success("Book Data Added");
      try{
        const response = await fetch("http://localhost:4000/book-api/add-books",{
          method:"POST",
          body:formData
        })
        const data =await response.json();
      }
      catch(e){
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