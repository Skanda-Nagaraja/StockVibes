import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Graph({ ticker }) {
    const [graphDataX, setGraphDataX] = useState([]);
    const [graphDataY, setGraphDataY] = useState([]);

    const startDate = "2024-01-10";
    const endDate = "2024-01-25";

    useEffect(() => {
        console.log(`http://localhost:5000/graph/TSLA/2024-01-10/2024-01-25`)
        fetch(`http://localhost:5000/graph/${ticker}/2024-01-10/2024-01-25`)
            .then(res => res.json())
            .then(data => {
                console.log('Data from server:', data);
                const xValues = data.map(item => new Date(item[0])); // item[0] is now a timestamp
                const yValues = data.map(item => item[1]);

                setGraphDataX(xValues);
                setGraphDataY(yValues);
                console.log(graphDataX)
            });
    }, [ticker, startDate, endDate]); // Dependencies array to re-run the effect when these values change

    useEffect(() => {
        console.log(ticker)
    }, [graphDataX, graphDataY]);

    return (
        <Plot
            data={[
                {
                    x: graphDataX,
                    y: graphDataY,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                },
            ]}
            layout={{ width: 1000, height: 1000, title: `${ticker}` }}
        />
    );
}

export default Graph;
