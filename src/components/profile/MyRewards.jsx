import { Gift, Star, TrendingUp } from "lucide-react";

const MyRewards = () => {
  const totalPoints = 3750;
  const nextTierAt = 5000;

  const progressPercent = Math.min((totalPoints / nextTierAt) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Rewards
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Track your reward points and recent reward activity.
        </p>
      </div>

      {/* Total Points */}
      <div className="bg-yellow-100 dark:bg-yellow-400/10 p-6 rounded-xl shadow-md flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Total Reward Points
          </p>
          <h3 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {totalPoints} pts
          </h3>
        </div>
        <Star size={36} className="text-yellow-500 dark:text-yellow-400" />
      </div>

      {/* Progress to next tier */}
      <div>
        <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-2">
          Progress to Next Tier ({nextTierAt} pts)
        </h4>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {nextTierAt - totalPoints} pts to go
        </p>
      </div>

      {/* Recent Rewards */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          Recent Rewards
        </h4>
        <ul className="space-y-3">
          {[
            { title: "₹100 Coupon", date: "Jul 22, 2025", points: "-500 pts" },
            {
              title: "Reached Silver Tier",
              date: "Jul 15, 2025",
              points: "+1,000 pts",
            },
            { title: "Order Reward", date: "Jul 10, 2025", points: "+250 pts" },
          ].map((reward, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-sm"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {reward.title}
                </p>
                <p className="text-gray-500">{reward.date}</p>
              </div>
              <span
                className={`font-semibold ${
                  reward.points.startsWith("-")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {reward.points}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Call to Action */}
      <div className="mt-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition">
          <TrendingUp size={18} /> Explore Ways to Earn More
        </button>
      </div>
    </div>
  );
};

export default MyRewards;
