import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 1000,
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
      return '$0';
    }
    const cuffValue = cuffDetails.remaining / cuffDetails.total * this.state.value;
    return `$${Math.round(100 * cuffValue) / 100}`;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Golden Handcuff Calculator</h1>
          <p>Determine the current value of the golden handcuffs you wear. This will tell you exactly how much money you'll owe your current company if you leave today.</p>
          <label for="start-date">Current job start date</label>
          <input type="date" name="start-date" onInput={e => { this.cuffDateChange(e.target.value); }}></input>
          <label for="vesting-date">Vesting date</label>
          <input type="date" name="vesting-date" onInput={e => { this.freedomDateChange(e.target.value); }}></input>
          <label for="cuff-value">Total handcuff value (signing bonus, move cost, etc)</label>
          <input type="number" name="cuff-value" min="0" step="1" defaultValue="1000" onChange={e => { this.valueChange(e.target.value); }}></input>
          <p>If you left today, you would owe</p>
          <p>{this.getCuffValue()}</p>
        </header>
      </div>
    );
  }
}

export default App;
