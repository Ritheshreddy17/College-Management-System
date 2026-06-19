function StatCard({ title, value, icon, color }) {
  return (
    <div
      className={`${color} text-white p-6 rounded-xl shadow-lg`}
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm opacity-80">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-5xl">
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;