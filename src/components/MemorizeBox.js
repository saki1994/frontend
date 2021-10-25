import React, { useEffect, useState } from "react";
import Button from "./Button";
import updateData from "./axios/axiosUpdateData"; 

const MemorizeBox = ({ allCards }) => {
  const [memorizeCards, setMemorizeCards] = useState([]);
  const [changeStatus, setChangeStatus] = useState();

  useEffect(() => {
    const todayInputList = allCards.filter(
      (item) => item.wordStatus.needMemorizing 
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
          needMemorizing: false,
        },
      };
    });
  };

  const send = () => {
    updateData(changeStatus);
  };

  return (
    <div>
      {memorizeCards.map((card) => {
        return (
          <div key={card._id}>
            <p>{card.polish}</p>
            <p>{card.english}</p>
            <Button btnClickEvent={memorizeBtn} item={card} text="Memorized" />
            <button onClick={send}>send</button>
          </div>
        );
      })}
    </div>
  );
};

export default MemorizeBox;
