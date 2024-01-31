import React,{useState} from 'react';
import BackButton from "../components/BackBtn";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate} from "react-router-dom"


function CreateBooks() {
    const [title,setTitle] = useState('');
    const [author,setAuthor] = useState('');
    const [publishYear,setPublishYear] = useState('');
    const [loading,setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    
    const navigate = useNavigate();

    const onFileSelected = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSaveBook = ()=>{
        if (!selectedFile) {
            alert("Please select a file.");
            return;
        }
        const data = {
            title,
            author,
            publishYear,
        }
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("file", selectedFile);
        setLoading(true);
        axios.post('http://localhost:5555/books',formData,{headers: {'Content-Type': 'multipart/form-data'}})
        .then(()=>{
            setLoading(false);
            navigate('/')
        }).catch((err)=>{
            setLoading(false);
            alert("An error occurred");
            console.log("An error"+err.message);
        })
    };

    return (
        <div className='p-4'>
            <BackButton/>
            <h1 className='text-3xl my-4'>Create Book</h1>
            {loading ? <Spinner/> :''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input 
                    type="text"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input 
                    type="text"
                    value={author}
                    onChange={(e)=> setAuthor(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input 
                    type="number"
                    value={publishYear}
                    onChange={(e)=> setPublishYear(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Image</label>
                    <input 
                    type="file"
                    onChange={onFileSelected}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 mt-10' onClick={handleSaveBook}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default CreateBooks