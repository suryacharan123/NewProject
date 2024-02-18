import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { updateBookDetailsAPI } from '../../utils/apicalls'
import { useLocation, useNavigate } from 'react-router-dom'
import BooksFormLayout from '../../Components/Layout/BooksFormLayout/BooksFormLayout'
import { Toaster,toast } from 'react-hot-toast'
function UpdateBookpage() {



    const navigate = useNavigate();
    const location = useLocation();
    // const [isUpdate, setIsUpdate] = useState(false)

    let handleUpdate = async (data) => {
        console.log(data);
        let bookDetails = {
            title: data.title,
            author: data.author,
            genre: data.genre,
            price: parseInt(data.price) ,
            image: data.image,
            reviews: [],
            description: data.description
        }
        toast.loading();
        await updateBookDetailsAPI(location,bookDetails)
        toast.dismiss();
        toast.success("Book Data Updated");
        setTimeout(()=>{
            navigate('/admin')
        },  1000);
    }



    return (
        <div>
            <Navbar theme={true} />
            <Toaster/>
            <div>
                <div className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: "94vh" }}>
                    <div className='container p-4 ' style={{ marginTop: "-90px" }}>
                    <BooksFormLayout heading="Update Book Details" onSubmit = {handleUpdate} isEdit={true}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UpdateBookpage