import React, { useEffect, useState } from "react";
import getAllData from "./axios/axiosGetData";
import DailyCardList from "./DailyCardList";
import Form from "./Form";

const Home = () => {
  const [getData, setGetData] = useState();
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    getAllData(setGetData);
  }, []);

  const handleClick = () => {
    setShowDiv(true);
  };
  return (
    <div>
      {!showDiv && <p>Enter a new Card</p>}
      <button onClick={handleClick}>Get Data</button>
      {showDiv && (
        <>
          <Form dataLength={9} />
          <DailyCardList todayCards={getData} />
        </>
      )}
    </div>
  );
};

export default Home;
