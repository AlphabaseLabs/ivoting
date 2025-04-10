// @ts-nocheck
import { useState } from "react";
import { connect } from "react-redux";
import "./votingpanel.scss";
import { indexStore } from "../../Store/indexStore";
import { candidatesList } from "../../Constants/candidates";
import ConfirmVote from "../ConfirmVote/ConfirmVote";
import { delay } from "../../Util/helper";
import { castYesVote } from "../../Services/ballotService";
import VotingScreen from "../VotingScreen/VotingScreen";
import LoadingPage from "../LoadingPage/LoadingPage";
import recast from "../../assets/recast.gif";

interface IObject {
  name: string;
  img: string;
  label: string;
}
interface IProps {
  nextStep(votingArea: string): void;
  constituency: string;
  contract: any;
  account: string;
  connectionNodeUrl: string;
  second: boolean;
}
function VotingPanel({
  nextStep,
  constituency,
  contract,
  account,
  connectionNodeUrl,
  second = false,
}: IProps) {
  console.info("in voting panel");

  const voterState = indexStore();
  const [isopen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [candSelected, setCandSelected] = useState<boolean>(false);
  const [candSelectedData, setCandSelectedData] = useState<IObject>(
    {} as IObject
  );

  const [modalData, setModalData] = useState<IObject>({} as IObject);
  const handleModal = () => {
    setIsOpen(!isopen);
    setCandSelected(!candSelected);
  };
  const modalSetting = (data: { name: string; img: string; label: string }) => {
    setCandSelectedData(data);
    setModalData(data);
    handleModal();
  };
  const submitVote = async () => {
    setLoading(true);
    setIsOpen(false);
    if (contract.length !== "" && account !== "" && connectionNodeUrl !== "") {
      try {
        // console.info("OK LET ME LOG. CONTRACT: ", contract);
        // console.info("OK LET ME LOG. account: ", account);
        // console.info("OK LET ME LOG. connectionNodeUrl: ", connectionNodeUrl);

        const res: any = await castYesVote(contract, {
          wallet: account,
          connectionNodeUrl: connectionNodeUrl,
        });
        console.info("Your Vote was submitted successfully", res);
        await delay(5000);
        const voteTx = {
          blockHash: res.blockHash,
          blockNumber: res.blockNumber,
          from: res.from,
          to: res.to,
          transactionHash: res.transactionHash,
        };

        sessionStorage.setItem("voteTx", JSON.stringify(voteTx));
        localStorage.removeItem("ballot");
        setLoading(false);
        nextStep(constituency == "National Assembly" ? "Partial" : "Done");
      } catch (error) {
        setLoading(true);
        console.info("Unable to submit your vote.", error);
      }
    } else {
      <LoadingPage />;
    }
  };

  return (
    <>
      <VotingScreen second={second} />
      {/* {loading ? (
        <div className="flex-col-center  ">
          <img src={recast} className="img-fluid" />
          <h2 className="spinner-heading my-3">
            Please wait while we submit your vote
          </h2>
        </div>
      ) : (
        <div className="row flex-col-center w-100">
          <div className="col-12 w-100 flex-col-center ">
            <div className="vote-cast-div flex-col-center">
              <div className="detail-div   w-100">
                <div className="row w-100 flex-col-center">
                  <div className="col-xxl-4 my-2 col-lg-8 col-12">
                    <div className="bg-green flex-row-center">
                      <h4 className="details mr-5 mt-2 ">
                        ISLAMABAD MODEL SCHOOL (I-V) G-11/1
                      </h4>
                      <h4 className="details  mt-2">NA-54, Islamabad-III</h4>
                    </div>
                  </div>
                </div>

                <div className="largerScreens w-100 d-none d-xl-block">
                  <div className="flex-row-center row mt-2">
                    <div className="col-6 ">
                      <label className="form-label ">
                        Select
                        {" " + constituency + " "}
                        candidate to cast vote
                      </label>
                    </div>
                    <div className=" col-6 ">
                      <i className="fa fa-search icon"></i>
                      <input
                        className="search-input"
                        placeholder="Search"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="smallerScreen w-100 d-block d-xl-none">
                  <div className="flex-row-center row ">
                    <div className="col-12 ">
                      <label className="form-label flex-col-center mt-3 ">
                        Select
                        {" " + constituency + " "}
                        candidate to cast vote
                      </label>
                    </div>
                    <div className="col-12 flex-col-start">
                      <i className="fa fa-search icon"></i>
                      <input
                        className="search-input"
                        placeholder="Search"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="candidates-div w-100 p-3">
                  <div
                    className=" w-100 row  scroll-div"
                    style={{ maxHeight: "300px" }}
                  >
                    {candidatesList.map((item, index) => {
                      return (
                        <div
                          className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-6 mt-2"
                          key={index}
                        >
                          <div
                            className="sub-div flex-row-center"
                            onClick={() => modalSetting(item)}
                          >
                            <img
                              className="cand-img mr-3"
                              src={item.img}
                              alt="candidate party sign"
                            />
                            <h4 className="cand-name my-auto">{item.name}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isopen && (
        <ConfirmVote
          data={modalData}
          isOpen={isopen}
          closeModal={handleModal}
          confirm={submitVote}
        />
      )} */}
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    contract: state.rootReducer.contract,
    account: state.rootReducer.account,
    connectionNodeUrl: state.rootReducer.connectionNodeUrl,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(VotingPanel);
