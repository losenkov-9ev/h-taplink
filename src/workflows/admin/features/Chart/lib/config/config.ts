import { ChartOptions, ChartData } from 'chart.js';
import { ChartConstants } from './constants';

// Интерфейс для параметров графика
interface ChartConfigParams {
  labels: string[];
  dataPoints: number[];
  customStepSize: number;
}

// Интерфейс для возвращаемых данных
interface ChartConfig {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

// Функция для создания градиента
const createGradient = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 340);
  gradient.addColorStop(0, 'rgba(71, 109, 215, 0.64)');
  gradient.addColorStop(1, 'rgba(71, 109, 215, 0.0)');
  return gradient;
};

// Функция для создания данных графика и опций
export const createChartConfig = ({
  labels,
  dataPoints,
  customStepSize,
}: ChartConfigParams): ChartConfig => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  const newLabels: string[] = [];
  const newData: (number | null)[] = [];
  const step = 4;

  for (let i = 0; i < labels.length - 1; i++) {
    newLabels.push(labels[i]);
    newData.push(dataPoints[i]);
    for (let j = 1; j <= step; j++) {
      newLabels.push('');
      newData.push(null);
    }
  }

  newLabels.push(labels[labels.length - 1]);
  newData.push(dataPoints[dataPoints.length - 1]);

  const gradient = createGradient(ctx);

  const chartData: ChartData<'line'> = {
    labels: newLabels,
    datasets: [
      {
        label: '',
        data: newData,
        fill: true, // Включаем заливку
        backgroundColor: gradient,
        borderColor: ChartConstants.ACCENT_COLOR,
        tension: 0.05,
        pointRadius: 15,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: ChartConstants.ACCENT_COLOR,
        pointHoverBorderColor: ChartConstants.POINT_HOVER_BORDER_COLOR,
        pointHoverBorderWidth: 1,
        spanGaps: true,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: ChartConstants.ACCENT_COLOR,
        displayColors: false,
        titleColor: ChartConstants.TOOLTIP_TITLE_COLOR,
        cornerRadius: 5,
        caretSize: 0,
        caretPadding: 8,
        titleFont: {
          size: 0,
        },
        bodyFont: {
          family: ChartConstants.FONT_FAMILY,
          size: 16,
        },
        position: 'nearest',
        yAlign: 'bottom',
        xAlign: 'left',
        padding: {
          top: 4,
          bottom: 2,
          left: 12,
          right: 12,
        },
        callbacks: {
          title: function () {
            return []; // Не показывать заголовок
          },
          label: function (tooltipItem) {
            return String(tooltipItem.raw); // Возвращает только значение по оси Y в виде строки
          },
          afterLabel: function () {
            return ''; // Не показывать дополнительные данные
          },
        },
      },
    },
    scales: {
      y: {
        border: {
          display: true,
          color: ChartConstants.BORDER_COLOR,
        },
        beginAtZero: true,
        grid: {
          color: ChartConstants.BORDER_COLOR,
        },
        ticks: {
          color: ChartConstants.TICK_COLOR,
          stepSize: customStepSize,
          font: {
            family: ChartConstants.FONT_FAMILY,
            size: 12,
          },
          callback: (value, index) => (index !== 0 && index % 2 === 0 ? value : ''),
        },
      },
      x: {
        border: {
          display: true,
          color: ChartConstants.BORDER_COLOR,
        },
        grid: {
          color: ChartConstants.BORDER_COLOR,
          drawTicks: true,
          tickLength: 1,
        },
        ticks: {
          color: ChartConstants.TICK_COLOR,
          font: {
            family: ChartConstants.FONT_FAMILY,
            size: 12,
          },
          maxRotation: 0,
          autoSkip: false,
          callback: (_, index) => {
            if (index === 0) {
              return '';
            }
            return newLabels[index] || '';
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 4,
      },
    },
  };

  return {
    data: chartData,
    options: chartOptions,
  };
};
