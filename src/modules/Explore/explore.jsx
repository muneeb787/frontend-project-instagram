import useAxios from "../../hooks/axios";
import { useEffect, useState } from "react";
import loader from "../../images/loader.gif"
import StackGrid from "react-stack-grid";
import {
    StaggeredGrid,
    StaggeredGridItem,
} from "react-staggered-grid";
import PostComments from "../../components/Models/postCommentModel";
// Assuming you're using React Router for routing

const Explore = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postId, setPostId] = useState()

    const axiosInstance = useAxios();

    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get(`/posts`) // Use userId in the API endpoint
            .then((response) => {
                console.log(response);
                setPosts(response.data.posts);
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []); // Include userId in the dependency 

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
        <div className="bg-background text-content w-full flex flex-col sm:p-10 p-5">
            <h1 className="text-3xl mb-5">Posts</h1>
            {/* <div className="grid grid-cols-3 grid-row-[100px] gap-5">
                {posts.map((post) => (
                    <div
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
            </div> */}
            {/* <StackGrid
                columnWidth={350}
                gutterWidth={15}
                gutterHeight={15}
            >
                {posts.map((post) => (
                    <div
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
            </StackGrid> */}
            {loading ? (<div className="h-[100%] w-full flex justify-center items-center"><img className="w-16" src={loader} alt="" /></div>) : (
                <StaggeredGrid
                    alignment={1} // 0 : start , 1 : center , 2 : end
                    horizontalGap={20}
                    verticalGap={20} // horizontal gap between grid items
                    // fitHorizontalGap={true} // fit the gap with columnWidth
                    className="md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4" // Adjust the number of columns for md and sm devices
                    // columns={4} // number of columns , don't pass if you want it to be gridWidth / columnWidth
                    // columnWidth={300} // width of each column , don't pass if you want it to be gridWidth / columns
                    // style={{ width: "100%" }} // when width of the grid is fixed in pixels , use gridWidth prop
                    useElementWidth={true} // this would force css styled width (100%) , when false gridWidth = columnWidth * columnWidth
                >
                    {posts.map((post, index) => (
                        <StaggeredGridItem
                            key={index}
                            index={index}
                            // spans={4}
                            style={{ transition: "left 0.3s ease,top 0.3s ease" }}
                        >
                            <div
                                onClick={() => {handleCommentSectionTrue(post._id)}}
                                key={post.id}
                                className="relative cursor-pointer aspect-w-1 aspect-h-1 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] group"
                            >
                                <img
                                    src={post.Image_Video_url}
                                    alt="IMG"
                                    className="relative object-cover w-full h-full rounded-md group-hover:opacity-90"
                                />
                                <div className="absolute rounded-md inset-0 flex justify-center items-center bg-gray-600 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white flex justify-center items-center"><svg className="h-6 w-6 text-white" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
                                    </svg> {post?.Likes.length}</span>
                                </div>
                            </div>
                        </StaggeredGridItem>
                    ))}
                </StaggeredGrid>
            )}

            {isCommentSectionOpen ? <PostComments closeModel={handleCommentSectionFalse} postId={postId} /> : ""}
        </div>
    );
};

export default Explore;
