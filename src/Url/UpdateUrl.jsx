import React, { useEffect } from "react";
import sendicon from "../assets/icons/send-icon.png";
import loadingicon from "../assets/icons/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUrlByIdAsync,
  UpdateUrlByIdAsync,
} from "../Api/Url/UrlSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router";
import { useRouter } from "next/router";
import Image from "next/image";

const validationSchema = yup.object({
  OrginalUrl: yup.string().required("Url boş olamaz"),
});

function UpdateUrl() {
  const url = useSelector((state) => state.url.url);
  const success = useSelector((state) => state.url.success);
  const loading = useSelector((state) => state.url.loading);
  const error = useSelector((state) => state.url.error);
  const status = useSelector((state) => state.url.success);
  const message = useSelector((state) => state.url.message);
  const dispatch = useDispatch();
  const router =useRouter()
  const formik = useFormik({
    initialValues: {
      ID: router.query.id,
      OrginalUrl: "",
      Description: "",
      ShortenedUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      dispatch(UpdateUrlByIdAsync(formik.values));
    },
  });

  useEffect(() => {
    if (success && url !== null) {
      formik.setValues({
        ID: router.query.id,
        OrginalUrl: url.OrginalUrl,
        Description: url.Description,
        ShortenedUrl: url.ShortenedUrl,
      });
    }else{

      dispatch(GetUrlByIdAsync(router.query.id))
    }
  }, [dispatch, url]);
  
  return (
    <div className="short-url-container">
      <form className="short-url-form" onSubmit={formik.handleSubmit}>
        {status ? (
          <span style={{ color: "green", textAlign: "center" }}>{message}</span>
        ) : (
          <span style={{ color: "red", textAlign: "center" }}>{error}</span>
        )}
        {loading && <Image src={loadingicon} className="loading-icon" />}
        <input
          className="url-input shorturl-form-input"
          type="text"
          name="OrginalUrl"
          id="OrginalUrl"
          onChange={formik.handleChange}
          value={formik.values.OrginalUrl}
          placeholder="Url(zorunlu)"
        />
        <div className="inputs-and-btn">
          <label htmlFor="ShortenedUrl">Başlık</label>
          <input
            type="text"
            name="ShortenedUrl"
            className="shorturl-form-input sui1"
            onChange={formik.handleChange}
            value={formik.values.ShortenedUrl}
            placeholder="Başlık(opsiyonel)"
          />
          <label htmlFor="Description">Açıklama</label>
          <input
            type="text"
            name="Description"
            className="shorturl-form-input sui1"
            onChange={formik.handleChange}
            value={formik.values.Description}
            placeholder="Açıklama(opsiyonel)"
          />
          <button className="form-short-btn" type="submit">
            <Image src={sendicon} alt="" />
          </button>
        </div>
        {formik.errors.OrginalUrl && formik.touched.OrginalUrl ? (
          <span className="error-message">{formik.errors.OrginalUrl}</span>
        ) : null}
      </form>
    </div>
  );
}

export default UpdateUrl;
