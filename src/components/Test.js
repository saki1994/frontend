import React, { useState } from "react";
import TableHeading from "./TableHeading";
import TableList from "./TableList";
import Button from "./Button";
import TestBox from "./TestBox";
import updateData from "./axios/axiosUpdateData";
import { useEffect } from "react/cjs/react.development";
import { wordStatus } from "./variables/formData";

const Test = ({ allCards }) => {
  const [doTest, setDoTest] = useState(false);
  const [cardTest, setCardTest] = useState({});
  const [testResult, setTestResult] = useState(false); 

  const startTest = (item) => {
    setDoTest(true);
    setCardTest(item);
  };

  const getAnswer = (item, answer) => {
    setTestResult(true);
    const polish = item.polish.toLowerCase();
    const testAnswer = answer.toLowerCase();  

    const {repeated, timesRepeated} = item.wordStatus;
    if (polish === testAnswer) {
      setCardTest(card => {
        return {
          ...card,
          wordStatus: { 
            needMemorizing: false,
            memorize: false,
            repeated: repeated,
            timesRepeated: timesRepeated
          }
        }
      })
    } else {
      setCardTest(card => {
        return {
          ...card,
          wordStatus: { 
            ...wordStatus,
            needMemorizing: true,
            repeated: true,
            timesRepeated: timesRepeated + 1
          }
        }
      })
    } 
    setDoTest(false);
  };

  useEffect(() => {
    testResult && updateData(cardTest); 
  })
 

  return (
    <div>
      <table>
        <thead>
          <tr>
            <TableHeading items={["#", "English", "Polish", "Submit"]} />
          </tr>
          {allCards.map((card, index) => {
            return (
              <tr key={card._id}>
                <TableList
                  items={[
                    index + 1,
                    card.english,
                    <Button
                      btnClickEvent={startTest}
                      item={card}
                      text="Ready?"
                    />,
                  ]}
                />
              </tr>
            );
          })}
        </thead>
      </table>
      {doTest && <TestBox allCards={cardTest} getAnswer={getAnswer} />}
    </div>
  );
};

export default Test;
