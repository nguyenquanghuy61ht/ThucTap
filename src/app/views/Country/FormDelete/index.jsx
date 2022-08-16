import React from "react";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import "./styles.scss";
export default observer( function FormDelete({ idDelete, setShowDelete}) {
  const { countryStore } = useStore();
  const {Delete} =countryStore
  function hadleBackDelete() {
    setShowDelete(false);
  }
 

  async function handleDelete() {
    Delete(idDelete);
    setShowDelete(false);
  }
  return (
    <div className="row">
      <div className="col-md-12  box-background">
        <div className="box-confirm ">
          <div className="mes-warrming">
            <p>Bạn thực sự muốn xóa quốc gia này?</p>
          </div>
          <button
            className="btn btn-cache btn-danger "
            onClick={hadleBackDelete}
          >
            Hủy
          </button>
          <button
            className="btn btn-confirm btn-primary "
            onClick={() => {
              handleDelete();
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
})


