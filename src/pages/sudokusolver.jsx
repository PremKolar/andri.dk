import { func } from "prop-types";
import React, { Component } from "react";
import "./sudokusolver.css";
var assert = require("assert");

class SudokuComponent extends Component {
  constructor(props) {
    super();
    if (props.sudoku) {
      this.sudoku = props.sudoku;
    } else {
      this.sudoku = new Sudoku();
    }
  }
}

class SudokuSolver extends SudokuComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sudoku-page">
        <TheFullField sudoku={this.sudoku} />
        <div className="goButton" style={{ marginLeft: "auto" }}>
          <button>solve!</button>
        </div>
      </div>
    );
  }
}

class TheFullField extends SudokuComponent {
  render() {
    return (
      <div className="three-columns-of-ThreeThreeByThrees">
        <div>
          <ThreeThreeByThrees sudoku={this.sudoku} rootColumn="0" />
        </div>
        <div>
          <ThreeThreeByThrees sudoku={this.sudoku} rootColumn="3" />
        </div>
        <div>
          <ThreeThreeByThrees sudoku={this.sudoku} rootColumn="6" />
        </div>
      </div>
    );
  }
}

class ThreeThreeByThrees extends SudokuComponent {
  constructor(props) {
    super(props);
    this.rootColumn = parseInt(props.rootColumn);
  }
  render() {
    return (
      <div>
        <ThreeByThree
          sudoku={this.sudoku}
          rootColumn={this.rootColumn}
          rootRow="0"
        />
        <ThreeByThree
          sudoku={this.sudoku}
          rootColumn={this.rootColumn}
          rootRow="3"
        />
        <ThreeByThree
          sudoku={this.sudoku}
          rootColumn={this.rootColumn}
          rootRow="6"
        />
      </div>
    );
  }
}

class ThreeByThree extends SudokuComponent {
  constructor(props) {
    super(props);
    this.rootColumn = parseInt(props.rootColumn);
    this.rootRow = parseInt(props.rootRow);
  }
  render() {
    return (
      <div className="three-by-three">
        <div className="num-row">
          <NumBox
            sudoku={this.sudoku}
            row={this.rootRow + 0}
            column={this.rootColumn + 0}
          />
          <NumBox
            sudoku={this.sudoku}
            row={this.rootRow + 0}
            column={this.rootColumn + 1}
          />
          <NumBox
            sudoku={this.sudoku}
            row={this.rootRow + 0}
            column={this.rootColumn + 2}
          />
        </div>
        <div className="num-row">
          <NumBox
            sudoku={this.sudoku}
            row={this.rootRow + 1}
            column={this.rootColumn + 0}
          />
          <NumBox
            sudoku={this.sudoku}
            row={this.rootRow + 1}
            column={this.rootColumn + 1}
          />
          <NumBox
            sudoku={this.sudoku}
            row={this.rootRow + 1}
            column={this.rootColumn + 2}
          />
        </div>
        <div className="num-row">
          <NumBox
            sudoku={this.sudoku}
            row={this.rootRow + 2}
            column={this.rootColumn + 0}
          />
          <NumBox
            sudoku={this.sudoku}
            row={this.rootRow + 2}
            column={this.rootColumn + 1}
          />
          <NumBox
            sudoku={this.sudoku}
            row={this.rootRow + 2}
            column={this.rootColumn + 2}
          />
        </div>
      </div>
    );
  }
}

class NumBox extends SudokuComponent {
  constructor(props) {
    super(props);
    this.column = parseInt(props.column);
    this.row = parseInt(props.row);
  }
  render() {
    return (
      <input
        type="number"
        className="num-box"
        min="0"
        max="9"
        placeholder=""
        onChange={this.numberEnteredCallback.bind(this)}
      />
    );
  }

  numberEnteredCallback(e) {
    if (e.target.value < 1 || e.target.value > 9) {
      e.target.value = "";
      return;
    }
    try {
      this.sudoku.set(this.row, this.column, parseInt(e.target.value));
    } catch (error) {
      e.target.value = "";
    }
  }
}

class Sudoku {
  mtrx = Array(9)
    .fill()
    .map(() => Array(9).fill(0));

  set(row, col, v) {
    assert(row >= 0 && row < 9);
    assert(col >= 0 && col < 9);
    assert(this.valueIsPossible(row, col, v));
    this.mtrx[row][col] = v;
  }

  valueIsPossible(row, col, v) {
    return (
      this.valueIsOKvertically(row, col, v) &&
      this.valueIsOKhorizontally(row, col, v) &&
      this.valueIsOKinSquare(row, col, v)
    );
  }

  getValuesInRelevantSquare(row, col) {
    function sl(vec, idx) {
      return vec.slice(idx - (idx % 3), idx - (idx % 3) + 3);
    }

    return sl(this.mtrx, col).map(function (value, index) {
      return sl(value, row);
    });
  }

  twoDtoLinIdx(row, col) {}

  valueIsOKinSquare(row, col, v) {
    let vec = [].concat.apply([], this.getValuesInRelevantSquare(row, col));
    let idx = this.twoDtoLinIdx(row, col);
    return this._valueIsOKinVector(vec, col, v);
  }

  _valueIsOKinVector(vec, idx, v) {
    let vecCopy = [...vec];
    vecCopy[idx] = v;
    let okSum = vecCopy.reduce((a, b) => a + b, 0) <= 45;
    let okUniq = isDistinct(vecCopy.filter((a) => a > 0));
    return okSum && okUniq;
  }

  valueIsOKhorizontally(row, col, v) {
    let vec = this.mtrx[row];
    return this._valueIsOKinVector(vec, col, v);
  }

  valueIsOKvertically(row, col, v) {
    let vec = this.mtrx.map(function (value, index) {
      return value[col];
    });
    return this._valueIsOKinVector(vec, row, v);
  }
}

function isDistinct(v) {
  return [...new Set(v)].length == v.length;
}

export default SudokuSolver;
