import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoginAsync } from "../Api/User/UserSlice";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";

const validationSchema = Yup.object({
  userName: Yup.string().required("Kullanıcı adı gerekli"),
  password: Yup.string().required("Şifre gerekli"),
  isVerified: Yup.boolean().required("ReCAPTCHA Doğrulaması gerekli"),
});
function Login() {
  const success = useSelector((state) => state.users.logined);
  const error = useSelector((state) => state.users.error);
  var logined;
  if (typeof localStorage !== "undefined") {
    logined = localStorage.getItem("logined");
  }
  const status = logined || success;
  const dispatch = useDispatch();

  const handleVerify = (response) => {
    formik.setFieldValue("isVerified", true);
    console.log("doğrulandı");
  };

  const handleExpired = () => {
    formik.setFieldValue("isVerified", false);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      isVerified: null,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      dispatch(LoginAsync(formik.values));
    },
  });
  const sitedata = useSelector((state) => state.settings.data);
  const sitedatasuccess = useSelector((state) => state.settings.success);
  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
  }, [dispatch]);
  const data =
    sitedata !== null
      ? sitedata
      : {
          ReChapchaCode: "",
        };
  return (
    //SAyfa tasarımı
    <div className="register-form-div">
      <form className="register-form" onSubmit={formik.handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h3>Giriş Yap</h3>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          placeholder="Kullanıcı adı"
        />
        {formik.errors.userName && formik.touched.userName ? (
          <div style={{ color: "red" }}>{formik.errors.userName}</div>
        ) : null}
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Şifre"
        />
        {formik.errors.password && formik.touched.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}
        {sitedatasuccess && (
          <ReCAPTCHA
            sitekey={data.ReChapchaCode}
            name="isVerified"
            value={formik.values.isVerified}
            onChange={handleVerify}
            onExpired={handleExpired}
          />
        )}
        {formik.errors.isVerified && formik.touched.isVerified ? (
          <div style={{ color: "red" }}>{formik.errors.isVerified}</div>
        ) : null}
        <br />
        <br />
        <br />
        <Link href="/forgotpassword">Şifremi unuttum?</Link>
        <button className="form-btn" type="submit">
          Giriş yap{" "}
        </button>
        <Link
          style={{ textDecoration: "none", fontWeight: 700, fontSize: 18 }}
          href="/register"
        >
          Kayıt Ol
        </Link>
      </form>
      {status && (window.location.href = "/dashboard")}
    </div>
  );
}

export default Login;
