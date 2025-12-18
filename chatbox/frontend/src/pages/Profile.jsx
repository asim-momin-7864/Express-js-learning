import { MdOutlineArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";

const Profile = () => {

  // 
  const{ user } = useSelector((state) => state.auth);
  return (
    <div className=" h-auto flex flex-col mb-10">
      {/* Navbar */}
      <nav className="relative w-full h-14 bg-[#957FEF] flex">
        {/* go back icon */}
        <div className="absolute flex justify-center items-center top-4 left-5">
          <MdOutlineArrowBackIos size={22} className="text-black" />
        </div>

        {/* page name  */}
        <div className="w-full flex justify-center items-center text-center">
          <span className="text-2xl font-normal text-black"> Profile </span>
        </div>
      </nav>

      {/* info container */}
      <div className="flex flex-col gap-y-5 container mx-auto lg:w-1/2">
        {/* profile pic and name & username  */}
        <div className="px-5">
          <div className="flex justify-center items-end  translate-y-1/3">
            <img
              src={`${user?.profileUrl}`}
              alt=""
              className="w-40"
            />
          </div>

          {/* full name & username  */}
          <div className="flex flex-col justify-center items-center h-40 pt-10 rounded-xl bg-[#957FEF]">
            <div className="text-xl font-semibold text-black">
              {user?.fullName}
            </div>
            <div className="font-medium text-lg text-black">@{user?.username}</div>
          </div>
        </div>

        {/* chat, call , video call for other user info page  */}
        {/* <div></div> */}

        {/* info  */}
        <div className="px-3 flex flex-col ">
          <div className="flex justify-center">
            <h4 className="text-lg font-normal translate-y-1/2  text-[#7161EF] py-1 px-10 rounded-md bg-gray-100 border-1 border-[#7161EF] w-fit">
              Info
            </h4>
          </div>
          <div className="p-5 rounded-xl bg-gray-100 flex flex-col gap-y-2">
            {/* info card */}
            <div className="">
              <p className="font-medium">Email</p>
              <p>techtopic1234@gmail.com</p>
            </div>

            {/* info card */}
            <div>
              <p className="font-medium">Phone</p>
              <p>+91 7798111340</p>
            </div>

            {/* info card */}
            <div>
              <p className="font-medium">Joined Date </p>
              <p>15/07/2025</p>
            </div>

            {/* info card */}
            <div>
              <p className="font-medium">Gender</p>
              <p>{user?.gender}</p>
            </div>
          </div>
        </div>

        {/* logout, block report buttons */}
        <div className="pt-10">
          <div className="flex justify-center items-center">
            <button className="btn btn-soft btn-error text-lg font-normal rounded-lg">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
