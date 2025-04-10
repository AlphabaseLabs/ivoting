import React from "react";
import Modal from "react-bootstrap/Modal";
import "./confirm.scss";

interface IProps {
  data: IObject;
  isOpen: boolean;
  closeModal: () => void;
  confirm: () => void;
}
interface IObject {
  name: string;
  img: string;
  label: string;
}

function ConfirmVote({ data, isOpen, closeModal, confirm }: IProps) {
  // console.info("Confirm Vote:", data);
  var { name, label, img } = data;
  return (
    <>
      <Modal
        show={isOpen}
        fullscreen="md-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="col-md-12">
            <div className="modal-heading py-4  flex-col-center">
              Please confirm your vote
            </div>
            <div className="flex-col-center my-4">
              <div className="modal-div   flex-row-center">
                <h4 className="cand-name my-auto">{name}</h4>
                <div className="cand-desc flex-col-center">
                  <img
                    className="cand-img"
                    src={img}
                    alt="candidate identification sign"
                  />

                  <label className="img-label mt-2">{label}</label>
                </div>
              </div>
            </div>
          </div>

          <div className="row no-gutters  w-100 " style={{ marginLeft: "0%" }}>
            <div className="col-md-6">
              <button
                className="modal-cancel-btn flex-col-center"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="modal-confirm-btn flex-col-center"
                onClick={confirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmVote;
