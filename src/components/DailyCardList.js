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
import CloseIcon from "@mui/icons-material/Close";

const DailyCardList = ({ todayCards, newItem, showNewInput }) => {
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
  }, [newItem, showNewInput, todayCards]);

  return (
    <div className="daily-list">
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
          {newItem.map((item, index) => {
            return (
              <tr key={item._id}>
                <TableList
                  items={[
                    todayList.length + index + 1,
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
      {isEditing && (
        <div className="edit-box">
          <CloseIcon className="close-icon" onClick={closeEditBox} />
          <UpdateItem item={updateItem} />
        </div>
      )}
    </div>
  );
};

export default DailyCardList;
