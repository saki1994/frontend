import React, { useState } from "react";
import TableHeading from "./TableHeading";
import TableList from "./TableList";
import Button from "./Button";
import TestBox from "./TestBox";
import updateData from "./axios/axiosUpdateData";
import { useEffect } from "react/cjs/react.development";
import "./stylesheet/TestBox/testBox.scss";

const Test = ({ allCards }) => {
  const [doTest, setDoTest] = useState(false);
  const [cardTest, setCardTest] = useState({});
  const [testResult, setTestResult] = useState(false);

  const startTest = (item) => {
    doTest ? setDoTest(false) : setDoTest(true);
    setCardTest(item);
  };

  const getAnswer = (item, answer) => {
    setTestResult(true);
    const polish = item.polish.toLowerCase();
    const testAnswer = answer;

    const { repeated, timesRepeated } = item.wordStatus;
    if (polish === testAnswer) {
      setCardTest((card) => {
        return {
          ...card,
          wordStatus: {
            needMemorizing: null,
            memorize: false,
            repeated: repeated,
            timesRepeated: timesRepeated
          }
        };
      });
    } else if (polish !== testAnswer) {
      setCardTest((card) => {
        return {
          ...card,
          wordStatus: {
            needMemorizing: false,
            memorize: true,
            repeated: true,
            timesRepeated: timesRepeated + 1
          }
        };
      });
    }
    setDoTest(false);
  };

  useEffect(() => {
    testResult && updateData(cardTest);
  });

  return (
    <div className="daily-list">
      <table>
        <thead>
          <tr>
            <TableHeading items={["#", "English", "Polish", "Result"]} />
          </tr>
          {allCards.map((card, index) => (
            <tr>
              <TableList
                key={card._id}
                items={[
                  index + 1,
                  card.english,
                  <Button
                    btnClickEvent={startTest}
                    item={card}
                    text="Click to start test..."
                  />
                ]}
              />
            </tr>
          ))}
        </thead>
      </table>
      {doTest && (
        <TestBox
          allCards={cardTest}
          getAnswer={getAnswer}
          closeTestBox={startTest}
          isBoxOpen={doTest}
        />
      )}
    </div>
  );
};

export default Test;
