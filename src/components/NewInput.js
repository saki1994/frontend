import React, { useState } from "react";
import axios from "axios";

const NewInput = () => { 
  const [newInput, setNewInput] = useState({
    polish: "",
    english: "",
    wordStatus: {
      hasTested: false,
      repeated: false,
      timesRepeated: 0,
    }
  });
   
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

  const submitInput = (e) => {
    const {polish, english, wordStatus} = newInput;

    if (polish && english && wordStatus) {
        axios.post("https://sakirumatsu.herokuapp.com/", newInput)
        .then(res => console.log(res))

    } else {
        console.log('wrong')
    }

    e.preventDefault()
  };
  return (
    <form action="#">
      <textarea
        onChange={handleChange}
        type="text"
        name="polish"
        value={newInput.polish}
        placeholder="Enter Polish word"
      />
      <textarea
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
  );
};

export default NewInput;
