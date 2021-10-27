import React, { useEffect, useState } from "react";
import getAllData from "./axios/axiosGetData";
import DailyCardList from "./DailyCardList";
import Form from "./Form";
import MemorizeBox from "./MemorizeBox";
import Test from "./Test";
import "./styleSheets/home.scss";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  const [getData, setGetData] = useState();
  const [showForm, setShowForm] = useState(false);
  const [memorizeDiv, setMemorizeDiv] = useState(false);
  const [testDiv, setTestDiv] = useState(false);
  const [allTrueCard, setAllTrueCard] = useState();

  useEffect(() => {
    getAllData(setGetData);
  }, []);

  const openBox = (e) => {
    const val = e.target.value;

    if (val === "form") {
      setOpenDiv(true, false, false);
    } else if (val === "memorize") {
      const getAllTrue = getData.filter((card) => card.wordStatus.memorize);
      setAllTrueCard(getAllTrue);
      setOpenDiv(false, true, false);
    } else if (val === "test") {
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
      <Carousel  variant="dark" interval={null}>
        <Carousel.Item className="nav-btn">
          <p>Enter a new Card</p>
          <button value="form" onClick={openBox}>
            Open Form
          </button>
          <button value="form" onClick={closeBox}>
            Close Form
          </button>
        </Carousel.Item>
        <Carousel.Item className="nav-btn">
          {showForm ? (
            <p>Refresh to get all Cards</p>
          ) : (
            <p>
              Those who know nothing of foreign languages know nothing of their
              own.
            </p>
          )}
          <button value="memorize" onClick={openBox}>
            Open Memorize
          </button>
          <button value="memorize" onClick={closeBox}>
            Done Memorize
          </button>
        </Carousel.Item>
        <Carousel.Item className="nav-btn">
          {memorizeDiv ? (
            <p>Refresh to start the test.</p>
          ) : (
            <p>
              Our greatest weakness lies in giving up. <br />
              The most certain way to succeed is always to try just one more
              time.
            </p>
          )}
          <button value="test" onClick={openBox}>
            Open Test
          </button>
          <button value="test" onClick={closeBox}>
            Done Test
          </button>
        </Carousel.Item>
      </Carousel>

      {showForm && (
        <div>
          <Form dataLength={9} />
          <DailyCardList todayCards={getData} />
        </div>
      )}
      {memorizeDiv && !showForm && <MemorizeBox allCards={getData} />}
      {testDiv && <Test allCards={allTrueCard} />}
    </div>
  );
};

export default Home;
