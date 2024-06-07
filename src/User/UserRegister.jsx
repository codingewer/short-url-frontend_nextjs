import React from "react";
import Register from "./Register";
import loadingico from "../assets/icons/loading.gif";
import TopBar from "../Bars/TopBar";
import { useSelector } from "react-redux";
import Image from "next/image";
function UserRegister() {
  const loading = useSelector((state) => state.users.loading);
  return (
    <>
      <TopBar />
      <div className="login-register">
        <div className="user-form-div">
              {loading && <Image className="loading-icon" src={loadingico} alt="" />}
            <Register />
        </div>
      </div>
    </>
  );
}

export default UserRegister;
