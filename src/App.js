import React from 'react';
import './App.css';

const Footer = () => (
  <footer>
    Copyright Brady Dowling © 2019
  </footer>
);

const content = {
  definition: [
    `The term "Golden Handcuffs" is often used to refer to benefits that are so good that the employee is nearly bound to them (though they can legally leave at any time).`,
    `This can be in the form of a signing bonus, moving expenses, or something else must be paid back if the employee does not reach a certain tenure. It could also refer to benefits that will be received if the employee stays for a certain amount of time. Lastly, it could just be that the benefits in general are so good that you don't want to leave.`,
    `This calculator is, of course, for the kind that vest.`
  ],
  background: [
    `A short while back I moved from Seattle to Boston as part of an intracompany transfer which Jeff B so kindly paid for (thanks Jeff). Now that I'm considering other opportunities, I often calculate what it would cost me if I decided to leave before I hit my magic two year mark. Hence this page was born. Hopefully it can help you too!`
  ],
  pitch: [
    `I'm a full-stack engineer and I'm looking around. I especially enjoy working on tools (come from an IDE and data labeling background) and bonus points if I get to be the user (e.g. Cuffs Calculator). I love working with, learning from, and teaching other people. I'm open to local or remote opportunities. Reach out if you're interested in chatting.`
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
          <p>Determine the current value of your golden handcuffs</p>
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
              <p>{this.getCuffValue()}</p>
            </div>
          </section>
        </div>
        <section className="content">
          <h2>Definition</h2>
          <p>{content.definition[0]}</p>
          <p>{content.definition[1]}</p>
          <p>{content.definition[2]}</p>
        </section>
        <section className="content">
          <h2>Background</h2>
          <p>{content.background[0]}</p>
        </section>
        <section className="content">
          <h2>Shameless Plug</h2>
          <p>{content.pitch[0]}</p>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
