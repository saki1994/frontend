/* eslint-disable no-restricted-globals */ 

const Button = ({deleteFunc, item, text}) => {

    const handleClick = () => {
        deleteFunc(item) 
    }
    return <button onClick={handleClick}>{text}</button>
}

export default Button
