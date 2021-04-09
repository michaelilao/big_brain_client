import Sqaure from "./Square"

const Grid = ({ grid, time, gridClicked}) => {
    return (
        <div className="grid">
            {grid.map((element) => {
                return <Sqaure key={element.id} id={element.id} selected={element.selected} 
                time={time} 
                reset={gridClicked} />
            })}
        </div>
    )
}
export default Grid
