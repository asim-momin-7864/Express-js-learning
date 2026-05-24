import React, { useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import ContactCard from "../components/ContactCard";
import { getContacts } from "../features/contacts/contactAPI.js";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  // dispatch
  const dispatch = useDispatch();

  // useSelector
  const { contacts, loading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  // console.log("Test contacts =>", contacts);

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden">
      {/* navbar and heading and options  */}
      <div className="bg-gray-50 flex flex-col mt-5">
        {/* heading and option  */}
        <div className="flex justify-between items-center px-5">
          <h1 className="text-3xl font-semibold text-[#7161ef] ">Messages</h1>
          <BiDotsVerticalRounded size={22} />
        </div>

        {/* searchbar */}
        <div className="h-20 flex justify-center items-center px-3 ">
          <input
            type="search"
            placeholder="Search Contacts"
            className="w-full rounded-s-full text-lg h-13 px-5 outline-0 text-black border-0 bg-gray-100"
          />
          <button className="btn rounded-e-full rounded-s-none h-13 bg-gray-100 border-0 outline-0 ">
            <IoSearch size={25} color={"#7161ef"} />
          </button>
        </div>
      </div>

      {/* contacts lists area outer layer with fixed size  */}
      <div className="flex-1 flex flex-col px-5 gap-y-1 overflow-auto">
        {contacts.map((contact) => {
          return <ContactCard user={contact} key={`${contact._id}`}/>;
        })}
      </div>
    </div>
  );
};

export default Home;
