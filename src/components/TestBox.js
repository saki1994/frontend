import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const TestBox = ({ allCards, getAnswer, closeTestBox, isBoxOpen }) => {
  const [card, setCard] = useState("");
  const [resultIcon, setResultIcon] = useState();

  //handle update
  const handleUpdate = (e) => {
    setCard(e.target.value);
    e.preventDefault();
  };

  const submit = (e) => {
    if (card !== "") {
      getAnswer(allCards, card);
    } else {
      setCard("Please type in your answer...");
    }

    e.preventDefault();
  };

  const closeBox = () => {
    closeTestBox(isBoxOpen);
  };
  return (
    <form className="test-box">
      <CloseIcon className="close-test-box" onClick={closeBox} />
      <h5>Type the polish translation of the sentence below</h5>
      <p>"{allCards.english}"</p>
      <input
        onChange={handleUpdate}
        name="polish"
        value={card}
        placeholder="Enter Polish Word..."
      />
      <button className="submit-test" onClick={submit}>
        Submit
      </button>
    </form>
  );
};

export default TestBox;
