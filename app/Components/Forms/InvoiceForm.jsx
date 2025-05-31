
'use client';
import React, { useState } from 'react';

const InvoiceForm = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        invoiceDate: '',
        items: [{ description: '', quantity: 0, price: 0 }],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = formData.items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setFormData({ ...formData, items: updatedItems });
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { description: '', quantity: 0, price: 0 }],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Invoice Data:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Customer Name:</label>
                <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Invoice Date:</label>
                <input
                    type="date"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <h3>Items</h3>
                {formData.items.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) =>
                                handleItemChange(index, 'description', e.target.value)
                            }
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(e) =>
                                handleItemChange(index, 'quantity', e.target.value)
                            }
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) =>
                                handleItemChange(index, 'price', e.target.value)
                            }
                        />
                    </div>
                ))}
                <button type="button" onClick={addItem}>
                    Add Item
                </button>
            </div>
            <button type="submit">Submit Invoice</button>
        </form>
    );
};

export default InvoiceForm;