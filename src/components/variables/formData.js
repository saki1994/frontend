 

const formData = {
    polish: "",
    english: "",
    wordStatus: {
      needMemorizing: false,
      memorize: true,
      repeated: false,
      timesRepeated: 0,
    }
}

const { polish, english, wordStatus} = formData

export default formData;
export { polish, english, wordStatus }