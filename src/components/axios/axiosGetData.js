import axios from "axios";

const getAllData = (param) => {
    axios
    .get("https://sakirumatsu.herokuapp.com/")
    .then((res) => param(res.data));
}

export default getAllData