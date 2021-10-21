import React, {useState} from 'react'
import axios from 'axios';


const UpdateItem = ({item}) => {
     
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
    
        const { polish, english, wordStatus } = currentItem;
    
        if (polish || english || wordStatus) {
          axios
            .patch("https://sakirumatsu.herokuapp.com/", currentItem)
            .then((res) => console.log(res));
        } else {
          console.log("wrong");
        }
    
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
    )
}

export default UpdateItem
