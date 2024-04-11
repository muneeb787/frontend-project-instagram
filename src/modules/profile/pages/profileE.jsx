import PostComments from "../../../components/Models/postCommentModel";
import useAxios from "../../../hooks/axios";
import { useEffect, useState } from "react";
const ProfileE = () => {

    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState()
    const axiosInstance = useAxios();

    const postofUsers = () => {
        console.log("user useruser post")
        axiosInstance
            .get("/user/getPostsOfUser")
            .then((response) => {
                console.log(response);
                setPosts(response.data.posts);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }
    useEffect(() => {
        postofUsers()
    }, []);

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
            {/* <Tabs /> */}
            <h1 className='text-3xl mb-5'>My Posts</h1>

            {posts.length != 0 ? (<div
                className="grid grid-cols-4 gap-5"
            >
                {posts.map((post) => (
                    <div  onClick={() => {
                        console.log(post._id, "posting post id")
                        handleCommentSectionTrue(post._id)
                      }} key={post.id} className="aspect-w-1 aspect-h-1 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">

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
            {isCommentSectionOpen ? <PostComments closeModel={handleCommentSectionFalse} postId={postId} updatePosts={postofUsers} /> : ""}
        </div>
    )
}

export default ProfileE
