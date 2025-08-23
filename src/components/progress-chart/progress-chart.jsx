import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import Chart, { useChart } from '../chart';

export default function ProgressChart({ weightProgression }) {
  const theme = useTheme();
  const { t } = useTranslate();

  // Create categories with proper labeling
  const categories = weightProgression?.map((_, index) =>
    index === 0 ? t('beginning') : `${t('mo')} ${index}`
  );

  const series = [
    {
      name: 'KG',
      data: weightProgression?.map((item) => item.targetWeight),
    },
  ];

  const chartOptions = useChart({
    chart: {
      type: 'area',
      height: 250,
    },
    plotOptions: {
      bar: {
        columnWidth: '10%',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [theme.palette.primary.light],
        inverseColors: false,
        opacityFrom: 0.2,
        opacityTo: 0.5,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
      shared: true,
      intersect: false,
    },
    markers: {
      size: 6,
      hover: {
        size: 8,
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -10,
      formatter: function (val) {
        return `${val}kg`;
      },
    },
  });

  return (
    <Box className="progress__tour__1" sx={{ px: 1.5, overflowX: 'auto' }} style={{ direction: 'ltr' }}>
      <Box sx={{ minWidth: categories?.length * 50 + 'px' }}>
        {/* Dynamically set min width */}
        <Chart type="area" series={series} options={chartOptions} height={250} />
      </Box>
    </Box>
  );
}

ProgressChart.propTypes = {
  weightProgression: PropTypes.array.isRequired,
};
