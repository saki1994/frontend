import axios from 'axios';
import React, {useState, useEffect} from "react"

const TodaysInput = () => {
    const [data, setData] = useState();

    useEffect(() => {
        axios.get("https://sakirumatsu.herokuapp.com/")
        .then(res => setData(res.data))
    },[]);

    const clickme = () => {
        console.log(data)
    }
    return (
        <button onClick={clickme}>click</button> 
    )
}

export default TodaysInput
