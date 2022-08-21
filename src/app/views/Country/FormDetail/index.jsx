import React from "react";
import { useEffect, useState } from "react";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles.scss";
function FormDetail({ exit, iddetail }) {
  const { countryStore } = useStore();
  const { Get } = countryStore;
  const [data, setData] = useState({ name: "", code: "", description: "" });
  useEffect(() => {
    (async () => {
      const data1 = await Get(iddetail);
      setData(data1.data);
    })();
  }, [Get, iddetail]);

  return (
    <>
      <div className="row">
        <div className="col-md-12  box-background">
          <div className="box-confirm ">
            <Form>
              <div className="box-title">
                <h3>Xem Chi tiết</h3>
              </div>
              <Form.Group className="input d-flex flex-column m-auto pb-10 ">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" defaultValue={data.name} disabled />
              </Form.Group>

              <Form.Group className="input d-flex flex-column m-auto pb-10">
                <Form.Label>Code</Form.Label>
                <Form.Control type="text" defaultValue={data.code} disabled />
              </Form.Group>
              <Form.Group className="input d-flex flex-column m-auto pb-10">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={data.description}
                  disabled
                />
              </Form.Group>
            </Form>
            <div className="button">
              <Button
                className="exit"
                variant="danger"
                type="submit"
                onClick={() => {
                  exit(false);
                }}
              >
                Thoát
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(FormDetail);
