import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      cuffDate: '01-01-2000',
      releaseDate: '01-01-2100'
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          When did you get cuffed?
          <input type="date" name="cuff-date" onInput={e => { this.cuffDate(e.target.value); }}></input>
          Day of Freedom (Vesting date aka release date):
          <input type="date" name="freedom-date" onInput={e => { this.freedomDateChange(e.target.value); }}></input>
          Handcuff value (signing bonus, move cost, etc)
          <input type="number" name="cuff-value" min="0" step="1000" defaultValue="30" onChange={e => { this.valueChange(e.target.value); }}></input>
          If you left today, you would owe:
          {this.state.releaseDate}
        </header>
      </div>
    );
  }
}

export default App;
