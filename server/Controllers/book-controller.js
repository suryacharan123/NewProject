const bookModel = require("../Models/productModel");
const url = require("url")
const { cloudinary } = require("../Middleware/cloudinaryUpload");
const booksModel = require("../Models/productModel");

//Adding new books to database
const addBookData = async (req, res) => {

    try {
        //Get the book Data
        const bookData = req.body;

        // Add the image link to the book Data

        // bookData.image = req.file.path;

        let result = await cloudinary.uploader.upload(req.file.path);
        let imageUrl = result.url;
        //Update the database
        bookData.image = imageUrl

        const dbRes = await bookModel.create(bookData);


        res.status(200).send({ message: "Book Created" })
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

        const dbRes = await bookModel.findOne({ _id: queryParameters.id });

        res.status(200).send({ message: "Book Details Received", payload: dbRes })
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

function extractPublicId(imageUrl) {
    const parts = imageUrl.split('/');
    const filename = parts.pop();
    const publicId = filename.split('.')[0];
    return publicId;
}


const updateBookData = async (req, res) => {
    try {
        // console.log(req.body._id);
        // console.log("Here")
        let bookObj = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            genere: req.body.genere,
            price: parseInt(req.body.price)
        }

        // let newImagePath = req.file;
        if (req.file === undefined) {
            console.log("Here")
            bookObj.image = req.body.oldImage;
            console.log(bookObj);
            let dbRes = await bookModel.updateOne({ _id: req.body._id }, {$set : bookObj});
            console.log(dbRes);
            res.status(200).send({message : "Book Data Updated"})
        }
        else {
            let newImagePath = req.file.path;
            let oldImage = req.body.oldImage;

            //Delete old image
            let publicId = extractPublicId(oldImage);
            let res1 = await cloudinary.uploader.destroy(publicId);
            // console.log(res1);

            //Upload new Image
            let res2 = await cloudinary.uploader.upload(newImagePath);
            // console.log(res2);
            bookObj.image = res2.url
            //Create book Obj
            
        let dbRes = await bookModel.updateOne({ _id: req.body._id }, {$set : bookObj});
            console.log(dbRes);
        }

    }
    catch (error) {
        console.log(error);
    }
}



const deleteBookData = async (req, res) => {
    try {
        console.log(req.query);
        let bookData = await bookModel.findOne({ _id: req.query.id });
        let publicId = extractPublicId(bookData.image);
        const result = await cloudinary.uploader.destroy(publicId);
        let dbRes = await bookModel.deleteOne({ _id: req.query.id });
        return res.status(200).send({ message: "Data Deleted" });

    }
    catch (e) {
        console.log(e);
    }
}

module.exports = { addBookData, getBooks, getBookDetails, deleteBookData, updateBookData }