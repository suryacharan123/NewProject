import React, { useState, useEffect } from 'react'
import ProductCard from '../../ProductCard/ProductCard';
import './ProductListing.css'
import { getAllBookDetailsAPI } from '../../../utils/apicalls';
function ProductListing() {
    
    let [bookData, setBookData] = useState([]);

    let getData = async () => {
        let res = await getAllBookDetailsAPI();//getAllBookDetails
        setBookData(res.data.payload);
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div className='produjct-listing-container mt-5'>
            <div className='container'>
                <h2><span className='text-warning'>Bored?</span> <br />Books that might interest you.</h2>
                <div className='row mt-5'>
                    {
                        bookData.slice(0, 4).map((book) => {
                            return (
                                <div className='col-sm-3 mx-auto' key={book._id}>
                                    <ProductCard book={book} />
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default ProductListing