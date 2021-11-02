import React, { useState } from "react";
import formData from "./variables/formData";
import sendNewCard from "./axios/axiosSendData";
import "./stylesheet/Form/form.scss";
import DailyCardList from "./DailyCardList";

const Form = ({ todayCards }) => {
  const [newInput, setNewInput] = useState(formData);
  const [showNewInput, setShowNewInput] = useState(false);
  const [isEditingOn, setIsEditingOn] = useState(false);

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
    e.preventDefault();
  };

  //hide form when editing is on
  const handleEdit = (param) => {
    isEditingOn ? setIsEditingOn(false) : setIsEditingOn(true);
  };

  return (
    <>
      <form
        style={{ display: isEditingOn && "none" }}
        className="form-animation"
      >
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
      <DailyCardList
        todayCards={todayCards}
        newItem={newInput}
        showNewInput={showNewInput}
        editBoxEvent={handleEdit}
      />
    </>
  );
};

export default Form;
