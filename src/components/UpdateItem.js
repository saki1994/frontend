import React, { useState } from "react";
import updateData from "./axios/axiosUpdateData";

const UpdateItem = ({ item }) => {
  const [currentItem, setCurrentItem] = useState(item);

  //handle update
  const handleUpdate = (e) => {
    const { name, value } = e.target;

    setCurrentItem((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });

    e.preventDefault();
  };

  //submit edit

  const submitEdit = (e) => {
    updateData(currentItem);
    e.preventDefault();
  };

  return (
    <form action="#">
      <textarea
        onChange={handleUpdate}
        type="text"
        name="polish"
        placeholder="Enter Polish word"
        value={currentItem.polish}
      />
      <textarea
        onChange={handleUpdate}
        type="text"
        name="english"
        placeholder="Enter English word"
        value={currentItem.english}
      />

      <button type="submit" onClick={submitEdit}>
        Submit
      </button>
    </form>
  );
};

export default UpdateItem;
