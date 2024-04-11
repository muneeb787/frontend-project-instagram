import Story from "../components/Story/Story";
import Timeline from "../components/TimeLine/timeLine"

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import FollowSection from "../components/suggestFollow/followSection";
import PostComments from "../../../components/Models/postCommentModel";
import StoryE from "../components/Story/StoryE";
import TimeLineE from "../components/TimeLine/timeLineE";

const HomePage = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);


  return (
    // <>
    //   <div className="flex h-screen overflow-hidden">
    //     <div className="bg-background text-content overflow-y-scroll no-scrollbar w-full flex flex-col items-center p-10 gap-5">
    //       <Story />
    //       <Timeline />
    //     </div>
    //     <div className="w-96 h-min py-10">
    //       <FollowSection />
    //     </div>
    //   </div>
    // </>
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="bg-background text-content overflow-y-scroll no-scrollbar w-full p-10 gap-5">
          <StoryE />
          <TimeLineE />
        </div>
      </div>
    </>
  );
};

export default HomePage;
