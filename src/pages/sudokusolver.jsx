import { func } from "prop-types";
import React, { Component } from "react";
import "./sudokusolver.css";

class SudokuSolver extends Component {
  render() {
    return (
      <div className="sudoku-page">
        <TheFullField />
        <div className="goButton" style={{ marginLeft: "auto" }} ><button>solve!</button></div>
      </div>
    );
  }
}

class TheFullField extends Component {
  render() {
    return (
      <div className="three-columns-of-ThreeThreeByThrees">
        <div>
          <ThreeThreeByThrees />
        </div>
        <div>
          <ThreeThreeByThrees />
        </div>
        <div>
          <ThreeThreeByThrees />
        </div>
      </div>
    );
  }
}

class NumBox extends Component {
  render() {
    return (
      <input type="number" className="num-box" min="0" max="9" placeholder="" onChange={numberEnteredCallback} />
    );
  }
}

class ThreeThreeByThrees extends Component {
  render() {
    return (
      <div>
        <ThreeByThree />
        <ThreeByThree />
        <ThreeByThree />
      </div>
    );
  }
}

class ThreeByThree extends Component {
  render() {
    return (
      <div className="three-by-three">
        <div className="num-row">
          <NumBox />
          <NumBox />
          <NumBox />
        </div>
        <div className="num-row">
          <NumBox />
          <NumBox />
          <NumBox />
        </div>
        <div className="num-row">
          <NumBox />
          <NumBox />
          <NumBox />
        </div>
      </div>
    );
  }
}

function numberEnteredCallback(e){
if (e.target.value){
  TODO  
}
}


export default SudokuSolver;
