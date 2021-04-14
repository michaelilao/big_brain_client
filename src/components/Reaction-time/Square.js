const Square = ({id, selected, time, reset}) => {
    const addColour = () => {
        return (selected ? "box selected" : "box")
    }

    return (
        <div key={id} className={addColour()} 
            onClick={() => {reset(selected)}}></div>
    )
}

export default Square
