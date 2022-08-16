import React, { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { getCountry } from "../CountryService";
import { editCountry } from "../CountryService";
import { useSelector, useDispatch } from "react-redux";
import { EditCountry1 } from "app/redux/actions/CountryAction";
import * as Yup from "yup";
import "./styles.scss";

function FormUpdate({ exit, id, loadCountries }) {
  const dispatch = useDispatch();
  const dataEdit = useSelector((state) => state.country);
  const [country, setData] = useState({ name: "", code: "", description: "" });
  useEffect(() => {
    async function dataCountry() {
      let data = await getCountry(id);
      setData(data.data);
    }

    dataCountry();
  }, [id]);

  useEffect(() => {
    if (dataEdit.length !== 0) {
      async function edit() {
        await editCountry(dataEdit[0]);
       
      }
      edit();
    }
  }, [dataEdit]);

  const formik = useFormik({
    initialValues: {
      name:country.name,
      code: country.code,
      description: country.description,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Tên quốc gia quá ngắn!")
        .max(15, "Tên quốc gia quá Dài!")
        .required("Bắt buộc"),
      code: Yup.string()
        .min(1, "code quá ngắn!")
        .max(5, "code quá dài!")
        .required("Bắt buộc"),
      description: Yup.string()
        .min(10, "description quá ngắn!")
        .max(30, "description quá dài!")
        .required("Bắt buộc"),
    }),

    onSubmit: (values) => {
      let data = { ...values };
      data = { ...data, id };
      dispatch(EditCountry1(data));
      exit(false);
    },
  });

  function handleClose() {
    exit(false);
  }
  return (
    <div className="row">
      <div className="col-md-12 box-background ">
        <div className="form-update ">
          <form onSubmit={formik.handleSubmit}>
            <div className="box-input">
              <label htmlFor="name">Name</label>
              <input
                autoComplete="off"
                id="name"
                name="name"
                type="text"
                defaultValue={country.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="warrming">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="box-input">
              <label htmlFor="code">Code</label>
              <input
                autoComplete="off"
                id="code"
                name="code"
                type="text"
                defaultValue={country.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.code && formik.errors.code ? (
                <div className="warrming">{formik.errors.code}</div>
              ) : null}
            </div>

            <div className="box-input">
              <label htmlFor="description">Description</label>
              <input
                autoComplete="off"
                id="description"
                name="description"
                type="text"
                defaultValue={country.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="warrming">{formik.errors.description}</div>
              ) : null}
            </div>
            <div>
              <button
                className="btn btn-danger  mr-3"
                onClick={() => handleClose()}
              >
                Thoát
              </button>
              <button className="btn btn-primary  mr-3" type="submit">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormUpdate;
