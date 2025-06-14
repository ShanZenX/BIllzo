"use client";

import React, { useState } from "react";
import Label from "./Label";

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    invoiceDate: "",
    items: [{ description: "", details: "", price: 0 }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = name === "price" ? Number(value) : value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", details: "", price: 0 }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, items: updatedItems });
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
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Invoice Items
        </h3>
        {formData.items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
          >
            <div>
              <Label name="Title" />
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)}
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
            <div>
              <Label name="Details" />
              <input
                type="text"
                name="details"
                value={item.details}
                onChange={(e) => handleItemChange(index, e)}
                className="px-4 py-2 border rounded-lg w-full"
              />
            </div>
            <div className="flex gap-2">
              <div className="w-full">
                <Label name="Price" />
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  className="px-4 py-2 border rounded-lg w-full"
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="w-full mt-[22px] bg-red-500  h-[44px] text-white font-semibold  rounded-xl hover:bg-red-700 transition"
              >
                Remove
              </button>
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

      {/* Summary */}
      {formData.items.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <div className="w-full flex ">
            <div className="w-1/2">
              <h1 className="font-extrabold ">
                LPM Electrical & Plumbing Works,
              </h1>
              <h1>No: 02, School street,</h1>
              <h1>East Potheri, Maraimalainagar - 603203,</h1>
              <h1>Mobile No +91 96770 48936.</h1>
              <br></br>
              <br></br>
              <h4 className="text-lg font-semibold mb-2">Bill Summary</h4>
            </div>
            <div className="w-1/2 text-end">
              <h1 className="font-extrabold">{formData.customerName}</h1>
              <h2 className="font-light">{formData.invoiceDate}</h2>
            </div>
          </div>
          <div className="space-y-2">
            {formData.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-gray-700 border-b pb-2"
              >
                <span className="w-2/3">
                  <strong>
                    {index + 1}. {item.description}
                  </strong>
                  <span className="block text-sm text-gray-500">
                    {item.details}
                  </span>
                </span>
                <span className="font-medium text-gray-800">₹{item.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right font-bold text-xl text-green-700">
            Total: ₹
            {formData.items.reduce((total, item) => total + item.price, 0)}
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
