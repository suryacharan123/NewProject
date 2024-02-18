import React, { useContext } from 'react'
import HorizontalProductCard from '../../Components/HorizontalProductCard/HorizontalProductCard';
import Navbar from '../../Components/Navbar/Navbar'
import { userLoginContextObj } from '../../Context/userLoginContext'
function OrdersPage() {
    let { userOrders } = useContext(userLoginContextObj);
    console.log(userOrders.orderDetails);
    return (
        <>
            <Navbar theme={true} />
            <div className='container mt-5'>
                <>
                    <h1>Your Orders... </h1>
                </>
                {
                    userOrders.orderDetails.map((item) => {
                        return (
                            <div>
                                <div className='mt-5 bg-warning p-3 text-white'>
                                    <span style={{ fontSize: "30px", fontWeight:"bold" }}>{item.date}</span>
                                </div>
                                <div style={{ width: "75%" }}>
                                    {
                                        item.cartItems.map((item2) => {
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