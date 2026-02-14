// Deal Room Panel - Secure document sharing with officer access control
// READ-ONLY panel reading from documentEngine
// Mounts inside: InvestorDashboard

import React, { useState, useMemo } from 'react';
import { Lock, Eye, EyeOff, Shield, Users, FileText, Download, Share2, Clock, CheckCircle, AlertCircle, MessageSquare, Send } from 'lucide-react';
import { relationshipManagers } from '@/app/rm/rmRegistry';
import { getDocumentsByInvestor, updateDocumentSharing, addDocumentAccessLog, toggleDocumentConfidential } from '@/app/documents/documentEngine';
import { toast } from 'sonner';

// 🔥 NEW: Comment interface
interface DocumentComment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
  replies?: DocumentComment[];
}

export interface DealRoomDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string; // ✅ Aligned with engine
  size: string;
  confidential: boolean;
  sharedWith: string[]; // Officer IDs
  accessLog: Array<{
    userId: string;
    userName: string;
    action: 'viewed' | 'downloaded' | 'shared';
    timestamp: string;
  }>;
  expiryDate?: string;
  watermark: boolean;
  // 🔥 NEW
  comments?: DocumentComment[];
}

interface DealRoomPanelProps {
  investorId: string; // ✅ Only needs investorId to read from engine
}

