// Officer Collaboration Layer
import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MessageSquare, HelpCircle, Award, Send, User } from 'lucide-react';
import { addOfficerMessage, getOfficerMessages, getAllOfficers, getPeerOfficers } from '@/app/officer-core/officerDataEngine';
import { toast } from 'sonner';

interface OfficerCollaborationPanelProps {
  application: any;
  officer: any;
}

export function OfficerCollaborationPanel({ application, officer }: OfficerCollaborationPanelProps) {
  const [threadMessages, setThreadMessages] = useState(getOfficerMessages(application.id));
  const [newMessage, setNewMessage] = useState('');
  const [helpRequest, setHelpRequest] = useState('');

  // Get peer officers from data engine
  const teamMembers = getPeerOfficers(officer.email);

  useEffect(() => {
    // Update messages when application changes
    setThreadMessages(getOfficerMessages(application.id));
  }, [application.id]);

  // 14. Internal Officer Thread
  const addMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: threadMessages.length + 1,
      officer: officer.name,
      message: newMessage,
      timestamp: 'Just now',
      avatar: officer.name.split(' ').map((n: string) => n[0]).join('')
    };
    addOfficerMessage(application.id, newMsg);
    setThreadMessages([...threadMessages, newMsg]);
    setNewMessage('');
  };

  // 15. Ask For Help - Broadcast to Team
  const broadcastHelp = () => {
    if (!helpRequest.trim()) return;
    toast.success('Help request broadcast to team', {
      description: `Your request "${helpRequest.slice(0, 50)}..." has been sent to all available officers.`
    });
    setHelpRequest('');
  };

  // 16. Officer Skill Profile
  const officerProfile = {
    name: officer.name,
    id: officer.id,
    department: 'Investment Services',
    expertise: ['Textile & Garment', 'Manufacturing', 'BEZA Projects'],
    languages: ['English', 'Bengali', 'Hindi'],
    certifications: ['BIDA Level 2', 'FDI Specialist', 'Compliance Officer'],
    experience: '5 years',
    successRate: 92,
    avgResponseTime: '< 2 hours',
    totalApplications: 156,
    specialSkills: ['Environmental Clearance', 'Fire Safety', 'Land Allocation']
  };

  return (
    <div className="space-y-4">
      {/* Collaboration Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-lg">Officer Collaboration</h3>
      </div>

      {/* 14. Internal Officer Thread */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold">Internal Discussion Thread</h4>
          <Badge variant="outline" className="ml-auto text-xs">
            {threadMessages.length} messages
          </Badge>
        </div>

        <div className="space-y-3 mb-3 max-h-60 overflow-y-auto">
          {threadMessages.map((msg) => (
            <div key={msg.id} className="flex gap-3 p-2 bg-gray-50 rounded">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm">{msg.officer}</p>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addMessage()}
            placeholder="Add internal note (only visible to BIDA officers)..."
            className="flex-1 px-3 py-2 border rounded text-sm"
          />
          <button
            onClick={addMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          🔒 Internal only - not visible to investor
        </p>
      </Card>

      {/* 15. Ask For Help Button */}
      <Card className="p-4 border-l-4 border-l-orange-500">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-5 h-5 text-orange-600" />
          <h4 className="font-semibold">Ask Team for Help</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Stuck on this application? Broadcast a help request to your team.
        </p>
        <textarea
          value={helpRequest}
          onChange={(e) => setHelpRequest(e.target.value)}
          placeholder="Describe what you need help with (e.g., 'Need clarification on pharmaceutical license requirements for this case')..."
          className="w-full px-3 py-2 border rounded text-sm mb-3"
          rows={3}
        />
        <button
          onClick={broadcastHelp}
          className="w-full bg-orange-100 text-orange-800 border border-orange-300 px-4 py-2 rounded hover:bg-orange-200 transition-colors font-medium"
        >
          <HelpCircle className="w-4 h-4 inline mr-2" />
          Broadcast Help Request to Team
        </button>
        <p className="text-xs text-gray-600 mt-2">
          Available officers will be notified and can respond
        </p>
      </Card>

      {/* 16. Officer Skill Profile */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold">Your Skill Profile</h4>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-purple-50 border border-purple-200 rounded">
            <p className="text-xs text-purple-600 mb-1">Success Rate</p>
            <p className="text-2xl font-bold text-purple-900">{officerProfile.successRate}%</p>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded">
            <p className="text-xs text-purple-600 mb-1">Experience</p>
            <p className="text-2xl font-bold text-purple-900">{officerProfile.experience}</p>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded">
            <p className="text-xs text-purple-600 mb-1">Total Cases</p>
            <p className="text-2xl font-bold text-purple-900">{officerProfile.totalApplications}</p>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded">
            <p className="text-xs text-purple-600 mb-1">Response Time</p>
            <p className="text-xl font-bold text-purple-900">{officerProfile.avgResponseTime}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold mb-2">Sector Expertise</p>
            <div className="flex flex-wrap gap-2">
              {officerProfile.expertise.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Languages</p>
            <div className="flex flex-wrap gap-2">
              {officerProfile.languages.map((lang, idx) => (
                <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {officerProfile.certifications.map((cert, idx) => (
                <Badge key={idx} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                  ✓ {cert}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Special Skills</p>
            <div className="flex flex-wrap gap-2">
              {officerProfile.specialSkills.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Team Members Directory */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <User className="w-5 h-5 text-indigo-600" />
          <h4 className="font-semibold">Team Directory</h4>
        </div>
        <div className="space-y-2">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{member.name}</p>
                  {member.available ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 text-xs">
                      ● Available
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-200 text-gray-600 text-xs">
                      Busy
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600">{member.expertise.join(', ')}</p>
                <p className="text-xs text-gray-500">Current workload: {member.workload} applications</p>
              </div>
              <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs hover:bg-blue-200 transition-colors">
                Contact
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}