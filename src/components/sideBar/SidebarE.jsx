import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./search.css";
import "./sidebarE.css";
import { logout } from '../../redux/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import EditProfile from '../Models/editProfileModel';
const SidebarE = () => {
    const location = useLocation();
    const dispatch = useDispatch();


    const userProfile = useSelector((state) => state.user);

    useEffect(() => {
        console.log(userProfile, "userProfile")
    }, [userProfile])


    const numberOfFollowers = userProfile.user.followers ? userProfile.user.followers.length : 0;
    const numberOfFollowing = userProfile.user.following ? userProfile.user.following.length : 0;
    const numberOfPosts = userProfile.user.posts ? userProfile.user.posts.length : 0;

    const [EditProfileModel, setEditProfileModel] = useState(false)

    const handleEditProfileModelTrue = () => {
        setEditProfileModel(true)
    }
    const handleEditProfileModelFalse = () => {
        setEditProfileModel(false)
    }

    return (
        <>
            <div className='bg-backgroundSecondary  rounded-e-2xl flex w-[400px] md:block hidden'>
                <aside
                    id="logo-sidebar"
                    className="w-[100%] text-content top-0 left-0 z-40 h-screen"
                    aria-label="Sidebar"
                >
                    <div className=''>
                        <div id="first" className='flex flex-col justify-center items-center my-12'>
                            <div className='w-3/6 my-2'>
                                <div className='element-with-gradient w-full p-1 rounded-full relative'>
                                    <img className='w-full rounded-full border-4 border-white' src={userProfile.user.imageUrl} alt="" />
                                    <div onClick={handleEditProfileModelTrue} className='absolute bottom-1 border-4 cursor-pointer border-white right-5 element-with-gradient w-10 h-10 flex justify-center items-center rounded-full'><svg className="text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg></div>
                                </div>
                            </div>
                            <h3 className='font-bold text-lg'>{userProfile.user.fullName}</h3>
                            <h5 className='text-sm'>@ {userProfile.user.userName}</h5>
                        </div>
                        <div id="stats" className='flex gap-5 justify-center'>
                            <div className='flex flex-col items-center justify-center'>
                                <h2 className='font-bold text-lg'>{numberOfPosts}</h2>
                                <h6>Posts</h6>
                            </div>
                            <div style={{ border: "1px solid black" }} className=''></div>
                            <div className='flex flex-col items-center justify-center'>
                                <h2 className='font-bold text-lg'>{numberOfFollowers}</h2>
                                <h6>Followers</h6>
                            </div>
                            <div style={{ border: "1px solid black" }} className=''></div>
                            <div className='flex flex-col items-center justify-center'>
                                <h2 className='font-bold text-lg'>{numberOfFollowing}</h2>
                                <h6>Follwing</h6>
                            </div>
                        </div>
                    </div>
                    <div id="nav" className='my-10'>
                        <div className='relative h-[60px]'>
                            <NavLink to={"/"} activeClassName="navActive" className={`flex h-full nav-link ${location.pathname === '/' ? 'navActive' : ''}`} >
                                <div className="flex w-full items-center pl-10">
                                    <svg aria-label="Home" className="_ab6- text-content" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="30" role="img" viewBox="0 0 24 24" width="30"
                                    >
                                        <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"
                                        ></path>
                                    </svg>
                                    <span className='text-lg pl-5'>Feed</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className='relative h-[60px]'>
                            <NavLink to={"/explore"} activeClassName="navActive" className={`flex h-full nav-link ${location.pathname === '/explore' ? 'navActive' : ''}`} >
                                <div className="flex w-full items-center pl-10">
                                    <svg aria-label="Explore" className="_ab6- text-content" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="30" role="img" viewBox="0 0 24 24" width="30"
                                    >
                                        <polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                                        <polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
                                        <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                                    </svg>
                                    <span className='text-lg pl-5'>Explore</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className='relative  h-[60px]'>
                            <NavLink to={"/activity"} activeClassName="navActive" className={`flex h-full nav-link ${location.pathname === '/activity' ? 'navActive' : ''}`}>
                                <div className="flex w-full items-center pl-10">
                                    <svg className="h-8 w-8 text-content" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="10" y1="14" x2="21" y2="3" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
                                    <span className='text-lg pl-5'>Activity</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className='relative h-[60px]'>
                            <NavLink to={"/profilePage"} activeClassName="navActive" className={`flex h-full nav-link ${location.pathname === '/profilePage' ? 'navActive' : ''}`} >
                                <div className="flex w-full items-center pl-10">
                                    <svg className="h-8 w-8 text-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    <span className='text-lg pl-5'>Profile</span>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div>
                        <div className='relative h-[60px]'>
                            <NavLink onClick={() => {
                                dispatch(logout())
                            }} to={"/login"} activeClassName="navActive" className={`flex h-full nav-link`} >
                                <div className="flex w-full items-center pl-10">
                                    <svg className="h-8 w-8 text-content" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                                    <span className='text-lg pl-5'>LogOut</span>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </aside>
                {EditProfileModel ? <EditProfile closeModel={handleEditProfileModelFalse} /> : ""}
            </div>
            <div className='md:hidden block '>
                <div className="z-50 fixed h-14 bg-white border-t-4 border-red-600 w-[100%] bottom-0">
                    <div className="flex h-full justify-around items-center">
                        <div className='relative w-10 h-full'>
                            <NavLink to={"/"} activeClassName="navActive" className={`flex h-full nav-link ${location.pathname === '/' ? 'navActiveMob' : ''}`} >
                                <div className="flex w-full items-center justify-center">
                                    <svg aria-label="Home" className="_ab6- text-content" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="30" role="img" viewBox="0 0 24 24" width="30"
                                    >
                                        <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"
                                        ></path>
                                    </svg>
                                </div>
                            </NavLink>
                        </div>
                        <div className='relative w-10 h-full'>
                            <NavLink to={"/explore"} activeClassName="navActive" className={`flex h-full nav-link ${location.pathname === '/explore' ? 'navActiveMob' : ''}`} >
                                <div className="flex w-full items-center justify-center">
                                    <svg aria-label="Explore" className="_ab6- text-content" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="30" role="img" viewBox="0 0 24 24" width="30"
                                    >
                                        <polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                                        <polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
                                        <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                                    </svg>
                                </div>
                            </NavLink>
                        </div>
                        <div className='relative w- h-full'>
                            <NavLink to={"/activity"} activeClassName="navActive" className={`flex h-full nav-link ${location.pathname === '/activity' ? 'navActiveMob' : ''}`}>
                                <div className="flex w-full items-center justify-center">
                                    <svg aria-label="Home" className="_ab6- text-content" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="30" role="img" viewBox="0 0 24 24" width="30"
                                    >
                                        <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"
                                        ></path>
                                    </svg>
                                </div>
                            </NavLink>
                        </div>
                        <div className='relative w-10 h-full'>
                            <NavLink to={"/profilePage"} activeClassName="navActive" className={`flex h-full nav-link ${location.pathname === '/profilePage' ? 'navActiveMob' : ''}`} >
                                <div className="flex w-full items-center justify-center">
                                    <svg aria-label="Home" className="_ab6- text-content" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="30" role="img" viewBox="0 0 24 24" width="30"
                                    >
                                        <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"
                                        ></path>
                                    </svg>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SidebarE;
