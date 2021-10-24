import React, { useState } from "react";

const TestBox = ({ allCards, getAnswer }) => {
  const [card, setCard] = useState("");

  //handle update
  const handleUpdate = (e) => { 
    setCard(e.target.value); 
    e.preventDefault();
  };

  const submit = (e) =>{
    getAnswer(allCards, card)

    e.preventDefault();
  }
  return (
    <form>
      <label>English:</label>
      <span>{card.english}</span>
      <br />
      <label>Polish:</label>
      <input
        onChange={handleUpdate}
        name="polish"
        value={card}
        placeholder="Enter Polish"
      />
      <br />
      <button onClick={submit}>Submit</button>
    </form>
  );
};

export default TestBox;
