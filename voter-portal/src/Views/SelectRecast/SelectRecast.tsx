import "./selectcast.scss";
function SelectRecast() {
  console.info("select NA/PA FOR VOTE AGAIN");
  let cnic = sessionStorage.getItem("cnic");
  return (
    <>
      <div
        className="img-div flex-col-center w-100  "
        style={{ backgroundColor: "white" }}
      >
        <div className="row flex-col-center w-100">
          <div className="bg-green  my-4  flex-col-center">
            <h4 className="details">{cnic}</h4>
            <h4 className="details">NA-54, Islamabad-III</h4>
            <h4 className="details">ISLAMABAD MODEL SCHOOL (I-V) G-11/1</h4>
          </div>

          <h2 className="para-heading my-4" style={{ textAlign: "center" }}>
            Select Constituency to recast vote
          </h2>
          <div className="flex-row-center my-5">
            <button className="form-btn">
              National Assembly
              <i className="fas fa-arrow-right  mx-3"></i>
            </button>
            <br></br>
            <button className="white-btn">
              Provincial Assembly
              <i className="fas fa-arrow-right  mx-3"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectRecast;
