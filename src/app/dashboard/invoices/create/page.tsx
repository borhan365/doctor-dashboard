"use client";
import { useState } from "react";

export default function CreateInvoice() {
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    date: new Date().toISOString().split("T")[0],
    phone: "",
    email: "",
    address: ""
  });

  const [invoiceItems, setInvoiceItems] = useState([{
    description: "",
    quantity: 1,
    rate: 0,
    amount: 0
  }]);

  const [formData, setFormData] = useState({
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
    subTotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
    notes: ""
  });

  const calculateAmount = (item: any) => {
    return item.quantity * item.rate;
  };

  const updateTotals = (items: any[]) => {
    const subTotal = items.reduce((sum, item) => sum + calculateAmount(item), 0);
    const total = subTotal - formData.discount + formData.tax;
    setFormData(prev => ({
      ...prev,
      subTotal,
      total
    }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...invoiceItems];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
      amount: field === 'quantity' || field === 'rate' 
        ? (field === 'quantity' ? value : newItems[index].quantity) * 
          (field === 'rate' ? value : newItems[index].rate)
        : newItems[index].amount
    };
    setInvoiceItems(newItems);
    updateTotals(newItems);
  };

  const addNewItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0
      }
    ]);
  };

  const removeItem = (index: number) => {
    const newItems = invoiceItems.filter((_, i) => i !== index);
    setInvoiceItems(newItems);
    updateTotals(newItems);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-purple-600">Create Invoice</h2>

        {/* Patient Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-slate-700">Name:</label>
            <input
              type="text"
              value={patientInfo.name}
              onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
              className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Patient Name"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700">Age:</label>
            <input
              type="text"
              value={patientInfo.age}
              onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
              className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Age"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700">Phone:</label>
            <input
              type="tel"
              value={patientInfo.phone}
              onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
              className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Phone Number"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700">Email:</label>
            <input
              type="email"
              value={patientInfo.email}
              onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Email Address"
            />
          </div>
        </div>

        {/* Invoice Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block font-medium text-slate-700">Invoice Items:</label>
            <button
              onClick={addNewItem}
              className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Add Item
            </button>
          </div>
          <div className="space-y-4">
            {invoiceItems.map((item, index) => (
              <div key={index} className="relative border border-slate-200 rounded-lg p-4">
                <button
                  onClick={() => removeItem(index)}
                  className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
                >
                  ×
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      placeholder="Qty"
                      className="w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                    />
                    <input
                      type="number"
                      placeholder="Rate"
                      className="w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, "rate", Number(e.target.value))}
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      className="w-full rounded-md border border-slate-300 p-2 bg-slate-50"
                      value={item.amount}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-700">Subtotal:</span>
            <span>${formData.subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-700">Discount:</span>
            <input
              type="number"
              className="w-24 rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={formData.discount}
              onChange={(e) => {
                const newDiscount = Number(e.target.value);
                setFormData(prev => ({
                  ...prev,
                  discount: newDiscount,
                  total: prev.subTotal - newDiscount + prev.tax
                }));
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-700">Tax:</span>
            <input
              type="number"
              className="w-24 rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={formData.tax}
              onChange={(e) => {
                const newTax = Number(e.target.value);
                setFormData(prev => ({
                  ...prev,
                  tax: newTax,
                  total: prev.subTotal - prev.discount + newTax
                }));
              }}
            />
          </div>
          <div className="flex justify-between items-center font-bold">
            <span className="text-slate-700">Total:</span>
            <span>${formData.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-medium text-slate-700">Notes:</label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            rows={4}
            placeholder="Add any additional notes here..."
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Download
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Print
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">

        {/* Header */}
        <div className="flex justify-between gap-2 border-b pb-4 mb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-purple-600 mb-2">Invoice</h1>
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Invoice #: {formData.invoiceNumber}</p>
                <p>Date: {patientInfo.date}</p>
              </div>
            </div>
          </div>

          {/* Right side - English */}
          <div className="space-y-1 text-right">
            <h1 className="text-xl font-semibold text-purple-600">
              Dr. Sohel Siddike
            </h1>
            <div className="space-y-0.5 text-sm text-slate-600">
              <p>MBBS, BCS (Health)</p>
              <p>MD (Cardiology) NICVD, CCD (Diabetes)</p>
              <p className="text-red-500">Intervention Cardiologist</p>
              <p className="text-blue-500">
                Chittagong Medical College Hospital
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-medium text-slate-700 mb-2">Bill To:</h2>
          <div>
            <p>{patientInfo.name}</p>
            <p>Age: {patientInfo.age}</p>
            <p>{patientInfo.phone}</p>
            <p>{patientInfo.email}</p>
          </div>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-right">Qty</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.description}</td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">${item.rate}</td>
                <td className="p-2 text-right">${item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${formData.subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span>${formData.discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>${formData.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${formData.total.toFixed(2)}</span>
          </div>
        </div>

        {formData.notes && (
          <div className="mt-6">
            <h2 className="font-medium text-slate-700 mb-2">Notes:</h2>
            <p className="text-slate-600">{formData.notes}</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 border-t pt-4 text-sm text-slate-600 text-end">
          <span>The invoice is generated using</span>
          <span className="text-purple-600 font-medium ml-1">Healtha.io</span>
        </footer>
      </div>
    </div>
  );
}
