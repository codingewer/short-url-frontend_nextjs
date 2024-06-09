import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import loadingico from "../assets/icons/loading.gif";
import { GetUrlfaqByIdAsync, UpdateUrlfaqByIdAsync } from "../Api/Faq/UrlFaqSlice";
import { useRouter } from "next/router";
import Image from "next/image";

function UpdateUrlFaq() {
  const dispatch = useDispatch();
  const faq = useSelector((state) => state.urlfaqs.data);
  const success = useSelector((state) => state.urlfaqs.success);
  const loading = useSelector((state) => state.urlfaqs.loading);
  const FaqFrom = useFormik({
    initialValues: {
      ID: "",
      Question: "",
      Answer: "",
    },
    onSubmit: async (values) => {
      await dispatch(UpdateUrlfaqByIdAsync(values));
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (success && faq !== null) {
      FaqFrom.setValues({
        ID: faq.ID,
        Question: faq.Question,
        Answer: faq.Answer,
        });
        } else {
      dispatch(GetUrlfaqByIdAsync(router.query.id));
    }
  }, [dispatch, faq]);
  console.log(faq);
  return (
    <div className="cp-data-container">
      <div className="faq-container">
        <form className="cp-details-form" onSubmit={FaqFrom.handleSubmit}>
          <h4>Sıkça Sorulan Sorular</h4>
          <label htmlFor="">Soru:</label>
          <textarea
            className="cp-form-inputs"
            type="text"
            name="Question"
            style={{ height: 200 }}
            value={FaqFrom.values.Question}
            onChange={FaqFrom.handleChange}
          />
          <label htmlFor="">Cevap:</label>
          <textarea
            className="cp-form-inputs"
            name="Answer"
            style={{ height: 200 }}
            value={FaqFrom.values.Answer}
            onChange={FaqFrom.handleChange}
          ></textarea>
          {loading && (
            
            <Image className="loading-icon" src={loadingico} alt="loading" />
          )}
          <button disabled={loading}  type="submit" className="cp-form-btn">
            Güncelle
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUrlFaq;
