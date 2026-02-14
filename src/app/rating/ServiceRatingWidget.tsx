// Service Rating Widget - Collect feedback after workflow completion
// Mounts in: JourneyTracker after service completion

import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import { submitRating } from './ratingEngine';

interface ServiceRatingWidgetProps {
  serviceId: string;
  serviceName: string;
  bbid: string;
  investorId: string;
  officerId?: string;
  officerName?: string;
  onSubmit?: () => void;
}

export function ServiceRatingWidget({
  serviceId,
  serviceName,
  bbid,
  investorId,
  officerId,
  officerName,
  onSubmit,
}: ServiceRatingWidgetProps) {
  const [ratings, setRatings] = useState({
    overall: 0,
    speed: 0,
    quality: 0,
    communication: 0,
    transparency: 0,
  });
  const [feedback, setFeedback] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const handleStarClick = (category: keyof typeof ratings, value: number) => {
    setRatings({ ...ratings, [category]: value });
  };
  
  const handleSubmit = () => {
    if (ratings.overall === 0 || wouldRecommend === null) {
      alert('Please provide an overall rating and recommendation');
      return;
    }
    
    submitRating({
      serviceId,
      serviceName,
      bbid,
      investorId,
      ratings,
      feedback,
      wouldRecommend,
      officerId,
      officerName,
    });
    
    setSubmitted(true);
    onSubmit?.();
  };
  
  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
        <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <ThumbsUp className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You for Your Feedback!</h3>
        <p className="text-gray-600">Your rating helps us improve our services.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Rate Your Experience</h3>
      <p className="text-sm text-gray-600 mb-6">Service: {serviceName}</p>
      
      {/* Overall Rating */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Overall Rating *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick('overall', star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-10 h-10 ${
                  star <= ratings.overall
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Detailed Ratings */}
      <div className="space-y-4 mb-6">
        {[
          { key: 'speed' as const, label: 'Processing Speed' },
          { key: 'quality' as const, label: 'Service Quality' },
          { key: 'communication' as const, label: 'Communication' },
          { key: 'transparency' as const, label: 'Transparency' },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(key, star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= ratings[key]
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Recommendation */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Would you recommend this service to others? *
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => setWouldRecommend(true)}
            className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
              wouldRecommend === true
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            <ThumbsUp className="w-5 h-5 inline mr-2" />
            Yes
          </button>
          <button
            onClick={() => setWouldRecommend(false)}
            className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
              wouldRecommend === false
                ? 'bg-red-500 text-white border-red-600'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            <ThumbsDown className="w-5 h-5 inline mr-2" />
            No
          </button>
        </div>
      </div>
      
      {/* Feedback */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Comments (Optional)
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us more about your experience..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
          rows={4}
        />
      </div>
      
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5" />
        Submit Rating
      </button>
    </div>
  );
}
