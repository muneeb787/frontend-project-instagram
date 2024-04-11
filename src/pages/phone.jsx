import React, { useState } from "react";
import Phone from "../images/phoneVerification.png"

const phoneConfirmation = () => {

  const Number= "xxxx-xxxxxxx"
  
  const [number, setNumber] = useState("");

  return (
    <div className="flex items-center w-full font-sans justify-center text-center flex-col h-screen mr-[70px]">
      <div className="h-[400px] w-[345px] mt-[-20px]  border bg-white border-[rgb(219,219,219)">
          <div className="box-1-logo">
            <img src={Phone} className="h-[70px] w-[80px] ml-[37%] mx-0 my-[20px] justify-center"/>
          </div>
          <div>
          <p className="font-bold">Just one more step!</p>
          </div>
        <div className="h-[52px] w-[345px] flex text-center justify-center items-center">
          <p className="text-sm">
            Enter the 6-digit code we sent to:
          </p>
      </div>
      <div className="flex text-center justify-center items-center mt-[-15px]">
        <p className="text-sm">
          {Number}
        </p>
      {/* <a href="#" className="text-blue-500 text-[13px] ">
      Reset Code?
            </a> */}
        </div>

        <div className="input-box">
            <input
              type="number"
              className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mx-1 mt-[15px] my-0.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
              placeholder="Confirmation Code"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        

          <div className="mt-[20px]">
          <button
            type="button"
            className=" font-['Helvetica', 'Arial', 'sans-serif'] h-[31px] w-[257px] text-white bg-[#0095f6] font-bold text-gray-500 text-sm cursor-[poiter] rounded-[8px] mx-0 my-2.5 px-[9px] py-[5px] border-[none]"
            >
            Next
          </button>
          </div>
          <div className="mt-[10px]">
          <a href="#" className="text-blue-500 font-bold text-sm ">Change Phone | </a>
          <a href="#" className="text-blue-500 font-bold text-sm ">Request New Code</a>
          </div>
      </div>
        <div className="h-[58px] w-[345px] border bg-white flex text-center justify-center items-center mt-[5px] border-solid border-[rgb(219,219,219)]">
          <p className="text-gray-500 text-sm">
            Have a account?{" "}
            <a href="#" className="text-blue-500">
              Login in
            </a>
          </p>
      </div>

      <div className="text-[1.4rem] text-center my-[5px] ">
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
        </div>
);
}

export default phoneConfirmation;


