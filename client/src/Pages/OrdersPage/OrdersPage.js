import React, { useContext, useEffect, useState } from 'react'
import HorizontalProductCard from '../../Components/HorizontalProductCard/HorizontalProductCard';
import Navbar from '../../Components/Navbar/Navbar'
import { userLoginContextObj } from '../../Context/userLoginContext'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from '../../Redux/Slices/spinnerSlice';



function OrdersPage() {
    
    const dispatch = useDispatch();
    
    // let { userOrders } = useContext(userLoginContextObj);
    let { currentUser } = useContext(userLoginContextObj);

    let [userOrders,setUserOrders] = useState([]);

    const getData = async() =>{
        
        dispatch(showLoading());
        let receivedData = await axios.get(`http://localhost:4000/order-api/get-orders?username=${currentUser.username}`);
        dispatch(hideLoading());

        if(receivedData.status === 200){
            let orderData = []
            orderData = receivedData.data.payload;
            setUserOrders(orderData);
        }
        
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <>
            <Navbar theme={true} />
            <div className='container mt-5'>
                <>
                    <h1>Your Orders... </h1>
                </>
                {/* {
                    userOrders.map((item)=>{
                        console.log(item);
                    })
                } */}
                {
                    userOrders.map((item) => {
                        return (
                            <div>
                                <div className='mt-5 bg-warning p-3 text-white'>
                                    <span style={{ fontSize: "30px", fontWeight:"bold" }}>{item.date}</span>
                                </div>
                                <div style={{ width: "90%" }}>
                                    {
                                        item.books.map((item2) => {
                                            return (<HorizontalProductCard book={item2} isCart={false} isProductCard={false} key={item2.id} />)
                                        })
                                    }
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default OrdersPage