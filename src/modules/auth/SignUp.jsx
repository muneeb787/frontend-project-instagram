import Instagram from "../../images/instagram.png";
import Facebook1 from "../../images/facebook1.png";
import { FormikProvider, useFormik, Field } from "formik";
import * as Yup from "yup";
import useAxios from "../../hooks/axios.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const learnMore =
    "https://www.instagram.com/linkshim/?u=https%3A%2F%2Fwww.facebook.com%2Fhelp%2Finstagram%2F261704639352628&e=AT3dXhm6U7im_ttKtLvRnEN3qh8mO3oladlL1lJhEGv8ZW7feEbaeOK-UYXQuEHKS42lWUMTFH2T37xDTXHNHx2eXqiLXrFUSYwzs4FENN3V3iApf-wCmG_09Gg869Ukqc3G7ocHGWnjJx1Gmsuj7g";

  const schema = Yup.object({
    fullName: Yup.string().min(3).max(18).required("FullName is required"),
    userName: Yup.string()
      .min(3)
      .max(18)
      .required("Username is required")
      .matches(/^\S*$/, "UserName Should not Contain Space"),
    email: Yup.string()
      .email("This must be an Email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password Must be at least 8 characters"),
  });

  const handleSignUp = () => {
    // navigate to sign up page
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      axiosInstance
        .post("/signup", values)
        .then((res) => {
          console.log(res);
          navigate(`/emailConfirmation?email=${values.email}`);
        })
        .catch((err) => {
          toast.error(err.data.message);
          console.log(err.data.message);
        });
    },
  });

  return (
    <>
      <div className="flex items-center w-full justify-center text-center flex-col h-screen mr-[70px]">
        <div className="h-[600px] w-[345px] mt-[-30px]  border bg-white border-[rgb(219,219,219)">
          <div className="box-1-logo">
            <img
              src={Instagram}
              className="h-[60px] w-[175px] ml-[80px] mx-0 my-[20px]"
            />
          </div>
          <div className="h-[52px] w-[345px] flex text-center justify-center items-center">
            <p className="text-gray-500 text-sm">
              Sign up to see photos and vedios
              <br />
              from you friends
            </p>
          </div>
          <div className="mt-[2px]">
          </div>
          <br />
          <div>
            <FormikProvider value={formik}>
              <form>
                <div className="input-box">
                  <Field
                    name="fullName"
                    placeholder="Enter Your FullName"
                    type="text"
                    className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mx-0 mt-[0px] my-0.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <h6 style={{ color: "red" , fontSize: "12px" , margin: "10px 0px" }}>{formik.errors.fullName}</h6>
                  )}
                </div>
                <div className="input-box">
                  <Field
                    name="userName"
                    placeholder="Enter Your UserName"
                    type="text"
                    className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mx-0 mt-[0px] my-0.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
                  />
                  {formik.touched.userName && formik.errors.userName && (
                    <h6 style={{ color: "red" , fontSize: "12px" , margin: "10px 0px" }}>{formik.errors.fullName}</h6>
                  )}
                </div>
                <div className="input-box">
                  <Field
                    name="email"
                    placeholder="Enter Your Email"
                    type="text"
                    className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mx-0 mt-[0px] my-0.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <h6 style={{ color: "red" , fontSize: "12px" , margin: "10px 0px" }}>{formik.errors.email}</h6>
                  )}
                </div>
                <div className="input-box">
                  <Field
                    name="password"
                    placeholder="Enter Your Password"
                    type="text"
                    className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mx-0 mt-[0px] my-0.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <h6 style={{ color: "red" , fontSize: "12px" , margin: "10px 0px" }}>{formik.errors.password}</h6>
                  )}
                </div>
                <div className="login-button-box">
                  <button
                    type="button"
                    className="h-[31px] w-[257px] text-white bg-[#0095f6] font-[bold] text-sm cursor-[poiter] rounded-[5px] mx-0 my-2.5 px-[9px] py-[5px] border-[none]"
                    onClick={formik.handleSubmit}
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </FormikProvider>
          </div>
          <div className="  border">
            <span className="inline overflow-wrap-break-word font-normal leading-4 min-w-0 text-xs whitespace-pre-line text-neutral-500 max-w-full my-0">
              <p className="mb-1px">
                People who use our service may have uploaded{" "}
              </p>
              your contact information to Instagram.
            </span>
            <a
              href={learnMore}
              className=" font-normal text-xs font-[bold] text-[12px] cursor-pointer whitespace-pre-line text-neutral-500"
            >
              {" "}
              Learn <br /> More.
            </a>
          </div>

          <span className="inline overflow-wrap-break-word font-normal leading-4 min-w-0 text-xs whitespace-pre-line text-neutral-500 max-w-full my-0">
            <p className="">By signing up, you agree to our </p>
            <a
              href="https://help.instagram.com/581066165581870/?locale=en_US"
              className=" font-normal text-xs font-[bold] text-[12px] cursor-pointer whitespace-pre-line text-neutral-500"
            >
              {" "}
              Terms , Privacy <br /> Policy and Cookies Policy.
            </a>
          </span>
        </div>
        <div className="h-[52px] w-[345px] border bg-white flex text-center justify-center items-center mt-[5px] border-solid border-[rgb(219,219,219)]">
          <p className="text-gray-500 text-sm">
            Dont have an account?{" "}
            <a href="#" className="text-blue-500">
              Sign up
            </a>
          </p>
        </div>

        <div className="text-[1.4rem] text-center my-[10px] ">
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
    </>
  );
};
export default SignUp;
