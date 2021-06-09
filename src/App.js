import { isValidElement, useEffect, useState } from 'react';
import Searchbar from './components/Searchbar';
import FoundData from './components/FoundData';
import PlotHandler from './components/PlotHandler';

function App() {
  const [sequence, Setsequence] = useState('');
  const [pointsArr, SetpointsArr] = useState([]);
  const [windowSize, SetwindowSize] = useState(11);
  const [windowValid, setWindowValid] = useState(true);

  const getResultsState = (seq, points) => {
    Setsequence(seq);
    SetpointsArr(points);
  };

  const getWindowResult = (windowState) => {
    setWindowValid(windowState);
  };

  const getWindowSize = (windowsize) => {
    SetwindowSize(windowsize);
  };

  useEffect(() => {
    console.log(windowValid, windowSize);
  });

  return (
    <div className="App">
      <div className="container">
        <div className="has-text-centered pb-5">
          <h1 className="title is-1">KYTE DOOLITTLE</h1>
        </div>
        <Searchbar
          getWindowSize={getWindowSize}
          getResultsState={getResultsState}
          getWindowResult={getWindowResult}
        ></Searchbar>
        {sequence && pointsArr && windowValid && (
          <div className="columns mt-3">
            <div className="column is-half">
              <FoundData sequence={sequence} pointsArr={pointsArr}></FoundData>
            </div>
            <div className="column is-half">
              <PlotHandler
                windowSize={windowSize}
                sequence={sequence}
                pointsArr={pointsArr}
              ></PlotHandler>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
