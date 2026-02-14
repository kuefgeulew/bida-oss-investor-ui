/**
 * 📋 GRIEVANCE SATISFACTION SURVEY
 * 
 * Post-resolution feedback collection
 * Triggers upon ticket resolution
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Send,
  CheckCircle,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface GrievanceSatisfactionSurveyProps {
  ticketId: string;
  ticketTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: SurveyFeedback) => void;
}

export interface SurveyFeedback {
  ticketId: string;
  satisfactionRating: 1 | 2 | 3 | 4 | 5;
  resolutionQuality: 'excellent' | 'good' | 'fair' | 'poor';
  responseSpeed: 'excellent' | 'good' | 'fair' | 'poor';
  officerProfessionalism: 'excellent' | 'good' | 'fair' | 'poor';
  wouldRecommendBIDA: boolean;
  additionalComments: string;
  submittedDate: string;
}

export function GrievanceSatisfactionSurvey({
  ticketId,
  ticketTitle,
  isOpen,
  onClose,
  onSubmit
}: GrievanceSatisfactionSurveyProps) {
  const [satisfactionRating, setSatisfactionRating] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [resolutionQuality, setResolutionQuality] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  const [responseSpeed, setResponseSpeed] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  const [officerProfessionalism, setOfficerProfessionalism] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  const [wouldRecommendBIDA, setWouldRecommendBIDA] = useState<boolean | null>(null);
  const [additionalComments, setAdditionalComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!satisfactionRating || wouldRecommendBIDA === null) {
      toast.error('Please complete all required fields');
      return;
    }

    const feedback: SurveyFeedback = {
      ticketId,
      satisfactionRating,
      resolutionQuality,
      responseSpeed,
      officerProfessionalism,
      wouldRecommendBIDA,
      additionalComments,
      submittedDate: new Date().toISOString()
    };

    onSubmit(feedback);
    setSubmitted(true);
    
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      // Reset form
      setSatisfactionRating(null);
      setResolutionQuality('good');
      setResponseSpeed('good');
      setOfficerProfessionalism('good');
      setWouldRecommendBIDA(null);
      setAdditionalComments('');
    }, 2000);

    toast.success('Thank you for your feedback!', {
      description: 'Your input helps us improve our services',
      duration: 4000
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {submitted ? (
              // Success State
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Feedback Submitted!</h3>
                <p className="text-gray-600">Thank you for helping us improve our services</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="p-6 border-b-2 border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Satisfaction Survey</h3>
                    <p className="text-sm text-gray-600 mt-1">Ticket: {ticketId}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Overall Satisfaction Rating */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Overall Satisfaction with Resolution *
                    </label>
                    <div className="flex items-center gap-2">
                      {([1, 2, 3, 4, 5] as const).map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setSatisfactionRating(rating)}
                          className="group transition-all"
                        >
                          <Star
                            className={`w-10 h-10 transition-all ${
                              satisfactionRating && rating <= satisfactionRating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 hover:text-yellow-400'
                            }`}
                          />
                        </button>
                      ))}
                      {satisfactionRating && (
                        <span className="ml-2 text-sm font-bold text-gray-700">
                          {satisfactionRating === 5 && 'Excellent'}
                          {satisfactionRating === 4 && 'Good'}
                          {satisfactionRating === 3 && 'Average'}
                          {satisfactionRating === 2 && 'Poor'}
                          {satisfactionRating === 1 && 'Very Poor'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Resolution Quality */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Quality of Resolution
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['excellent', 'good', 'fair', 'poor'] as const).map((quality) => (
                        <button
                          key={quality}
                          onClick={() => setResolutionQuality(quality)}
                          className={`py-3 px-4 rounded-lg font-semibold border-2 transition-all ${
                            resolutionQuality === quality
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {quality.charAt(0).toUpperCase() + quality.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Response Speed */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Response Speed
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['excellent', 'good', 'fair', 'poor'] as const).map((speed) => (
                        <button
                          key={speed}
                          onClick={() => setResponseSpeed(speed)}
                          className={`py-3 px-4 rounded-lg font-semibold border-2 transition-all ${
                            responseSpeed === speed
                              ? 'bg-green-600 text-white border-green-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
                          }`}
                        >
                          {speed.charAt(0).toUpperCase() + speed.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Officer Professionalism */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Officer Professionalism
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['excellent', 'good', 'fair', 'poor'] as const).map((prof) => (
                        <button
                          key={prof}
                          onClick={() => setOfficerProfessionalism(prof)}
                          className={`py-3 px-4 rounded-lg font-semibold border-2 transition-all ${
                            officerProfessionalism === prof
                              ? 'bg-purple-600 text-white border-purple-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          {prof.charAt(0).toUpperCase() + prof.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Would Recommend */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Would you recommend BIDA's investment services to others? *
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setWouldRecommendBIDA(true)}
                        className={`flex-1 py-4 px-6 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                          wouldRecommendBIDA === true
                            ? 'bg-green-600 text-white border-green-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        Yes, I Would
                      </button>
                      <button
                        onClick={() => setWouldRecommendBIDA(false)}
                        className={`flex-1 py-4 px-6 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                          wouldRecommendBIDA === false
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                        No, I Wouldn't
                      </button>
                    </div>
                  </div>

                  {/* Additional Comments */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Additional Comments (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        value={additionalComments}
                        onChange={(e) => setAdditionalComments(e.target.value)}
                        placeholder="Tell us more about your experience..."
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600">
                      Your feedback is confidential and will be used solely to improve our services. 
                      Individual responses are not shared with officers but aggregate data is used for performance evaluation.
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t-2 border-gray-200 flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Skip Survey
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!satisfactionRating || wouldRecommendBIDA === null}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Submit Feedback
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
