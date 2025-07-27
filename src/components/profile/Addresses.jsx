import { useState } from "react";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);

  const handleAddAddress = () => {
    // Add new address logic
  };

  const handleEditAddress = (id) => {
    // Edit address logic
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Addresses</h2>
      <button
        onClick={handleAddAddress}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add New Address
      </button>
      {addresses.length === 0 ? (
        <p className="text-gray-500">No saved addresses yet.</p>
      ) : (
        <ul className="space-y-4">
          {addresses.map((address) => (
            <li
              key={address.id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <span>{address.details}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditAddress(address.id)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Addresses;
