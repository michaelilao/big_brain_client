import './Option.css'

const Option = (data) =>{
    const {displayNum, optNum, setOption} = data;
    const optionClicked = () =>{
        setOption(optNum)
    }
    return (
        <div className="Option">
            <button className="Option-Button" onClick={optionClicked}>
                {displayNum}
            </button>
        </div>
    );
}

export default Option;