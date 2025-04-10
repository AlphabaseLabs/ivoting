// @ts-nocheck
import React from "react";
import MaskedInput from "react-text-mask";
import { VotingState } from "../../Constants/enums";
import "./verify.scss";
function VerifyPhone(props: any) {
  const handleSubmit = () => {
    props.handleNext(VotingState.UPLOAD_PICTURE);
  };
  return (
    <>
      <div className="text-div mt-5 flex-col-center w-100">
        <h3 className="main-heading">Verify your mobile number</h3>
        <h4 className="sub-heading mt-4">
          Enter the 4-digit code sent to you at +92333542987
          <span className="span px-2">Edit number</span>
        </h4>

        <div className="form-div mb-5 mt-5 flex-col-center">
          <div className="input-div auto-width">
            <MaskedInput
              mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              guide={true}
              showMask={true}
              type="text"
              className="text-input"
              name="vCode"
              autoComplete="off"
            />
          </div>
          <h6 className="small-heading mt-4">Resend in 00:56</h6>
        </div>
        <div className="form-div mb-5 flex-col-center">
          <button className="form-btn disabled" onClick={handleSubmit}>
            Next
            {/* <i class="fas fa-arrow-right  mx-3"></i> */}
          </button>
        </div>
      </div>
    </>
  );
}

export default VerifyPhone;
