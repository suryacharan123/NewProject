import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './Pages/HomePage/HomePage';
import BooksPage from './Pages/BooksPage/BooksPage';
import Login from './Pages/LoginPage/Login';
import SignUp from './Pages/RegisterPage/SignUp';
import DetailsPage from './Pages/DetailsPage/DetailsPage';
import CartPage from './Pages/CartPage/CartPage';
import SearchPage from './Pages/SearchPage/SearchPage';

import { userLoginContextObj } from './Context/userLoginContext';

import AdminBooksPage from './Pages/AdminBooksPage/AdminBooksPage';
import AdminAddBooksPage from './Pages/AddBooksPage/AddBooksPage';
import UpdateBookpage from './Pages/UpdateBooksPage/UpdateBooksPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import OrdersPage from './Pages/OrdersPage/OrdersPage';


import axios from 'axios';

function App() {
  let { loginStatus, isAdmin, handleUserTokenLogin } = useContext(userLoginContextObj);



  let checkTokenSession = async () => {
    let token = localStorage.getItem("token");
    //If no token is present Do nothing
    if (token === null) {
      return;
    }
    //If Token Exists
    else {
      console.log("Check for validity")
      //check token for it's expired
      let tokenStatus = await axios.post("http://localhost:4000/user-api/check-session-validity", { token });

      //If the token is expired
      if (tokenStatus.message === 'Expired') {
        return;
      }
      //Else perform a login with all the received data;
      else {

        handleUserTokenLogin(tokenStatus.data.payload)
      }
    }


  }

  useEffect(() => {
    checkTokenSession();
  }, [])

  const displayToast = () =>{
    console.log("here");
  }

  return (
    <div>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/book-details/:id" element={<DetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        {
          loginStatus ? <Route path="/order-details" element={<OrdersPage />} /> : <Route path="/admin" element={<Navigate to="/login" />} />
        }

        {
          isAdmin ? <Route path="/admin" element={<AdminBooksPage />} /> : <Route path="/admin" element={<Navigate to="/login" />}></Route>
        }
        {
          isAdmin ? <Route path="/add-books" element={<AdminAddBooksPage />} /> : <Route path="/add-books" element={<Navigate to="/login" />}></Route>
        }
        {
          isAdmin ? <Route path="/update-books" element={<UpdateBookpage />} /> : <Route path="/update-books" element={<Navigate to="/login" />}></Route>
        }
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </div>
  );
}

export default App;