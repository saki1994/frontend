 

const formData = {
    polish: "",
    english: "",
    wordStatus: {
      needMemorizing: true,
      memorize: true,
      repeated: false,
      timesRepeated: 0,
    }
}

const { polish, english, wordStatus} = formData

export default formData;
export { polish, english, wordStatus }