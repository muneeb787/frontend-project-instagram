
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import 'tailwindcss/tailwind.css';
import "./scroll.css"
import useAxios from "../../hooks/axios";
import loader from "../../images/loader.gif"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { updateUserData } from "../../redux/authSlice";
import { toast } from "react-toastify";

const PostComments = ({ closeModel, postId, updatePosts = () => { } }) => {
    const axiosInstance = useAxios();
    const navigate = useNavigate()
    const [post, setPost] = useState()
    const [loading, setLoading] = useState(false)
    const [sendLoading, setSendLoading] = useState(false)
    const [comments, setComments] = useState("")
    const [comment, setComment] = useState("")
    const [parentId, setParentId] = useState("")
    const [depth, setDepth] = useState("")
    const [repltTo, setRepltTo] = useState("")
    const userData = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    const getPostData = () => {
        setLoading(true)
        axiosInstance.get(`/post/${postId}`).then((post) => {
            console.log(post.data.post)
            setPost(post.data.post)
            setLoading(false)
        }).catch((error) => { console.log(error) })
    }

    const [isContentExpanded, setContentExpanded] = useState(false);

    const toggleContentExpansion = () => {
        setContentExpanded(!isContentExpanded);
    };

    const getComments = () => {
        // setLoading(true)
        axiosInstance.get(`/Comment/${postId}`).then((comments) => {
            console.log(comments)
            setComments(comments.data.comments)
            // setLoading(false)
        }).catch((error) => { console.log(error) })
    }

    useEffect(() => {
        getPostData()
        getComments()
    }, [])

    const configReply = (parentId, RepltTo) => {
        setParentId(parentId);
        setDepth(2);
        setRepltTo(RepltTo)
        document.querySelector("#AddComment").focus();
    }

    const addComment = (postId) => {
        setSendLoading(true)
        const data = {};
        data.postId = postId;
        data.commentText = comment;
        if (parentId != "" && depth != "") {
            data.parentId = parentId;
            data.depth = depth;
        }
        axiosInstance.post("/newPostComment", data).then((res) => {
            console.log(res)
            setSendLoading(false)
            getComments()
            setComment("")
        }).catch((err) => { console.log(err) })
    }

    const deletePost = (postId) => {
        setLoading(true)
        axiosInstance.delete(`/post/${postId}`).then((res) => {
            console.log(res.data)
            closeModel()
            setLoading(false)
            updatePosts()
            dispatch(updateUserData(res.data.user))
            toast.success("Post Deleted")

        }).catch((error) => { console.log(error) })
    }
    const deleteComment = (commentId) => {
        setSendLoading(true)
        axiosInstance.delete(`/Comment/${commentId}`).then((res) => {
            console.log(res.data)
            setSendLoading(false)
            getComments()

        }).catch((error) => { console.log(error) })
    }

    const displayComments = (allComments) => {
        let comments = []
        for (let comment of Object.values(allComments)) {
            comments.push(
                <div key={comment._id} className={`flex gap-3 my-3 ${comment.depth == 2 ? "ml-10" : null}`}>
                    <div className='w-[10%]'>
                        <img className='w-full rounded-full' src={comment?.user_id.imageUrl || "https://res.cloudinary.com/dwlmgckgg/image/upload/v1696854667/yf9gdc96fse0msfsbs2e.jpg"} alt="" />
                    </div>
                    <div className="w-[90%]">
                        <div className="flex justify-between items-center">
                            <div onClick={() => { navigate(`/profile/${comment.user_id._id}`) }} className="text-sm font-medium cursor-pointer">{comment.user_id.userName}</div>
                            {
                                userData._id == comment?.user_id._id ? (<div onClick={() => { deleteComment(comment._id) }} className="cursor-pointer text-sm font-bold text-primary cursor-pointer">
                                    <svg className="h-4 w-4 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </div>) : null
                            }
                        </div>
                        <span className="text-sm">
                            {comment.commentText}
                        </span>
                        {comment.depth == 1 ? (<><h6 onClick={() => {
                            configReply(comment._id, comment.user_id.userName)
                        }} style={{ fontSize: "13px" }} className="cursor-pointer text-primary">Reply</h6></>) : null}
                    </div>
                </div>
            )
            if (comment.children && Object.keys(comment.children).length > 0) {
                let replies = displayComments(comment.children)
                comments = comments.concat(replies)
            }
        }
        return comments
    }

    let commentsList = displayComments(comments);

    return (
        <>
            <div style={{ backgroundColor: "#0000009e", top: "0%", left: "0%" }} className='z-40 fixed flex justify-center items-center w-full h-full overflow-hidden'>
                <div onClick={closeModel} className='z-50 absolute top-5 right-10 cursor-pointer'>
                    <svg className="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
                {loading ? (<><img src={loader} alt="" /></>) : (
                    <div className="bg-backgroundSecondary rounded-2xl text-content flex w-8/12 h-5/6 justify-center">
                        <div className="w-[60%] h-full">
                            <img className="h-full w-full rounded-2xl object-cover" src={post ? post.Image_Video_url : null} alt="" />
                        </div>
                        <div className="w-[40%] flex flex-col h-full">
                            <div className='flex flex-wrap justify-between items-center m-3'>
                                <div onClick={() => { navigate(`/profile/${post?.user_id._id}`) }} className='cursor-pointer flex gap-5 items-center'>
                                    <img className='w-12 rounded-full' src={post?.user_id.imageUrl || "https://res.cloudinary.com/dwlmgckgg/image/upload/v1696854667/yf9gdc96fse0msfsbs2e.jpg"} alt="" />
                                    <div>
                                        <div className="text-lg font-medium">{post ? post.user_id.fullName : null}</div>
                                        <div className="text-sm text-secondary">@{post ? post.user_id.userName : null}</div>
                                    </div>
                                </div>
                                {
                                    userData._id == post?.user_id._id ? (<div onClick={() => { deletePost(post._id) }} className="cursor-pointer text-sm font-bold text-primary cursor-pointer">
                                        <svg className="h-6 w-6 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </div>) : null
                                }
                            </div>
                            <div className="w-full overflow-auto text-justify px-3 my-5">
                                {post?.PostContent ? (<p>
                                    {isContentExpanded
                                        ? post?.PostContent // Show full content when expanded
                                        : post?.PostContent?.split(" ").slice(0, 20).join(" ") // Show first 100 words when truncated
                                    }
                                    {post.PostContent.split(" ").length > 20 && (
                                        <span className="text-justify cursor-pointer text-primary p-2" onClick={toggleContentExpansion}>
                                            {isContentExpanded ? "See Less" : "See More"}
                                        </span>
                                    )}
                                </p>) : null}
                            </div>
                            <hr />
                            <h6 className="font-semibold pl-3 my-2">Comments & Replies</h6>
                            <div className="p-5 flex align-bottom overflow-hidden h-full flex-col justify-between">
                                <div className="overflow-y-auto">
                                    {/* {comments &&    
                                    Object.keys(comments).map((commentId) => {
                                        const comment = comments[commentId];
                                        return (
                                            <div key={comment._id} className="flex gap-3 my-5">
                                                <div className='w-[10%]'>
                                                    <img className='w-full rounded-full' src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="" />
                                                </div>
                                                <div className="">
                                                    <div className="text-sm font-medium">{comment.user_id.UserName}</div>
                                                    <span className="text-sm">
                                                        {comment.commentText}
                                                    </span>
                                                    {comment.depth == 1 ? (<><h6 onClick={() => {
                                                        configReply(comment._id, comment.user_id.UserName)
                                                    }} style={{ fontSize: "13px" }} className="cursor-pointer text-primary">Reply</h6></>) : null}
                                                </div>
                                            </div>
                                        );
                                    })} */}
                                    {commentsList}
                                </div>
                                <div id="addComment" className="border-t-2 border-secondary p-3">
                                    {repltTo != "" ? <div className="flex justify-between items-center"><span className="text-sm text-secondary py-4">Reply To {repltTo}</span><span><svg onClick={() => {
                                        setRepltTo("")
                                        setParentId("")
                                        setDepth("")
                                    }} className="h-4 w-4 text-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    </span></div> : null}
                                    <div className="flex items-center">
                                        <input id="AddComment" className="text-content text-sm outline-none w-full bg-transparent"
                                            value={comment}
                                            name="comment"
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Add New Comment" type="text" />
                                        <span className="cursor-pointer" onClick={() => { addComment(post._id) }}>{sendLoading ? (<><img className="w-10" src={loader} alt="" /></>) : (<>Send</>)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PostComments;
