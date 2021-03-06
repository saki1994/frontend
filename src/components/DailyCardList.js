import React, { useEffect, useState } from "react";
import Button from "./Button";
import UpdateItem from "./UpdateItem";
import deleteData from "./axios/axiosDeleteData";
import { today } from "./date";
import TableHeading from "./TableHeading";
import TableList from "./TableList";
import "./stylesheet/DailyCardList/dailyCardList.scss";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const DailyCardList = ({ todayCards, newItem, showNewInput, editBoxEvent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateItem, setUpdateItem] = useState();
  const [todayList, setTodayList] = useState([]);
  //Delete data from database
  const deleteItem = (item) => {
    deleteData(item);
  };

  //Edit an item
  const editItem = (item) => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
    isEditing ? editBoxEvent(false) : editBoxEvent(true);
    setUpdateItem(item);
  };

  useEffect(() => {
    const todayInputList = todayCards.filter(
      (item) => item.dateAdded === today
    );
    setTodayList(todayInputList);
    showNewInput && setTodayList((pre) => [...pre, newItem]);
  }, [newItem, showNewInput, todayCards]);

  return (
    <div className="daily-list">
      {isEditing && (
        <div className="edit-box form-animation">
          <UpdateItem item={updateItem} />
        </div>
      )}
      <table>
        <thead>
          <tr>
            <TableHeading items={["#", "English", "Polish"]} />
          </tr>
          {todayList.map((item, index) => {
            return (
              <tr key={item._id}>
                <TableList
                  items={[
                    index + 1,
                    item.english,
                    item.polish,
                    <Button
                      text={<EditOutlinedIcon />}
                      btnClickEvent={editItem}
                      item={item}
                    />,
                    <Button
                      text={<DeleteOutlineOutlinedIcon />}
                      btnClickEvent={deleteItem}
                      item={item}
                    />
                  ]}
                />
              </tr>
            );
          })}
        </thead>
      </table>
    </div>
  );
};

export default DailyCardList;
