import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import formatDate from "../../services/formatDate";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";

const PharmacistMedicinesView = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const getMedicines = async () => {
      const url = "http://localhost:8000/medicines/pharmacist";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setInventory(data);
    };
    getMedicines();
  }, []);

  if (!inventory) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header headerContent={PharmacistsHeaderContent} />
      <main className="p-10 bg-gray-100 min-h-screen">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Inventory Records
          </h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="font-semibold">
                <td className="py-2 px-4 border-b">Item Name</td>
                <td className="py-2 px-4 border-b">Quantity</td>
                <td className="py-2 px-4 border-b">expiryDate</td>
                <td className="py-2 px-4 border-b">importDate</td>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 capitalize">
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(item.expiryDate)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(item.importDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default PharmacistMedicinesView;
