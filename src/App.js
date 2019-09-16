import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      cuffDate: null,
      releaseDate: null
    };
  }

  cuffDateChange(cuffDate) {
    this.setState({ cuffDate });
  }

  freedomDateChange(releaseDate) {
    this.setState({ releaseDate });
  }

  valueChange(value) {
    this.setState({ value });
  }

  getCuffTimeDetails() {
    if (!this.state.cuffDate || !this.state.releaseDate) {
      return {};
    }
    var dashReplacer = /-/gi;
    const cuffDate = new Date(this.state.cuffDate.replace(dashReplacer, '/'));
    const todayDate = new Date();
    const releaseDate = new Date(this.state.releaseDate.replace(dashReplacer, '/'));
    const totalCuffTime = Math.abs(releaseDate - cuffDate);
    const totalCuffDays = Math.ceil(totalCuffTime / (1000 * 60 * 60 * 24));
    const servedCuffTime = Math.abs(todayDate - cuffDate);
    const servedCuffDays = Math.ceil(servedCuffTime / (1000 * 60 * 60 * 24));
    const remainingCuffTime = Math.abs(releaseDate - todayDate);
    const remainingCuffDays = Math.ceil(remainingCuffTime / (1000 * 60 * 60 * 24));
    return {
      total: totalCuffDays,
      served: servedCuffDays,
      remaining: remainingCuffDays
    };
  }

  getCuffValue() {
    const cuffDetails = this.getCuffTimeDetails();
    if (!cuffDetails.remaining || !cuffDetails.total || !this.state.value) {
      return 0;
    }
    return cuffDetails.remaining / cuffDetails.total * this.state.value;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          When did you get cuffed?
          <input type="date" name="cuff-date" onInput={e => { this.cuffDateChange(e.target.value); }}></input>
          Day of Freedom (Vesting date aka release date):
          <input type="date" name="freedom-date" onInput={e => { this.freedomDateChange(e.target.value); }}></input>
          Handcuff value (signing bonus, move cost, etc)
          <input type="number" name="cuff-value" min="0" step="1000" defaultValue="30" onChange={e => { this.valueChange(e.target.value); }}></input>
          If you left today, you would owe:
          {this.getCuffValue()}
        </header>
      </div>
    );
  }
}

export default App;
