import React, {useRef} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const PieChart = () => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    const dataFromBackend = {
        total: 215,
        encoded: 0.62
    }
    const encoded = Math.floor(dataFromBackend.total * dataFromBackend.encoded)

    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            backgroundColor: '#4E4E4E',
        },
        plotOptions: {
            pie: {
                size: '182',
                showInLegend: true,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    verticalAlign: 'middle', // TODO: align values to the center
                    formatter: function() {
                        return `${this.y}%`
                    },
                    style: {
                        color: 'rgba(255, 255, 255, 0.96)',
                        textOutline: 'none'
                    },
                    connectorColor: 'rgba(255, 255, 255, 0.96)',
                    connectorShape: function (labelPosition:any, connectorPosition:any) { //TODO: replace any
                        const touchingSliceAt = connectorPosition.touchingSliceAt;
                        const alignment = labelPosition.alignment;

                        return [
                            'M',
                            labelPosition.x,
                            labelPosition.y,
                            'L',
                            touchingSliceAt.x + (alignment === 'left'?10:-10),
                            touchingSliceAt.y
                        ]
                    }
                },
                startAngle: 180 - (360 * dataFromBackend.encoded / 2 - 90)
            },

        },
        title: {
            floating: true,
            margin: 0,
            y: 0,
            x: 0,
            align: 'center',
            verticalAlign: 'middle',
            text: `
                <h2 style="font-size: 32px">${dataFromBackend.total}</h2>
                <br/>
                <p style="color:rgba(255, 255, 255, 0.56)">${encoded}(+74)</p> <!-- what is 74? TODO: remove inline style-->
                <br/>
                <p style="color:rgba(255, 255, 255, 0.56)">${dataFromBackend.total - encoded}</p>
            `,
            style: {
                color: 'rgba(255, 255, 255, 0.96)'
            },
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            margin: 24,
            itemStyle: {
                color: 'rgba(255, 255, 255, 0.96)'
            }
        },
        series: [{
            name: '',
            type: "pie",
            innerSize: '91%',
            dataLabels: {
                distance: 16,
            },
            data: [{
                name: 'Зашифровано',
                y: dataFromBackend.encoded * 100,
                color: '#77954D'
            },{
                name: 'Не зашифровано',
                y: (1 - dataFromBackend.encoded) * 100,
                color: '#979797',
            }],
        }]
    }

    return(
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
        />
    )
}

export default PieChart;
