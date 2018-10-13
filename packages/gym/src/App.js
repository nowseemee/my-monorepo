import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <ul>
            {this.props.workoutPlan.map(day => (
              <li key={day.name}>
                <h1>{day.name}</h1>
                <ul>
                  {day.sections.map(section => (
                    <li key={`${day.name} - ${section.name}`}>
                      <h2>{section.name}</h2>
                      <ul>
                        {section.exercises.map(excersise => (
                          <li
                            key={`${day.name} - ${section.name} - ${
                              excersise.name
                            }`}
                          >
                            <h3>{excersise.name}</h3>
                            <a href={excersise.video} target={'_blank'}>
                              video
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
