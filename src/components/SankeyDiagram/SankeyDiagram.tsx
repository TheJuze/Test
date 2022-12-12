import React, {useRef} from "react";
import Highcharts from "highcharts";
import highChartsSankey from 'highcharts/modules/sankey'
import HighchartsReact from "highcharts-react-official";

highChartsSankey(Highcharts)

const SankeyDiagram = () => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    // @ts-ignore
    Highcharts.seriesTypes.sankey.prototype.pointAttribs = function(point, state) { // fill links with gradient // TODO: find more elegant solution
        var opacity = this.options.linkOpacity,
            color = point.color;

        if (state) {
            opacity = this.options.states[state].linkOpacity || opacity;
            color = this.options.states[state].color || point.color;
        }

        return {
            fill: point.isNode ?
                color : {
                    linearGradient: {
                        x1: 0,
                        x2: 1,
                        y1: 0,
                        y2: 0
                    },
                    stops: [
                        [0, Highcharts.color(color).setOpacity(opacity).get()],
                        [1, Highcharts.color(point.toNode.color).setOpacity(opacity).get()]
                    ]
                }
        };
    }

    const options: Highcharts.Options = {
        chart: {
            type: 'sankey',
            backgroundColor: '#242427'
        },
        title: {
            text: ""
        },
        series: [{
            type: 'sankey',
            data: [
                ['Медведи', 'Мёд', 50*0.65],
                ['Медведи', 'Малина', 20*0.65],
                ['Медведи', 'Яблоки', 30*0.65],
                ['Ежи', 'Мёд', 50*0.35],
                ['Ежи', 'Малина', 20*0.35],
                ['Ежи', 'Яблоки', 30*0.35],
            ],
            nodes: [{
                name:'Медведи<br/>65%',
                id: 'Медведи',
                color: '#979797',
            },{
                name:'Ежи<br/>35%',
                id: 'Ежи',
                color: '#77954D'
            },{
                name:'Мёд<br/>50%',
                id: 'Мёд',
                color: '#8B75BA'
            },{
                name:'Малина<br/>20%',
                id: 'Малина',
                color: '#DDAFD3'
            },{
                name:'Яблоки<br/>30%',
                dataLabels: {
                    align:'left',
                },
                id: 'Яблоки',
                color: '#7EB8BF'
            }],
            dataLabels: {
                color: '#FFFFFF',
                useHTML: true,
            },
        }]
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
        />
    )
}

export default SankeyDiagram;
