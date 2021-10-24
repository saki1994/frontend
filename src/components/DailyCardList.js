import React, {  useEffect, useState } from "react";
import Button from "./Button";
import UpdateItem from "./UpdateItem";
import deleteData from "./axios/axiosDeleteData";
import {today} from "./date";

const DailyCardList = ({ todayCards }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateItem, setUpdateItem] = useState(); 
  const [todayList, setTodayList] = useState([]);
  //Delete data from database
  const deleteItem = (item) => {
    deleteData(item);
  };

  //Edit an item
  const editItem = (item) => {
    setIsEditing(true);
    setUpdateItem(item);
  };

  const closeEditBox = () => {
    setIsEditing(false);
    window.location.reload(false);
  };

  useEffect(() => {
    const todayInputList = todayCards.filter(
      (item) => item.dateAdded === today
    );
    setTodayList(todayInputList);
  }, [todayCards])

  return (
    <div>
      <p>You have {todayList.length} cards added.</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>English</th>
            <th>Polish</th>
          </tr>
          {todayList.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.english}</td>
                <td>{item.polish}</td>
                <td>
                  <Button
                    text="Delete"
                    btnClickEvent={deleteItem}
                    item={item}
                  />
                </td>
                <td>
                  <Button text="Edit" btnClickEvent={editItem} item={item} />
                </td>
              </tr>
            );
          })}
        </thead>
      </table>
      {isEditing && (
        <div>
          <UpdateItem item={updateItem} />
          <button type="submit" onClick={closeEditBox}>
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyCardList;
