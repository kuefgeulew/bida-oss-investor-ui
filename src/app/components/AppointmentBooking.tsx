import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar } from '@/app/components/ui/calendar';
import { format } from 'date-fns';
import { Building2, MapPin, User, CheckCircle2, Clock, XCircle, Calendar as CalendarIcon, Phone } from 'lucide-react';
import { 
  OfficerProfileCard, 
  PreMeetingChecklist, 
  MeetingOutcomeTemplate 
} from './EnhancedAppointmentsRJSC';
import { InstrumentCard, InstrumentSection } from './ui-primitives';

interface Appointment {
  id: string;
  type: 'factory_inspection' | 'doe_visit' | 'consultation' | 'document_review';
  date: Date;
  time: string;
  officer: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const appointmentTypes = [
  {
    id: 'factory_inspection',
    name: 'Factory Inspection',
    icon: Building2,
    description: 'Schedule an on-site factory inspection',
    duration: '2-3 hours',
    agency: 'DIFE'
  },
  {
    id: 'doe_visit',
    name: 'Environmental Site Visit',
    icon: MapPin,
    description: 'DoE officer site assessment',
    duration: '1-2 hours',
    agency: 'Department of Environment'
  },
  {
    id: 'consultation',
    name: 'BIDA Consultation',
    icon: User,
    description: 'One-on-one consultation with BIDA officer',
    duration: '30 minutes',
    agency: 'BIDA'
  },
  {
    id: 'document_review',
    name: 'Document Review Meeting',
    icon: CheckCircle2,
    description: 'Review submitted documents with officer',
    duration: '45 minutes',
    agency: 'BIDA'
  }
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

const availableOfficers = [
  { id: 'off-001', name: 'Md. Kamal Hossain', role: 'Senior Officer, BIDA', phone: '+880-2-123456' },
  { id: 'off-002', name: 'Dr. Rahman Ali', role: 'DoE Inspector', phone: '+880-2-234567' },
  { id: 'off-003', name: 'Fatima Begum', role: 'DIFE Officer', phone: '+880-2-345678' },
  { id: 'off-004', name: 'Eng. Habibur Rahman', role: 'Technical Officer', phone: '+880-2-456789' }
];

export function AppointmentBooking() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedOfficer, setSelectedOfficer] = useState<string>('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt-001',
      type: 'consultation',
      date: new Date(2025, 1, 5, 10, 0),
      time: '10:00 AM',
      officer: 'Md. Kamal Hossain',
      location: 'BIDA Office, Dhaka',
      status: 'scheduled'
    }
  ]);

  const currentType = appointmentTypes.find(t => t.id === selectedType);

  const handleBookAppointment = () => {
    if (!selectedType || !selectedDate || !selectedTime || !selectedOfficer) return;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      type: selectedType as any,
      date: selectedDate,
      time: selectedTime,
      officer: selectedOfficer,
      location: location || 'BIDA Office, Dhaka',
      status: 'scheduled'
    };

    setAppointments([...appointments, newAppointment]);
    setShowConfirmation(true);

    // Reset form
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedType(null);
      setSelectedDate(undefined);
      setSelectedTime('');
      setSelectedOfficer('');
      setLocation('');
      setNotes('');
    }, 3000);
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'blue';
      case 'completed': return 'emerald';
      case 'cancelled': return 'red';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-1 text-gray-900">Appointment Booking</h2>
        <p className="text-gray-600">Schedule inspections, consultations, and site visits</p>
      </div>

      {/* My Appointments */}
      <InstrumentCard>
        <div className="p-8 rounded-2xl border border-[#e3ebf7] bg-white/40 backdrop-blur-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            My Upcoming Appointments
          </h3>
          <div className="space-y-3">
            {appointments.filter(a => a.status === 'scheduled').map((apt) => {
              const type = appointmentTypes.find(t => t.id === apt.type);
              return (
                <div key={apt.id} className="flex items-center gap-4 p-4 bg-gray-50/60 backdrop-blur-sm rounded-lg">
                  <div className={`w-12 h-12 rounded-lg bg-${getStatusColor(apt.status)}-100 flex items-center justify-center shadow-md`}>
                    {type && <type.icon className={`w-6 h-6 text-${getStatusColor(apt.status)}-600`} />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{type?.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {format(apt.date, 'MMM dd, yyyy')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {apt.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {apt.officer}
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(apt.status)}-100 text-${getStatusColor(apt.status)}-700`}>
                    {apt.status}
                  </div>
                </div>
              );
            })}
            {appointments.filter(a => a.status === 'scheduled').length === 0 && (
              <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
            )}
          </div>
        </div>
      </InstrumentCard>

      {/* Book New Appointment */}
      <InstrumentCard>
        <div className="p-8 rounded-2xl border border-[#e3ebf7] bg-white/40 backdrop-blur-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Book New Appointment
          </h3>

          {/* Step 1: Select Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Select Appointment Type</label>
            <div className="grid md:grid-cols-2 gap-3">
              {appointmentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedType === type.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedType === type.id ? 'bg-blue-600' : 'bg-gray-200'
                    }`}>
                      <type.icon className={`w-5 h-5 ${selectedType === type.id ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{type.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {type.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {type.agency}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Step 2: Select Date & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="rounded-md border"
                  />
                </div>

                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <label className="block text-sm font-medium mb-3">Select Time</label>
                    <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedTime === time
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-blue-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Step 3: Select Officer */}
              {selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="block text-sm font-medium mb-3">Select Officer</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {availableOfficers.map((officer) => (
                      <button
                        key={officer.id}
                        onClick={() => setSelectedOfficer(officer.name)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedOfficer === officer.name
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            selectedOfficer === officer.name ? 'bg-blue-600' : 'bg-gray-200'
                          }`}>
                            <User className={`w-5 h-5 ${selectedOfficer === officer.name ? 'text-white' : 'text-gray-600'}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{officer.name}</h4>
                            <p className="text-xs text-gray-600">{officer.role}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Phone className="w-3 h-3" />
                              {officer.phone}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Additional Details */}
              {selectedOfficer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">Location (Optional)</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="BIDA Office, Dhaka"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific requirements or topics to discuss..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                      rows={3}
                    />
                  </div>

                  <button
                    onClick={handleBookAppointment}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Confirm Appointment
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </InstrumentCard>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
        >
          <div className="p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Appointment Confirmed!</h3>
            <p className="text-gray-600 mb-4">
              Your {currentType?.name.toLowerCase()} has been scheduled successfully.
            </p>
            <div className="p-4 bg-gray-50 text-left mb-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p><span className="font-medium">Date:</span> {selectedDate && format(selectedDate, 'MMMM dd, yyyy')}</p>
                <p><span className="font-medium">Time:</span> {selectedTime}</p>
                <p><span className="font-medium">Officer:</span> {selectedOfficer}</p>
                <p><span className="font-medium">Location:</span> {location || 'BIDA Office, Dhaka'}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}