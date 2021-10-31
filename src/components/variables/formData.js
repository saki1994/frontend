const formData = {
  polish: "",
  english: "",
  wordStatus: {
    needMemorizing: false, //return true when memorize btn is click, return false when test failed.
    memorize: true, //return false when test is correct and true when wrong
    repeated: false,
    timesRepeated: 0
  }
};

const { polish, english, wordStatus } = formData;

export default formData;
export { polish, english, wordStatus };
