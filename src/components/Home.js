import React, { useEffect, useState } from "react";
import getAllData from "./axios/axiosGetData";
import DailyCardList from "./DailyCardList";
import Form from "./Form";
import MemorizeBox from "./MemorizeBox";
import Test from "./Test";

const Home = () => {
  const [getData, setGetData] = useState();
  const [showDiv, setShowDiv] = useState(false);
  const [memorizeDiv, setMemorizeDiv] = useState(false);
  const [testDiv, setTestDiv] = useState(false);

  useEffect(() => {
    getAllData(setGetData);
  }, []);

  const openBox = () => {
    setShowDiv(true); 
  };

  const closeBox = () => {
    setShowDiv(false);
  }

  const handleClick = () => {
    setMemorizeDiv(true);
  }

  const openTest = () => {
    setTestDiv(true)
  }
  return (
    <>
      <div style={{border: "1px solid black"}}>
        {!showDiv && <p>Enter a new Card</p>}
        <button onClick={openBox}>Open Form</button>
        {showDiv && (
          <>
            <Form dataLength={9} />
            <DailyCardList todayCards={getData} />
          </>
        )}
        <button onClick={closeBox}>Close Form</button>
      </div>
      <div style={{border: "1px solid blue"}}>
        <button onClick={handleClick}>Get Memorize Box</button>
        {memorizeDiv && <MemorizeBox allCards={getData}/>}
      </div>
      <div style={{border: "1px solid red"}}>
        <button onClick={openTest}>Start Test</button>
        {testDiv  && <Test allCards={getData}/>}
      </div>
    </>
  );
};

export default Home;
