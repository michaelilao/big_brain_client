import React, { useState } from "react";
import { Jumbotron, Container, Row, Col, Button, Form } from 'react-bootstrap';
import './NumberMemory.scss';

class NumberMemory extends React.Component {
    constructor(props) {
        super(props);
        let firstNum = Math.floor(Math.random() * (10 - 1) + 1);
        this.state = { 
          num: firstNum, //Math.floor(Math.random() * (10 - 1) + 1), 
          initial: 1, 
          showing: true, 
          showing2: false,
          prevNum: firstNum,
          input: "",
          score: 0,
          showsec: 3000
        }
        this.makeTimer = this.makeTimer.bind(this);
        this.changeHeading = this.changeHeading.bind(this);
        this.submit = this.submit.bind(this);
        this.changeScreen = this.changeScreen.bind(this);
      }
    
      getInput(event) {
        this.setState({input: event.target.value})
      }
    
      submit(){
        if(this.state.input == this.state.prevNum){
          console.log("ok correct");
          var score = this.state.score+10
          this.setState({score: score});
          if(score === 100){
            this.props.setScreen('SubmitScore')
          }
        }
        console.log(this.state.score)
        this.props.setUserScore(this.state.score)
        this.props.setScreen(this.nextScreen)
      }
    
      changeScreen(){
        this.setState({showing: !this.state.showing, showing2: !this.state.showing2 })
      }
    
      makeTimer(){
    
        // setTimeout(() => {
        //   if( (this.state.idx%2) != 0 ){
        //     this.setState({timing: this.state.timing*10})
        //     let max_val = this.state.initial*10;
        //     let min_val = this.state.initial
        //     let temp = Math.floor(Math.random() * (max_val - min_val) + min_val); // (max - min) + min
        //     this.setState({num: temp, initial: max_val})
        //     this.setState({prevNum: this.state.num})
        //   }
        //   else{
        //     this.setState({timing: (this.state.timing/10)+1, num: ""})
        //   }
        //   this.setState({idx: this.state.idx+1});
        //   indx += 1;
        // }, 3000)
    
        let max_val = this.state.initial*10;
        let min_val = this.state.initial
        let temp = Math.floor(Math.random() * (max_val - min_val) + min_val); // (max - min) + min
        this.setState({num: temp, initial: max_val, prevNum: temp})
        console.log(this.state.showsec)
        
        setTimeout(() => {
          
          this.setState({num: ""});
          this.setState({showsec: this.state.showsec + 1250});
          
        }, this.state.showsec)
        
      }
    
      changeHeading(){
        //alert(this.state.showing2)
        if(this.state.showing2 == false){
          document.getElementById('head').style.display = 'none';
        }
      }
      
      render() {  
        const { showing } = this.state;
        const { showing2 } = this.state;
    
        return (
          <div>
            
            <div>
              { showing 
                  ? 
                  <div>
                    <img className="imgheading" src="https://static.memrise.com/img/400sqf/from/uploads/course_photos/591251000130123213405.jpg"></img>
                    <h1 className="nummebheading" id="head">Number Memory</h1>
                    <button type="button" className="btn btn-danger" onClick={(event) => {this.changeScreen(); this.makeTimer(); this.changeHeading();}} style={{ height: '50px', width: '225px', marginLeft: '550px', marginTop: '40px'}}> Start </button>
                  </div>
                  : null
              }
            </div>
            <div>
              { showing2 
                  ? 
                  <div>
                    <div style={{marginLeft: '1250px'}}>
                      <label style={{float: "left", marginRight: '20px', color: 'white', fontSize: '25px'}}>Score:</label>
                      <span><p style={{color: 'white', fontSize: '25px'}}>{this.state.score}</p></span> 
                    </div>
                    <h2 className="shownum">{this.state.num}</h2>
                    <br/>
                    <div className="progress">
                      <div id='prog' className="progress-bar" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <h4 className="ques">What was the Number?</h4>
                    
                    {this.state.num == "" ? 
                    <input className="form-control" 
                    type="text" onChange={this.getInput.bind(this)} 
                    placeholder="Enter Number"
                    value={this.state.input}
                    /> 
                    : 
                    <input className="form-control" 
                    type="text" onChange={this.getInput.bind(this)} 
                    placeholder="Enter Number"
                    value={this.state.input} disabled
                    />}
                    <button className="subbut" onClick={(event) => {this.makeTimer(); this.submit(); }}>Submit</button>
                    
                    </div>
                  : null
              }
            </div>
            
            
          </div>
        )
      }
}

export default NumberMemory;