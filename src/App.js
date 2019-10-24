import React, { useState } from 'react';
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

const App = () => {
  const [value, setValue] = useState(localStorage.getItem('cuffValue') || 1000);
  const [cuffDate, setCuffDate] = useState(localStorage.getItem('cuffDate'));
  const [releaseDate, setReleaseDate] = useState(localStorage.getItem('releaseDate'));

  const cuffDateChange = (newCuffDate) => {
    setCuffDate(newCuffDate);
    localStorage.setItem('cuffDate', newCuffDate);
  }

  const freedomDateChange = (newReleaseDate) => {
    setReleaseDate(newReleaseDate);
    localStorage.setItem('releaseDate', newReleaseDate);
  }

  const valueChange = (newValue) => {
    setValue(newValue);
    localStorage.setItem('cuffValue', newValue);
  }

  const getCuffTimeDetails = () => {
    if (!cuffDate || !releaseDate) {
      return {};
    }
    var dashReplacer = /-/gi;
    const cuffDateObj = new Date(cuffDate.replace(dashReplacer, '/'));
    const todayDate = new Date();
    const releaseDateObj = new Date(releaseDate.replace(dashReplacer, '/'));
    const totalCuffTime = Math.abs(releaseDateObj - cuffDateObj);
    const totalCuffDays = Math.ceil(totalCuffTime / (1000 * 60 * 60 * 24));
    const servedCuffTime = Math.abs(todayDate - cuffDateObj);
    const servedCuffDays = Math.ceil(servedCuffTime / (1000 * 60 * 60 * 24));
    const remainingCuffTime = Math.abs(releaseDateObj - todayDate);
    const remainingCuffDays = Math.ceil(remainingCuffTime / (1000 * 60 * 60 * 24));
    return {
      total: totalCuffDays,
      served: servedCuffDays,
      remaining: remainingCuffDays
    };
  }

  const getCuffValue = () => {
    const cuffDetails = getCuffTimeDetails();
    if (!cuffDetails.remaining || !cuffDetails.total || !value) {
      return '$0';
    }
    const cuffValue = cuffDetails.remaining / cuffDetails.total * value;
    return `$${numberWithCommas(cuffValue.toFixed(2))}`;
  }

  const numberWithCommas = (x) => {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

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
            <input type="date" name="start-date" value={cuffDate} onChange={e => { cuffDateChange(e.target.value); }}></input>
          </div>
          <div className="prompt">
            <label htmlFor="vesting-date">Vesting date</label>
            <input type="date" name="vesting-date" value={releaseDate} onChange={e => { freedomDateChange(e.target.value); }}></input>
          </div>
          <div className="prompt">
            <label htmlFor="cuff-value">Total handcuff value (signing bonus, move cost, etc)</label>
            <input type="number" name="cuff-value" value={value} min="0" step=".01" onChange={e => { valueChange(e.target.value); }}></input>
          </div>
          <div className="results">
            <p>If you left today, you would miss out on:</p>
            <p className="cuff-value">{getCuffValue()}</p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;
