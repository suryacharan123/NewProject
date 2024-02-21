const bookModel = require("../Models/productModel");
const url = require("url")
//Adding new books to database
const addBookData = async (req, res) => {

    try {
        //Get the book Data
        const bookData = req.body;
        console.log(bookData);
        //Add the image link to the book Data
        console.log(req.file)
        bookData.image = req.file.path
        //Update the database
        const dbRes = await bookModel.create(bookData);
        res.status(200).send({ message: "Book Created", bookData: dbRes })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Server Error" })
    }
}

//Getting all the books from database.
const getBooks = async (req, res) => {
    try {
        //Get books from the database
        const books = await bookModel.find();
        res.status(200).send({ message: "Data Received", payload: books })
    } catch (error) {
        console.log(error)
    }
}

const getBookDetails = async (req, res) => {
    try {
        
        const parsedUrl = url.parse(req.url, true);
        const queryParameters = parsedUrl.query;

        const dbRes = await bookModel.findOne({_id:queryParameters.id});

        res.status(200).send({message:"Book Details Received",payload : dbRes})
    }
    catch (error) {
        res.status(500).send({message:"Internal Server Error"});
    }
}


const updateBookData = async(req,res) =>{
    try{

    }
    catch(error){
        
    }
}

module.exports = { addBookData, getBooks, getBookDetails }