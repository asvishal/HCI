import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { 
  Layout, MessageSquare, BarChart2, Bell, Calendar, Users,
  Send, PlusCircle, Search, Settings, Home, Briefcase,
  Clock, Star, ChevronRight
} from 'lucide-react';

// Mock data
const pendingTasks = [
  { priority: 'Critical', tasks: 15 },
  { priority: 'High', tasks: 22 },
  { priority: 'Medium', tasks: 18 },
  { priority: 'Low', tasks: 12 },
];

const performanceData = [
  { week: 'Week 1', efficiency: 75, productivity: 68 },
  { week: 'Week 2', efficiency: 82, productivity: 74 },
  { week: 'Week 3', efficiency: 88, productivity: 85 },
  { week: 'Week 4', efficiency: 85, productivity: 82 },
  { week: 'Week 5', efficiency: 92, productivity: 88 },
];

const completedTasks = [
  { day: 'Mon', development: 12, design: 8, testing: 5 },
  { day: 'Tue', development: 15, design: 10, testing: 7 },
  { day: 'Wed', development: 18, design: 12, testing: 9 },
  { day: 'Thu', development: 14, design: 9, testing: 6 },
  { day: 'Fri', development: 16, design: 11, testing: 8 },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatMessage, setChatMessage] = useState('');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <div className="w-20 bg-[#1E293B] text-white flex flex-col items-center py-8">
        <div className="mb-12">
          <Layout size={32} className="text-[#4ECDC4]" />
        </div>
        
        <nav className="flex flex-col gap-8">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-[#4ECDC4] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Home size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={`p-3 rounded-xl transition-all ${activeTab === 'chat' ? 'bg-[#4ECDC4] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <MessageSquare size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`p-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-[#4ECDC4] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Briefcase size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`p-3 rounded-xl transition-all ${activeTab === 'calendar' ? 'bg-[#4ECDC4] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Calendar size={24} />
          </button>
        </nav>

        <div className="mt-auto">
          <button className="p-3 text-gray-400 hover:text-white transition-all">
            <Settings size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white h-20 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#1E293B]">HCI</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span>Last updated 5m ago</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] w-64"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button className="relative">
              <Bell size={24} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-6">
                {[
                  { title: 'Active Projects', value: '12', trend: '+2', icon: Star },
                  { title: 'Team Members', value: '24', trend: '+5', icon: Users },
                  { title: 'Tasks Completed', value: '156', trend: '+18', icon: BarChart2 },
                  { title: 'Hours Tracked', value: '280', trend: '+32', icon: Clock },
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-500 mb-1">{stat.title}</p>
                        <h3 className="text-3xl font-bold text-[#1E293B]">{stat.value}</h3>
                      </div>
                      <div className={`p-3 rounded-xl ${index === 0 ? 'bg-pink-100' : index === 1 ? 'bg-blue-100' : index === 2 ? 'bg-green-100' : 'bg-purple-100'}`}>
                        <stat.icon size={24} className={`${index === 0 ? 'text-pink-500' : index === 1 ? 'text-blue-500' : index === 2 ? 'text-green-500' : 'text-purple-500'}`} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-green-500 text-sm">{stat.trend}</span>
                      <span className="text-gray-400 text-sm">vs last week</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-12 gap-6">
                {/* Performance Chart */}
                <div className="col-span-8 bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-[#1E293B]">Performance Metrics</h2>
                    <select className="bg-gray-50 rounded-lg px-3 py-2 text-sm">
                      <option>Last 5 Weeks</option>
                      <option>Last 3 Months</option>
                      <option>Last Year</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="efficiency" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="productivity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="efficiency" stroke="#4ECDC4" fillOpacity={1} fill="url(#efficiency)" />
                      <Area type="monotone" dataKey="productivity" stroke="#FF6B6B" fillOpacity={1} fill="url(#productivity)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Priority Distribution */}
                <div className="col-span-4 bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-[#1E293B] mb-6">Task Distribution</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pendingTasks}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="tasks"
                        label
                      >
                        {pendingTasks.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weekly Progress */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#1E293B]">Weekly Progress</h2>
                  <button className="flex items-center gap-2 text-[#4ECDC4] hover:text-[#45B7D1] transition-colors">
                    <span>View Details</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={completedTasks}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="development" stackId="a" fill="#4ECDC4" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="design" stackId="a" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="testing" stackId="a" fill="#45B7D1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="bg-white rounded-xl shadow-sm h-[calc(100vh-8rem-5rem)] flex">
              {/* Chat Sidebar */}
              <div className="w-80 border-r">
                <div className="p-4 border-b">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                    />
                    <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>
                <div className="overflow-y-auto h-[calc(100%-4rem)]">
                  {/* Chat List */}
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer border-b">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://images.unsplash.com/photo-${1500000000000 + index}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                          alt="User"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Team {index + 1}</h3>
                            <span className="text-xs text-gray-500">2m ago</span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">Latest message preview...</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Main */}
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Team"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h2 className="font-semibold">Design Team</h2>
                        <p className="text-sm text-gray-500">8 members</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Search size={20} className="text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Bell size={20} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  {/* Chat messages would go here */}
                </div>

                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <PlusCircle size={20} className="text-gray-600" />
                    </button>
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                    />
                    <button className="p-3 bg-[#4ECDC4] text-white rounded-lg hover:bg-[#45B7D1] transition-colors">
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-[#1E293B] mb-4">Calendar</h2>
              {/* Calendar implementation would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;