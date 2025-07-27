import { Outlet, NavLink } from "react-router-dom";
import {
  Wallet,
  Gift,
  ShoppingBag,
  User,
  MapPin,
  CreditCard,
  Sliders,
  Users,
  HelpCircle,
  LogOut,
} from "lucide-react";

const ProfileLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-start py-10 px-4">
      <div className="flex items-center flex-col md:flex-row gap-6 w-full max-w-6xl">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
          <div className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Denis Holland
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            38.005 Balance
          </p>
          <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <NavLink
                to="wallet"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold flex gap-2"
                    : "flex gap-2 hover:text-pink-500"
                }
              >
                <Wallet size={18} /> My Wallet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="rewards"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold flex gap-2"
                    : "flex gap-2 hover:text-pink-500"
                }
              >
                <Gift size={18} /> My Rewards
              </NavLink>
            </li>
            <li>
              <NavLink
                to="orders"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold flex gap-2"
                    : "flex gap-2 hover:text-pink-500"
                }
              >
                <ShoppingBag size={18} /> My Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="info"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold flex gap-2"
                    : "flex gap-2 hover:text-pink-500"
                }
              >
                <User size={18} /> Personal Info
              </NavLink>
            </li>
            <li>
              <NavLink
                to="addresses"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold flex gap-2"
                    : "flex gap-2 hover:text-pink-500"
                }
              >
                <MapPin size={18} /> Addresses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="payments"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold flex gap-2"
                    : "flex gap-2 hover:text-pink-500"
                }
              >
                <CreditCard size={18} /> Payment Methods
              </NavLink>
            </li>
            <li>
              <NavLink
                to="preferences"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold flex gap-2"
                    : "flex gap-2 hover:text-pink-500"
                }
              >
                <Sliders size={18} /> Preferences
              </NavLink>
            </li>
            <li>
              <NavLink
                to="social"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold flex gap-2"
                    : "flex gap-2 hover:text-pink-500"
                }
              >
                <Users size={18} /> Social Networks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="help"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500 font-semibold flex gap-2"
                    : "flex gap-2 hover:text-pink-500"
                }
              >
                <HelpCircle size={18} /> Need Help
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="flex gap-2 hover:text-pink-500">
                <LogOut size={18} /> Sign Out
              </NavLink>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-2 md:px-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
