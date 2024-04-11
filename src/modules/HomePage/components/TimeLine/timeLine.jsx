import PostComments from "../../../../components/Models/postCommentModel";
import useAxios from "../../../../hooks/axios";
import Post from "../post/post";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";



const TimeLine = () => {
  const axiosInstance = useAxios()
  const userData = useSelector((state) => state.user.user);
  const [posts, setPosts] = useState()
  const [postId, setPostId] = useState()

  const getPosts = () => {
    axiosInstance.get("/postFollowed").then((res) => {
      console.log(res)
      console.log(res.data.retrievePosts)
      setPosts(res.data.retrievePosts)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getPosts()
  }, [userData])


  const toggleLike = (id) => {
    // // Optimistically update the UI
    // console.log(userData)
    // const updatedPosts = posts.map((post) => {
    //   if (post._id === id) {
    //     const isLiked = post.Likes.findIndex((like) => like.user_id === userData._id) !== -1;
    //     return {
    //       ...post,
    //       Likes: isLiked ? post.Likes.filter((like) => like.user_id !== userData._id) : [...post.Likes, { user_id: userData._id }],
    //     };
    //   }
    //   return post;
    // });

    // setPosts(updatedPosts);

    // Send the request to the server
    axiosInstance.get(`/post/toggleLike/${id}`)
      .then((res) => {
        console.log(res);
        getPosts()
        // You can update the state again with the response if needed
      })
      .catch((error) => {
        console.log(error);
        // If there's an error, you may want to revert the UI state
        setPosts(posts);
      });
  };
  const toggleSave = (id) => {
    // Optimistically update the UI
    const updatedPosts = posts.map((post) => {
      if (post._id === id) {
        const isSaved = userData.saved_posts.findIndex((saved) => saved.post_id === post._id) !== -1;
        return {
          ...post,
          saved: !isSaved, // Toggle the saved state
        };
      }
      return post;
    });

    setPosts(updatedPosts);

    // Send the request to the server
    axiosInstance.get(`/user/toggleSavePost/${id}`)
      .then((res) => {
        console.log(res);
        // You can update the state again with the response if needed
      })
      .catch((error) => {
        console.log(error);
        // If there's an error, you may want to revert the UI state
        setPosts(updatedPosts); // Use updatedPosts, not posts
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
    <>
      <div className="sm:w-7/12">
        {posts ? posts.map((post) => {
          return (
            <Post key={post._id} post={post} liked={post.Likes.findIndex((like) => {
              return (like.user_id == userData._id)
            })} saved={userData.saved_posts.findIndex((saved) => saved.post_id == post._id)} toggleLike={toggleLike} toggleSave={toggleSave} openComment={handleCommentSectionTrue} />
          )
        }) : null}
      </div>
      {isCommentSectionOpen ? <PostComments closeModel={handleCommentSectionFalse} postId={postId} /> : ""}
    </>
  );
};

export default TimeLine;
