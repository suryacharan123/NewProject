import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { checkBookExistsAPI, addBookDetailsAPI } from '../../utils/apicalls'
import BooksFormLayout from '../../Components/Layout/BooksFormLayout/BooksFormLayout'
import { Toaster, toast } from 'react-hot-toast';
function AdminAddBooksPage() {

  let handleAddBook = async (bookDetails) => {

    toast.loading();
    let res = await checkBookExistsAPI(bookDetails);//checkBookExists
    toast.dismiss();

    let resLen = res.data.length;
    if (resLen) {
      toast.error("Book already exists.");
    }
    else {
      toast.loading();
      await addBookDetailsAPI(bookDetails);
      toast.dismiss();
      toast.success("Book Data Added");
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