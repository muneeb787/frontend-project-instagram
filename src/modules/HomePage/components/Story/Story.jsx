import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {useState , useEffect} from "react"
import "./story.css"
const Story = () => {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(14.2);

  // Calculate centerSlidePercentage based on screen width
  useEffect(() => {
    const screenWidth = window.innerWidth;
    let newCenterSlidePercentage = 14.2; // Default value
    console.log(screenWidth)
    // Define breakpoints and corresponding centerSlidePercentage values
    const breakpoints = [
      { maxScreenWidth: 768, centerSlidePercentage: 30 },
      { maxScreenWidth: 1024, centerSlidePercentage: 25 },
      // Add more breakpoints and values as needed
    ];

    // Find the matching breakpoint and set centerSlidePercentage
    for (const breakpoint of breakpoints) {
      if (screenWidth <= breakpoint.maxScreenWidth) {
        newCenterSlidePercentage = breakpoint.centerSlidePercentage;
        break;
      }
    }

    // Set the calculated centerSlidePercentage
    setCenterSlidePercentage(newCenterSlidePercentage);
  }, []);
  return (
    <div className="sm:w-9/12">
      <Carousel
        showThumbs={false} // Hide thumbnails
        showStatus={false} // Hide status indicators
        showIndicators={false}
        showArrows={true}  // Show navigation arrows (optional)
        emulateTouch={true} // Enable swipe gestures on touch devices (optional)
        // dynamicHeight={false} // Disable dynamic height (optional)
        centerMode={true} // Enable center mode to display multiple items at once
        centerSlidePercentage={centerSlidePercentage} // Adjust the width of each item (33.33% for three items)
      >
        <div className="flex flex-col justify-center items-center gap-1">
          <a className="">
            <img className="story w-16 h-16" src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="Jason Gardner user avatar" />
          </a>
          <div className="text-sm">User Name</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <a className="">
            <img className="story w-16 h-16" src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="Jason Gardner user avatar" />
          </a>
          <div className="text-sm">User Name</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <a className="">
            <img className="story w-16 h-16" src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="Jason Gardner user avatar" />
          </a>
          <div className="text-sm">User Name</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <a className="">
            <img className="story w-16 h-16" src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="Jason Gardner user avatar" />
          </a>
          <div className="text-sm">User Name</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <a className="">
            <img className="story w-16 h-16" src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="Jason Gardner user avatar" />
          </a>
          <div className="text-sm">User Name</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <a className="">
            <img className="story w-16 h-16" src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="Jason Gardner user avatar" />
          </a>
          <div className="text-sm">User Name</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <a className="">
            <img className="story w-16 h-16" src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="Jason Gardner user avatar" />
          </a>
          <div className="text-sm">User Name</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <a className="">
            <img className="story w-16 h-16" src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="Jason Gardner user avatar" />
          </a>
          <div className="text-sm">User Name</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <a className="">
            <img className="story w-16 h-16" src="https://s.cdpn.io/profiles/user/34318/512.jpg" alt="Jason Gardner user avatar" />
          </a>
          <div className="text-sm">User Name</div>
        </div>
      </Carousel>
    </div>
  );
}

export default Story
