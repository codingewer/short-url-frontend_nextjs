import React, { useState } from "react";
import userico from "../assets/icons/icons8-login-50 1.svg";
import signinico from "../assets/icons/icons8-user-48 1.svg";

import logo from "../assets/imgs/logo.png"
import logouticon from "../assets/icons/logout.png";
import Link from "next/link";
import chartico from "../assets/icons/chartico.svg";
import shorturlico from "../assets/icons/shorturlico.svg";
import walletico from "../assets/icons/walletico.svg";
import supportico from "../assets/icons/supportico.svg";
import settingsico from "../assets/icons/settings.svg";
import Image from "next/image";

function SideBar() {
  var logined;
  var user;
  if (typeof localStorage !== "undefined") {
    logined = Boolean(localStorage.getItem("logined"));
    user = JSON.parse(localStorage.getItem("user"));
  }
  const [selected, setSelect] = useState("/");
  const handlelogout = () => {
    localStorage.removeItem("logined");
    localStorage.removeItem("user");
    alert("Çıkış yapıldı");
    window.location.href = "";
  };
  const handleActiveLink = (select) => {
    const linksMenu = document.getElementById("side-bar-options");
    linksMenu.classList.remove("side-bar-open");
    setSelect(select);
  };

  return (
    <div id="side-bar-options" className="side-bar mobile-side-bar">
      <Link
        style={{
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          top: 12,
        }}
        href="/"
        onClick={() => handleActiveLink("/")}
        relative="path"
      >
        <Image
          style={{
            borderRadius: 12,
            width: "48px",
            height: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="logo-1-icon"
          loading="lazy"
          alt=""
          src={logo}
        />
      </Link>
      {!logined && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            position: "relative",
            gap: 24,
            top: 24,
            width: "80%",
          }}
        >
          <Link
            style={{
              display: "flex",
              justifyContent: "flex-start",
              position: "relative",
              top: 12,
              color: "#B888FF",
              backgroundColor: "#464a5f",
              width: "100%",
            }}
            href="/login"
            onClick={() => handleActiveLink("/")}
            className="bar-btn1"
          >
            <Image className="icons8-user-48-1" alt="" src={userico} />
            <div className="kayt-ol-wrapper">
              <div
                style={{
                  color: "#B888FF",
                }}
                className="kayt-ol"
              >
                Giriş Yap
              </div>
            </div>
          </Link>
          <Link
            style={{
              display: "flex",
              justifyContent: "flex-start",
              position: "relative",
              top: 12,
              color: "#B888FF",
              backgroundColor: "#464a5f",
              width: "100%",
            }}
            href="/register"
            onClick={() => handleActiveLink("/")}
            className="bar-btn1"
          >
            <Image className="icons8-user-48-1" alt="" src={signinico} />
            <div className="kayt-ol-wrapper">
              <div
                style={{
                  color: "#B888FF",
                }}
                className="kayt-ol"
              >
                Kayıt Ol
              </div>
            </div>
          </Link>
        </div>
      )}
      {logined && (
        <div className="side-bar-navs">
          <Link
            href="/dashboard"
            onClick={() => handleActiveLink("/dashboard")}
            className={
              selected === "/dashboard"
                ? "side-bar-item side-bar-item-active"
                : "side-bar-item"
            }
          >
            <Image
              style={{
                height: 32,
                width: 32,
              }}
              src={chartico}
              alt=""
            />
            İstatikler
          </Link>

          <Link
            href="/dashboard/?section=shorturl"
            onClick={() => handleActiveLink("shorturl")}
            className={
              selected === "shorturl"
                ? "side-bar-item side-bar-item-active"
                : "side-bar-item"
            }
          >
            <Image
              style={{
                height: 32,
                width: 32,
              }}
              src={shorturlico}
              alt=""
            />
            Link Kısalt
          </Link>

          <Link
            href="/dashboard/?section=balance"
            onClick={() => handleActiveLink("balance")}
            className={
              selected === "balance"
                ? "side-bar-item side-bar-item-active"
                : "side-bar-item"
            }
          >
            <Image
              style={{
                height: 32,
                width: 32,
              }}
              src={walletico}
              alt=""
            />
            Bakiye
          </Link>

          <Link
            href="/dashboard/?section=help"
            onClick={() => handleActiveLink("help")}
            className={
              selected === "help"
                ? "side-bar-item side-bar-item-active"
                : "side-bar-item"
            }
          >
            <Image
              style={{
                height: 24,
                width: 32,
              }}
              src={supportico}
              alt=""
            />
            Destek
          </Link>

          <Link
            href="/dashboard/?section=settings"
            onClick={() => handleActiveLink("settings")}
            className={
              selected === "settings"
                ? "side-bar-item side-bar-item-active"
                : "side-bar-item"
            }
          >
            <Image
              style={{
                height: 24,
                width: 32,
              }}
              src={settingsico}
              alt=""
            />
            Ayarlar
          </Link>

          {user.Role === "admin" && (
            <Link
              href="/controlpanel"
              onClick={() => handleActiveLink("/controlpanel")}
              className="side-bar-item"
            >
              Control Panel
            </Link>
          )}
        </div>
      )}
      {!logined && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            top: 96,
            width: "75%",
            padding: 24,
            gap: 24,
            borderTop: "solid 1px #B888FF",
          }}
        >
          <Link
            style={{
              color: "#B888FF",
              textDecoration: "none",
              fontWeight: 700,
            }}
            onClick={() => handleActiveLink(".")}
            href="/aboutus"
          >
            Hakkımızda
          </Link>
          <Link
            style={{
              color: "#B888FF",
              textDecoration: "none",
              fontWeight: 700,
            }}
            onClick={() => handleActiveLink(".")}
            href="/contactus"
          >
            İletişim
          </Link>
          <Link
            style={{
              color: "#B888FF",
              textDecoration: "none",
              fontWeight: 700,
            }}
            onClick={() => handleActiveLink(".")}
            href="/terms"
          >
            Kullanım Şartları
          </Link>
          <Link
            style={{
              color: "#B888FF",
              textDecoration: "none",
              fontWeight: 700,
            }}
            onClick={() => handleActiveLink(".")}
            href="/privacy"
          >
            Gizlilik Politikası
          </Link>
          <Link
            style={{
              color: "#B888FF",
              textDecoration: "none",
              fontWeight: 700,
            }}
            onClick={() => handleActiveLink(".")}
            href="/paid"
          >
            Ödeme Kanıtları
          </Link>
          <Link
            style={{
              color: "#B888FF",
              textDecoration: "none",
              fontWeight: 700,
            }}
            onClick={() => handleActiveLink(".")}
            href="/faq"
          >
            S.S.S
          </Link>
        </div>
      )}
      <div
        style={{
          display: "flex",
          width: "calc(100% - 24px )",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          position: "absolute",
          bottom: 24,
        }}
      >
        {logined && (
          <button
            style={{ color: "orange" }}
            className="edit-btn"
            onClick={handlelogout}
          >
            Çıkış Yap
            <Image src={logouticon} alt="Güncelle" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SideBar;
