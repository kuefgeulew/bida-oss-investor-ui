import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Building2, 
  Briefcase, 
  Scale, 
  TrendingUp, 
  Star, 
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

interface ServiceProvider {
  id: string;
  name: string;
  category: 'lawyer' | 'supplier' | 'consultant' | 'partner' | 'bank';
  rating: number;
  reviews: number;
  verified: boolean;
  experience: string;
  specialization: string[];
  location: string;
  responseTime: string;
  projectsCompleted: number;
}

const providers: ServiceProvider[] = [
  {
    id: '1',
    name: 'Rahman & Associates Law Firm',
    category: 'lawyer',
    rating: 4.9,
    reviews: 127,
    verified: true,
    experience: '15+ years',
    specialization: ['Corporate Law', 'FDI Compliance', 'Contract Drafting'],
    location: 'Dhaka',
    responseTime: '< 2 hours',
    projectsCompleted: 340
  },
  {
    id: '2',
    name: 'Bangladesh Legal Advisors',
    category: 'lawyer',
    rating: 4.7,
    reviews: 89,
    verified: true,
    experience: '12+ years',
    specialization: ['Tax Law', 'Labor Law', 'IPR'],
    location: 'Dhaka',
    responseTime: '< 4 hours',
    projectsCompleted: 256
  },
  {
    id: '3',
    name: 'Global Business Consultants BD',
    category: 'consultant',
    rating: 4.8,
    reviews: 156,
    verified: true,
    experience: '10+ years',
    specialization: ['Market Entry', 'Business Setup', 'Compliance'],
    location: 'Dhaka & Chittagong',
    responseTime: '< 3 hours',
    projectsCompleted: 420
  },
  {
    id: '4',
    name: 'TechBD Solutions',
    category: 'supplier',
    rating: 4.6,
    reviews: 203,
    verified: true,
    experience: '8+ years',
    specialization: ['IT Infrastructure', 'Software Development', 'Cloud Services'],
    location: 'Dhaka',
    responseTime: '< 6 hours',
    projectsCompleted: 580
  },
  {
    id: '5',
    name: 'Bangladesh Trade Partners',
    category: 'partner',
    rating: 4.9,
    reviews: 94,
    verified: true,
    experience: '20+ years',
    specialization: ['Import/Export', 'Distribution', 'Logistics'],
    location: 'Chittagong',
    responseTime: '< 4 hours',
    projectsCompleted: 310
  },
  {
    id: '6',
    name: 'Prime Bank Corporate Services',
    category: 'bank',
    rating: 4.8,
    reviews: 445,
    verified: true,
    experience: '25+ years',
    specialization: ['Business Banking', 'Trade Finance', 'FX Services'],
    location: 'Nationwide',
    responseTime: '< 1 hour',
    projectsCompleted: 1250
  }
];

const categories = [
  { id: 'all', name: 'All Services', icon: Building2 },
  { id: 'lawyer', name: 'Legal Services', icon: Scale },
  { id: 'consultant', name: 'Business Consultants', icon: Briefcase },
  { id: 'supplier', name: 'Suppliers', icon: TrendingUp },
  { id: 'partner', name: 'Business Partners', icon: Users },
  { id: 'bank', name: 'Banking Services', icon: Building2 }
];

