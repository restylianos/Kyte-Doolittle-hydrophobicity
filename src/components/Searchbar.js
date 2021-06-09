import React from 'react';
import Axios from 'axios';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniprotAC: '',
      isValidAC: false,
      sequence: '',
      transmemPoints: [],
      windowSize: 11,
      isValidWindowSize: false,
    };
  }

  inputChage(e) {
    if (!this.validateAC(e.target.value)) return;
    this.setState({ uniprotAC: e.target.value, isValidAC: true });
  }

  windowSizeChange(e) {
    let value = parseInt(e.target.value);
    if (value % 2 !== 0 && value > 0 && value <= 21 && !isNaN(value)) {
      this.setState({ windowSize: value, isValidWindowSize: true });
    } else {
      this.setState({ windowSize: value, isValidWindowSize: false });
    }
  }

  validateAC(givenac) {
    if (givenac.length > 10) return false;
    else return true;
  }

  getResults() {
    this.setState({ sequence: '', transmemPoints: [] });
    const transmemRegex = /^FT\s{3}TRANSMEM\s{8}(\d+)(\.\.)(\d+)/gm;
    const sequenceRegex = /(^\s{5}(.*))/gm;
    const givenAC = this.state.uniprotAC;
    let sequence = '';
    let points_arr = [];
    Axios.get(`https://www.uniprot.org/uniprot/${givenAC}.txt`)
      .then((response) => {
        const transmemPoints = response.data.match(transmemRegex);
        const sequenceParts = response.data.match(sequenceRegex);
        let fixedSeq = sequenceParts.map((str) => str.replace(/\s/g, ''));
        sequence = fixedSeq.join('');

        for (let i = 0; i < transmemPoints.length; i++) {
          let value = transmemPoints[i].slice(21).split('..');
          points_arr.push(value[0]);
          points_arr.push(value[1]);
        }
        this.setState({ sequence: sequence, transmemPoints: points_arr });
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => this.props.getResultsState(this.state.sequence, this.state.transmemPoints))
      .then(() => this.props.getWindowResult(this.state.isValidWindowSize))
      .then(() => this.props.getWindowSize(this.state.windowSize));
  }

  render() {
    return (
      <React.Fragment>
        <div className="has-text-centered mt-5">
          <h2 className="title">UniprotAC</h2>
        </div>
        <div className="field">
          <label className="label">Uniprot AC</label>
          <div className="control">
            <input
              className="input is-medium"
              type="text"
              placeholder="Type the uniprot AC here...(Ex: P07550)"
              onChange={(e) => this.inputChage(e)}
            ></input>
          </div>
        </div>
        <div className="field">
          <label className="label">Window size</label>
          <div className="control">
            <input
              className="input is-medium"
              type="text"
              placeholder="Type window size (default:11)"
              onChange={(e) => this.windowSizeChange(e)}
            ></input>
          </div>
          {!this.state.isValidWindowSize && <p className="has-text-danger">Invalid window size</p>}
        </div>
        <div className="has-text-centered">
          <button
            className="button is-rounded is-large is-primary mt-3"
            onClick={() => this.getResults()}
          >
            Go
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Searchbar;
