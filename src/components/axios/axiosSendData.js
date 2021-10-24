import axios from "axios";

//need to pass the newInput from form as a parameter
const sendNewCard = (dataInput) => {

    const { polish, english, wordStatus } = dataInput;

    if (polish && english && wordStatus) {
      axios
        .post("https://sakirumatsu.herokuapp.com/", dataInput)
        .then((res) => console.log(res));
    } else {
      console.log("Please enter new inputs");
    }
}

export default sendNewCard;