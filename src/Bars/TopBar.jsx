import React, { useEffect, useState } from "react";
import logo from "../../public/logo.jpeg";
import userico from "../assets/icons/icons8-login-50 1.svg";
import signinico from "../assets/icons/icons8-user-48 1.svg";
import menuico from "../assets/icons/menu-ico.svg";
import Link from "next/link";
import Image from "next/image";
function TopBar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  var user;
  if (typeof localStorage !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const [isToggled, setToggled] = useState(true);
  const handleTogleMenu = () => {
    const linksMenu = document.getElementById("side-bar-options");
    setToggled(!isToggled);
    isToggled
      ? linksMenu.classList.add("side-bar-open")
      : linksMenu.classList.remove("side-bar-open");
  };
  var logined;
  if (typeof localStorage !== "undefined") {
    logined = Boolean(localStorage.getItem("logined"));
  }
  console.log(isToggled);
  return (
    <div className="top-bar-container">
      <div className="top-bar">
        <Link href="/" relative="path">
          <Image className="logo-1-icon" loading="lazy" alt="" src={logo} />
        </Link>
        <div className="component-1">
          <div className="component-1-child" />
          <div className="component-1-item" />
          <div className="component-1-inner" />
        </div>
        <div className="top-bar-inner">
          <div className="frame-parent-top">
            {user && user.Role === "admin" && (
              <div className="deme-kantlar-container">
                <Link href="/controlpanel" className="deme-kantlar">
                  Controlpanel
                </Link>
              </div>
            )}
            <div className="deme-kantlar-container">
              <Link href="/aboutus" className="deme-kantlar">
                Hakkımızda
              </Link>
            </div>
            <div className="deme-kantlar-container">
              <Link href="/paid" className="deme-kantlar">
                Ödeme Kanıtları
              </Link>
            </div>
            <div className="deme-kantlar-container">
              <Link href="/contactus" className="deme-kantlar">
                İletişim
              </Link>
            </div>
            <div className="button-bar">
              <button className="bar-btn">
                <Image
                  className="icons8-login-50-1"
                  alt=""
                  src={logined ? signinico : userico}
                />
                <div className="giri-yap-wrapper">
                  <Link
                    className="giri-yap"
                    href={logined ? "/dashboard" : "/login"}
                    relative="path"
                  >
                    {logined ? "Dashbord" : "Giriş Yap"}
                  </Link>
                </div>
              </button>
              {!logined && (
                <Link href="/register" className="bar-btn1">
                  <Image className="icons8-user-48-1" alt="" src={signinico} />
                  <div className="kayt-ol-wrapper">
                    <div className="kayt-ol">Kayıt Ol</div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <button className="menu-btn" onClick={handleTogleMenu}>
          <Image className="menu-ico" alt="menu" src={menuico} />
        </button>
      </div>
    </div>
  );
}

export default TopBar;
