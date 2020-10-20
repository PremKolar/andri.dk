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
    this.sudoku.SudokuSolver = this;
  }
  render() {
    return (
      <div className="sudoku-page">
        <TheFullField ref="full-field" sudoku={this.sudoku} />
        <div className="goButton" style={{ marginLeft: "auto" }}>
          <button onClick={this.solveCallback.bind(this)}>solve!</button>
        </div>
      </div>
    );
  }
  solveCallback(e) {
    this.sudoku.solve();
  }
  updateValue(row, col, v) {
    this.refs["full-field"].updateValue(row, col, v);
  }
}

class TheFullField extends SudokuComponent {
  render() {
    return (
      <div className="three-columns-of-ThreeThreeByThrees">
        <div>
          <ThreeThreeByThrees
            ref="33x3s0"
            sudoku={this.sudoku}
            rootColumn="0"
          />
        </div>
        <div>
          <ThreeThreeByThrees
            ref="33x3s1"
            sudoku={this.sudoku}
            rootColumn="3"
          />
        </div>
        <div>
          <ThreeThreeByThrees
            ref="33x3s2"
            sudoku={this.sudoku}
            rootColumn="6"
          />
        </div>
      </div>
    );
  }
  updateValue(row, col, v) {
    this.refs["33x3s" + Math.floor(col / 3)].updateValue(row, col, v);
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
          ref="3x30"
          sudoku={this.sudoku}
          rootColumn={this.rootColumn}
          rootRow="0"
        />
        <ThreeByThree
          ref="3x31"
          sudoku={this.sudoku}
          rootColumn={this.rootColumn}
          rootRow="3"
        />
        <ThreeByThree
          ref="3x32"
          sudoku={this.sudoku}
          rootColumn={this.rootColumn}
          rootRow="6"
        />
      </div>
    );
  }
  updateValue(row, col, v) {
    this.refs["3x3" + Math.floor(row / 3)].updateValue(row, col, v);
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
            ref="00"
            sudoku={this.sudoku}
            row={this.rootRow + 0}
            column={this.rootColumn + 0}
          />
          <NumBox
            ref="01"
            sudoku={this.sudoku}
            row={this.rootRow + 0}
            column={this.rootColumn + 1}
          />
          <NumBox
            ref="02"
            sudoku={this.sudoku}
            row={this.rootRow + 0}
            column={this.rootColumn + 2}
          />
        </div>
        <div className="num-row">
          <NumBox
            ref="10"
            sudoku={this.sudoku}
            row={this.rootRow + 1}
            column={this.rootColumn + 0}
          />
          <NumBox
            ref="11"
            sudoku={this.sudoku}
            row={this.rootRow + 1}
            column={this.rootColumn + 1}
          />
          <NumBox
            ref="12"
            sudoku={this.sudoku}
            row={this.rootRow + 1}
            column={this.rootColumn + 2}
          />
        </div>
        <div className="num-row">
          <NumBox
            ref="20"
            sudoku={this.sudoku}
            row={this.rootRow + 2}
            column={this.rootColumn + 0}
          />
          <NumBox
            ref="21"
            sudoku={this.sudoku}
            row={this.rootRow + 2}
            column={this.rootColumn + 1}
          />
          <NumBox
            ref="22"
            sudoku={this.sudoku}
            row={this.rootRow + 2}
            column={this.rootColumn + 2}
          />
        </div>
      </div>
    );
  }
  updateValue(row, col, v) {
    this.refs["" + (row % 3) + (col % 3)].updateValue(v);
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
        ref="input"
        onChange={this.numberEnteredCallback.bind(this)}
      />
    );
  }
  updateValue(v) {
    this.refs["input"].value = v;
  }
  numberEnteredCallback(e) {
    if (e.target.value == "") {
      this.sudoku.set(this.row, this.column, 0);
      return;
    }
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

  solve() {
    for (let col = 0; col < 9; col++) {
      for (let row = 0; row < 9; row++) {
        if (this.get(row, col) > 0) {
          continue;
        }
        for (let v = 1; v <= 9; v++) {
          if (!this.valueIsPossible(row, col, v)) {
            continue;
          }
          this.setAndUpdateUI(row, col, v);
          if (this.solve()) {
            return true;
          }
        }
        this.setAndUpdateUI(row, col, 0);
        return false;
      }
    }
    return true;
  }

  setAndUpdateUI(row, col, v) {
    this.set(row, col, v);
    this.SudokuSolver.updateValue(row, col, v);
  }

  set(row, col, v) {
    assert(row >= 0 && row < 9);
    assert(col >= 0 && col < 9);
    assert(this.valueIsPossible(row, col, v));
    this.mtrx[row][col] = v;
  }

  get(row, col) {
    return this.mtrx[row][col];
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

    return sl(this.mtrx, row).map(function (value, index) {
      return sl(value, col);
    });
  }

  // with respect to the box
  twoDtoLinIdx(row, col) {
    let r = row % 3;
    let c = col % 3;
    return 3 * r + c;
  }

  valueIsOKinSquare(row, col, v) {
    let vec = [].concat.apply([], this.getValuesInRelevantSquare(row, col));
    let idx = this.twoDtoLinIdx(row, col);
    return this._valueIsOKinVector(vec, idx, v);
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
