import PostComments from "../../../../components/Models/postCommentModel";
import useAxios from "../../../../hooks/axios";
import Post from "../post/post";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import PostE from "../post/postE";
import StackGrid from "react-stack-grid";
import { motion } from "framer-motion"
import loader from "../../../../images/loader.gif"
import {
  StaggeredGrid,
  StaggeredGridItem,
} from "react-staggered-grid";



const TimeLineE = () => {
  const axiosInstance = useAxios()
  const userData = useSelector((state) => state.user.user);
  const [posts, setPosts] = useState()
  const [postId, setPostId] = useState()
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState(true)

  const getPosts = () => {

    axiosInstance.get("/postFollowed").then((res) => {
      console.log(res)
      console.log(res.data.retrievePosts)
      setPosts(res.data.retrievePosts)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    setLoading(true)
    getPosts()
    setLoading(false)
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
      <div className="flex justify-between">
        <h1 className='text-3xl my-3'>Feeds</h1>
        <div className="flex gap-4 items-center justify-center">
          <h6 onClick={() => { setViewMode(true) }} className={`border-[1px] rounded-full border-secondary px-5 py-2 ${viewMode ? "element-with-gradient-to-right border-none text-white" : null} hover:bg-secondary text-content hover:text-white cursor-pointer`}>Read Mode</h6>
          <h6 onClick={() => { setViewMode(false) }} className={`border-[1px] rounded-full border-secondary px-5 py-2 ${!viewMode ? "element-with-gradient-to-right border-none text-white" : null} hover:bg-secondary text-content hover:text-white cursor-pointer`}>View Mode</h6>
        </div>
      </div>

      {/* <StackGrid
        columnWidth={465}
        gutterWidth={15}
        gutterHeight={15}
      >
        {posts ? posts.map((post) => {
          return (
            <PostE key={post._id} post={post} liked={post.Likes.findIndex((like) => {
              return (like.user_id == userData._id)
            })} saved={userData.saved_posts.findIndex((saved) => saved.post_id == post._id)} toggleLike={toggleLike} toggleSave={toggleSave} openComment={handleCommentSectionTrue} />
          )
        }) : null}
      </StackGrid> */}

      {loading ? (<div className="h-[100%] w-full flex justify-center items-center"><img className="w-16" src={loader} alt="" /></div>) : (
        <>
          {!viewMode ? (<>
            <StaggeredGrid
              alignment={1} // 0 : start , 1 : center , 2 : end
              horizontalGap={20}
              // verticalGap={20} // horizontal gap between grid items
              // fitHorizontalGap={true} // fit the gap with columnWidth
              columns={3} // number of columns , don't pass if you want it to be gridWidth / columnWidth
              // columnWidth={300} // width of each column , don't pass if you want it to be gridWidth / columns
              // style={{ width: "100%" }} // when width of the grid is fixed in pixels , use gridWidth prop
              useElementWidth={true} // this would force css styled width (100%) , when false gridWidth = columnWidth * columnWidth
            >
              {posts?.length != 0 ? posts?.map((post, index) => (
                <>
                <StaggeredGridItem
                  onClick={() => {
                    console.log(post._id, "posting post id")
                    handleCommentSectionTrue(post._id)
                  }}
                  key={index}
                  index={index}
                  // spans={4}
                  style={{ transition: "left 0.3s ease,top 0.3s ease" }}
                >
                  <PostE key={post._id} post={post} liked={post.Likes.findIndex((like) => {
                    return (like.user_id == userData._id)
                  })} saved={userData.saved_posts.findIndex((saved) => saved.post_id == post._id)} toggleLike={toggleLike} toggleSave={toggleSave} openComment={handleCommentSectionTrue} viewMode={viewMode} />

                </StaggeredGridItem>
                </>
              )) : (<div className="w-full h-full flex flex-col justify-center items-center">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png" alt="" />
                <span className="text-center text-xl">No Post Found</span>
              </div>)}
            </StaggeredGrid>
          </>) : (<>
            {posts?.length != 0 ? posts?.map((post) => (
              <motion.div initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3 }} key={post._id} className="w-full flex justify-center ">
                <div className="w-7/12">
                  <PostE post={post} liked={post.Likes.findIndex((like) => {
                    return (like.user_id == userData._id)
                  })} saved={userData.saved_posts.findIndex((saved) => saved.post_id == post._id)} toggleLike={toggleLike} toggleSave={toggleSave} openComment={handleCommentSectionTrue} viewMode={viewMode} />
                  <div className="element-with-gradient-to-right w-full h-1 mb-5"></div>
                </div>
              </motion.div>
            )) : (<div className="w-full h-full flex flex-col justify-center items-center">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png" alt="" />
              <span className="text-center text-xl">No Post Found</span>
            </div>)}
          </>)}
        </>
      )}

      {isCommentSectionOpen ? <PostComments closeModel={handleCommentSectionFalse} postId={postId} updatePosts={getPosts} /> : ""}
    </>
  );
};

export default TimeLineE;
