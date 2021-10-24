import React from 'react';

const TableList = ({items}) => {
 
    return (
        <>
         {
             items.map((item, index) => {
                 return (
                     <td key={index}>{item}</td>
                 )
             })
         }   
        </>
    )
}

export default TableList
