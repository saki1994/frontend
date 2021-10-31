import React from "react";
import TestBox from "./TestBox";
import updateData from "./axios/axiosUpdateData";
import "./stylesheet/Test/test.scss";

const Test = ({ allCards }) => {
  const saveAnswer = (answer) => {
    updateData(answer);
  };

  return (
    <div className="text-container">
      {allCards.map((card, index) => {
        return (
          <TestBox
            key={card._id}
            card={card}
            index={index}
            saveAnswer={saveAnswer}
          />
        );
      })}
    </div>
  );
};

export default Test;
