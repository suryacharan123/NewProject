import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { updateBookDetailsAPI } from '../../utils/apicalls'
import { useLocation, useNavigate } from 'react-router-dom'
import BooksFormLayout from '../../Components/Layout/BooksFormLayout/BooksFormLayout'
import { Toaster, toast } from 'react-hot-toast'

import { useDispatch, UseDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../../Redux/Slices/spinnerSlice'

import axios from 'axios'
function UpdateBookpage() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // const [isUpdate, setIsUpdate] = useState(false)

    let handleUpdate = async (data) => {
        console.log(data);
        data.price = parseInt(data.price);
        const formData = new FormData();
        formData.append("_id",data._id);
        formData.append('image', data.image);
        formData.append("title", data.title);
        formData.append("author", data.author);
        formData.append("description", data.description);
        formData.append("genere", data.genere);
        formData.append("price", data.price);
        formData.append("oldImage",data.oldImage);
        // console.log(typeof(image))
        dispatch(showLoading());
        let dbRes = await axios.put("http://localhost:4000/book-api/update-book",formData);
        dispatch(hideLoading());

        
        toast.success("Book Data Updated");
        setTimeout(()=>{
            navigate('/admin')
        },  1000);
    }



    return (
        <div>
            <Navbar theme={true} />
            <Toaster />
            <div>
                <div className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: "94vh" }}>
                    <div className='container p-4 ' style={{ marginTop: "-90px" }}>
                        <BooksFormLayout heading="Update Book Details" onSubmit={handleUpdate} isEdit={true} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UpdateBookpage