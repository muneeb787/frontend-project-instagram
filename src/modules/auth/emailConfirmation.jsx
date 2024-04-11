import { useLocation } from "react-router";
import Email from "../../images/email.jpg";
import { useNavigate } from "react-router-dom";
import { FormikProvider, useFormik, Field } from "formik";
import * as Yup from "yup";
import useAxios from "../../hooks/axios.jsx";

const EmailConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const schema = Yup.object({
    password: Yup.string().min(4, "Otp Must be at least 4 characters"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      values.email = email;
      console.log(email);
      axiosInstance
        .post("/confirmOtp", values)
        .then((res) => {
          console.log(res);
          navigate("/userInformation");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  // util function
  const regenerateOtp = () => {
    axiosInstance
      .post("/refreshOtp", { email })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center w-full font-sans justify-center text-center flex-col h-screen mr-[70px]">
      <div className="h-[400px] w-[345px] mt-[-20px]  border bg-white border-[rgb(219,219,219)">
        <div className="box-1-logo">
          <img
            src={Email}
            className="h-[70px] w-[80px] ml-[37%] mx-0 my-[20px] justify-center"
          />
        </div>
        <div>
          <p className="font-bold">Enter Confirmation Code</p>
        </div>
        <div className="h-[52px] w-[345px] flex text-center justify-center items-center">
          <p className="text-sm">Enter the confirmation code we send to</p>
        </div>
        <div className="flex text-center justify-center items-center mt-[-15px]">
          <p className="text-sm">{email}</p>
          <a
            href="#"
            className="text-blue-500 text-[13px] "
            onClick={() => {
              regenerateOtp();
            }}
          >
            Reset Code?
          </a>
        </div>
        <FormikProvider value={formik}>
          <form>
            <div className="input-box">
              <Field
                name="otp"
                className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mx-1 mt-[15px] my-0.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
                placeholder="Confirmation Code"
              />
              {formik.touched.otp && formik.errors.otp && (
                <h2 style={{ color: "red" }}>{formik.errors.otp}</h2>
              )}
            </div>
            <div className="mt-[20px]">
              <button
                type="button"
                className=" font-['Helvetica', 'Arial', 'sans-serif'] h-[31px] w-[257px] bg-[#0095f6] font-bold text-gray-500 text-sm cursor-[poiter] rounded-[8px] mx-0 my-2.5 px-[9px] py-[5px] border-[none]"
                onClick={formik.handleSubmit}
              >
                Next
              </button>
            </div>
          </form>
        </FormikProvider>
        <div className="mt-[10px]">
          <button
            type="button"
            className="text-blue-500 font-bold"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </button>
        </div>
      </div>
      <div className="h-[58px] w-[345px] border bg-white flex text-center justify-center items-center mt-[5px] border-solid border-[rgb(219,219,219)]">
        <p className="text-gray-500 text-sm">
          Have a account?{" "}
          <button
            type="button"
            className="text-blue-500"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </p>
      </div>

      <div className="text-[1.4rem] text-center my-[5px] ">
        <span className="block text-neutral-800 mx-0 text-sm my-[15px] ">
          Get the app
        </span>
        <div className="w-full flex justify-center">
          <img
            className="max-w-[140px] max-h-[42px] cursor-pointer mr-4"
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
            alt="android App"
          />
          <img
            className="max-w-[140px] max-h-[42px] cursor-pointer"
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
            alt="ios app"
          />
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
