import { useState } from "react"
import PropTypes from "prop-types";
import { motion } from "framer-motion"
// import { useEffect } from "react"
import useAxios from "../../../../hooks/axios";

function timeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const elapsedMilliseconds = now - date;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (elapsedDays > 1) {
    return `${elapsedDays} days ago`;
  } else if (elapsedDays === 1) {
    return `1 day ago`;
  } else if (elapsedHours > 1) {
    return `${elapsedHours} hours ago`;
  } else if (elapsedHours === 1) {
    return `1 hour ago`;
  } else if (elapsedMinutes > 1) {
    return `${elapsedMinutes} minutes ago`;
  } else if (elapsedMinutes === 1) {
    return `1 minute ago`;
  } else {
    return `just now`;
  }
}


const Post = ({ post, liked, saved, toggleLike, toggleSave, openComment }) => {
  const axiosInstance = useAxios()

  const [comment, setComment] = useState("");

  const addComment = (postId) => {
    axiosInstance.post("/newPostComment", { postId: postId, commentText: comment }).then((res) => {
      console.log(res)
      setComment("")
    }).catch((err) => { console.log(err) })
  }

  return (
    <div className="my-3">
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-center items-center gap-2">
          <a className="" href="https://www.instagram.com/jasonjgardner/">
            <img className="story w-10 h-10" src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="Jason Gardner user avatar" />
          </a>
          <div className="text-sm font-semibold">{post.user_id.UserName} &#x2022; {timeAgo(post.createdAt)} </div>
        </div>
        <div className="flex space-x-0">
          <svg className="h-6 w-6 text-content" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="5" cy="12" r="1" />  <circle cx="12" cy="12" r="1" />  <circle cx="19" cy="12" r="1" /></svg>
        </div>
      </div>
      <div className="w-full">
        <img
          className="w-full object-cover rounded-sm"
          src={post.Image_Video_url}
          alt=""
        />
      </div>
      {/* like/comment/share/save bar */}
      <div className="flex justify-between my-3">
        <div className="flex gap-3">
          <div onClick={() => { toggleLike(post._id) }} className="cursor-pointer">
            {liked ? (
              <svg className="h-6 w-6 text-content" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
              </svg>
            ) : (
              <motion.svg initial={{ scale: '0%' }}
                animate={{ scale: '100%' }}
                exit={{ scale: '120%' }} className="h-6 w-6 text-content" xmlns="http://www.w3.org/2000/svg" fill="#FF0000" viewBox="0 0 24 24"><path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" /></motion.svg>
            )}
          </div>
          <div onClick={()=>{
            console.log(post._id , "posting post id")
            openComment(post._id)}} className="cursor-pointer">
            <svg className="h-6 w-6 text-content" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>

          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-content">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </div>
        </div>
        <div className="flex">
          <div onClick={() => { toggleSave(post._id) }} className="cursor-pointer">
            {saved ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-content">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-content" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24"><path fillRule="evenodd" d="M6.69 2a1.75 1.75 0 00-1.75 1.756L5 21.253a.75.75 0 001.219.583L12 17.21l5.782 4.625A.75.75 0 0019 21.25V3.75A1.75 1.75 0 0017.25 2H6.69z" /></svg>
            )}
          </div>
        </div>
      </div>
      <p>{post.Likes.length} likes</p>
      {/* display comments */}
      <div className="flex gap-2 text-sm">
        <p className="font-bold">{post.user_id.UserName}</p>
        <p>{post.PostContent}</p>
      </div>
      {/* add comments */}
      <div className="flex justify-between my-4">
        <input
          type="text"
          name="comment"
          placeholder="add a comment"
          className="bg-transparent w-full outline-none text-sm"
          value={comment}             // Bind the input value to the state
          onChange={(e) => setComment(e.target.value)} // Update the comment state as the input changes
        />
        <button onClick={() => { addComment(post._id) }} className="px-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-content">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
        </button>
      </div>
      <hr />
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    user_id: PropTypes.shape({
      UserName: PropTypes.string.isRequired, // Adjust the prop type accordingly
    }),
    PostContent: PropTypes.string.isRequired,
    Likes: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
    Image_Video_url: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    // Add other properties of the post object as needed
  }).isRequired,
  liked: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  toggleLike: PropTypes.func.isRequired,
  toggleSave: PropTypes.func.isRequired,
  openComment: PropTypes.func.isRequired,
};

export default Post