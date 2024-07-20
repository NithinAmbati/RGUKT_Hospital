import React, { useState } from "react";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    { itemName: "Paracetamol", quantity: 100, supplier: "ABC Pharma" },
    { itemName: "Bandages", quantity: 50, supplier: "XYZ Supplies" },
  ]);

  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: "",
    supplier: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    setInventory([...inventory, newItem]);
    setNewItem({ itemName: "", quantity: "", supplier: "" });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Inventory Management
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">
          Inventory Records
        </h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="font-semibold">
              <td className="py-2 px-4 border-b">Item Name</td>
              <td className="py-2 px-4 border-b">Quantity</td>
              <td className="py-2 px-4 border-b">Supplier</td>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{item.itemName}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className="py-2 px-4 border-b">{item.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-2">
          Add New Inventory Item
        </h3>
        <form
          onSubmit={handleAddItem}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="itemName"
            >
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={newItem.itemName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newItem.quantity}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="supplier"
            >
              Supplier
            </label>
            <input
              type="text"
              id="supplier"
              name="supplier"
              value={newItem.supplier}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default InventoryManagement;
