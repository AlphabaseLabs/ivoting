import "./header.scss";
import ecpEng from "../../assets/ecp.svg";
import ecpUrdu from "../../assets/name.svg";
import bgHeader from "../../assets/bgHeader.svg";

export default function Header() {
  return (
    <>
      {/* SMALLER SCREENS XS AND SM */}
      <div className="header-image w-100">
        <div className="smallerScreen w-100 d-block d-sm-none">
          <div className="row py-1 w-100 g-0 no-gutters">
            {/* <div className="  col-3  ">
              <div className="d-flex justify-content-center align-items-center mt-1">
                <img src={ecpUrdu} alt="ecp" className="ecpLogo  " />
              </div>
            </div>
            <div className="  col-9  d-flex justify-content-center align-items-center ">
              <img src={ecpEng} alt="ecp" className="img-ecp" />
            </div> */}
          </div>
        </div>

        {/* LARGER SCREENS XS AND SM */}
        <div className="largerScreens w-100 d-none d-sm-block">
          <div className="row w-100 py-2">
            {/* <div className="col-6 justify-content-start">
              <img src={ecpEng} alt="ecp" className="img-ecp" />
            </div>

            <div className="col-6   d-flex justify-content-end ">
              <img src={ecpUrdu} alt="name" className="img  " />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
