import { useEffect, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { FormikProvider, useFormik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../redux/authSlice";
import loader from "../../images/loader.gif"

const LoginE = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.user.loading)

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
    useEffect(() => {
        console.log(error, "errorooooo")
    }, [error]);

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
                                            <form onSubmit={formik.handleSubmit}>
                                                <p className="mb-4">Please login to your account</p>
                                                {/* <!--Username input--> */}
                                                <div className="flex flex-col gap-5 mb-10 text-black">
                                                    <Field
                                                        type="text"
                                                        placeholder="Username & Email"
                                                        name="email"
                                                        className="inline-block w-full rounded px-6 pb-2 pt-2.5  outline-none"
                                                    ></Field>

                                                    {/* <!--Password input--> */}
                                                    <Field
                                                        type="password"
                                                        label="Password"
                                                        name="password"
                                                        placeholder="Enter your password"
                                                        className="inline-block w-full rounded px-6 pb-2 pt-2.5 outline-none "
                                                    ></Field>
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
                                                                Log in
                                                            </button>
                                                        </button>
                                                    )}

                                                    {/* <!--Forgot password link--> */}
                                                    <a href="#!">Forgot password?</a>
                                                </div>

                                                {/* <!--Register button--> */}
                                                <div className="flex items-center justify-between pb-6">
                                                    <p className="mb-0 mr-2">Don't have an account?</p>
                                                    <button
                                                        onClick={() => {
                                                            navigate("/signup")
                                                        }}
                                                        type="button"
                                                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                    >
                                                        Register
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
    )
}

export default LoginE