export function MatchmakerPanel() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  // 🔥 NEW: Messaging state
  const [showMessaging, setShowMessaging] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; sender: 'investor' | 'provider'; text: string; timestamp: Date }>>([]);
  const [messageInput, setMessageInput] = useState('');

  const filteredProviders = providers.filter(
    p => selectedCategory === 'all' || p.category === selectedCategory
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'lawyer': return Scale;
      case 'consultant': return Briefcase;
      case 'supplier': return TrendingUp;
      case 'partner': return Users;
      case 'bank': return Building2;
      default: return Building2;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Service Provider Matchmaking</h3>
        <p className="text-sm text-gray-600 mt-1">Connect with verified professionals and partners</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap flex items-center gap-2 transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Providers</p>
          <p className="text-2xl font-bold text-blue-600">{providers.length}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Verified</p>
          <p className="text-2xl font-bold text-green-600">{providers.filter(p => p.verified).length}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
          <p className="text-2xl font-bold text-purple-600">4.8</p>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Projects Done</p>
          <p className="text-2xl font-bold text-orange-600">
            {providers.reduce((sum, p) => sum + p.projectsCompleted, 0)}
          </p>
        </div>
      </div>

      {/* Provider Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProviders.map((provider, index) => {
          const CategoryIcon = getCategoryIcon(provider.category);
          return (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <CategoryIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                      {provider.verified && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{provider.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{provider.experience} experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{provider.projectsCompleted} projects completed</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-2">
                  {provider.specialization.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-600">
                  Response time: <span className="font-medium text-green-600">{provider.responseTime}</span>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProvider(provider)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                  >
                    Connect
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Contact Modal */}
      {selectedProvider && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProvider(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Connect with {selectedProvider.name}</h3>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <p className="text-sm font-semibold text-gray-900">Send Message</p>
                </div>
                <p className="text-xs text-gray-600">Start a conversation in OSS messaging</p>
                <button 
                  onClick={() => setShowMessaging(true)}
                  className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
                >
                  Open Chat
                </button>
              </div>

              {/* 🔥 WORLD-CLASS: MEETING SCHEDULER */}
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-semibold text-gray-900">Schedule Meeting</p>
                </div>
                <p className="text-xs text-gray-600">Book a time slot for consultation</p>
                <button 
                  onClick={() => setShowScheduler(true)}
                  className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Open Scheduler
                </button>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <p className="text-sm font-semibold text-gray-900">Email Introduction</p>
                </div>
                <p className="text-xs text-gray-600">Send formal introduction email</p>
                <button className="mt-3 w-full py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
                  Send Email
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedProvider(null)}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
      
      {/* 🔥 WORLD-CLASS: MEETING SCHEDULER MODAL */}
      {showScheduler && selectedProvider && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowScheduler(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Schedule Meeting</h3>
                <p className="text-sm text-gray-600 mt-1">Book a consultation with {selectedProvider.name}</p>
              </div>
              <button
                onClick={() => setShowScheduler(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Calendar */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-900 font-semibold mb-2">Available Days:</p>
                  <div className="space-y-1 text-xs text-blue-700">
                    <p>✓ Monday - Friday: 9 AM - 6 PM</p>
                    <p>✓ Saturday: 10 AM - 2 PM</p>
                    <p>✗ Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              {/* Time Slots */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Time</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
                    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
                    '05:00 PM'
                  ].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Meeting Details */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="px-4 py-3 bg-blue-50 border-2 border-blue-500 rounded-lg text-sm font-medium text-blue-700">
                    Video Call
                  </button>
                  <button className="px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300">
                    Phone Call
                  </button>
                  <button className="px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300">
                    In Person
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Agenda (Optional)</label>
                <textarea
                  placeholder="Brief description of what you'd like to discuss..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
            
            {/* Summary */}
            {selectedDate && selectedTime && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-green-900 mb-2">Meeting Summary:</p>
                <div className="space-y-1 text-sm text-green-800">
                  <p><strong>Provider:</strong> {selectedProvider.name}</p>
                  <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><strong>Time:</strong> {selectedTime} (Bangladesh Time)</p>
                  <p><strong>Duration:</strong> 60 minutes</p>
                </div>
              </div>
            )}
            
            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  if (selectedDate && selectedTime) {
                    toast.success(`Meeting scheduled with ${selectedProvider.name} on ${selectedDate} at ${selectedTime}. You will receive a confirmation email.`);
                    setShowScheduler(false);
                    setSelectedProvider(null);
                    setSelectedDate('');
                    setSelectedTime('');
                  }
                }}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setShowScheduler(false)}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* 🔥 WORLD-CLASS: MESSAGING MODAL */}
      {showMessaging && selectedProvider && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowMessaging(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Chat with {selectedProvider.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Start a conversation with {selectedProvider.name}</p>
              </div>
              <button
                onClick={() => setShowMessaging(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="space-y-4 mb-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg ${
                    msg.sender === 'investor' ? 'bg-blue-50 text-blue-900' : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm font-medium">{msg.sender === 'investor' ? 'You' : selectedProvider.name}</p>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{msg.timestamp.toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => {
                  if (messageInput.trim()) {
                    const newMessage = {
                      id: Date.now().toString(),
                      sender: 'investor' as 'investor' | 'provider',
                      text: messageInput.trim(),
                      timestamp: new Date()
                    };
                    setMessages([...messages, newMessage]);
                    setMessageInput('');
                  }
                }}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}