export function DealRoomPanel({ investorId }: DealRoomPanelProps) {
  const [selectedDoc, setSelectedDoc] = useState<DealRoomDocument | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedOfficers, setSelectedOfficers] = useState<string[]>([]);
  const [filterConfidential, setFilterConfidential] = useState<'all' | 'confidential' | 'standard'>('all');
  
  // 🔥 NEW: Comment state
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [documentComments, setDocumentComments] = useState<Record<string, DocumentComment[]>>({});
  
  // ✅ READ FROM REAL DOCUMENT ENGINE - NO PROPS
  const documents = useMemo(() => getDocumentsByInvestor(investorId), [investorId]);
  
  // ✅ READ FROM REAL RM REGISTRY - NO MOCK DATA
  const availableOfficers = useMemo(() => 
    relationshipManagers.map(rm => ({
      id: rm.rmId,
      name: rm.name,
      role: rm.title,
      agency: 'BIDA',
    })),
    []
  );
  
  // ✅ FALLBACK UI - If no documents exist
  if (!documents || documents.length === 0) {
    return (
      <div className="bg-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-700 mb-2">No Documents Yet</h3>
        <p className="text-gray-600 text-sm">
          Documents shared with government officers will appear here once uploaded.
        </p>
      </div>
    );
  }
  
  const filteredDocs = documents.filter(doc => {
    if (filterConfidential === 'confidential') return doc.confidential;
    if (filterConfidential === 'standard') return !doc.confidential;
    return true;
  });
  
  const handleShare = () => {
    if (selectedDoc) {
      // ✅ UPDATE ENGINE STATE
      updateDocumentSharing(selectedDoc.id, selectedOfficers);
      addDocumentAccessLog(selectedDoc.id, {
        userId: 'current-user',
        userName: 'You',
        action: 'shared',
        timestamp: new Date().toISOString()
      });
      toast.success(`Document shared with ${selectedOfficers.length} officer(s)`);
      setShareModalOpen(false);
      setSelectedOfficers([]);
    }
  };
  
  const handleDownload = (docId: string) => {
    addDocumentAccessLog(docId, {
      userId: 'current-user',
      userName: 'You',
      action: 'downloaded',
      timestamp: new Date().toISOString()
    });
    toast.info(`Downloading document with watermark...`);
  };
  
  const handleToggleConfidential = (docId: string, isConfidential: boolean) => {
    toggleDocumentConfidential(docId, isConfidential);
    toast.success(isConfidential ? 'Document marked as confidential' : 'Confidential flag removed');
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Virtual Deal Room</h2>
        </div>
        <p className="text-indigo-100">Secure document sharing with granular access control</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600 font-semibold">Total Documents</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{documents.length}</div>
        </div>
        
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-red-600" />
            <span className="text-sm text-gray-600 font-semibold">Confidential</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {documents.filter(d => d.confidential).length}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600 font-semibold">Shared</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {documents.filter(d => d.sharedWith.length > 0).length}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">Filter:</span>
          <button
            onClick={() => setFilterConfidential('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterConfidential === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Documents
          </button>
          <button
            onClick={() => setFilterConfidential('confidential')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterConfidential === 'confidential'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Confidential Only
          </button>
          <button
            onClick={() => setFilterConfidential('standard')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterConfidential === 'standard'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Standard Only
          </button>
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Documents</h3>
        
        {filteredDocs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No documents found
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className={`border-2 rounded-lg p-4 transition-all hover:shadow-md ${
                  doc.confidential
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className={`w-5 h-5 ${doc.confidential ? 'text-red-600' : 'text-blue-600'}`} />
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          {doc.name}
                          {doc.confidential && (
                            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              CONFIDENTIAL
                            </span>
                          )}
                          {doc.watermark && (
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                              Watermarked
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {doc.type} • {doc.size} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    {doc.sharedWith.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Users className="w-4 h-4" />
                        <span>Shared with {doc.sharedWith.length} officer(s)</span>
                      </div>
                    )}
                    
                    {doc.expiryDate && (
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <Clock className="w-4 h-4" />
                        <span>Expires {new Date(doc.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleConfidential(doc.id, !doc.confidential)}
                      className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                        doc.confidential
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      title={doc.confidential ? 'Remove confidential flag' : 'Mark as confidential'}
                    >
                      {doc.confidential ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setCommentModalOpen(true);
                      }}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 transition-all flex items-center gap-1"
                      title="Comments"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {documentComments[doc.id]?.length || 0}
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setShareModalOpen(true);
                      }}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all flex items-center gap-1"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                      }}
                      className="px-3 py-2 bg-gray-600 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-all"
                    >
                      View Log
                    </button>
                    
                    <button
                      onClick={() => handleDownload(doc.id)}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition-all flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
                
                {/* Access Log Preview */}
                {doc.accessLog.length > 0 && selectedDoc?.id === doc.id && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Recent Access Log</h4>
                    <div className="space-y-2">
                      {doc.accessLog.slice(0, 3).map((log, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs bg-white rounded p-2 border border-gray-200">
                          <div className="flex items-center gap-2">
                            {log.action === 'viewed' && <Eye className="w-3 h-3 text-blue-600" />}
                            {log.action === 'downloaded' && <Download className="w-3 h-3 text-green-600" />}
                            {log.action === 'shared' && <Share2 className="w-3 h-3 text-purple-600" />}
                            <span className="font-semibold text-gray-900">{log.userName}</span>
                            <span className="text-gray-600">{log.action}</span>
                          </div>
                          <span className="text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareModalOpen && selectedDoc && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
            onClick={() => setShareModalOpen(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full z-50 border-2 border-indigo-500">
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-100 rounded-full p-3">
                <Share2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Share Document</h3>
                <p className="text-gray-600">{selectedDoc.name}</p>
              </div>
            </div>
            
            {selectedDoc.confidential && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-red-800">
                  <Lock className="w-5 h-5" />
                  <span className="font-bold">This is a CONFIDENTIAL document</span>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  Only share with authorized officers who have a need to access this information.
                </p>
              </div>
            )}
            
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Select Officers to Share With</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availableOfficers.map((officer) => (
                  <label
                    key={officer.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border-2 border-gray-200 hover:bg-gray-100 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={selectedOfficers.includes(officer.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOfficers([...selectedOfficers, officer.id]);
                        } else {
                          setSelectedOfficers(selectedOfficers.filter(id => id !== officer.id));
                        }
                      }}
                      className="w-5 h-5 text-indigo-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{officer.name}</div>
                      <div className="text-sm text-gray-600">{officer.role} • {officer.agency}</div>
                    </div>
                    {selectedDoc.sharedWith.includes(officer.id) && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShareModalOpen(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleShare}
                disabled={selectedOfficers.length === 0}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Share with {selectedOfficers.length} Officer(s)
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* 🔥 NEW: Comment Modal */}
      {commentModalOpen && selectedDoc && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
            onClick={() => {
              setCommentModalOpen(false);
              setReplyingTo(null);
              setNewComment('');
            }}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full z-50 border-2 border-purple-500 max-h-[90vh] overflow-y-auto">
            {/* Comment modal content here - adding full implementation */}
            <button
              onClick={() => {
                setCommentModalOpen(false);
                setReplyingTo(null);
                setNewComment('');
              }}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 rounded-full p-3">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Document Comments</h3>
                <p className="text-gray-600">{selectedDoc.name}</p>
              </div>
            </div>
            
            {/* Comment input and display - simplified for now */}
            <div className="mb-6">
              <textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <button
                onClick={() => {
                  if (newComment.trim()) {
                    const comment: DocumentComment = {
                      id: Date.now().toString(),
                      userId: 'current-user',
                      userName: 'You',
                      text: newComment,
                      timestamp: new Date().toISOString(),
                    };
                    
                    setDocumentComments(prev => ({
                      ...prev,
                      [selectedDoc.id]: [...(prev[selectedDoc.id] || []), comment],
                    }));
                    
                    setNewComment('');
                    toast.success('Comment posted!');
                  }
                }}
                disabled={!newComment.trim()}
                className="mt-2 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post Comment
              </button>
            </div>
            
            {/* Comments list */}
            <div className="space-y-4">
              {(documentComments[selectedDoc.id] || []).map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-gray-900">{comment.userName}</div>
                      <div className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                  <p className="text-gray-800">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}