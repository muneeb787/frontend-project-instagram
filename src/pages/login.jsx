import React, { useState } from "react";
import Instagram from "../images/instagram.png"
import Facebook from "../images/facebook.png"
import AppStore from "../images/app-store.png"
import PlayStore from "../images/play-store.png"
import Image from "../images/phone.png"


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add authentication
    console.log("Logging in with:", { username, password });
  };

  const backgroundImageUrl = 'https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk';

  return (
  <div className="flex w-full">
    <div className="h-[900px] w-[800px]">
      <img src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk" alt="phone" className=""/>
     
    </div>
{/* 
    <div className="h-[52px] w-[345px] border bg-white flex text-center justify-center items-center mt-[5px] border-solid border-[rgb(219,219,219)]">
          <p className="text-gray-500 text-sm">
              Sign up to see photos and vedios
              from you friends
          </p>
      </div> */}

    <div className="flex items-center w-full font-sans justify-center text-center flex-col h-screen mr-[70px]">
      <div className="h-[390px] w-[345px] mt-[-30px]  border bg-white border-[rgb(219,219,219)">
          <div className="box-1-logo">
            <img src={Instagram} className="h-[61px] w-[175px] ml-[80px] mx-0 my-[20px]"/>
          </div>

          <div className="input-box">
            <input
              type="text"
              className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mb-[4px] my-2.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
              placeholder="Phone number, username, or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mx-1 mt-[1px] my-0.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-button-box">
          <button
            type="button"
            className="h-[31px] w-[257px] text-white bg-[#0095f6] font-normal font-semibold text-sm cursor-[poiter] rounded-[5px] mx-0 my-2.5 px-[9px] py-[5px] border-[none]"
            onClick={handleLogin}
          >
            Log in
          </button>
          </div>
          <div className="h-2.5 w-full flex items-center justify-center mx-0 my-5 text-neutral-500 text-[13px] font-[bold] ">
            <div className="h-[1px] w-[106px] justify-center bg-[#dbdbdb] mr-2.5"/>
            <div className="or-Box">OR</div>
            <div className="h-[1px] w-[106px] justify-center bg-[#dbdbdb] ml-2.5"/>
          </div>
          <div className="flex items-center justify-center text-center gap-2 mt-[35px]">
            <span>
              <img src={Facebook} alt="fb-logo" className="h-[15px] w-[15px]"/>
            </span>
             <p className="text-[#385185] font-[bold] text-[14px] cursor-pointer">Log in with Facebook</p>
          </div>
        <div className="mt-[25px]">
          <p className="text-[#385185] text-[13px] font-[bold] mb-[100px]"> Forget password?</p>
        </div>
      </div>
        <div className="h-[52px] w-[345px] border bg-white flex text-center justify-center items-center mt-[5px] border-solid border-[rgb(219,219,219)]">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-blue-500">
              Sign up
            </a>
          </p>
      </div>

      <div className="text-[1.4rem] text-center my-[10px] ">
              <span className="block text-neutral-800 mx-0 my-8 text-sm my-[15px] ">Get the app</span>
              <div className="w-full flex justify-center">
                <img className="max-w-[140px] max-h-[42px] cursor-pointer mr-4"
                  src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
                  alt="android App"
                />
                <img className="max-w-[140px] max-h-[42px] cursor-pointer"
                  src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
                  alt="ios app"
                />
              </div>
            </div>
            {/* <footer className="py-20 my-[-60px]" >
          <div className="flex justify-between font-[bold] uppercase text-[1.3rem] flex-wrap mt-0 px-0 py-20">
              <ul className="flex flex-wrap list-none border border-solid border-[#090909]">
                <li className="mr-[1.6rem] text-[13px] my-[15px]">
                  <a href="#">About Us</a>
                </li>
                <li className="mr-[1.6rem] text-[13px] my-[15px]">
                  <a href="#">Support</a>
                </li>
                <li className="mr-[1.6rem] text-[13px] my-[15px]">
                  <a href="#">Jobs</a>
                </li>
                <li className="mr-[1.6rem] text-[13px] my-[15px]">
                  <a href="#">Privacy</a>
                </li>
                <li className="mr-[1.6rem] text-[13px] my-[15px]">
                  <a href="#">Terms</a>
                </li>
                <li className="mr-[1.6rem] text-[13px] my-[15px]">
                  <a href="#">Profiles</a>
                </li>
                <li className="mr-[1.6rem] text-[13px] my-[15px]">
                  <a href="#">Languages</a>
                </li>
              </ul>
            <div className="copyright-notice">&copy; 2019 Complaints</div>
          </div>
        </footer> */}
    </div>
  </div>
);
}

export default Login;
