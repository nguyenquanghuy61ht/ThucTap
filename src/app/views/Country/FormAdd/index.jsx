import React from "react";
import { useStore } from "app/stores";
import { useFormik } from "formik";
import { observer } from "mobx-react";
import * as Yup from "yup";
import "./styles.scss";
export default observer(function FormAdd({ exit }) {
 
  const { countryStore } = useStore();
  const thisStore = countryStore;

  /////
  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      description: "",
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
      thisStore.Create(values);
      exit(false);
    },
  });

  function handleExit() {
    exit(false);
  }
  return (
    <>
      <div className="row">
        <div className="col-md-12 box-background ">
          <div className="form-add ">
            <form onSubmit={formik.handleSubmit}>
              <div className="box-input">
                <label htmlFor="name">Name</label>
                <input
                  autoComplete="off"
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.code}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="warrming">{formik.errors.description}</div>
                ) : null}
              </div>
              <div>
                <button className="btn btn-danger" onClick={handleExit}>
                  Thoát
                </button>
                <button className="btn btn-primary " type="submit">
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});
