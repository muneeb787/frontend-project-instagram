import { useRef } from 'react';
import useAxios from '../../../../hooks/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import DisplayStory from '../../../../components/Models/displayStory';


const StoryE = () => {
    const axiosInstance = useAxios()
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.user);
    const [selectedFile, setSelectedFile] = useState(null);
    const [storiesUsers, setStoriesUsers] = useState();
    const [userId, setuserId] = useState();

    const getStories = () => {
        axiosInstance.get("/user/getStoriesOfFollowed")
            .then((res) => {
                console.log(res.data.followedUserIds)
                setStoriesUsers(res.data.followedUserIds)
            })
            .catch((err) => { console.log(err.response) })
    }

    useEffect(() => {
        getStories()
    }, [])

    // Create a ref for the scrollable container
    const scrollableContainerRef = useRef(null);

    // Calculate the scroll amount (10% of container's width)
    const scrollAmount = (scrollableContainerRef.current?.offsetWidth || 0) * 0.3;

    // Function to scroll left
    const scrollLeft = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollLeft -= scrollAmount;
        }
    };

    // Function to scroll right
    const scrollRight = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollLeft += scrollAmount;
        }
    };

    const handleFileChange = (event) => {
        console.log(event.target.files)
        const file = event.target.files[0];
        setSelectedFile(file);
        handleUpload()
    };

    const handleUpload = async () => {
        console.log(`Uploading ${selectedFile}`)
        if (selectedFile) {
            const data = new FormData();
            data.append("file", selectedFile, selectedFile.name); // Append the Blob to the FormData
            data.append("upload_preset", "u03qtmrk");
            data.append("cloud_name", "dwlmgckgg");

            console.log(data, "final Data");
            const promise = new Promise((resolve, reject) => {
                fetch("https://api.cloudinary.com/v1_1/dwlmgckgg/image/upload", {
                    method: "post",
                    body: data
                })
                    .then((res) => res.json())
                    .then(async (data) => {
                        console.log(data)
                        axiosInstance.post("/user/addStoryToUser", { url: data.secure_url }).then((res) => {
                            console.log(res, "posting")
                            // toast.success("Successfully Story Posted")
                            resolve("Successfully Story Posted");
                            setSelectedFile("")
                        }).catch((error) => {
                            console.log(error.respoonce)
                            reject("Story Posting error")
                            setSelectedFile("")

                        })

                    }).catch((err) => {
                        console.log(err);
                        setSelectedFile("")

                    });
            })


            // Use toast.promise to display the notification
            toast.promise(promise, {
                pending: "Uploading...",
                success: {
                    render({ data }) {
                        // Render a success toast notification
                        return `${data}`;
                    },
                    onClose() {
                        // Handle the toast closing (optional)
                    },
                },
                error: {
                    render({ data }) {
                        // Render an error toast notification
                        return `${data}`;
                    },
                    onClose() {
                        // Handle the toast closing (optional)
                    },
                },
            });


        }
    };

    const [openStoryModel, setopenStoryModel] = useState(false);
    const handleopenStoryModelTrue = (userId) => {
        setuserId(userId)
        setopenStoryModel(true);
    };

    const handleopenStoryModelFalse = () => {
        setopenStoryModel(false);
    };

    return (
        <>
            <div className='w-full text-left'>
                <h1 className='text-3xl mb-2'>Stories</h1>
                <div className='flex'>
                    <button className='md:block hidden left-0 top-[40px] p-2 rounded-full' onClick={scrollLeft}>&#9664;</button>
                    <div className='scroll-smooth flex gap-5 relative w-full overflow-x-scroll no-scrollbar' ref={scrollableContainerRef}>
                        <div style={{ minWidth: "6rem", maxWidth: "6rem" }} className='min-w-24 my-2'>
                            <div className='w-full p-[3px] rounded-full relative'>
                                <img className='w-full rounded-full border-4 border-white' src={userProfile.imageUrl} alt="" />
                                <div className='cursor-pointer absolute bottom-1 border-2 border-white right-1 element-with-gradient w-7 h-7 flex justify-center items-center rounded-full'>
                                    <label className="cursor-pointer"><span className="text-lg w-full leading-normal">
                                        <svg className="text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                                    </span><input onChange={handleFileChange} type="file" className="hidden" /></label>
                                </div>
                            </div>
                        </div>
                        {storiesUsers ? (<>
                            {storiesUsers.map((user) => {
                                return (
                                    <div onClick={()=>{
                                        handleopenStoryModelTrue(user._id)
                                    }} key={user._id} style={{ minWidth: "6rem", maxWidth: "6rem" }} className='my-2'>
                                        <div className='cursor-pointer element-with-gradient w-full p-[3px] rounded-full relative'>
                                            <img className='w-full rounded-full border-4 border-white' src={user.imageUrl || "https://res.cloudinary.com/dwlmgckgg/image/upload/v1696854667/yf9gdc96fse0msfsbs2e.jpg"} alt="" />
                                        </div>
                                    </div>
                                )
                            })}
                        </>) : null}

                    </div>
                    <button className='md:block hidden right-0 top-[40px] p-2 rounded-full' onClick={scrollRight}>&#9654;</button>
                    {openStoryModel ? (<DisplayStory closeModel={handleopenStoryModelFalse} userId={userId} />) : null}
                </div>
            </div>
        </>
    )
}

export default StoryE
