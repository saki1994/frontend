import React, { useEffect, useState } from "react";
import getAllData from "./axios/axiosGetData";
import Form from "./Form";
import MemorizeBox from "./MemorizeBox";
import Test from "./Test";
import Carousel from "react-bootstrap/Carousel";
import "./stylesheet/Home/home.scss";

const Home = () => {
  const [getData, setGetData] = useState();
  const [showForm, setShowForm] = useState(false);
  const [memorizeDiv, setMemorizeDiv] = useState(false);
  const [testDiv, setTestDiv] = useState(false);
  const [cardData, setCardData] = useState();

  useEffect(() => {
    getAllData(setGetData);
  }, []);

  const openBox = (e) => {
    const val = e.target.value;
    if (val === "form") {
      setOpenDiv(true, false, false);
    } else if (val === "memorize") {
      const getAllTrue = getData.filter((card) => card.wordStatus.memorize);
      setCardData(getAllTrue);
      setOpenDiv(false, true, false);
    } else if (val === "test") {
      const test = getData.filter((card) => card.wordStatus.needMemorizing);
      setCardData(test);
      setOpenDiv(false, false, true);
    }
  };

  const closeBox = (e) => {
    const val = e.target.value;

    if (val === "form") {
      setOpenDiv(false, false, false);
    } else if (val === "memorize") {
      setOpenDiv(false, false, false);
    } else if (val === "test") {
      setOpenDiv(false, false, false);
    }
  };

  const setOpenDiv = (form, memo, test) => {
    setShowForm(form);
    setMemorizeDiv(memo);
    setTestDiv(test);
  };
  return (
    <div className="container">
      <Carousel className="div" variant="dark" interval={null}>
        <Carousel.Item className="nav-btn">
          <p>
            Learn a new language and <br /> get a new soul.
          </p>

          <button value="form" onClick={openBox}>
            Enter new card
          </button>
        </Carousel.Item>
        <Carousel.Item className="nav-btn">
          {showForm ? (
            <p>Refresh to get all Cards</p>
          ) : (
            <p>
              Those who know nothing of foreign
              <br /> languages know nothing of their own.
            </p>
          )}
          <button value="memorize" onClick={openBox}>
            Start Memorize
          </button>
        </Carousel.Item>
        <Carousel.Item className="nav-btn">
          {memorizeDiv ? (
            <p>Refresh to start the test.</p>
          ) : (
            <p>
              The most certain way to succeed is always <br />
              to try just one more time.
            </p>
          )}
          <button value="test" onClick={openBox}>
            Click to start test
          </button>
        </Carousel.Item>
      </Carousel>

      {showForm && (
        <div className="lower-div ">
          <button className="close-btn" value="form" onClick={closeBox}>
            Close
          </button>
          <Form dataLength={9} todayCards={getData} />
        </div>
      )}
      {memorizeDiv && !showForm && (
        <div className="lower-div memorize-div">
          <button className="close-btn" value="memorize" onClick={closeBox}>
            Close
          </button>
          <MemorizeBox allCards={cardData} />
        </div>
      )}

      {testDiv && (
        <div className="lower-div">
          <button className="close-btn" value="test" onClick={closeBox}>
            Close
          </button>
          <Test allCards={cardData} />
        </div>
      )}
    </div>
  );
};

export default Home;
