import recast from "../../assets/recast.gif";
import "./RequestRecastVote.scss";
export default function RequestRecastVote() {
  console.info("request to cast vote again");
  let cnic = sessionStorage.getItem("cnic");
  return (
    <>
      <div
        className="img-div flex-col-center w-100 "
        style={{ backgroundColor: "white" }}
      >
        <div className="row flex-col-center w-100">
          <div className="bg-green  my-3  flex-col-center">
            <h4 className="details">{cnic}</h4>
            <h4 className="details">NA-54, Islamabad-III</h4>
            <h4 className="details">ISLAMABAD MODEL SCHOOL (I-V) G-11/1</h4>
          </div>
          <div className="flex-col-center w-25 border-dotted cast-time">
            Note: You can cast vote only 3 times
          </div>
          <h2 className="request-heading my-3" style={{ textAlign: "center" }}>
            Your request to cast vote again is sent. Please wait while we
            process your request
          </h2>
          <img src={recast} className="img-fluid" />
        </div>
      </div>
    </>
  );
}
