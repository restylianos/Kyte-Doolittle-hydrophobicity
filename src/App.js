import { useState } from 'react';
import Searchbar from './components/Searchbar';
import FoundData from './components/FoundData';
import PlotHandler from './components/PlotHandler';

function App() {
  const [sequence, Setsequence] = useState();
  const [pointsArr, SetpointsArr] = useState();

  const getResultsState = (seq, points) => {
    Setsequence(seq);
    SetpointsArr(points);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="has-text-centered pb-5">
          <h1 className="title is-1">KYTE DOOLITTLE</h1>
        </div>
        <Searchbar getResultsState={getResultsState}></Searchbar>
        {sequence && pointsArr && (
          <div className="columns mt-3">
            <div className="column is-half">
              <FoundData sequence={sequence} pointsArr={pointsArr}></FoundData>
            </div>
            <div className="column is-half">
              <PlotHandler sequence={sequence} pointsArr={pointsArr}></PlotHandler>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
