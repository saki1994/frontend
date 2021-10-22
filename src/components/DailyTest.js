import React, { useState, useEffect } from "react";
import { yesterday } from "./date.js";
import getAllData from "./axiosGetData.js";
import Button from "./Button.js";
import axios from "axios";

const DailyTest = () => {
  const [data, setData] = useState();
  const [allList, setAllList] = useState([]);
  const [isTestGoing, setIsTestGoing] = useState(false);
  const [reviewAnswer, setReviewAnswer] = useState(false);
  const [testInput, setTestInput] = useState({
    _id: "",
    english: "",
    polish: "",
  });
  const [itemStatus, setItemStatus] = useState({
    wordStatus: {
      hasTested: false,
      repeated: false,
      timesRepeated: 0,
    },
  });

  useEffect(() => {
    getAllData(setData);
    setAllList([]);
  }, []);
  //event btn for yesterday input
  const yesterdayInputBtn = () => {
    const currentDate = yesterday;
    const todayInputList = data.filter(
      (item) => item.dateAdded === currentDate
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
        english: item.english
      };
    });

    setItemStatus({
      wordStatus: {
        hasTested: item.wordStatus.hasTested,
        repeated: item.wordStatus.requested,
        timesRepeated: item.wordStatus.timesRepeated,
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

    if (lowerCasePolish === testInput.polish) {
      setItemStatus((previous) => {
        return {
          wordStatus: { 
            hasTested: true,
            repeated: previous.wordStatus.repeated,
            timesRepeated: previous.wordStatus.timesRepeated,
          },
        };
      }); 
    } else {
      setItemStatus((previous) => {
        return {
          wordStatus: {
            hasTested: true,
            repeated: true,
            timesRepeated: previous.wordStatus.timesRepeated + 1,
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
  }

  return (
    <div>
      <button onClick={yesterdayInputBtn}>Click for Yesterday's input</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>English</th>
            <th>Polish</th>
            <th>Repeated times</th>
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
                    <Button
                      btnClickEvent={startTest}
                      text="Start test"
                      item={item}
                    />
                  </td>
                  <td>{item.wordStatus.timesRepeated}</td>
                </tr>
              )
            );
          })}
        </thead>
      </table>
      {isTestGoing && (
        <>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter Polish"
            name="polish"
            value={testInput.polish}
          />
          <button onClick={checkAnswer}>Review</button>
        </>
      )}
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
