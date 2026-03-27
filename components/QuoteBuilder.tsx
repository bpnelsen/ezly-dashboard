'use client'

import { useState } from 'react'
import { FileText, Plus, Save, Download } from 'lucide-react'

export default function QuoteBuilder() {
  const [quote, setQuote] = useState<{
    title: string;
    clientName: string;
    items: { desc: string; qty: number; rate: number }[];
    notes: string;
  }>({
    title: '',
    clientName: '',
    items: [{ desc: '', qty: 1, rate: 0 }],
    notes: ''
  })

  const addItem = () => setQuote(q => ({...q, items: [...q.items, { desc: '', qty: 1, rate: 0 }]}))
  
  const updateItem = (index: number, field: keyof typeof quote.items[0], value: string | number) => {
    const newItems = [...quote.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setQuote(q => ({ ...q, items: newItems }))
  }

  const total = quote.items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.rate)), 0)

  return (
    <div className="bg-white p-8 shadow-xl rounded-2xl border border-purple-100">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
          <FileText className="text-purple-600" />
          Pro Quote Builder
        </h2>
        <div className="flex gap-2">
          <button className="text-purple-700 bg-purple-50 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-100">
            <Save size={18} /> Save Draft
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-700">
            <Download size={18} /> Generate PDF
          </button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <input className="p-3 border rounded-lg" placeholder="Project Title" onChange={e => setQuote({...quote, title: e.target.value})} />
        <input className="p-3 border rounded-lg" placeholder="Client Name" onChange={e => setQuote({...quote, clientName: e.target.value})} />
      </div>

      {/* Line Items */}
      <div className="space-y-4 mb-6">
        {quote.items.map((item, i) => (
          <div key={i} className="flex gap-4">
            <input className="flex-grow p-3 border rounded-lg" placeholder="Item description" onChange={e => updateItem(i, 'desc', e.target.value)} />
            <input type="number" className="w-20 p-3 border rounded-lg" placeholder="Qty" onChange={e => updateItem(i, 'qty', e.target.value)} />
            <input type="number" className="w-32 p-3 border rounded-lg" placeholder="Rate" onChange={e => updateItem(i, 'rate', e.target.value)} />
          </div>
        ))}
        <button onClick={addItem} className="text-purple-600 font-bold flex items-center gap-1">+ Add Item</button>
      </div>

      <div className="text-right text-2xl font-bold text-purple-900 border-t pt-4">
        Total: ${total.toLocaleString()}
      </div>
    </div>
  )
}
