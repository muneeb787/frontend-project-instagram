/* eslint-disable react/prop-types */
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { motion } from "framer-motion"
import getCroppedImg from "../../utils/cropImage.jsx";
import 'tailwindcss/tailwind.css';
import useAxios from '../../hooks/axios.jsx';
import loader from "../../images/loader.gif"
import post from "../../images/createPost.png"
import { toast } from 'react-toastify';
import {useDispatch} from "react-redux"
import { updateUserData } from '../../redux/authSlice.js';

const aspectRatios = [
    // { value: 1, text: "1" },
    { value: 4 / 3, text: "4/3" },
    { value: 16 / 9, text: "16/9" },
    { value: 1 / 2, text: "1/2" },
];

const CreatePost = ({ closeModel }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [cropedImage, setCropedImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [loading, setLoading] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [aspect, setAspect] = useState(aspectRatios[0].value);
    const dispatch = useDispatch() 

    const handleFile = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setSelectedFile(imageUrl);
            };

            reader.readAsDataURL(file);
        }
    };

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onAspectChange = (value) => {
        console.log(value)
        setAspect(value);
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(selectedFile, croppedAreaPixels);
        setCropedImage(croppedImageUrl)
    };


    const [text, setText] = useState('');
    const maxLength = 2000;

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);
    };

    const SharePost = () => {
        const axiosInstance = useAxios();
        if (cropedImage) {
            setLoading(true)
            fetch(cropedImage) // Fetch the blob URL
                .then((response) => response.blob()) // Convert to a Blob
                .then((blob) => {
                    const data = new FormData();
                    data.append("file", blob); // Append the Blob to the FormData
                    data.append("upload_preset", "u03qtmrk");
                    data.append("cloud_name", "dwlmgckgg");

                    console.log(data, "final Data");
                    fetch("https://api.cloudinary.com/v1_1/dwlmgckgg/image/upload", {
                        method: "post",
                        body: data
                    })
                        .then((res) => res.json())
                        .then(async (data) => {
                            console.log(data)
                            try {
                                const posting = await axiosInstance.post("/post", { PostContent: text, Image_Video_url: data.secure_url })
                                console.log(posting, "posting")
                                console.log(posting.data.user, "user")
                                dispatch(updateUserData(posting.data.user))
                                setLoading(false)
                                closeModel()
                                toast.success("Posted Successfully")
                            } catch (error) {
                                console.log(error, "Errorrrring")
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.error("Error fetching blob URL:", err);
                    setLoading(false)
                });
        }
    };



    return (
        <div style={{ backgroundColor: "#0000009e" }} className='z-50 absolute top-0 left-0 w-screen h-screen flex justify-center items-center'>
            <div onClick={closeModel} className='absolute top-5 right-5 cursor-pointer'>
                <svg className="h-6 w-6 text-content" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
            </div>
            {loading ? ( <> <img src={loader} alt="" /> </> ) : (
                <div className={`bg-backgroundSecondary text-content ${cropedImage ? "w-8/12" : "w-5/12"} h-5/6 rounded-lg overflow-hidden`}>
                <div id="header" className='flex justify-between p-3'>
                    <div className={`cursor-pointer ${selectedFile ? "" : "invisible"}`} onClick={() => {
                        if (cropedImage) {
                            setCropedImage()
                        }
                        else {
                            setSelectedFile()
                        }
                    }}>Back</div>
                    <div>Create a New Post</div>
                    {cropedImage ?
                        <div className='cursor-pointer' onClick={SharePost}>Share</div> :
                        <div className='cursor-pointer' onClick={onCrop}>Next</div>}

                </div>
                <hr />
                <div
                    className="w-full h-full flex justify-center items-center relative"
                >
                    {!cropedImage ? (!selectedFile ? (
                        <div className="w-full h-full flex flex-col justify-center items-center hover:text-black">
                            <div className='w-80 p-5 mt-[-20%]'><img src={post} alt="" /></div>
                            <label className="px-4 py-2 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue ">
                                <span className="text-base leading-normal">Select From Computer</span>
                                <input onChange={handleFile} type='file' className="hidden" />
                            </label>
                        </div>
                    ) : (
                        <div className="w-full h-full">
                            <Cropper
                                image={selectedFile}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspect}
                                onCropChange={onCropChange}
                                onZoomChange={onZoomChange}
                                onCropComplete={onCropComplete}
                                classes={{
                                    containerClassName: 'relative h-full',
                                    mediaClassName: '',
                                    cropAreaClassName: 'border-2 border-blue-500',
                                }}
                            />
                        </div>
                    )) : (
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className='w-full h-full' src={cropedImage} alt="" />
                        </div>
                    )
                    }
                    {cropedImage ? (<motion.div initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        exit={{ x: '-100%' }}
                        className="w-2/4 bg-grey-600 h-full p-5">
                        <h3>About The Post</h3>
                        <textArea value={text} onChange={handleTextChange} placeholder="Write A Caption" className="resize-none pt-2 h-40 bg-transparent w-full outline-none" ></textArea>
                        <p className='text-gray-500 flex justify-end'>
                            <span>{text.length}</span>/{maxLength}
                        </p>
                        <hr />
                    </motion.div>) : (<></>)}
                    <div className='z-50 absolute bg-white rounded-full px-5 py-2 flex gap-3 bottom-20'>
                        <svg onClick={()=>{onAspectChange(aspectRatios[0].value)}} className="h-5 w-5 text-black cursor-pointer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="4" width="16" height="16" rx="2" /></svg>

                        <svg onClick={()=>{onAspectChange(aspectRatios[1].value)}} className="h-5 w-5 text-black cursor-pointer" id="eAZoFVBeTvf1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" shapeRendering="geometricPrecision" textRendering="geometricPrecision" width="300" height="300" style={{backgroundColor: "transparent"}}><rect width="206.213176" height="99.089448" rx="11" ry="11" transform="matrix(1.124674 0 0 1.265409 34.038701 87.30566)" fill="#fff" stroke="#000" strokeWidth="20" /></svg>

                        <svg onClick={()=>{onAspectChange(aspectRatios[2].value)}} className="h-5 w-5 text-black cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />  <line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                    </div>
                    {/* <select className='z-50 absolute flex bottom-20' onChange={onAspectChange}>

                        {aspectRatios.map((ratio) => (
                            <option
                                key={ratio.text}
                                value={ratio.value}
                                selected={ratio.value === aspect.value}
                            >
                                {ratio.text}
                            </option>
                        ))}
                    </select> */}
                </div>
            </div>
            )}
        </div>
    );
}

export default CreatePost;
