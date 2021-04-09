const Square = ({id, selected, time, reset}) => {
    const addColour = () => {
        //let currentTime = new Date()
        //console.log(currentTime);
        //console.log(currentTime-time>5, selected) 
        return (selected ? "box selected" : "box")
    }

    return (
        <div key={id} className={addColour()} 
            onClick={() => {reset(selected)}}></div>
    )
}

export default Square
