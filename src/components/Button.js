/* eslint-disable no-restricted-globals */ 

const Button = ({btnClickEvent, item, text}) => {

    const handleClick = () => {
        btnClickEvent(item)
    }
    return <button onClick={handleClick}>{text}</button>
}

export default Button
