import React from "react";
import { BiUser } from "react-icons/bi";
import { AuthContext } from "../authContext";

const Header = () => {
  const { dispatch } = React.useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };

  return (
    <header className="flex w-full justify-between">
      <h1 className="text-[48px]">APP</h1>
      <button
        className="text-base flex gap-2 items-center bg-link rounded-[40px] py-3 px-6"
        onClick={handleLogout}
      >
        <BiUser />
        Logout
      </button>
    </header>
  );
};

export default Header;
