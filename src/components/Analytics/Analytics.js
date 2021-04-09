import React, { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import bellcurve from 'highcharts/modules/histogram-bellcurve';
import './Analytics.scss'


export const Analytics = ({ userScores, metrics }) => {
    bellcurve(Highcharts);

    useEffect(() => {
    }, [metrics])
    const numScores = metrics.numUsers
    const generatePoint = (x, index) => {
        const mean = metrics.avgMiniGameScores[index]
        const stdDev = metrics.stdDeviation[index]
        const factor = 1 / (stdDev * Math.sqrt(2 * Math.PI))
        const ePower = -1 / 2 * Math.pow(((x - mean) / stdDev), 2)
        return factor * Math.exp(ePower)
    }
    const generateDataSet = (index) => {
        const miniGameDataSet = []
        for (var i = 0; i < numScores; i++) {
            miniGameDataSet.push(generatePoint(i, index))
        }
        return miniGameDataSet
    }
    const getPercentile = (value, mean, stdDev) => {
        const z = Math.abs(value-mean)/stdDev
        if (z < -6.5)
            return 0.0;
        if (z > 6.5)
            return 1.0;
        var factK = 1;
        var sum = 0;
        var term = 1;
        var k = 0;
        var loopStop = Math.exp(-23);
        while (Math.abs(term) > loopStop) {
            term = 0.3989422804 * Math.pow(-1, k) * Math.pow(z, k) / (2 * k + 1) / Math.pow(2, k) * Math.pow(z, k + 1) / factK;
            sum += term;
            k++;
            factK *= k;
        }
        sum += 0.5;
        return sum;
    }

    

    const generateMiniGameCharts = () => {
        return userScores.map((score, index) => {
            const options = {
                title: {
                    text: `MiniGame ${index+1}`
                },
                baseSeries: 1,
            
                series: [
                    {
                    type: 'scatter',
                    data: metrics.miniGameScores[index]
                    }
                ]
            }
            return (
                <Col key={index} xs={6}>
                    <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                    />
                </Col>
            )
        })
    }
    return (
        <Container id="Analytics" fluid className="px-5">
            {metrics && (
                <Row>
                    {generateMiniGameCharts()}
                </Row>
            )
            }
        </Container>
    );
}
