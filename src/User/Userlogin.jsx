import React from "react";
import Login from "./Login";
import loadingico from "../assets/icons/loading.gif";
import TopBar from "../Bars/TopBar";
import { useSelector } from "react-redux";
import Image from "next/image";
function Userlogin() {
  const OpenForm = (id, id2) => {
    document.getElementById(id).style.display = "block";
    document.getElementById(id2).style.display = "none";
  };
  const loading = useSelector((state) => state.users.loading);

  return (
    <div>
      <TopBar />
      <div className="login-register">
        <div className="user-form-div">
              {loading && <Image className="loading-icon" src={loadingico} alt="" />}
            <Login />
        </div>
      </div>
    </div>
  );
}

export default Userlogin;
