import { FormikProvider, useFormik, Field } from "formik";
import * as Yup from "yup";
import useAxios from "../../hooks/axios.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react"
import loader from "../../images/loader.gif"

const SignUpE = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
      setLoading(true)
      axiosInstance
        .post("/signup", values)
        .then((res) => {
          console.log(res);
          navigate(`/emailConfirmation?email=${values.email}`);
          setLoading(false)
        })
        .catch((err) => {
          setError(err.response.data.message)
          toast.error(err.response.data.message);
          setLoading(false)
          console.log(err.response.data.message);
        });
    },
  });

  return (
    <>
      <section className="h-screen w-screen bg-neutral-200 flex justify-center items-center">
        <div className="container h-full p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-backgroundSecondary text-content shadow-lg">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          alt="logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Welcome
                        </h4>
                      </div>
                      <FormikProvider value={formik}>
                        <form>
                          <p className="mb-4">Please SignUp to your account</p>
                          {/* <!--Username input--> */}
                          <div className="flex flex-col mb-10 text-black">
                            <Field
                              type="text"
                              placeholder="Please enter your Full Name"
                              name="fullName"
                              className="inline-block mt-2 w-full rounded px-6 pb-2 pt-2.5 outline-none"
                            ></Field>
                            {formik.touched.fullName && formik.errors.fullName && (
                              <h6 style={{ color: "red", fontSize: "15px", marginTop: "4px" }}>{formik.errors.fullName}</h6>
                            )}
                            <Field
                              type="text"
                              name="userName"
                              placeholder="Enter enter your UserName"
                              className="inline-block mt-2 w-full rounded px-6 pb-2 pt-2.5 outline-none"
                            ></Field>
                            {formik.touched.userName && formik.errors.userName && (
                              <h6 style={{ color: "red", fontSize: "15px", marginTop: "4px" }}>{formik.errors.userName}</h6>
                            )}
                            <Field
                              type="text"
                              placeholder="Please enter your email"
                              name="email"
                              className="inline-block mt-2 w-full rounded px-6 pb-2 pt-2.5 outline-none"
                            ></Field>
                            {formik.touched.email && formik.errors.email && (
                              <h6 style={{ color: "red", fontSize: "15px", marginTop: "4px" }}>{formik.errors.email}</h6>
                            )}
                            <Field
                              type="password"
                              label="Password"
                              name="password"
                              placeholder="Enter your password"
                              className="inline-block mt-2 w-full rounded px-6 pb-1 pt-2.5 outline-none"
                            ></Field>
                            {formik.touched.password && formik.errors.password && (
                              <h6 style={{ color: "red", fontSize: "12px"}}>{formik.errors.password}</h6>
                            )}
                          </div>
                          {error ? (<div>
                            <h6 className="text-red-600">{error}</h6>
                          </div>) : null}
                          {/* <!--Submit button--> */}
                          <div className="mb-12 pb-1 pt-1 text-center">
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
                                  Register
                                </button>
                              </button>
                            )}

                          </div>

                          {/* <!--Register button--> */}
                          <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2">Already have an account?</p>
                            <button
                              onClick={() => {
                                navigate("/login")
                              }}
                              type="button"
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            >
                              Login To Account
                            </button>
                          </div>
                        </form>
                      </FormikProvider>                                    </div>
                  </div>


                  {/* <!-- Right column container with background and description--> */}
                  <div
                                    className="flex items-center rounded-b-lg lg:w-6/12 x   h-5/6 overflow-hidden lg:rounded-r-lg lg:rounded-bl-none p-8"
                                    style={{
                                        background:
                                            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                    }}
                                >
                                    <img style={{height:"650px"}} className="w-full h-max overflow-hidden rounded-lg object-cover" src="https://source.unsplash.com/random" alt="" />
                                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SignUpE;
