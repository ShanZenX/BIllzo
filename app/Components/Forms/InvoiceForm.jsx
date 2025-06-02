"use client";

import React, { useState } from "react";
import Label from "./Label";

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    invoiceDate: "",
    items: [{ description: "", quantity: 0, price: 0 }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = name === "description" ? value : Number(value);
    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 0, price: 0 }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Invoice Data:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Create Invoice</h2>

      {/* Customer Info */}
      <div className="flex gap-4">
        <div className="flex flex-col w-1/2">
          <Label name="Customer Name" />
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g. John Doe"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <Label name="Invoice Date" />
          <input
            type="date"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Item Inputs */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Invoice Items</h3>
        {formData.items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
          >
            <div>
              <Label name="Description" />
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)}
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
            <div>
              <Label name="Quantity" />
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
            <div>
              <Label name="Price" />
              <input
                type="number"
                name="price"
                value={item.price}
                onChange={(e) => handleItemChange(index, e)}
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="mt-2 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          + Add Item
        </button>
      </div>

     

{/* Show added items below the button */}
{formData.items.length > 0 && (
  <div className="mt-6 border-t pt-4">
    <h4 className="text-lg font-semibold mb-2">Item Summary</h4>
    <div className="space-y-2">
      {formData.items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between text-gray-700 border-b pb-2"
        >
          <span>
            {index + 1}. {item.description} — {item.quantity} x ₹{item.price}
          </span>
          <span className="font-medium text-gray-800">
            ₹{item.quantity * item.price}
          </span>
        </div>
      ))}
    </div>

    {/* Optional: Total Amount */}
    <div className="mt-4 text-right font-bold text-xl text-green-700">
      Total: ₹
      {formData.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      )}
    </div>
  </div>
)}
 {/* Submit Button */}
 <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Submit Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;