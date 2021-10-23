import axios from "axios";

const updateData = (item) => {
  const { polish, english, wordStatus } = item;

  if (polish || english || wordStatus) {
    axios
      .patch("https://sakirumatsu.herokuapp.com/", item)
      .then((res) => console.log(res));
  } else {
    console.log("wrong");
  }
};

export default updateData;
