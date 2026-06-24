import {
  FaUsers,
  FaUniversity,
  FaBuilding,
  FaBook,
  FaChalkboardTeacher,
} from "react-icons/fa";

function StatCard({ title, value }) {
  const cardConfig = {
    Students: {
      icon: <FaUsers size={42} />,
      gradient:
        "from-blue-500 to-blue-700",
    },

    Colleges: {
      icon: <FaUniversity size={42} />,
      gradient:
        "from-green-500 to-green-700",
    },

    Departments: {
      icon: <FaBuilding size={42} />,
      gradient:
        "from-purple-500 to-purple-700",
    },

    Courses: {
      icon: <FaBook size={42} />,
      gradient:
        "from-orange-500 to-orange-700",
    },

    Faculty: {
      icon: (
        <FaChalkboardTeacher
          size={42}
        />
      ),
      gradient:
        "from-red-500 to-red-700",
    },
  };

  const config =
    cardConfig[title] || {
      icon: <FaUsers size={42} />,
      gradient:
        "from-slate-500 to-slate-700",
    };

  return (
    <div
      className={`bg-gradient-to-r ${config.gradient}
      text-white
      rounded-3xl
      p-8
      shadow-xl
      hover:scale-105
      hover:shadow-2xl
      transition-all
      duration-300
      cursor-pointer`}
    >
      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-2xl font-medium mb-4">
            {title}
          </h3>

          <h1 className="text-6xl font-bold">
            {value}
          </h1>

        </div>

        <div className="bg-white/20 p-5 rounded-2xl">
          {config.icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;