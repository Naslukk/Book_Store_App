import express from "express";
import { Book } from '../models/bookModel.js';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config()


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
})

const upload = multer({ storage: storage })


// Route for save a new book
router.post('/', upload.single('file') , async (req,res) =>{
    const data = JSON.parse(req.body.data);
    try {
        if(
            !data.title ||
            !data.author ||
            !data.publishYear
        ) {
            return res.status(400).send({
                message : 'Send all required fields : title , author, publisher',
            });
        }

        const newBook = {
            title : data.title,
            author : data.author,
            publishYear : data.publishYear,
            image : req.file.path,
        };

        const book = await Book.create(newBook);
        return res.status(200).json({
            message : "Book Added successfully",
            Book:book
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// ?? Route for get all  Books from db
router.get('/',async (req, res) =>{
    try {
        const books = await Book.find({});
        res.status(200).json({
            count : books.length,
            data : books
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// ?? Route for get all  Books from db by id
router.get('/:id',async (req, res) =>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

//Route for update a book
router.put('/:id',async (req, res) =>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message : 'Send all required fields: title, author, publishYear',
            })
        }
        
        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(404).send({message : 'Book not found'});
        }

        return res.status(200).send({ message: 'Book updated successfully'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

//Route for delete a book
router.delete('/:id', async (req, res) =>{
try {
    const {id} = req.params;

    const result = await Book.findByIdAndDelete(id);

    if(!result){
        return res.status(404).send({message : 'Book not is found'});
    }

    return res.status(200).send({ message: 'Book deleted successfully'});

} catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
}
})

export default router;