import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const hydroScale = {
  R: '-4.5',
  K: '-3.9',
  N: '-3.5',
  D: '-3.5',
  Q: '-3.5',
  E: '-3.5',
  H: '-3.2',
  P: '-1.6',
  Y: '-1.3',
  W: '-0.9',
  S: '-0.8',
  T: '-0.7',
  G: '-0.4',
  A: '1.8',
  M: '1.9',
  C: '2.5',
  F: '2.8',
  L: '3.8',
  V: '4.2',
  I: '4.5',
};

export default function PlotHandler(props) {
  const [avgresult, Setavgresult] = useState([]);

  useEffect(() => {
    if (props.sequence) {
      let positiveHydro = [];
      let res_hydro = [];
      const sequence = props.sequence;
      const windowSize = props.windowSize;
      let hydropathy_avg = [];
      let avg_values = [];
      let q = 0.0;
      for (let i = 0; i < windowSize; i++) {
        hydropathy_avg[`${i}`] = 0;
      }
      for (let i = windowSize; i < props.sequence.length; i++) {
        q = 0.0;
        for (let j = i - windowSize; j <= windowSize + i; j++) {
          let res_amino = props.sequence.substr(j, 1);

          let res_hydro = parseFloat(hydroScale[`${res_amino}`]);
          q += res_hydro;
        }

        q = q / (2.0 * windowSize + 1.0);

        hydropathy_avg[i] = q;
      }

      Setavgresult(hydropathy_avg);
    }
  }, [props.sequence, props.windowSize]);

  const data = {
    labels: Object.keys(avgresult),
    datasets: [
      {
        label: 'Average Values',
        data: Object.values(avgresult),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="hast-text-centered">
      <Line data={data} />
    </div>
  );
}
