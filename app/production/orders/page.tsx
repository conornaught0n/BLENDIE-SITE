"use client";

import React, { useState } from 'react';

export default function OrderManagement() {
  const [orders, setOrders] = useState([
    { id: '#1042', customer: 'Cafe One', items: '2x Ethiopia, 5x Blend A', total: '12kg', status: 'Pending', date: 'Jan 14, 10:30 AM' },
    { id: '#1041', customer: 'Retail User', items: '1x Brazil Santos', total: '1kg', status: 'In Roast', date: 'Jan 14, 09:15 AM' },
    { id: '#1040', customer: 'Espresso Bar', items: '10x Espresso Blend', total: '10kg', status: 'Packed', date: 'Jan 13, 04:45 PM' },
    { id: '#1039', customer: 'John Doe', items: '2x Decaf', total: '0.5kg', status: 'Shipped', date: 'Jan 13, 02:00 PM' },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (newStatus === 'Shipped') {
        alert(`Pickup scheduled for Order ${id}`);
    }
  };

  return (
    <div className="space-y-6 text-foreground">
      <header className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-serif font-bold text-fruit-plum mb-2">Order Management</h1>
            <p className="text-foreground/60 text-sm">Track, fulfill, and ship orders.</p>
        </div>
        <div className="flex gap-4">
            <input 
                type="text" 
                placeholder="Search Orders..." 
                className="bg-white border border-border-color rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-fruit-plum/30 shadow-sm"
            />
            <button className="bg-fruit-plum/10 hover:bg-fruit-plum/20 text-fruit-plum px-4 py-2 rounded-lg font-bold transition-colors">
                Filter
            </button>
        </div>
      </header>

      <div className="card-soft overflow-hidden overflow-x-auto p-0">
        <table className="w-full text-left text-sm min-w-[600px]">
            <thead>
                <tr className="bg-black/5 text-foreground/50 border-b border-border-color">
                    <th className="p-4 font-normal uppercase tracking-widest text-xs">Order ID</th>
                    <th className="p-4 font-normal uppercase tracking-widest text-xs">Customer</th>
                    <th className="p-4 font-normal uppercase tracking-widest text-xs">Items</th>
                    <th className="p-4 font-normal uppercase tracking-widest text-xs">Total Weight</th>
                    <th className="p-4 font-normal uppercase tracking-widest text-xs">Status</th>
                    <th className="p-4 font-normal uppercase tracking-widest text-xs">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border-color text-foreground">
                {orders.map(order => (
                    <tr key={order.id} className="hover:bg-black/5 transition-colors">
                        <td className="p-4 font-mono font-bold text-fruit-plum">{order.id}</td>
                        <td className="p-4 font-bold">{order.customer}</td>
                        <td className="p-4 text-foreground/70">{order.items}</td>
                        <td className="p-4 font-mono">{order.total}</td>
                        <td className="p-4">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                                order.status === 'Pending' ? 'bg-fruit-citrus/20 text-fruit-citrus' :
                                order.status === 'In Roast' ? 'bg-fruit-plum/20 text-fruit-plum' :
                                order.status === 'Packed' ? 'bg-fruit-berry/20 text-fruit-berry' :
                                'bg-fruit-green/20 text-fruit-green'
                            }`}>
                                {order.status}
                            </span>
                        </td>
                        <td className="p-4">
                            <div className="flex gap-2">
                                {order.status !== 'Shipped' && (
                                    <button 
                                        onClick={() => updateStatus(order.id, 'Shipped')}
                                        className="text-xs bg-fruit-plum/10 text-fruit-plum hover:bg-fruit-plum/20 px-3 py-1.5 rounded transition-colors font-bold"
                                    >
                                        Ship
                                    </button>
                                )}
                                <button className="text-xs text-foreground/50 hover:text-foreground px-2">Details</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
