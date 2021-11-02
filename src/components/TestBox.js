import React, { useState } from "react";
import Button from "./Button";
import { useHistory } from "react-router-dom";

const TestBox = ({ card, saveAnswer }) => {
  const [isAnswering, setIsAnswering] = useState(false);
  const [showResult, setShowResut] = useState(false);
  const [answerInput, setAnswerInput] = useState("");
  const [result, setResult] = useState("");
  const [cardTest, setCardTest] = useState();
  const history = useHistory();

  const startTest = (item) => {
    setIsAnswering(true);
    setCardTest(item);
  };

  const checkAnswer = (item) => {
    const { polish } = item;
    const { repeated, timesRepeated } = item.wordStatus;

    if (polish.toLowerCase() === answerInput.toLowerCase()) {
      setResult("Correct");
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
    } else {
      setResult("Wrong");
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

    setShowResut(true);
    history.push(`/`);
  };

  const handleChange = (e) => {
    setAnswerInput(e.target.value);
  };

  const saveResult = () => {
    saveAnswer(cardTest);
  };
  return !showResult ? (
    <div className="test-div">
      <h6>"{card.english}"</h6>
      {!isAnswering ? (
        <Button btnClickEvent={startTest} item={card} text="Start Test" />
      ) : (
        <>
          <input onChange={handleChange} value={answerInput} />
          <Button btnClickEvent={checkAnswer} item={card} text="Check Answer" />
        </>
      )}
    </div>
  ) : (
    <div>
      <p>Your answer is {result}</p>
      {result === "Correct" ? (
        <>
          <p>
            <span>English: </span>
            {card.english}
          </p>
          <p>
            <span>Polish: </span>
            {card.polish}
          </p>
        </>
      ) : (
        <>
          <p>
            <span>Correct answer is: </span>
            {card.polish}
          </p>
          {answerInput === "" ? (
            <p>You didn't enter your answer</p>
          ) : (
            <p>Your answer is: {answerInput}</p>
          )}
        </>
      )}

      <button onClick={saveResult}>Save result</button>
    </div>
  );
};

export default TestBox;
