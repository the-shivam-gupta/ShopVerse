import { CreditCard, PlusCircle, DollarSign } from "lucide-react";

const MyWallet = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Wallet
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          View your wallet balance, linked cards, and recent transactions.
        </p>
      </div>

      {/* Wallet Balance */}
      <div className="bg-pink-100 dark:bg-pink-500/10 p-6 rounded-xl shadow-md flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Wallet Balance
          </p>
          <h3 className="text-3xl font-bold text-pink-600 dark:text-pink-400">
            ₹12,450.00
          </h3>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition">
          <PlusCircle size={18} /> Add Funds
        </button>
      </div>

      {/* Linked Cards */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          Linked Cards
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Visa •••• 4242</p>
              <p className="text-gray-900 dark:text-white font-medium">
                Expires 12/25
              </p>
            </div>
            <CreditCard size={24} className="text-pink-500" />
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Mastercard •••• 9821</p>
              <p className="text-gray-900 dark:text-white font-medium">
                Expires 09/24
              </p>
            </div>
            <CreditCard size={24} className="text-pink-500" />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          Recent Transactions
        </h4>
        <ul className="space-y-3">
          {[
            { label: "Order #1234", date: "Jul 24, 2025", amount: "- ₹850.00" },
            { label: "Top-up", date: "Jul 20, 2025", amount: "+ ₹1,500.00" },
            { label: "Order #1221", date: "Jul 18, 2025", amount: "- ₹450.00" },
          ].map((tx, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-sm"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {tx.label}
                </p>
                <p className="text-gray-500">{tx.date}</p>
              </div>
              <span
                className={`font-semibold ${
                  tx.amount.startsWith("-") ? "text-red-500" : "text-green-500"
                }`}
              >
                {tx.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyWallet;
