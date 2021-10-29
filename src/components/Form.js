import React, { useState } from "react";
import formData from "./variables/formData";
import sendNewCard from "./axios/axiosSendData";
import "./stylesheet/Form/form.scss";
import DailyCardList from "./DailyCardList";

const Form = ({ dataLength, todayCards }) => {
  const [newInput, setNewInput] = useState(formData);
  const [showNewInput, setShowNewInput] = useState(false);
  const [allNewInput, setAllNewInput] = useState([]);

  //handle and save changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInput((previous) => {
      return {
        ...previous,
        [name]: value.toLowerCase()
      };
    });
    e.preventDefault();
  };

  //Send new card input
  const submitInput = (e) => {
    setShowNewInput(true);
    sendNewCard(newInput);
    setAllNewInput((prev) => [...prev, newInput]);
    e.preventDefault();
  };

  return (
    <>
      {dataLength <= 10 ? (
        <form>
          <input
            onChange={handleChange}
            type="text"
            name="english"
            value={newInput.english}
            placeholder="Enter English word"
          />
          <input
            onChange={handleChange}
            type="text"
            name="polish"
            value={newInput.polish}
            placeholder="Enter Polish word"
          />
          <button className="submit-btn" type="submit" onClick={submitInput}>
            Submit
          </button>
        </form>
      ) : (
        <p>You have entered 10 cards today.</p>
      )}
      <DailyCardList
        todayCards={todayCards}
        newItem={allNewInput}
        showNewInput={showNewInput}
      />
    </>
  );
};

export default Form;
