import React, { useState } from 'react';
import CreatePost from '../Models/createPostModel';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash'; // Import debounce from lodash
import useAxios from '../../hooks/axios';
import loader from "../../images/loader.gif"

const Header = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchedUsers, setSearchedUsers] = useState('');
    const [searchedUsersError, setSearchedUsersError] = useState('');
    const axiosInstance = useAxios()
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggleDarkMode = () => {
        const root = document.querySelector("html")
        setIsDarkMode(!isDarkMode);
        if (isDarkMode == true) {
            root.setAttribute("data-theme", "dark")
        }
        else {
            root.setAttribute("data-theme", "light")
        }
    };

    const [CreatePostModel, setCreatePostModel] = useState(false);
    const handleCreatePostModelTrue = () => {
        setCreatePostModel(true);
    };

    const handleCreatePostModelFalse = () => {
        setCreatePostModel(false);
    };

    const [NotificationModel, setNotificationModel] = useState(false);
    const handleNotificationModelTrue = () => {
        setNotificationModel(!NotificationModel);
    };

    const handleNotificationModelFalse = () => {
        setNotificationModel(false);
    };
    const [MessageModel, setMessageModel] = useState(false);
    const handleMessageModelTrue = () => {
        setMessageModel(!MessageModel);
    };

    const handleMessageModelFalse = () => {
        setMessageModel(false);
    };

    // Create a debounced function for handling search
    const debouncedSearch = debounce((text) => {
        setSearchedUsersError("")
        setSearchedUsers('')
        axiosInstance.post("/user/search", { userName: text }).then((res) => {
            console.log(res);
            setSearchedUsers(res.data.users)
        }).catch((err) => {
            console.log(err.response.data.message)
            setSearchedUsersError(err.response.data.message)
        })
        console.log(`Searching for: ${text}`);
    }, 2000); // Adjust the debounce delay as needed (e.g., 500ms)

    const handleSearchInputChange = (event) => {
        const newText = event.target.value;
        setSearchText(newText);

        // Call the debounced search function with the updated text
        debouncedSearch(newText);
    };
    return (
        <div>
            <div onClick={() => {
                if (NotificationModel === true) {
                    handleNotificationModelFalse()
                    handleMessageModelFalse()
                }
            }} className="w-full flex justify-between items-center p-5">
                <div className=' flex flex-col md:w-96 w-64 relative'>
                    <div className="flex p-2 bg-secondary text-content rounded-full w-full h-full ">
                        <svg className="h-6 w-6 text-content" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="10" cy="10" r="7" />  <line x1="21" y1="21" x2="15" y2="15" /></svg>
                        <input value={searchText} onChange={handleSearchInputChange} className='placeholder:text-content w-full bg-transparent outline-none px-3' placeholder='Search' type="text" />
                    </div>
                    {searchText ? (
                        <div className='bg-backgroundSecondary max-h-96 overflow-y-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl z-50  top-14 w-full flex flex-col p-3 gap-3 absolute'>
                            {searchedUsersError ? (<>{searchedUsersError}</>) : (
                                <>
                                    {searchedUsers ? (<>
                                        {searchedUsers.map((user) => {
                                            return (
                                                <div key={user._id} onClick={() => {
                                                    setSearchText("")
                                                    navigate(`/profile/${user._id}`)
                                                    searchedUsers("")
                                                }} className='cursor-pointer flex gap-5 items-center'>
                                                    <img className='w-12 rounded-full' src={user.imageUrl || "https://res.cloudinary.com/dwlmgckgg/image/upload/v1696854667/yf9gdc96fse0msfsbs2e.jpg"} alt="" />
                                                    <div>
                                                        <div className="text-lg font-medium">{user ? user.fullName : "Unknown"}</div>
                                                        <div className="text-sm ">@{user ? user.userName : "unknown"}</div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>) : (<div className='flex justify-center'>
                                        <img className='w-10' src={loader} alt="" />
                                    </div>)}
                                </>
                            )}
                        </div>
                    ) : null}
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='relative cursor-pointer'>
                        <svg onClick={() => {
                            handleNotificationModelTrue()
                            handleMessageModelFalse()
                        }} className="h-8 w-8 text-content" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />  <path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                        {NotificationModel ? (
                            <div className='bg-backgroundSecondary  max-h-96 overflow-y-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl z-50  top-14 w-72 flex flex-col p-3 gap-3 absolute'>
                                <div className='cursor-pointer flex gap-5 items-center'>
                                    <img className='w-12 rounded-full' src={"https://res.cloudinary.com/dwlmgckgg/image/upload/v1696854667/yf9gdc96fse0msfsbs2e.jpg"} alt="" />
                                    <div>
                                        <div className="text-lg font-medium">Notification</div>
                                        <div className="text-sm ">Notification</div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <svg onClick={handleToggleDarkMode} className="cursor-pointer h-8 w-8 text-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>

                    <div className='relative cursor-pointer'>
                        <svg onClick={() => {
                            handleMessageModelTrue()
                            handleNotificationModelFalse()
                        }} className="h-8 w-8 text-content" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        {MessageModel ? (
                            <div className='bg-backgroundSecondary  max-h-96 overflow-y-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl z-50  top-14 right-0 w-72 flex flex-col p-3 gap-3 absolute'>
                                <div className='cursor-pointer flex gap-5 items-center'>
                                    No Message Found
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div onClick={handleCreatePostModelTrue} className='md:flex hidden element-with-gradient-to-right cursor-pointer text-content flex justify-center items-center rounded-full px-5'>
                        <svg className="text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
                        <span className='p-2 text-white'>Create New Post</span>
                    </div>
                </div>
            </div>
            {CreatePostModel ? <CreatePost closeModel={handleCreatePostModelFalse} /> : ""}
        </div>
    )
}

export default Header
