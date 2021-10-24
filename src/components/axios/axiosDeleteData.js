import axios from "axios";

const deleteData = (item) => {
    if (item) {
        axios
          .delete("https://sakirumatsu.herokuapp.com/", { data: item })
          .then((res) => console.log(res));
      }
}

export default deleteData;