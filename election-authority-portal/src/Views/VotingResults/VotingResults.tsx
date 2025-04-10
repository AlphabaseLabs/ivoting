import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { candidatesList } from "./candidates.js";
import "./results.scss";
function VotingResults(props: any) {
  return (
    <>
      <div
        className="border-div w-100   mb-3 "
        style={{ height: "58vh", backgroundColor: "white" }}
      >
        <h2 className="result-heading">Voting Results</h2>
        <Tabs className="tabs-ul flex-col-center mt-4">
          <TabList>
            <Tab>National Assembly</Tab>
            <Tab>Provisional Assembly</Tab>
            <div className="tab-block"></div>
          </TabList>
          <TabPanel></TabPanel>

          <TabPanel></TabPanel>
        </Tabs>
        <div className="block-div w-100 mb-2  ">
          <div className="left w-50">
            <h5 className="cand-tally">
              Total Candidates : <span>210</span>
            </h5>
          </div>
          <div className="right w-50 ">
            <input
              className="search-input"
              placeholder="Search candidate here"
            />
          </div>
        </div>
        <div className="row flex-row-center w-100   ">
          {candidatesList.map((item, index) => {
            return (
              <div className="col-3 mt-3  " key={index}>
                <div
                  className="sub-div flex-col-center p-2 mr-3"
                  // onClick={() => handleModal(item)}
                >
                  <img className="cand-img mb-2" src={item.img} />
                  <h4 className="cand-name  ">{item.name}</h4>

                  <label className="img-label  ">{item.label}</label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default VotingResults;
