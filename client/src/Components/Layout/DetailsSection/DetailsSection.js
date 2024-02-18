import React, { useEffect, useState, useContext } from 'react'
import './DetailsSection.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OrangeButton from '../../Buttons/OrangeButton';
import { userLoginContextObj } from './../../../Context/userLoginContext';
import BookImage from '../../BookImage/BookImage';
import Popup from '../../Popup/Popup';
import { useNavigate } from 'react-router-dom';

function DetailsSection() {
    const navigate = useNavigate();
    const { id } = useParams();
    let { addToCart } = useContext(userLoginContextObj);

    let [bookData, setBookData] = useState('');

    //Popup States
    let [showPopupAndNavigate, setShowPopupAndNavigate] = useState(false)
    let [showPopup, setShowPopup] = useState(false);
    let [promptMsg, setPromptMsg] = useState('');
    let [promptHeading, setPromptHeading] = useState('')


    let getData = async () => {
        try {
            let res = await axios.get(`http://localhost:4000/book-api/get-book-details?id=${id}`);//getBookDetails
            console.log(res)
            if (res.data.length === 0) {
                navigate("*")
            }
            setBookData(res.data.payload);
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getData();
    }, [])


    const handleAddToCart = async () => {
        let res = await addToCart(bookData);


        setPromptMsg("Book Added to Cart.");
        setPromptHeading("Success!!!")
        setShowPopup(true);

        if (res === "BOOK_IN_CART") {
            setPromptMsg("Book Already in Cart.");
            setPromptHeading("Notice!!!")
            setShowPopup(true);
        }
        if (res === "BOOK_ADDED") {
            setPromptMsg("Book Added to Cart.");
            setPromptHeading("Success!!!")
            setShowPopup(true);
        }
        if (res === "LOGIN") {
            setPromptMsg("You need to Login to add Books to the Cart.");
            setPromptHeading("Notice!!!")
            setShowPopup(true);
            setShowPopupAndNavigate(true);
        }


    }
    return (
        <div className='mt-5'>
            {showPopup && <Popup message={promptMsg} heading={promptHeading} showPopupAndNavigate={showPopupAndNavigate} setShowPopup={setShowPopup} path="/login" />}
            <div className='container details-container'>
                <div className='d-sm-flex justify-content-between'>
                    <div className='book-img-container d-flex justify-content-center w-100 mb-5'>
                        <BookImage className="" image={bookData.image} style={{}} />
                    </div>
                    <div className='book-detail-container w-100 p-sm-3'>
                        <h2 className='mb-0 '>{bookData.title}</h2>
                        <p className='mb-0 author'>{bookData.author}</p>
                        <p className='mb-0 p-0'>Gener : {bookData.genre}</p>
                        <p>{bookData.description}</p>
                        <p className='mb-0'><b>Language</b> : English</p>
                        <h3 className='mb-0 price'>&#8377;{bookData.price}</h3>
                        <OrangeButton onClick={handleAddToCart} className="cart-btn" text="Add to Cart" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsSection