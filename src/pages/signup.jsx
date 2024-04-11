import React, { useState } from "react";
import Instagram from "../images/instagram.png"
import Facebook from "../images/facebook.png"
import AppStore from "../images/app-store.png"
import PlayStore from "../images/play-store.png"
import Image from "../images/phone.png"
import Facebook1 from "../images/facebook1.png"


const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const learnMore = 'https://www.instagram.com/linkshim/?u=https%3A%2F%2Fwww.facebook.com%2Fhelp%2Finstagram%2F261704639352628&e=AT3dXhm6U7im_ttKtLvRnEN3qh8mO3oladlL1lJhEGv8ZW7feEbaeOK-UYXQuEHKS42lWUMTFH2T37xDTXHNHx2eXqiLXrFUSYwzs4FENN3V3iApf-wCmG_09Gg869Ukqc3G7ocHGWnjJx1Gmsuj7g'

  const handleLogin = () => {
    // Add authentication
    console.log("Logging in with:", { username, password });
  };

  return (
    <div className="flex items-center w-full font-sans justify-center text-center flex-col h-screen mr-[70px]">
      <div className="h-[600px] w-[345px] mt-[-30px]  border bg-white border-[rgb(219,219,219)">
          <div className="box-1-logo">
            <img src={Instagram} className="h-[60px] w-[175px] ml-[80px] mx-0 my-[20px]"/>
          </div>
        <div className="h-[52px] w-[345px] flex text-center justify-center items-center">
          <p className="text-gray-500 text-sm">
              Sign up to see photos and vedios<br/>
              from you friends
          </p>
      </div>
      <div className="mt-[2px]">
          <button
            type="button"
            className="h-[31px] w-[257px] text-white bg-[#0095f6] font-normal font-semibold text-sm cursor-[poiter] rounded-[5px] ] px-[9px] py-[5px] border-[none]"
            onClick={handleLogin}
          >
            <span>
              <img src={Facebook1} alt="fb-logo" className="bg-no-repeat bg-[-414px_-300px] h-4 w-4 inline-block text-[100%] relative align-baseline mr-2 m-0 p-0 border-0 top-[3px] "/>
            </span>
            Log in with Facebook
          </button>
          </div>

          <div className="h-2.5 w-full flex items-center justify-center mx-0 my-5 text-neutral-500 text-[13px] font-[bold] ">
            <div className="h-[1px] w-[106px] justify-center bg-[#dbdbdb] mr-2.5"/>
            <div className="or-Box">OR</div>
            <div className="h-[1px] w-[106px] justify-center bg-[#dbdbdb] ml-2.5"/>
          </div>

          <div className="">
            <input
              type="email"
              className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mb-[4px] my-2.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
              placeholder="Phone number, username, or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mx-0 mt-[0px] my-0.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mx-1 mt-[1px] my-0.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
              placeholder="Username"
              value={username}
              onChange={(e) => setPassword(e.target.value)}
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
            className="h-[31px] w-[257px] text-white bg-[#0095f6] font-[bold] text-sm cursor-[poiter] rounded-[5px] mx-0 my-2.5 px-[9px] py-[5px] border-[none]"
            onClick={handleLogin}>
            Sign up
          </button>
          </div>
          {/* <div className="h-2.5 w-full flex items-center justify-center mx-0 my-5 text-neutral-500 text-[13px] font-[bold] ">
            <div className="h-[1px] w-[106px] justify-center bg-[#dbdbdb] mr-2.5"/>
            <div className="or-Box">OR</div>
            <div className="h-[1px] w-[106px] justify-center bg-[#dbdbdb] ml-2.5"/>
          </div> */}
          <div className="  border">
            <span className="inline overflow-wrap-break-word font-normal leading-4 min-w-0 text-xs whitespace-pre-line text-neutral-500 max-w-full my-0">
            <p className="mb-1px">People who use our service may have uploaded </p>your contact information to Instagram.
            </span>
             <a  href={learnMore} className=" font-normal text-xs font-[bold] text-[12px] cursor-pointer whitespace-pre-line text-neutral-500"> Learn <br/> More.</a>
          </div>
          
            <span className="inline overflow-wrap-break-word font-normal leading-4 min-w-0 text-xs whitespace-pre-line text-neutral-500 max-w-full my-0">
            <p className="">By signing up, you agree to our </p>
             <a  href="https://help.instagram.com/581066165581870/?locale=en_US" className=" font-normal text-xs font-[bold] text-[12px] cursor-pointer whitespace-pre-line text-neutral-500"> Terms , Privacy <br/>  Policy and Cookies Policy.</a>
             </span>
    

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
);
}

export default Login;
