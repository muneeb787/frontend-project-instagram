/* eslint-disable react/prop-types */
import { useState , useEffect } from 'react';
import { motion } from "framer-motion"
import Cropper from 'react-easy-crop';
import getCroppedImg from "../../utils/cropImage.jsx";
import 'tailwindcss/tailwind.css';
import useAxios from '../../hooks/axios.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../redux/authSlice.js';
import { Field, FormikProvider, useFormik, getIn } from 'formik';
import * as Yup from "yup"
import { toast } from 'react-toastify';

const EditProfile = ({ closeModel }) => {
    const dispatch = useDispatch();
    const axiosInstance = useAxios();
    const [selectedFile, setSelectedFile] = useState(null);
    const [cropedImage, setCropedImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [loading, setLoading] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const userProfile = useSelector((state) => state.user.user);

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

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(selectedFile, croppedAreaPixels);
        setCropedImage(croppedImageUrl)
    };

    const [EditProfileSubModel, setEditProfileSubModel] = useState(false)

    const handleEditProfileSubModelTrue = () => {
        setEditProfileSubModel(true)
    }
    const handleEditProfileSubModelFalse = () => {
        setEditProfileSubModel(false)
    }

    const uploadImage = async () => {
        console.log('Uploading image')
        onCrop().then(() => {
            if (cropedImage) {
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
                                    const posting = await axiosInstance.post("/user/profilePicture", { imageUrl: data.secure_url })
                                    console.log(posting, "posting")
                                    dispatch(updateUserData(posting.data.user));
                                    closeModel()
                                } catch (error) {
                                    console.log(error, "Errorrrring")
                                }
                            }).catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        console.error("Error fetching blob URL:", err);
                    });
            }else{
                console.log("Image not Found")
            }

        });

    }


    const schema = Yup.object().shape({

        fullName: Yup.string().required("Full Name is Required").min(3).max(20),
        gender: Yup.string().required("Gender is Required").min(4).max(10),
        bio: Yup.string().min(3).max(200),
        // DOB: Yup.date().required("Date of Birth is required"),
    });
    useEffect(() => {
      formik.setFieldValue("fullName",userProfile.fullName)
      formik.setFieldValue("gender",userProfile.gender)
      formik.setFieldValue("bio",userProfile.bio)
    }, [])
    
    const formik = useFormik({
        initialValues: {
            Full_Name: userProfile ? userProfile.fullName : '',
            gender: userProfile ? userProfile.gender : '',
            bio: userProfile ? userProfile.bio : '',
            // DOB: userProfile ? userProfile.DOB : '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log(values, 'values');
            axiosInstance
                .put(`/userupdate`, values)
                .then((response) => {
                    console.log('Form submitted successfully:', response.data.user);
                    toast.success('User updated successfully');
                    dispatch(updateUserData(response.data.user));
                    closeModel()
                    //   navigate(`/`);
                })
                .catch((error) => {
                    console.error('Error submitting form:', error.response);
                });
        },
    });
    return (
        <div style={{ backgroundColor: "#0000009e" }} className='z-50 absolute top-0 left-0 w-screen h-screen flex justify-center items-center'>
            <div onClick={closeModel} className='z-50 absolute top-5 right-5 cursor-pointer'>
                <svg className="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
            </div>
            <div className={`bg-backgroundSecondary text-center align-middle w-96 text-content p-2 rounded-lg overflow-hidden`}>
                <h1 className='font-bold py-3'>Edit Profile</h1>
                <hr />
                {EditProfileSubModel ? (<>
                    <div className='p-3'>
                        <FormikProvider value={formik}>
                            <form>
                                <div className='w-full flex flex-col justify-between items-center gap-2 py-10' >
                                    <div className='flex flex-col justify-between items-start w-full'>
                                        <label >
                                            Full Name
                                        </label>
                                        <Field
                                            name="fullName"
                                            className="py-1 px-3 outline-none rounded-lg w-full"
                                        />
                                        {formik.touched.Full_Name && formik.errors.Full_Name && (
                                            <h3 style={{ color: "red" }}>{formik.errors.Full_Name}</h3>
                                        )}
                                    </div>
                                    <div className='flex flex-col justify-between items-start w-full' >
                                        <label >
                                            Gender
                                        </label>
                                        <Field
                                            as="select"
                                            name="gender"
                                            className="py-1 px-3 outline-none rounded-lg w-full"
                                        >
                                            <option value="0">Select</option>
                                            <option value="male">Male</option>
                                            <option value="feMale">FeMale</option>
                                        </Field>
                                        {formik.touched.gender && formik.errors.gender && (
                                            <h3 style={{ color: "red" }}>{formik.errors.gender}</h3>
                                        )}
                                    </div>

                                    <div className='flex flex-col justify-between items-start w-full' >
                                        <label >
                                            Bio
                                        </label>
                                        <Field
                                            name="bio"
                                            className="py-1 px-3 outline-none rounded-lg w-full"
                                        />
                                        {formik.touched.bio && formik.errors.bio && (
                                            <h3 style={{ color: "red" }}>{formik.errors.bio}</h3>
                                        )}
                                    </div>

                                    {/* <div className='flex flex-col justify-between items-start w-full'>
                                        <label >
                                            DOB
                                        </label>
                                        <Field
                                            name="DOB"
                                            className="py-1 px-3 outline-none rounded-lg w-full"
                                        />
                                        {formik.touched.DOB && formik.errors.DOB && (
                                            <h3 style={{color: "red"}}>{formik.errors.DOB}</h3>
                                        )}
                                    </div> */}

                                    <button
                                        type="button"
                                        onClick={formik.handleSubmit}
                                        className='bg-primary py-1 px-3 rounded-lg mt-5 w-full'
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>

                        </FormikProvider>
                    </div>
                </>) : (<div>
                    {!selectedFile ? <div className='my-3'>
                        <div className='text-lg py-3 w-full rounded-lg cursor-pointer hover:bg-secondary transition-all'>
                            <label className='cursor-pointer'>
                                <span className="text-lg w-full leading-normal">Change Profile Image</span>
                                <input onChange={handleFile} type='file' className="hidden" />
                            </label>
                        </div>
                        <h2 onClick={handleEditProfileSubModelTrue} className='text-lg py-3 rounded-lg cursor-pointer hover:bg-secondary transition-all'>Edit Profile</h2>
                        <h2 onClick={closeModel} className='text-lg py-3 rounded-lg cursor-pointer hover:bg-secondary transition-all'>Go Back</h2>
                    </div> : (
                        <div style={{ maxWidth: "50%", maxHeight: "50%" }} className=''>
                            <div className="w-full h-full">
                                <Cropper
                                    image={selectedFile}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
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
                        </div>
                    )}
                </div>)}
                {selectedFile ? <div onClick={uploadImage} className='z-50 left-5 top-5 cursor-pointer bg-primary absolute px-5 py-1 rounded-full'>Share</div> : null}
            </div>
        </div>
    );
}

export default EditProfile;
