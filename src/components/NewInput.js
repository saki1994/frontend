import React, { useState, useEffect } from "react";
import axios from "axios";
import formData  from "./variables/formData";
import { today } from "./date.js";
import TableLayout from "./TableLayout";
import getAllData from "./axiosGetData";
//import allData from "./axiosRequest/toMemorize.js"
 

const NewInput = () => {
  const [getData, setGetData] = useState();
  const [newInput, setNewInput] = useState(formData);
  const [showForm, setShowForm] = useState(false);
  const [allList, setAllList] = useState([]);
  const [tempInput, setTempInput] = useState([]);
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

  //get all data from the server
  useEffect(() => {
    getAllData(setGetData);  
  }, []);

  const submitInput = (e) => {
    const { polish, english, wordStatus } = newInput;

    if (polish && english && wordStatus) {
      axios
        .post("https://sakirumatsu.herokuapp.com/", newInput)
        .then((res) => console.log(res));
    } else {
      alert("Please enter new inputs");
    }

    setNewInput((previous) => {
      return {
        ...previous,
        english: "",
        polish: "",
      };
    });
    
    setTempInput(lists => {
      return [...lists, newInput]  
    })
 
    e.preventDefault();
  };

  const showFormEvent = () => {
    showForm ? setShowForm(false) : setShowForm(true);
    const currentDate = today;
    const currentInput = getData.filter(
      (item) => item.dateAdded === currentDate
    );
    setAllList(currentInput); 
  };
  return (
    <>
      <button onClick={showFormEvent}>Show Form</button>
      {showForm && (
        <> {
          allList.length <= 10 ? (
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
          ) : (<p>You have {allList.length} cards that need to be memorize. <br/>
          Please start with the previous cards.</p>)
        }
          
          <TableLayout lists={allList} tempInput={tempInput}/>
        </>
      )}
    </>
  );
};

export default NewInput;
