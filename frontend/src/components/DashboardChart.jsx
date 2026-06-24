import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function DashboardChart({ stats }) {
  const data = [
    {
      name: "Students",
      count: stats.students,
    },
    {
      name: "Colleges",
      count: stats.colleges,
    },
    {
      name: "Departments",
      count: stats.departments,
    },
    {
      name: "Courses",
      count: stats.courses,
    },
    {
      name: "Faculty",
      count: stats.faculty,
    },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="count"
          fill="#2563eb"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DashboardChart;