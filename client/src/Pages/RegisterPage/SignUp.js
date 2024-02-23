import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import "./SignUp.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

// import Popup from '../../Components/Popup/Popup';
import BlackButton from '../../Components/Buttons/BlackButton';
import Footer from '../../Components/Footer/Footer';
import FormInputField from '../../Components/FormInputField/FormInputField';
import LoginImage from '../../Components/LoginImage/LoginImage';
import { signUpFormValidation } from '../../utils/formValidation';
// import { checkUserNameAPI } from '../../utils/apicalls';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';


function SignUp() {

    let navigate = useNavigate();

    let [username, setUserName] = useState('');
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState('');

    let handleSumbit = async (e) => {

        e.preventDefault();

        //Validate the form
        let errMsg = signUpFormValidation({ username, email, password })
        if (errMsg) {
            toast.error(errMsg);
        }
        else {
            //Check if the user exists.
            
                //Encrypt the password
                let userObj = {
                    username: username,
                    email: email,
                    password: password,
                    isAdmin: false,
                    cart: []
                }
                let orderObj = {
                    username :username,
                    orderDetails : []
                }
                
                toast.loading("Please wait a moment");
                let res = await axios.post('http://localhost:4000/user-api/register', userObj);
                console.log(res);
                toast.dismiss();
                if (res.status === 200) {
                    toast.success("Sign Up successful.");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                }
            
        }

    }

    return (
        <div>
            <Navbar theme={true} />
            <Toaster />
            <div className='signup-container'>
                <LoginImage />
                <div className='signup-content-container'>
                    <div className='container'>
                        <div className='content-wrapper'>
                            <div className='signup-heading'>
                                <h2>Sign Up</h2>
                            </div>
                            <form onSubmit={handleSumbit}>

                                <FormInputField
                                    label='User Name'
                                    type='text'
                                    className='form-input w-100'
                                    placeholder='Enter your User Name'
                                    handleChange={setUserName}
                                />

                                <FormInputField
                                    label='Email'
                                    type='text'
                                    className='form-input w-100'
                                    placeholder='Enter your Email Id'
                                    handleChange={setEmail}
                                />

                                <FormInputField
                                    label='Password'
                                    type='password'
                                    className='form-input w-100'
                                    placeholder='Enter your Password'
                                    handleChange={setPassword}
                                />

                                <div className='text-center'>
                                    <BlackButton text="Sign Up" className="submit-btn" type="submit" />
                                </div>
                            </form>

                            <div className='text-center mt-3 fs-5'>
                                Already have a account? <span ><Link to="/login" className='link'>Login</Link></span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp