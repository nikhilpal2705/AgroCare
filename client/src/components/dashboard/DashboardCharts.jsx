import { Column, Line } from '@ant-design/charts';
import { Col, Empty, Spin } from 'antd';
import dayjs from 'dayjs';
import { Status } from 'helper/constant';

const chartBoxStyle = {
  height: '100%',
  minHeight: 320,
};

const chartTitleStyle = {
  color: '#22075e',
  fontSize: 'medium',
  marginBottom: 5,
  padding: '10px 20px 8px',
  textTransform: 'capitalize',
};

const chartBodyStyle = {
  padding: '0 20px 20px',
};

const mutedTextStyle = {
  color: '#7a8a80',
  fontSize: 12,
};

const stageScores = {
  seedling: 68,
  vegetative: 78,
  flowering: 86,
  fruiting: 88,
  maturity: 82,
};

const clampScore = (value) => Math.max(0, Math.min(100, Math.round(value)));

const getCropHealthScore = (crop) => {
  let score = Number(crop.status) === Status.ACTIVE ? 76 : 45;

  if (crop.cropStage && stageScores[crop.cropStage]) {
    score = stageScores[crop.cropStage];
  }

  if (crop.harvestDate && dayjs(crop.harvestDate).isBefore(dayjs(), 'day')) {
    score -= 16;
  }

  if (!crop.expectedYield) {
    score -= 4;
  }

  return clampScore(score);
};

const buildIrrigationTrend = (irrigationData = []) => {
  const days = Array.from({ length: 15 }, (_, index) => {
    const date = dayjs().subtract(7, 'day').add(index, 'day');
    return {
      label: date.format('DD MMM'),
      dayKey: date.format('YYYY-MM-DD'),
      count: 0,
      completed: 0,
    };
  });

  irrigationData.forEach((item) => {
    const scheduledDay = dayjs(item.scheduledDate).format('YYYY-MM-DD');
    const day = days.find((entry) => entry.dayKey === scheduledDay);

    if (day) {
      day.count += 1;
      if (Number(item.status) === Status.COMPLETED) {
        day.completed += 1;
      }
    }
  });

  return days;
};

const buildIntegerTicks = (maxValue) =>
  Array.from({ length: Math.max(maxValue, 1) + 1 }, (_, index) => index);

const formatIntegerTick = (value) => {
  const numberValue = Number(value);
  return Number.isInteger(numberValue) ? String(numberValue) : '';
};

function IrrigationTrendChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <div style={{ minHeight: 220, display: 'grid', placeItems: 'center' }}>
        <Spin />
      </div>
    );
  }

  const trendData = buildIrrigationTrend(data);
  const totalEvents = trendData.reduce((sum, item) => sum + item.count, 0);
  const completedEvents = trendData.reduce((sum, item) => sum + item.completed, 0);
  const maxCount = Math.max(...trendData.map((item) => item.count), 1);
  const displayMaxCount = maxCount + 1;

  if (!totalEvents) {
    return <Empty description="No irrigation scheduled in the last or next 7 days" />;
  }

  const chartData = trendData.map((item) => ({
    date: dayjs(item.dayKey).format('DD MMM'),
    scheduled: item.count,
    completed: item.completed,
  }));

  return (
    <div>
      <Line
        data={chartData}
        xField="date"
        yField="scheduled"
        height={220}
        smooth
        point={{ size: 5, shapeField: 'circle' }}
        legend={false}
        style={{ stroke: '#2f9d62' }}
        axis={{
          x: { title: false },
          y: { title: false, labelFormatter: formatIntegerTick },
        }}
        scale={{
          y: {
            domain: [0, displayMaxCount],
            nice: false,
            tickCount: displayMaxCount + 1,
            tickMethod: () => buildIntegerTicks(displayMaxCount),
          },
        }}
        tooltip={{
          title: (datum) => datum.date,
          items: [
            { field: 'scheduled', name: 'Scheduled', valueFormatter: (value) => Math.round(value) },
            { field: 'completed', name: 'Completed', valueFormatter: (value) => Math.round(value) },
          ],
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
        <span style={mutedTextStyle}>Last 7 days + next 7 days</span>
        <span style={mutedTextStyle}>{completedEvents}/{totalEvents} completed</span>
      </div>
    </div>
  );
}

function CropHealthChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <div style={{ minHeight: 220, display: 'grid', placeItems: 'center' }}>
        <Spin />
      </div>
    );
  }

  const crops = (data || [])
    .map((crop) => ({
      ...crop,
      healthScore: getCropHealthScore(crop),
    }))
    .sort((a, b) => b.healthScore - a.healthScore)
    .slice(0, 5);

  if (!crops.length) {
    return <Empty description="No crops available for health scoring" />;
  }

  const averageScore = Math.round(crops.reduce((sum, crop) => sum + crop.healthScore, 0) / crops.length);
  const chartData = crops.map((crop) => ({
    cropName: crop.cropName,
    healthScore: crop.healthScore,
  }));

  return (
    <div>
      <Column
        data={chartData}
        xField="cropName"
        yField="healthScore"
        height={220}
        legend={false}
        style={(datum) => ({
          fill:
            datum.healthScore >= 80
              ? '#2f9d62'
              : datum.healthScore >= 60
                ? '#d9a441'
                : '#cf3f43',
        })}
        scale={{ y: { domain: [0, 100] } }}
        axis={{
          x: { title: false },
          y: { title: false, labelFormatter: (value) => `${value}%` },
        }}
        label={{
          text: (datum) => `${datum.healthScore}%`,
          position: 'top',
          style: { fill: '#22075e', fontWeight: 700 },
        }}
        tooltip={{
          items: [{ field: 'healthScore', name: 'Health Score' }],
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
        <span style={mutedTextStyle}>Top {crops.length} crops</span>
        <span style={mutedTextStyle}>Average score: {averageScore}%</span>
      </div>
    </div>
  );
}

export default function DashboardCharts({ irrigationData, cropsData, irrigationLoading, cropsLoading }) {
  return (
    <>
      <Col className="gutter-row" xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
        <div className="whiteBox shadow pad20" style={chartBoxStyle}>
          <h3 style={chartTitleStyle}>Irrigation Trend</h3>
          <div style={chartBodyStyle}>
            <IrrigationTrendChart data={irrigationData} isLoading={irrigationLoading} />
          </div>
        </div>
      </Col>
      <Col className="gutter-row" xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
        <div className="whiteBox shadow pad20" style={chartBoxStyle}>
          <h3 style={chartTitleStyle}>Crop Health Score</h3>
          <div style={chartBodyStyle}>
            <CropHealthChart data={cropsData} isLoading={cropsLoading} />
          </div>
        </div>
      </Col>
    </>
  );
}
