import Chart from 'react-apexcharts';

const HeatMapChart = (props: any) => {
    const { chartData, chartOptions } = props;

    return (
        // @ts-ignore
        <Chart
            options={chartOptions}
            type="heatmap"
            width="100%"
            height="100%"
            series={chartData}
        />
    );
};

export default HeatMapChart;
