import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackBtn from '../components/BackBtn';
import axios from 'axios';
import Spinner from '../components/Spinner';

function ShowBooks() {
    const [loading,setLoading] = useState(false)
    const [book,setBook] =useState([])
    const {id} = useParams()

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`).then((response) => {
            setBook(response.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);
    return (
        <div className='p-4'>
            <BackBtn/>
            <h1 className='text-3xl my-4'>Show Book</h1>
            {loading ?(<Spinner/>):(
                <div className='flex flex-col border-sky-400 rounded-xl w-fit p-4'>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-400 ">Id</span>
                        <span>{book._id}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-400 ">Title</span>
                        <span>{book.title}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-400 ">Author</span>
                        <span>{book.author}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-400 ">Publish Year</span>
                        <span>{book.publishYear}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-400 ">Create Time</span>
                        <span>{new Date(book.createdAt).toString()}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-400 ">Last Updated Time</span>
                        <span>{new Date(book.updatedAt).toString()}</span>
                    </div>
                </div>
            )}
        </div>
    ) 
}

export default ShowBooks