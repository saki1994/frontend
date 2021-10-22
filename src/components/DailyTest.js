/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { yesterday } from "./date.js";
import getAllData from "./axiosGetData.js";
import Button from "./Button.js";
import axios from "axios";
import { wordStatus } from "./variables/formData.js";

const DailyTest = () => { 
  const [data, setData] = useState();
  const [showData, setShowData] = useState(false);
  const [allList, setAllList] = useState([]);
  const [isTestGoing, setIsTestGoing] = useState(false);
  const [reviewAnswer, setReviewAnswer] = useState(false);
  const [testInput, setTestInput] = useState({
    _id: "",
    english: "",
    polish: "",
  });
  const [itemStatus, setItemStatus] = useState({
    wordStatus: wordStatus,
  });

  useEffect(() => {
    getAllData(setData);
    setAllList([]);
  }, []);
  //event btn for yesterday input
  const dailyTest = () => { 
    showData ? setShowData(false) : setShowData(true);
    const todayInputList = data.filter(
      (item) => !item.wordStatus.memorize  
    );
    setAllList(todayInputList);
  };

  //btn for starting the test
  const startTest = (item) => {
    setIsTestGoing(true);
    setTestInput((previous) => {
      return {
        ...previous,
        _id: item._id,
        english: item.english,
      };
    });

    const { memorize, repeated, timesRepeated } = item.wordStatus;
    setItemStatus({
      wordStatus: {
        memorize: memorize,
        repeated: repeated,
        timesRepeated: timesRepeated,
      },
    });
  };

  //event for polish input test
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTestInput((previous) => {
      return {
        ...previous,
        [name]: value.toLowerCase(),
      };
    });
  };

  //btn to check if answer is correct

  const checkAnswer = (e) => {
    setReviewAnswer(true);
    const [polishWord] = allList.filter((item) => testInput._id === item._id);
    const lowerCasePolish = polishWord.polish.toLowerCase();

    const { timesRepeated } = polishWord.wordStatus;

    if (lowerCasePolish === testInput.polish) {
      setItemStatus((previous) => {
        return {
          wordStatus: {
            ...previous.wordStatus,
            memorize: true,
          },
        };
      });
    } else {
      setItemStatus((previous) => {
        return {
          wordStatus: {
            memorize: false,
            repeated: true,
            timesRepeated: timesRepeated + 1,
          },
        };
      });
    }
  };

  const submitAnswer = () => {
    setReviewAnswer(false);
    const { _id } = testInput;

    if (_id) {
      axios
        .patch("https://sakirumatsu.herokuapp.com/", {
          _id: _id,
          wordStatus: itemStatus.wordStatus,
        })
        .then((res) => console.log(res));
    } else {
      console.log("wrong");
    } 
  };
 

  return (
    <div>
      <button onClick={dailyTest}>Daily Test</button>
      {
        showData && (
          <table>
        <thead>
          <tr>
            <th>#</th>
            <th>English</th>
            <th>Polish</th>
            <th>Start test</th>
            <th>Submit</th> 
          </tr>
        </thead>
        <thead>
          {allList.map((item, index) => {
            return (
              (item.wordStatus.repeated === false) |
                (item.wordStatus.timesRepeated >= 0) && (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.english}</td>
                  <td>
                    <input
                      onChange={handleChange}
                      type="text"
                      placeholder="click edit to start -->"
                      name="polish" 
                    />
                  </td>
                  <td>
                    <Button
                      btnClickEvent={startTest}
                      text="edit"
                      item={item}
                    />
                  </td>
                  <td><button onClick={checkAnswer}>Review</button></td> 
                </tr>
              )
            );
          })}
        </thead>
      </table> 
        )
      }
      {reviewAnswer && (
        <>
          <p>Please review your answer</p>
          <table>
            <thead>
              <tr>
                <th>English</th>
                <th>Polish</th>
              </tr>
              <tr>
                <th>{testInput.english}</th>
                <th>{testInput.polish}</th>
              </tr>
            </thead>
          </table>
          <button onClick={submitAnswer}>Look's good!</button>
        </>
      )}
    </div>
  );
};

export default DailyTest;
