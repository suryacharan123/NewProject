import React, { useState, useEffect } from 'react'
import BlackButton from '../../Buttons/BlackButton'
import FormInputField from '../../FormInputField/FormInputField'
import { useLocation } from 'react-router-dom'
function BooksFormLayout({ onSubmit, heading, isEdit }) {

    const location = useLocation();
  
    //Form States
    let [title, setTitle] = useState('')
    let [author, setAuthor] = useState('')
    let [description, setDescription] = useState('')
    let [image, setImage] = useState('')
    let [price, setPrice] = useState()
    let [genre, setGenre] = useState('')



    let handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            await onSubmit({ title, author, description, image, price, genre });
        }
        else {
            
            await onSubmit({ title, author, description, image, price, genre });
            setAuthor('');
            setTitle('');
            setDescription('');
            setImage('');
            setPrice('');
            setGenre('');
            alert("Book Data Added");
        }
    }

    useEffect(() => {

        //If you get values for update fill the values in the input fields
        if (location.state) {
            
            const { author, title, description, image, price, genre } = location.state[0];
            setAuthor(author || '');
            setTitle(title || '');
            setDescription(description || '');
            setImage(image || '');
            setPrice(price || 0);
            setGenre(genre || '');

        }
    }, [location.state]);

    return (
        <>
            <h2 className='text-white text-center p-3'>{heading}</h2>
            <form >
                <FormInputField
                    label='Book Name'
                    type='text'
                    className='form-input'
                    placeholder='Enter Book Name'
                    handleChange={setTitle}
                    value={title}
                />

                <FormInputField
                    label='Author'
                    type='text'
                    className='form-input'
                    placeholder='Enter Author Name'
                    handleChange={setAuthor}
                    value={author}
                />


                <FormInputField
                    label='Genre'
                    type='text'
                    className='form-input'
                    placeholder='Enter the Genre of the Book'
                    handleChange={setGenre}
                    value={genre}
                />

                <div className="form-group  mb-3">
                    <label className='text-white'>Description</label>
                    <textarea rows="4" cols="50" className='form-control' value={description} placeholder="Enter Description of the Book" onChange={(e) => { setDescription(e.target.value) }} />
                </div>

                <FormInputField
                    label='Image URL'
                    type='text'
                    className='form-input'
                    placeholder='Enter Image URL'
                    handleChange={setImage}
                    value={image}
                />

                <FormInputField
                    label='Price'
                    type='number'
                    className='form-input'
                    placeholder='Enter the Price of the Book'
                    handleChange={setPrice}
                    value={price}
                />

                <div className='card-btn-container text-center w-50 mx-auto'>
                    <BlackButton type="submit" className="product-listing-button" onClick={handleSubmit} text={heading} />
                </div>

            </form>
        </>
    )
}

export default BooksFormLayout
