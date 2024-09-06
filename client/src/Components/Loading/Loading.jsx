import FlexEvenly from "../FlexEvenly";
import "./load.css";
import "./load2.css";
import React from "react"; 
const Loading = () => {
  return (
    <FlexEvenly padding={"3rem"}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </FlexEvenly> 
  );
};

export default Loading;
