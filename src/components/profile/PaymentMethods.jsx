import { useState } from "react";

const PaymentMethods = () => {
  const [methods, setMethods] = useState([]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
      {methods.length === 0 ? (
        <p className="text-gray-500">No saved payment methods.</p>
      ) : (
        <ul className="space-y-4">
          {methods.map((method) => (
            <li key={method.id} className="border p-4 rounded">
              <p>{method.type} •••• {method.last4}</p>
            </li>
          ))}
        </ul>
      )}
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Add Payment Method
      </button>
    </div>
  );
};

export default PaymentMethods;