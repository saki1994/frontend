import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "./Button";
import UpdateItem from "./UpdateItem";
import {today, yesterday} from "./date.js"

const TodaysInput = () => {
  const [data, setData] = useState();
  const [allList, setAllList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updateItem, setUpdateItem] = useState();

  //get all data from the server
  useEffect(() => {
    axios
      .get("https://sakirumatsu.herokuapp.com/")
      .then((res) => setData(res.data));

    setAllList([]);

    
  }, []);

  //event btn for yesterday input
  const yesterdayInputBtn = () => {
    const currentDate = yesterday;
    const todayInputList = data.filter(
      (item) => item.dateAdded === currentDate
    );
    setAllList(todayInputList);
     
  };

  //event btn for input saved at the current date
  const todayInputBtn = () => {
    const currentDate = today;
    const todayInputList = data.filter(
      (item) => item.dateAdded === currentDate
    );
    setAllList(todayInputList);
 
  };

  //Delete an item from the server
  const deleteItem = (item) => {
    if (item) {
      axios
        .delete("https://sakirumatsu.herokuapp.com/", { data: item })
        .then((res) => console.log(res));
    }
  };

  //Edit an item
  const editItem = (item) => {
    setIsEditing(true);
    setUpdateItem(item);
  };

  //save the edited item
  const closeEditBox = () => {
    setIsEditing(false);
  }

  return (
    <>
      <button onClick={yesterdayInputBtn}>Click for Yesterday's input</button>
      <button onClick={todayInputBtn}>Click for Yesterday's input</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Polish</th>
            <th>English</th>
          </tr>
        </thead>
        <thead>
          {allList.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.polish}</td>
                <td>{item.english}</td>
                <td>
                  <Button text="Delete" deleteFunc={deleteItem} item={item} />
                </td>
                <td>
                  <Button text="Edit" deleteFunc={editItem} item={item} />
                </td>
              </tr>
            );
          })}
        </thead>
      </table>
      {
        isEditing && (
        <div>
        <UpdateItem item={updateItem}/>
        <button type="submit" onClick={closeEditBox}>Close edit</button>
      </div>
        )
      } 
    </>
  );
};

export default TodaysInput;
