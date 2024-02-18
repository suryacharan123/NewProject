import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import './SearchPage.css'
import axios from 'axios'
import {Toaster,toast} from 'react-hot-toast'
import { useLocation } from 'react-router-dom'

import SearchInput from '../../Components/SearchInput/SearchInput'
import HorizontalProductCard from '../../Components/HorizontalProductCard/HorizontalProductCard'
function SearchPage() {
    const location = useLocation();
    // let [bookData,setBookData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    let getData = async () => {
        try {
            toast.loading();
            let res = await axios.get("http://localhost:5000/books");
            toast.dismiss();
            let bookData = res.data;
            let searchValue = [];
            searchValue = bookData.filter((data) => data.title.toLowerCase().includes(location.state.toLowerCase()));
            setSearchResult(searchValue);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state])
    return (
        <div>

            <Navbar theme={true} />
            <Toaster/>
            {
                searchResult ?
                    <div className='search-result-container'>
                        <div className='container'>
                            <div className='mb-4'>
                                <SearchInput />
                            </div>
                            <h2>Your Search Results</h2>
                            {
                                searchResult.map((book) => {

                                    return (<HorizontalProductCard book={book} isProductCard={true} />)
                                })
                            }
                        </div>
                    </div>
                    :
                    <h1>No Results Found</h1>
            }
            <Footer />
        </div>
    )
}

export default SearchPage