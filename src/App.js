import React from 'react';
import './App.css';

const Footer = () => (
  <footer>
    <p>Copyright <a href="https://registry.jsonresume.org/bradydowling">Brady Dowling</a> © 2019</p>
  </footer>
);

const content = {
  definition: [
    `An employee's benefits (signing bonus, moving expenses, salary) can be so good that the employee feels bound or cuffed to them even though they can legally leave at any time.`,
  ]
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: localStorage.getItem('cuffValue') || 1000,
      cuffDate: localStorage.getItem('cuffDate'),
      releaseDate: localStorage.getItem('releaseDate')
    };
  }

  cuffDateChange(cuffDate) {
    this.setState({ cuffDate });
    localStorage.setItem('cuffDate', cuffDate);
  }

  freedomDateChange(releaseDate) {
    this.setState({ releaseDate });
    localStorage.setItem('releaseDate', releaseDate);
  }

  valueChange(value) {
    this.setState({ value });
    localStorage.setItem('cuffValue', value);
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
    return `$${this.numberWithCommas(cuffValue.toFixed(2))}`;
  }

  numberWithCommas(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Golden Handcuff Calculator</h1>
          <p>{content.definition[0]}</p>
        </header>
        <div className="calculator-wrapper">
          <section className="calculator">
            <div className="prompt">
              <label htmlFor="start-date">Current job start date</label>
              <input type="date" name="start-date" value={this.state.cuffDate} onChange={e => { this.cuffDateChange(e.target.value); }}></input>
            </div>
            <div className="prompt">
              <label htmlFor="vesting-date">Vesting date</label>
              <input type="date" name="vesting-date" value={this.state.releaseDate} onChange={e => { this.freedomDateChange(e.target.value); }}></input>
            </div>
            <div className="prompt">
              <label htmlFor="cuff-value">Total handcuff value (signing bonus, move cost, etc)</label>
              <input type="number" name="cuff-value" value={this.state.value} min="0" step=".01" onChange={e => { this.valueChange(e.target.value); }}></input>
            </div>
            <div className="results">
              <p>If you left today, you would miss out on:</p>
              <p className="cuff-value">{this.getCuffValue()}</p>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
