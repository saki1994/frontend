import React, { useEffect, useState } from "react";
import Button from "./Button";
import updateData from "./axios/axiosUpdateData";
import Carousel from "react-bootstrap/Carousel";
import "./stylesheet/MemorizeBox/memorizeBox.scss";

const MemorizeBox = ({ allCards }) => {
  const [memorizeCards, setMemorizeCards] = useState([]);
  const [changeStatus, setChangeStatus] = useState();

  useEffect(() => {
    const todayInputList = allCards.filter(
      (item) => !item.wordStatus.needMemorizing && item.wordStatus.memorize
    );
    setMemorizeCards(todayInputList);
  }, [allCards]);

  const memorizeBtn = (card) => {
    const [momorizeCard] = memorizeCards.filter(
      (item) => item._id === card._id
    );
    setChangeStatus(momorizeCard);
    setChangeStatus((lists) => {
      return {
        ...lists,
        wordStatus: {
          ...lists.wordStatus,
          needMemorizing: true
        }
      };
    });
  };

  useEffect(() => {
    if (changeStatus) {
      updateData(changeStatus);
    }
  }, [changeStatus]);

  return (
    <Carousel fade interval={null}>
      {memorizeCards.map((card) => {
        return (
          <Carousel.Item>
            <div key={card._id} className="memo-box">
              <p>{card.polish}</p>
              <p>{card.english}</p>
              <Button btnClickEvent={memorizeBtn} item={card} text="Remember" />
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default MemorizeBox;
