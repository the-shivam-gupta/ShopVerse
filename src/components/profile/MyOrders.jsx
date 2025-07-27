import { ShoppingBag, PackageCheck, Truck, Clock } from "lucide-react";

const MyOrders = () => {
  const orders = [
    {
      id: "ORD123456",
      date: "Jul 20, 2025",
      total: 1499,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD123455",
      date: "Jul 12, 2025",
      total: 799,
      status: "Shipped",
      items: 1,
    },
    {
      id: "ORD123454",
      date: "Jul 3, 2025",
      total: 2199,
      status: "Processing",
      items: 2,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <PackageCheck size={18} className="text-green-500" />;
      case "Shipped":
        return <Truck size={18} className="text-blue-500" />;
      case "Processing":
        return <Clock size={18} className="text-yellow-500" />;
      default:
        return <ShoppingBag size={18} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Orders
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Here’s a list of all your recent orders.
        </p>
      </div>

      {/* Order Cards */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="space-y-1">
              <p className="text-gray-800 dark:text-white font-medium">
                Order #{order.id}
              </p>
              <p className="text-sm text-gray-500">{order.date}</p>
              <p className="text-sm text-gray-500">
                {order.items} item{order.items > 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center gap-4 justify-between sm:justify-end">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                {getStatusIcon(order.status)}
                <span>{order.status}</span>
              </div>
              <div className="text-sm font-semibold text-pink-600 dark:text-pink-400">
                ₹{order.total}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA or No orders */}
      {orders.length === 0 && (
        <div className="text-center text-sm text-gray-500 mt-6">
          You haven’t placed any orders yet.
        </div>
      )}
    </div>
  );
};

export default MyOrders;
