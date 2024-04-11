import { useLocation } from "react-router";
import Email from "../../images/email.jpg";
import { useNavigate } from "react-router-dom";
import { FormikProvider, useFormik, Field } from "formik";
import * as Yup from "yup";
import loader from "../../images/loader.gif"
import { useState } from "react"
import useAxios from "../../hooks/axios.jsx";
import { toast } from "react-toastify";


const EmailConfirmationE = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const schema = Yup.object({
    password: Yup.string().min(4, "Otp Must be at least 4 characters"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setLoading(true);
      values.email = email;
      console.log(email);
      axiosInstance
        .post("/confirmOtp", values)
        .then((res) => {
          console.log(res);
          setLoading(false)
          navigate("/login");
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false)
          setError("Please Enter Valid OTP")
        });
    },
  });
  // util function
  const regenerateOtp = () => {
    setLoading(true)
    axiosInstance
      .post("/refreshOtp", { email })
      .then((res) => {
        console.log(res);
        setLoading(false)
        toast.success("Check Your Inbox For New OTP")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in Generating OTP ,PLease Try Later")
        setLoading(false)
      });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-backgroundSecondary px-4 md:px-0 lg:w-3/12 shadow-lg">
        <div className="md:mx-6 md:p-12">
          {/* <!--Logo--> */}
          <div className="text-center">
            <img
              className="mx-auto w-48"
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              alt="logo"
            />
            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
              Wellcome To Instagram
            </h4>
          </div>
          <FormikProvider value={formik}>
            <form>
              <p className="text-center">Enter the OTP sended to this email</p>
              <p className="mb-4 text-center font-medium">{email}</p>
              {/* <!--Username input--> */}
              <div className="flex flex-col gap-5 mb-10 text-black">
                <Field
                  type="text"
                  placeholder="Please enter your OTP"
                  name="otp"
                  className="inline-block w-full rounded px-6 pb-2 pt-2.5  outline-none"
                ></Field>
                {formik.touched.otp && formik.errors.otp && (
                  <h6 style={{ color: "red", fontSize: "12px", margin: "10px 0px" }}>{formik.errors.otp}</h6>
                )}
              </div>
              {error ? (<div>
                <h6 className="text-red-600">{error}</h6>
              </div>) : null}
              {/* <!--Submit button--> */}
              <div className="mb-5 pb-1 pt-1 text-center">
                {loading ? (<div className="flex justify-center"><img className="w-5" src={loader} alt="" /></div>) : (
                  <button className="w-full">
                    <button
                      onClick={formik.handleSubmit}
                      className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                      type="button"
                      style={{
                        background:
                          "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                      }}
                    >
                      Verify
                    </button>
                    <h6 onClick={() => {
                      regenerateOtp();
                    }} className="font-medium cursor-pointer text-gray-700">Resend OTP</h6>
                  </button>
                )}
              </div>
              <div className="">
                <p onClick={() => {
                  navigate(-1)
                }} className="mb-0 text-center font-semibold cursor-pointer mr-2 text-primary">Go Back</p>
              </div>
            </form>
          </FormikProvider>                                    </div>
      </div>
    </div>
  );
};

export default EmailConfirmationE;
