import birthday from "../../images/birthday.png";
import { FormikProvider, useFormik, Field, Form } from "formik";
import * as Yup from "yup";
import useAxios from "../../hooks/axios.jsx";
import { useNavigate } from "react-router-dom";

const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const schema = Yup.object().shape({
  number: Yup.string().required("Enter Valid Phone No."),
  DOB: Yup.object().shape({
    year: Yup.string().required("Select Year"),
    month: Yup.string().required("Select Month"),
    day: Yup.string().required("Select Day"),
  }),
  gender: Yup.string().required("Select Gender"),
});

const UserData = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const formik = useFormik({
    initialValues: {
      number: "",
      DOB: {
        year: "",
        month: "",
        day: "",
      },
      gender: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      values.DOB = `${values.DOB.year}-${values.DOB.month}-${values.DOB.day}`;
      console.log(values);
      axiosInstance
        .post("/userInformation", values)
        .then((res) => {
          console.log(res);
          navigate(`/login`);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex w-96 items-center font-sans justify-center text-center flex-col h-screen mr-[70px]">
        <div className="w-full mt-[-20px] border bg-white border-[rgb(219,219,219)]">
          <div className="box-1-logo">
            <img
              src={birthday}
              className="w-28 ml-[37%] mx-0 my-[20px] justify-center"
              alt="DOB"
            />
          </div>
          <div>
            <p className="font-bold">Add Your birthday</p>
          </div>
          <div className="flex text-center justify-center items-center">
            <p className="text-sm">
              This wont be a of your part public profile.
            </p>
          </div>
          <div className="flex text-center justify-center items-center">
            <a href="#" className="text-blue-500 text-[13px]">
              Why do i need to provide my birthday?
            </a>
          </div>
          <FormikProvider value={formik}>
            <Form>
              {/* DOB Fields */}
              <div className="box-1">
                <div className="inline-block text-[100%] relative align-baseline m-0 p-0 border-0 font-inherit mr-[8px] mb-[8px]">
                  <span className="pointer-events-none absolute bg-no-repeat bg-[-358px_-286px] h-3 w-3 right-[7px] top-3"></span>
                  <Field as="select" name="DOB.month" className="bg-white border text-neutral-500 text-xs h-9 pl-2 pr-6 py-0 rounded-[3px_3px_3px_3px] border-solid border-[rgb(219,219,219)]">
                    <option value="">Month</option>
                    {monthsOfYear.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="inline-block text-[100%] relative align-baseline m-0 p-0 border-0 font-inherit mr-[8px] mb-[8px] mt-[8px]">
                  <span className="pointer-events-none absolute bg-no-repeat bg-[-358px_-286px] h-3 w-3 right-[7px] top-3 "></span>
                  <Field as="select" name="DOB.day" className="bg-white border text-neutral-500 text-xs h-9 pl-2 pr-6 py-0 rounded-[3px_3px_3px_3px] border-solid border-[rgb(219,219,219)]">
                    <option value="">Day</option>
                    {generateOptions(1, 31)}
                  </Field>
                </div>

                <div className="inline-block text-[100%] relative align-baseline m-0 p-0 border-0 font-inherit">
                  <span className="pointer-events-none absolute bg-no-repeat bg-[-358px_-286px] h-3 w-3 right-[7px] top-3"></span>
                  <Field as="select" name="DOB.year" className="bg-white border text-neutral-500 text-xs h-9 pl-2 pr-6 py-0 rounded-[3px_3px_3px_3px] border-solid border-[rgb(219,219,219)]">
                    <option value="">Year</option>
                    {generateOptions(1950, new Date().getFullYear())}
                  </Field>
                </div>
              </div>

              <div className="mt-[10px]">
                <span className="inline overflow-wrap-break-word font-normal leading-4 min-w-0 text-xs whitespace-pre-line text-neutral-500 max-w-full my-0">
                  <p className="mb-1px">You need to enter the date you were born.</p>
                </span>
              </div>

              <div className=" w-[80%] ml-[30px] mt-[20px]">
                <span className="inline overflow-wrap-break-word font-normal leading-4  text-xs whitespace-pre-line text-neutral-500  my-0">
                  <p className="mb-1px">
                    Use your own birthday, even if this account is for a business, a
                    pet, or something else{" "}
                  </p>
                </span>
              </div>

              {/* User Gender */}
              <div className="inline-block text-[100%] mt-5 relative align-baseline m-0 p-0 border-0 font-inherit">
                <span className="pointer-events-none absolute bg-no-repeat bg-[-358px_-286px] h-3 w-3 right-[7px] top-3"></span>
                <Field as="select" name="gender" className="bg-white border text-neutral-500 text-xs h-9 pl-2 pr-6 py-0 rounded-[3px_3px_3px_3px] border-solid border-[rgb(219,219,219)]">
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
              </div>

              {/* User phone number */}
              <div className="">
                <Field
                  name="number"
                  placeholder="Enter Phone Number"
                  type="text"
                  className="h-10 w-[258px] rounded-[2px] bg-neutral-50 font-normal text-[13px] leading-[18px] mb-[4px] my-2.5 pl-2 pr-0 pt-[9px] pb-[7px] border outline-none"
                />
                {formik.touched.number && formik.errors.number && (
                  <h6 style={{ color: "red" }}>{formik.errors.number}</h6>
                )}
              </div>
              <div className="mt-[20px]">
                <button
                  type="submit"
                  className=" font-['Helvetica', 'Arial', 'sans-serif'] h-[31px] w-[257px]  bg-[#0095f6] font-bold text-gray-500 text-sm cursor-pointer rounded-[8px] mx-0 my-2.5 px-[9px] py-[5px] border-[none]"
                >
                  Next
                </button>
              </div>
            </Form>
          </FormikProvider>
          <div className="mt-[10px]">
            <a href="#" className="text-blue-500 font-bold ">
              Go Back
            </a>
          </div>
        </div>
        <div className="w-full py-3 border bg-white flex text-center justify-center items-center mt-[5px] border-solid border-[rgb(219,219,219)]">
          <p className="text-gray-500 text-sm">
            Have an account?{" "}
            <a href="#" className="text-blue-500">
              Log In
            </a>
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
    </div>
  );
};
export default UserData;
