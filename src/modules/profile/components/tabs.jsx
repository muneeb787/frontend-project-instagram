import { useEffect, useState } from "react";
import { GridIcon, SavedIcon, TaggedIcon } from "../../../images/icons/icon";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/axios";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [posts, setPosts] = useState([]);
const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance
      .get("/postofuser")
      .then((response) => {
        console.log(response);
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="space-x-4 sm:w-9/12">
      <hr />
      <div className="flex justify-center">
        <button
          className={`${
            activeTab === 0 ? "text-content" : "text-secondary"
          } px-4 py-2 rounded-md flex gap-2 items-center`}
          onClick={() => setActiveTab(0)}
        >
          <GridIcon />
          Posts
        </button>
        <button
          className={`${
            activeTab === 1 ? "text-content" : "text-secondary"
          } px-4 py-2 rounded-md flex gap-2 items-center`}
          onClick={() => setActiveTab(1)}
        >
          <SavedIcon />
          Saved
        </button>
        <button
          className={`${
            activeTab === 2 ? "text-content" : "text-secondary"
          } px-4 py-2 rounded-md flex gap-2 items-center`}
          onClick={() => setActiveTab(2)}
        >
          <TaggedIcon />
          Tagged
        </button>
      </div>
      <div className="mt-4">
        {activeTab === 0 && (
          <motion.div
            initial={{ opacity: "0%" }}
            animate={{ opacity: "100%" }}
            exit={{ opacity: "0%" }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 gap-4"
          >
            {posts.map((post) => (
              <div key={post.id} className="aspect-w-1 aspect-h-1">
               
                <img
                  src={post.Image_Video_url}
                  alt="IMG"
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
            ))}
          </motion.div>
        )}
        {activeTab === 1 && <div>This is the content of Tab 2.</div>}
        {activeTab === 2 && <div>This is the content of Tab 3.</div>}
      </div>
    </div>
  );
};

export default Tabs;
