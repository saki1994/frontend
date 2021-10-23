import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";
import UpdateItem from "./UpdateItem";

const TableLayout = ({ lists, tempInput }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateItem, setUpdateItem] = useState();

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
    window.location.reload(false);
  };

  return (
    <>
      <p>You currently have {lists.length} cards added.</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Polish</th>
            <th>English</th>
          </tr>
        </thead>
        <thead>
          {lists.map((list, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{list.polish}</td>
                <td>{list.english}</td>
                <td>
                  <Button
                    text="Delete"
                    btnClickEvent={deleteItem}
                    item={list}
                  />
                </td>
                <td>
                  <Button text="Edit" btnClickEvent={editItem} item={list} />
                </td>
              </tr>
            );
          })}
          {tempInput.map((list, index) => {
            return (
              <tr key={index}>
                <td>{lists.length + index + 1}</td>
                <td>{list.polish}</td>
                <td>{list.english}</td>
                <td>
                  <Button
                    text="Delete"
                    btnClickEvent={deleteItem}
                    item={list}
                  />
                </td>
                <td>
                  <Button text="Edit" btnClickEvent={editItem} item={list} />
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
    </>
  );
};

export default TableLayout;
