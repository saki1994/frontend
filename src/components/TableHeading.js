import React from "react";

const TableHeading = ({items}) => {
 
  return (
    <>
      {items.map((item, index) => {
          return (<th key={index}>{item}</th>)
      })}
    </>
  );
};

export default TableHeading;
