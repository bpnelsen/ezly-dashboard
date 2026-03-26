'use client'

import { useState } from 'react'
import { LayoutDashboard, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react'

// Mock Projects data
const PROJECTS = [
  { id: 1, name: 'Main St Renovation', status: 'Active', progress: 65, deadline: '2026-04-15' },
  { id: 2, name: 'Kitchen Upgrade', status: 'Pending', progress: 10, deadline: '2026-04-01' },
  { id: 3, name: 'Garage Build', status: 'Completed', progress: 100, deadline: '2026-03-10' },
]

export default function CommandCenter() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Project Command Center</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus size={18} /> New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <p className="text-gray-500">Active Projects</p>
           <p className="text-3xl font-bold text-purple-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <p className="text-gray-500">Pending Quotes</p>
           <p className="text-3xl font-bold text-purple-900">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <p className="text-gray-500">Deadlines This Week</p>
           <p className="text-3xl font-bold text-red-600">3</p>
        </div>
        <a href="/prolink" className="bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-200 flex flex-col justify-center items-center hover:bg-purple-100 transition-colors">
          <p className="text-purple-700 font-bold">Access ProLink</p>
        </a>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="p-4">Project Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Progress (%)</th>
              <th className="p-4">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {PROJECTS.map(p => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    p.status === 'Active' ? 'bg-green-100 text-green-700' :
                    p.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                  }`}>{p.status}</span>
                </td>
                <td className="p-4">
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full" style={{ width: `${p.progress}%` }} />
                  </div>
                </td>
                <td className="p-4 text-sm">{p.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
