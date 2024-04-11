import Instagram from "../../images/instagram.png";
import Facebook from "../../images/facebook.png";
import Image from "../../images/phone.png";
import { useEffect } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { FormikProvider, useFormik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use useSelector to access the token value from your Redux state
  const token = useSelector((state) => state.user.token);

  const error = useSelector((state) => state.user.error);

  const login = yup.object({
    email: yup.string().email("This must be an Email").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password Must be at least 8 characters"),
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: login,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);


  return (
    <div className="flex w-full items-center justify-center">
      <div className="sm:block hidden">
        <img src={Image} className="" />
      </div>

      <div className="flex items-center self-start font-sans justify-center text-center flex-col h-screen">
        <div className="h-[390px] w-[345px] mt-[-30px]  border bg-white border-[rgb(219,219,219)">
          <div className="box-1-logo">
            <img
              src={Instagram}
              className="h-[61px] w-[175px] ml-[80px] mx-0 my-[20px]"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-2">
              {error.message}
            </div>
          )}

          <FormikProvider value={formik}>
            <form>

              <div className="input-box">
                <Field
                  className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mb-[4px] my-2.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
                  placeholder="Phone number, username, or email"
                  type="text"
                  name="email"
                />
                {formik.touched.email && formik.errors.email && (
                  <h6 className="mb-2 text-sm" style={{ color: "red" }}>
                    {formik.errors.email}
                  </h6>
                )}
              </div>
              <div className="input-box">
                <Field
                  type="password"
                  className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mx-1 mt-[1px] my-0.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
                  placeholder="Password"
                  name="password"
                  autoComplete="password"
                />
                {formik.touched.password && formik.errors.password && (
                  <h6 className="mb-2 text-sm" style={{ color: "red" }}>
                    {formik.errors.password}
                  </h6>
                )}
              </div>
              <div className="login-button-box">
                <button
                  type="button"
                  className="h-[31px] w-[257px] text-white bg-[#0095f6] font-semibold text-sm cursor-[poiter] rounded-[5px] mx-0 my-2.5 px-[9px] py-[5px] border-[none]"
                  onClick={formik.handleSubmit}
                >
                  Log in
                </button>
              </div>
            </form>

          </FormikProvider>

          <div className="h-2.5 w-full flex items-center justify-center mx-0 my-5 text-neutral-500 text-[13px] font-[bold] ">
            <div className="h-[1px] w-[106px] justify-center bg-[#dbdbdb] mr-2.5" />
            <div className="or-Box">OR</div>
            <div className="h-[1px] w-[106px] justify-center bg-[#dbdbdb] ml-2.5" />
          </div>
          <div className="flex items-center justify-center text-center gap-2 mt-[35px]">
            <span>
              <img src={Facebook} alt="fb-logo" className="h-[15px] w-[15px]" />
            </span>
            <p className="text-[#385185] font-[bold] text-[14px] cursor-pointer">
              Log in with Facebook
            </p>
          </div>
          <div className="mt-[25px]">
            <p className="text-[#385185] text-[13px] font-[bold] mb-[100px]">
              {" "}
              Forget password?
            </p>
          </div>
        </div>
        <div className="h-[52px] w-[345px] border bg-white flex text-center justify-center items-center mt-[5px] border-solid border-[rgb(219,219,219)]">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-500"
              onClick={() => { navigate("/signup") }}
            >
              Sign up
            </button>
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
};

export default Login;
