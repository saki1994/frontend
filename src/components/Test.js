import React, {useEffect, useState} from "react";
import TableHeading from "./TableHeading";
import TableList from "./TableList";
import Button from "./Button";
import TestBox from "./TestBox";

const Test = ({ allCards }) => {
    const [doTest, setDoTest] = useState(false);
    const [cardTest, setCardTest] = useState({});

  const startTest = (item) => {
    setDoTest(true);
    setCardTest(item);
  };

  const getAnswer = (item, answer) =>{
      const polish = item.polish.toLowerCase();
      const testAnswer = answer.toLowerCase();
      
      if (polish === testAnswer) {
        console.log("correct")
      } else {
        console.log('wrong')
      }
  }
    
  return (
    <div>
      <table>
        <thead>
          <tr>
            <TableHeading items={["#", "English", "Polish", "Submit"]} />
          </tr>
          {allCards.map((card, index) => {
            return (
              <tr key={card._id}>
                <TableList
                  items={[
                    index + 1,
                    card.english,
                    <Button
                      btnClickEvent={startTest}
                      item={card}
                      text="Start Test"
                    /> 
                  ]}
                /> 
              </tr>
            );
          })}
        </thead>
      </table>
    {
        doTest && <TestBox allCards={cardTest} getAnswer={getAnswer}/>
    }
    </div>
  );
};

export default Test;
