import { GoHomeFill } from "react-icons/go";
import { IoMdPersonAdd } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice.js";
import { useDispatch } from "react-redux";

const Sidebar = () => {

  // dispatch
  const dispatch = useDispatch();


  return (
    <div className="h-full p-1.5 py-10">
      <div className="h-full w-20 bg-[#957fef] rounded-xl flex flex-col justify-between items-center-safe py-10">
        <div className="flex flex-col gap-y-7">
          <GoHomeFill size={32} />
          <IoMdPersonAdd size={32} />
          <IoChatbox size={32} />
          <IoMdSettings size={32} />
          <FaStar size={32} />
        </div>
        <div className="flex flex-col gap-y-7 justify-center items-center">
          <div>
            <Link to="/profile">
              <img
                src="https://avatar.iran.liara.run/public/boy"
                alt=""
                className="w-14"
              />
            </Link>
          </div>
          <MdLogout size={32} onClick={() => dispatch(logout())} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
