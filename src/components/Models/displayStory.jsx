/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { motion } from "framer-motion"
import getCroppedImg from "../../utils/cropImage.jsx";
import 'tailwindcss/tailwind.css';
import useAxios from '../../hooks/axios.jsx';
import loader from "../../images/loader.gif"
import { toast } from 'react-toastify';


const DisplayStory = ({ closeModel, userId }) => {

    const [loading, setLoading] = useState(false);
    const [story, setStory] = useState()
    const axiosInstance = useAxios()

    useEffect(() => {
        setLoading(true)
        axiosInstance.post("/user/getSpecificUserStory", { id: userId }).then((res) => {
            console.log(res)
            setStory(res.data.stories[0])
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            console.log(error)
            closeModel()
        })
    }, [])


    return (
        <div style={{ backgroundColor: "#0000009e" }} className='z-50 absolute top-0 left-0 w-screen h-screen flex justify-center items-center'>
            <div onClick={closeModel} className='absolute top-5 right-5 cursor-pointer'>
                <svg className="h-6 w-6 text-content" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
            </div>
            {loading ? (<> <img src={loader} alt="" /> </>) : (
                <div className='w-7/12 h-full p-5'>
                    <img className='w-full h-full object-cover rounded-xl' src={story ? story.url : loader} alt="" />
                </div>

            )}
        </div>
    );
}

export default DisplayStory;
