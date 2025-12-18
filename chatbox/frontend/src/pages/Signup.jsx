import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../features/auth/authAPI";
import { useNavigate, Link } from "react-router-dom";
import useIsMobile from "../hook/useIsMobile.js";

const Signup = () => {
  // navigate
  const navigate = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  //isMobile
  const isMobile = useIsMobile();

  // useSelector
  const { loading, error, user } = useSelector((state) => state.auth);

  console.log("Test Data Signup => ", error, user);

  // use state (local)
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // handle local form
  const handleLocalForm = (e) => {
    e.preventDefault();
    setForm((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(form));
  };

  // // ✅ This will run only when `user` becomes truthy (i.e., login successful)
  // useEffect(() => {
  //   if (user) {
  //     if (isMobile) {
  //       navigate("/");
  //     } else {
  //       navigate("/conversation");
  //     }
  //   }
  // }, [user, navigate, isMobile]);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="h-auto w-full flex flex-col pt-10 gap-y-8 md:px-4 container mx-auto mb-20">
      {/* heading and img  */}
      <div className="flex flex-col items-center">
        <img src="2 leady talkings.svg" alt="" className="w-70  md:hidden" />
        <h1 className="text-3xl text-black font-bold  md:hidden">Signup</h1>
        <h1 className="hidden text-3xl text-black font-bold lg:block">
          Welcome
        </h1>
      </div>
      {/* form */}
      <div className=" flex flex-col justify-center px-5 md:flex-row md:items-center md:gap-x-2 md:p-2 md:bg-[#efd9ce] md:rounded-md lg:p-20 ">
        <div className=" hidden md:w-1/2 md:flex flex-col justify-center items-center gap-y-5 lg:w-3/4">
          <img
            src="2 leady talkings.svg"
            alt=""
            className="hidden w-70 md:block lg:w-90"
          />

          {/* heading and some lines for images support  */}
          <div className=" px-5 flex flex-col gap-y-2 lg:px-20">
            <h1 className="text-4xl font-bold text-gray-50 ">
              Want to connect with world?
            </h1>
            <p className="text-xl/7  text-white ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt fuga
              veniam illum id architecto
            </p>
          </div>
        </div>

        {/* form  */}
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-y-2 p-3 bg-gray-100 rounded-md md:w-1/2 md:bg-white lg:justify-center-safe lg:items-center-safe 2lg:w-1/4 lg:gap-y-3"
        >
          <h1 className="hidden text-2xl text-black font-bold lg:block">
            Signup
          </h1>
          <fieldset className="fieldset lg:w-3/4">
            <legend className="fieldset-legend text-sm font-normal">
              What is your name?
            </legend>
            <input
              type="text"
              className="input"
              placeholder="Type full name here"
              onChange={handleLocalForm}
              value={form.fullName}
              name="fullName"
              id="fullName"
            />
          </fieldset>
          <fieldset className="fieldset lg:w-3/4">
            <legend className="fieldset-legend text-sm font-normal">
              Username
            </legend>
            <input
              type="text"
              className="input"
              placeholder="Type username here"
              name="username"
              onChange={handleLocalForm}
              value={form.username}
            />
          </fieldset>
          <fieldset className="fieldset lg:w-3/4">
            <legend className="fieldset-legend text-sm font-normal">
              Password
            </legend>
            <input
              type="password"
              className="input"
              placeholder="Create your password"
              name="password"
              onChange={handleLocalForm}
              value={form.password}
            />
          </fieldset>
          <fieldset className="fieldset lg:w-3/4">
            <legend className="fieldset-legend text-sm font-normal">
              Confirm Password
            </legend>
            <input
              type="password"
              className="input"
              placeholder="Type password again"
              name="confirmPassword"
              onChange={handleLocalForm}
              value={form.confirmPassword}
            />
          </fieldset>
          <div className="flex flex-col gap-y-1 lg:w-3/4">
            <label htmlFor="gender" className="text-sm font-normal">
              Gender
            </label>
            <div id="gender" className="flex gap-x-5 ">
              <span className="flex gap-x-1 ">
                <input
                  type="radio"
                  name="gender"
                  className="radio"
                  id="boy"
                  value="boy"
                  checked={form.gender == "boy"}
                  onChange={handleLocalForm}
                />
                <label htmlFor="boy" className="text-sm">
                  Men
                </label>
              </span>

              <span className="flex gap-x-1">
                <input
                  type="radio"
                  name="gender"
                  className="radio"
                  id="girl"
                  value="girl"
                  checked={form.gender == "girl"}
                  onChange={handleLocalForm}
                />
                <label htmlFor="girl" className="text-sm">
                  Women
                </label>
              </span>
            </div>
          </div>

          <div className="flex gap-x-2 mt-5 md:mt-0 justify-center items-center lg:w-3/4 bg-gray-100 py-1">
            <input
              type="checkbox"
              className="checkbox validator size-5"
              required
              title="Required"
              id="termsAndConditions"
            />
            <label htmlFor="termsAndConditions" className="text-sm">
              I agree with <span>Terms & Conditons.</span>
            </label>
            {/* <p className="absolute top-50  validator-hint">Required</p> */}
          </div>

          {/* signup button in form for screen > lx   */}

          <div className="hidden lg:flex flex-col justify-center items-center gap-y-3 mt-5 lg:w-3/4">
            <button
              type="submit"
              className="  btn btn-soft bg-[#7161ef] text-white font-normal rounded-lg"
            >
              Signup
            </button>
            <p className="text-sm ">
              Already have an accound? <Link to="/login">Login</Link>
            </p>
          </div>

          {/* buttons */}
          <div className="flex flex-col justify-center items-center gap-y-3 mt-5 lg:hidden">
            <button
              type="submit"
              className="  btn btn-soft bg-[#7161ef] text-white text-xl font-normal rounded-xl"
            >
              Signup
            </button>
            <p className="text-sm ">
              Already have an accound? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
