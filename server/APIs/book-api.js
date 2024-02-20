const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { addBookData, getBooks, getBookDetails } = require("../Controllers/book-controller")
const bookRoutes = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const bodyParser = require('body-parser');

bookRoutes.use(bodyParser.urlencoded({ extended: true }))
// Configure cloudinary
cloudinary.config({
    cloud_name: 'djgweeuce',
    api_key: '434956685422673',
    api_secret: 'keYzQ_qn3IBGzGq964yGtsKXLbk'
});



// Configure multer storage for cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'local-uploads',
        format: async (req, file) => 'png', // Example: always upload as png
        public_id: (req, file) => 'image-' + Date.now() // Example: use timestamp as the public_id
    }
});
const upload = multer({ storage: storage });

bookRoutes.post("/add-books", upload.single('image'), expressAsyncHandler(addBookData))

bookRoutes.get("/get-books", expressAsyncHandler(getBooks))

bookRoutes.get("/get-book-details",expressAsyncHandler(getBookDetails))

module.exports = bookRoutes;

