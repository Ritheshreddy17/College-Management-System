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
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        System Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;