import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  //Adding showGraph property to display a graph in the application's state
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      //Adding showGraph property to show the graph as user click Start Streaming Data buttlon
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // Define a variable 'x' to keep track of the number of iterations
    let x = 0;

    // Set up an interval to repeatedly fetch data from the server
    const interval = setInterval(() => {
      // Call the 'getData' method from the 'DataStreamer' utility
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update the state by creating a new array of data that consists of
        // the previous data in the state and the new data from the server
        this.setState({ 
          data: serverResponds,
          // Set 'showGraph' to true to indicate that the graph should be displayed
          showGraph: true,
        });
      });

      // Increment the 'x' variable to track the number of iterations
      x++;

      // Check if the number of iterations exceeds 1000
      if (x > 1000) {
        // If so, clear the interval to stop further iterations
        clearInterval(interval);
      }
    }, 100);
}


    }

    
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
