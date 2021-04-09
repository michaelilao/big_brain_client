const StartRound = ({ grid, setStart }) => {
    const checkForSelected = () =>{
        let isSelected = false
        grid.forEach((sqaures)=>{
            isSelected = isSelected || sqaures.selected
        })
        return isSelected
    }

    return (
        <div>
            {!checkForSelected() ? <button type="button" className="next-round" 
            onClick={()=>(setStart(new Date()))}>Click to start round</button> :
            <button type="button" className="next-round-invalid">
                Click to start round</button> }
        </div>
    )
}

export default StartRound
