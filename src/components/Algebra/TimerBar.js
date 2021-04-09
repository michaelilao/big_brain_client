import './TimerBar.scss'

const ProgressBar = (props) => {


    const { bgcolor, completed } = props;
    const duration = 100000;//100s in ms
    const date = new Date();
    const endTime = date.getTime() + duration;
    //setCompleted(100);


    return (
        <div className="containerTimer">
            <div className="filler" style={{width: `${completed}%`}}>
                <span className="label">{`${completed}s`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;