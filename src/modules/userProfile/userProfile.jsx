import useAxios from "../../hooks/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for routing
import { useSelector } from "react-redux/es/hooks/useSelector";
import { updateUserData } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PostComments from "../../components/Models/postCommentModel";

const UserProfile = () => {
    const { userId } = useParams(); // Get the userId from the URL
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    const [isUserFollowed, setIsUserFollowed] = useState([]);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.user);
    const axiosInstance = useAxios();
    const [postId, setPostId] = useState()

    const userPosts = () => {
        axiosInstance
        .get(`/postofuser/${userId}`) // Use userId in the API endpoint
        .then((response) => {
            console.log(response);
            setPosts(response.data.posts);
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
        });
    } 

    useEffect(() => {
        console.log(userId)
        userPosts()
    }, []);

    useEffect(() => {
        console.log(isUserFollowed)
        axiosInstance
            .get(`/user/singleUser/${userId}`) // Use userId in the API endpoint
            .then((response) => {
                console.log(response);
                setUser(response.data.user);
                checkFollow()
            })
            .catch((error) => {
                console.error("Error fetching posts:", error.responce);
            });
    }, [userData])



    const checkFollow = () => {
        const isUserFollowed = userData?.following.find(user => user.user_id === userId);
        setIsUserFollowed(!!isUserFollowed);
    };

    const followUnfollow = () => {
        // Create a promise for the axios call
        const promise = new Promise((resolve, reject) => {
            axiosInstance
                .get(`/user/toggleFollowUser/${userId}`)
                .then((res) => {
                    dispatch(updateUserData(res.data.user));
                    // Resolve the promise with the success message
                    resolve(res.data.message);
                    // After a successful operation, you can check follow status
                    checkFollow();
                })
                .catch((error) => {
                    console.log(error);
                    // Reject the promise with the error message
                    reject("An error occurred.");
                });
        });

        // Use toast.promise to display the notification
        toast.promise(promise, {
            pending: "Updating...",
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
    };

    const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false)

    const handleCommentSectionTrue = (postId) => {
        setPostId(postId);
        console.log(postId, "postId")
        setIsCommentSectionOpen(true)
    }
    const handleCommentSectionFalse = () => {
        setIsCommentSectionOpen(false)
    }



    return (
        <div className="bg-background text-content w-full flex flex-col p-10">
            {/* <h1 className="text-3xl mb-5">User Data</h1> */}
            <div id="first" className='flex gap-5 justify-between px-40 items-center my-12'>
                <div className="flex gap-5 justify-center items-center">
                    <div className='w-36 my-2'>
                        <div className='element-with-gradient w-full p-[4px] rounded-full relative'>
                            <img className='w-full rounded-full border-4 border-white' src={user.imageUrl || "https://res.cloudinary.com/dwlmgckgg/image/upload/v1696854667/yf9gdc96fse0msfsbs2e.jpg"} alt="" />
                        </div>
                    </div>
                    <div>
                        <h3 className='font-bold text-2xl my-1'>{user.fullName}</h3>
                        <h5 className='text-lg'>@ {user.userName}</h5>
                    </div>
                </div>
                <div>
                    <div id="stats" className='flex gap-14 justify-center'>
                        <div className='flex flex-col  items-center justify-center'>
                            <h2 className='font-bold text-4xl'>{user.posts ? user.posts.length : 0}</h2>
                            <h6 className="text-xl">Posts</h6>
                        </div>
                        <div style={{ border: "1px solid black" }} className=''></div>
                        <div className='flex flex-col  items-center justify-center'>
                            <h2 className='font-bold text-4xl'>{user.followers ? user.followers.length : 0}</h2>
                            <h6 className="text-xl">Followers</h6>
                        </div>
                        <div style={{ border: "1px solid black" }} className=''></div>
                        <div className='flex flex-col  items-center justify-center'>
                            <h2 className='font-bold text-4xl'>{user.following ? user.following.length : 0}</h2>
                            <h6 className="text-xl">Following</h6>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Conditionally render "Follow" or "Following" button */}
                    {isUserFollowed ? (
                        <div onClick={followUnfollow} className="cursor-pointer bg-primary text-white py-3 font-semibold px-8 rounded-xl">
                            Following
                        </div>
                    ) : (
                        <div onClick={followUnfollow} className="cursor-pointer bg-primary text-white py-3 font-semibold px-8 rounded-xl">
                            Follow
                        </div>
                    )}
                </div>
            </div>


            <h1 className="text-3xl mb-5">Posts</h1>
            {posts.length != 0 ? (<div
                className="grid grid-cols-4 gap-5"
            >
                {posts.map((post) => (
                    <div
                        onClick={() => {
                            console.log(post._id, "posting post id")
                            handleCommentSectionTrue(post._id)
                        }}
                        key={post.id}
                        className="aspect-w-1 aspect-h-1 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                    >
                        <img
                            src={post.Image_Video_url}
                            alt="IMG"
                            className="object-cover w-full h-full rounded-md"
                        />
                    </div>
                ))}
            </div>) : (<div className="w-full h-full flex flex-col justify-center items-center">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png" alt="" />
                <span className="text-center text-xl">No Post Found</span>
            </div>)}
            {isCommentSectionOpen ? <PostComments closeModel={handleCommentSectionFalse} postId={postId} updatePosts={userPosts} /> : ""}
        </div>
    );
};

export default UserProfile;
