import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Scatter, 
  ScatterChart,
  ResponsiveContainer 
} from 'recharts';

interface ChartData {
  date: string;
  weight?: number;
  mortality?: number;
  feed?: number;
  notes?: string;
}

interface ChartProps {
  data: ChartData[];
}

export function GrowthChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis 
          yAxisId="weight" 
          label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }} 
        />
        <YAxis 
          yAxisId="mortality" 
          orientation="right" 
          label={{ value: 'Mortality', angle: 90, position: 'insideRight' }} 
        />
        <Tooltip />
        
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#8B4513"
          yAxisId="weight"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        
        <Scatter
          name="Mortality"
          data={data.filter((d: ChartData) => d.mortality && d.mortality > 0)}
          fill="#FF6B6B"
          yAxisId="mortality"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function FeedChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: 'Feed (lbs)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        
        <Line
          type="monotone"
          dataKey="feed"
          stroke="#7C9B72"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}