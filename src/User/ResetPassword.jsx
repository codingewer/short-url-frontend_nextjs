import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {  ResetPasswordAsync } from "../Api/User/UserSlice";
import TopBar from "../Bars/TopBar";
import loadingico from "../assets/icons/loading.gif";
import { useEffect } from 'react';
import React from "react";

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string().required("Yeni Şifre gerekli"),
  ConfirmPassword: Yup.string()
    .required("Yeni Onayı Şifre gerekli")
    .oneOf([Yup.ref("password"), null], "Şifreler uyuşmuyor"),
});
function ResetPassword() {
  const loading = useSelector((state) => state.users.loading);
  const success = useSelector((state) => state.users.success);
  const error = useSelector((state) => state.users.error);
  const {token} = useParams();
  const dispatch = useDispatch();
  const PasswordForm = useFormik({
    initialValues: {
      token:"",
      password: "",
      ConfirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: () => {
      dispatch(ResetPasswordAsync(PasswordForm.values));
      PasswordForm.resetForm();
      console.log("2323");
      return;
    },
  });
  useEffect(()=>{
    PasswordForm.setFieldValue("token", token)
  },[token])

  useEffect(() => {
    setTimeout(() => {
      success == true && (window.location.href = "/login");
    }, 2000);
  }, [success]);

  return (
    <>
      <TopBar />
      <div className="login-register">
        <div className="user-form-div">
          <div className="register-form-div">
            <form
              className="register-form"
              onSubmit={PasswordForm.handleSubmit}
            >
              {loading && (
                <img className="loading-icon" src={loadingico} alt="" />
              )}
              {success ? (
                <span style={{ color: "green" }}>
                  Şifre başarıyla güncellendi.
                </span>
              ) : (
                <span style={{ color: "red" }}>{error}</span>
              )}
              <label htmlFor="password">Yeni Şifre</label>
              <input
                type="password"
                name="password"
                value={PasswordForm.values.password}
                onChange={PasswordForm.handleChange}
              />
              {PasswordForm.errors.password &&
              PasswordForm.touched.password ? (
                <div style={{color:"red"}} >{PasswordForm.errors.password}</div>
              ) : null}
              <label htmlFor="ConfirmPassword">Yeni Şifre Onayı</label>
              <input
                type="password"
                name="ConfirmPassword"
                value={PasswordForm.values.ConfirmPassword}
                onChange={PasswordForm.handleChange}
              />
              {PasswordForm.errors.ConfirmPassword &&
              PasswordForm.touched.ConfirmPassword ? (
                <div style={{color:"red"}} >{PasswordForm.errors.ConfirmPassword}</div>
              ) : null}
              <button className="form-btn" type="submit">
                Güncelle
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
