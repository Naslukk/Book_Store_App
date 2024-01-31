import express from "express";
import mongoose from "mongoose";
import bookRouter from "./routes/booksRoute.js"
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());
//Middleware for handling CORS POLICY
app.use(cors())

app.use('/uploads',express.static("uploads"))


app.get('/',(req,res)=>{
    return res.status(234).send('Welcome to the Express');
});

app.use('/books', bookRouter)

mongoose.connect(process.env.mongoDBURL).then(() => {
    
    console.log('App connected to database'); 
    app.listen(process.env.PORT, () =>{
        console.log("App listening on port " + process.env.PORT);
    });

}).catch((err) => {
    console.log(err)
}); 