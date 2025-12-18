import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authAPI.js";
import { useNavigate, Link } from "react-router-dom";
import useIsMobile from "../hook/useIsMobile.js";

const Login = () => {
  // navigate
  const navigate = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  //isMobile
  const isMobile = useIsMobile();

  // useSelector
  const { loading, error, user } = useSelector((state) => state.auth);

  console.log("Test Data Login => ", error, user);

  // local state variable
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

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


  //! ✅ After dispatching loginUser thunk, we should NOT navigate immediately.
  // Instead, use `useEffect` to watch for `user` being set in Redux after successful login.
  // This avoids premature navigation before backend response.

  //! ✅ Why include `navigate` in the dependency array?
  // `navigate` is a function returned by the `useNavigate()` hook from React Router.
  // Even though it doesn't usually change between renders,
  // React (and ESLint's `react-hooks/exhaustive-deps` rule) recommends adding it
  // as a dependency to ensure correctness and avoid potential bugs with stale closures.

  //! 🚫 What happens if you don’t include `navigate`?
  // It may seem to work fine now, but if React Router ever updates the `navigate`
  // function (e.g., after a hot reload or internal router change),
  // your effect might run with a stale version of `navigate`, causing bugs.
  // Also, ESLint will warn about missing dependencies in `useEffect`
  // due to the `react-hooks/exhaustive-deps` rule.

  //
  const handleLocalForm = (e) => {
    e.preventDefault();
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle from submit to global state
  const handleFormSubmitGlobal = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="h-auto w-full flex flex-col pt-10 gap-y-8 md:px-4 container mx-auto mb-10">
      {/* heading and img  */}
      <div className="flex flex-col items-center">
        <img src="2 leady talkings.svg" alt="" className="w-50  md:hidden" />
        <h1 className="text-3xl text-black font-bold  lg:hidden">Login</h1>
        <h1 className="hidden text-3xl text-black font-bold lg:block">
          Welcome Back
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
              Want to chat with friends and Family?
            </h1>
            <p className="text-xl/7  text-white ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt fuga
              veniam illum id architecto
            </p>
          </div>
        </div>

        {/* form  */}
        <form
          onSubmit={handleFormSubmitGlobal}
          className="flex flex-col gap-y-2 p-3 bg-gray-100 rounded-md md:w-1/2 md:bg-white lg:justify-center-safe lg:items-center-safe 2lg:w-1/4 lg:gap-y-3"
        >
          <h1 className="hidden text-2xl text-black font-bold lg:block">
            Login
          </h1>
          <fieldset className="fieldset lg:w-3/4">
            <legend className="fieldset-legend text-sm font-normal">
              Username
            </legend>
            <input
              type="text"
              className="input"
              placeholder="Type username here"
              onChange={handleLocalForm}
              value={form.username}
              name="username"
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
              onChange={handleLocalForm}
              value={form.password}
              name="password"
            />
          </fieldset>

          {/* signup button in form for screen > lx   */}

          <div className="hidden lg:flex flex-col justify-center items-center gap-y-3 mt-5 lg:w-3/4">
            <button
              type="submit"
              className="  btn btn-soft bg-[#7161ef] text-white font-normal rounded-lg"
            >
              Login
            </button>
            <p className="text-sm ">
              New here, Want to create account? <Link to="/signup">Signup</Link>
            </p>
          </div>

          {/* buttons */}
          <div className="flex flex-col justify-center items-center gap-y-3 mt-5 lg:hidden">
            <button
              type="submit"
              className="  btn btn-soft bg-[#7161ef] text-white text-xl font-normal rounded-xl"
            >
              Login
            </button>
            <p className="text-sm ">
              New here, Want to create account?
              <Link to="/signup">Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
