import React from "react";

const TableLayout = ({ lists }) => {
  return (
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
            </tr>
          );
        })}
      </thead>
    </table>
  );
};

export default TableLayout;
