import React, { useState } from "react";
import formData from "./variables/formData";
import sendNewCard from "./axios/axiosSendData"; 

const Form = ({ dataLength }) => {
  const [newInput, setNewInput] = useState(formData); 

  //handle and save changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInput((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
    e.preventDefault();
  };

  //Send new card input
  const submitInput = (e) => {
    sendNewCard(newInput); 
    e.preventDefault();
  }

  return dataLength <= 10 ? (
    <form>
      <input
        onChange={handleChange}
        type="text"
        name="polish"
        value={newInput.polish}
        placeholder="Enter Polish word"
      />
      <input
        onChange={handleChange}
        type="text"
        name="english"
        value={newInput.english}
        placeholder="Enter English word"
      />
      <button type="submit" onClick={submitInput}>
              Submit
            </button> 
    </form>
  ) : (
    <p>You have entered 10 cards today.</p>
  ); 
};

export default Form;
