// Login.jsx
import React, { useContext, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';

import './Login.css';
import { userLoginContextObj } from '../../Context/userLoginContext';
import { Link, useNavigate } from 'react-router-dom';
import BlackButton from '../../Components/Buttons/BlackButton';
import FormInputField from '../../Components/FormInputField/FormInputField';
import LoginImage from './../../Components/LoginImage/LoginImage';
import { signUpFormValidation } from '../../utils/formValidation';
import { Toaster,toast } from 'react-hot-toast';
import Footer from '../../Components/Footer/Footer';



function Login() {
    let { handleUserLogin,loginStatus,isAdmin } = useContext(userLoginContextObj);
    let navigate = useNavigate();

    //Form States
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    let handleSubmit = async (e) => {
        e.preventDefault();

        // Perform Validations
        let errMsg = signUpFormValidation({ username, password });

        if (errMsg) {
            toast.error(errMsg)
        }

        //If there is no errors
        else {
            let userObj = {
                username: username,
                password: password
            };

            //Handle login in user context
           
            //Use a toat here
            toast.loading();
            let res = await handleUserLogin(userObj);
            toast.dismiss();
            
            if (res === "USER_LOGIN") {
                toast.success("Login SuccessFull",500)
                setTimeout(()=>{
                    navigate("/");
                },550)
            }

            else if (res === "ADMIN_LOGIN") {
                toast.success("Login Successful");
                setTimeout(()=>{
                    navigate("/admin")
                },500)
            }

        }
    };



    return (
        <div>
            <Navbar theme={true} />
            {/* {showPopup && <Popup message={promptMsg} heading={promptHeading} showPopupAndNavigate={showPopupAndNavigate} setShowPopup={setShowPopup} path="/"/>} */}
            <Toaster/>
            <div className='signup-container'>

                <LoginImage />
                <div className='signup-content-container'>
                    <div className='container'>
                        <div className='content-wrapper'>
                            <div className='signup-heading'>
                                <h2>Log In</h2>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <FormInputField
                                    label='User Name'
                                    type='text'
                                    className='form-input w-100'
                                    placeholder='Enter your User Name'
                                    handleChange={setUsername}
                                />

                                <FormInputField
                                    label='Password'
                                    type='password'
                                    className='form-input w-100'
                                    placeholder='Enter your Password'
                                    handleChange={setPassword}
                                />

                                <div className='text-center'>
                                    <BlackButton text="Log In" className="submit-btn" type="submit" />
                                </div>
                            </form>
                            <div className='text-center mt-3 fs-5'>
                                Don't Have a account? <span ><Link to="/signup" className='link'>Sign Up Here</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Login;