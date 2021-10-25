import React, { useEffect, useState } from "react";
import Button from "./Button";
import UpdateItem from "./UpdateItem";
import deleteData from "./axios/axiosDeleteData";
import { today } from "./date";
import TableHeading from "./TableHeading";
import TableList from "./TableList";

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
  }, [todayCards]);

  return (
    <div>
      <p>You have {todayList.length} cards added.</p>
      <table>
        <thead>
          <tr>
            <TableHeading
              items={["#", "English", "Polish", "Edit", "Delete"]}
            />
          </tr>
          {todayList.map((item, index) => {
            return (
              <tr key={item._id}>
                <TableList
                  items={[
                    index + 1,
                    item.english,
                    item.polish,
                    <Button text="Edit" btnClickEvent={editItem} item={item} />,
                    <Button
                      text="Delete"
                      btnClickEvent={deleteItem}
                      item={item}
                    />,
                  ]}
                />
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
