import React, { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import bellcurve from 'highcharts/modules/histogram-bellcurve';
import './Analytics.scss'


export const Analytics = ({ userScores, metrics }) => {
    (bellcurve)(Highcharts)


    useEffect(() => {
    }, [metrics])
    const generateCategories = () => {
        const categories = []
        var current = 0
        for (var i = 0; i <10; i++)
        {
            if(current === 0) {
                categories.push(`${current}-${current+10}`)
                current = current+11
            }
            else {
                categories.push(`${current}-${current+9}`)
                current = current+10
            }
        }
        return categories
    }
    const generateColour = (index, score) => {
        if (index === Math.floor(score/10) || Math.floor(score/10)-1 === index) return '#1F75FE'
        else return '#B9DFFF'
        
    } 
    const generateColumns = (index, score) => {
        return metrics.percentileMiniGameScores[index].map((value, index) => {
            return {
                x: index,
                y: value,
                color: generateColour(index, score),
            }
        })
    }
    const getMaxPercentile = (index) => {
        return Math.max(...metrics.percentileMiniGameScores[index]) + 1
    }
    const generateMiniGameCharts = () => {
        return userScores.map((score, index) => {
            const options = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: `MiniGame ${index+1}`
                },
                xAxis: {
                    categories: generateCategories(),
                    crosshair: true,
                    title: {
                        text: 'MiniGame Scores (%)'
                    }
                },
                yAxis: {
                    min: 0,
                    max: getMaxPercentile(index),
                    title: {
                        text: 'Number of Users'
                    }
                },
                series: [
                    {
                    type: 'column',
                    name: 'Playerbase Scores',
                    color: '#B9DFFF',
                    data: generateColumns(index,score)
                    },
                    {
                        type: 'column',
                        name: 'User Score',
                        color: '#1F75FE',
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
            <Row className="pb-5">
                <Col style={{'font-size': '2rem'}} className="text-center">
                <p>The <span style={{color: '#B9DFFF'}}>lighter blue</span> indicates the player base score</p>
                <p>The <span style={{color: '#1F75FE'}}>darker blue</span> indicates where your score falls</p>
                </Col>
            </Row>
            {metrics && (
                <Row>
                    {generateMiniGameCharts()}
                </Row>
            )
            }
        </Container>
    );
}
