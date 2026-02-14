/**
 * ⭐ SERVICE RATING WIDGET
 * MOUNT: GovPermitCenter (after completion), CertificateViewer (post approval)
 * PURPOSE: Collect user feedback on completed services
 */

import React, { useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import { submitRating, hasRated, getUserRating } from './ratingEngine';

interface ServiceRatingWidgetProps {
  bbid: string;
  serviceId: string;
  serviceName: string;
  agencyId: string;
  agencyName: string;
  investorName: string;
  onRatingSubmitted?: () => void;
}

export function ServiceRatingWidget({
  bbid,
  serviceId,
  serviceName,
  agencyId,
  agencyName,
  investorName,
  onRatingSubmitted,
}: ServiceRatingWidgetProps) {
  const existingRating = getUserRating(bbid, serviceId);
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(existingRating?.rating || 5);
  const [feedback, setFeedback] = useState(existingRating?.feedback || '');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(!!existingRating);

  const handleSubmit = () => {
    submitRating(
      bbid,
      serviceId,
      serviceName,
      agencyId,
      agencyName,
      rating,
      feedback,
      investorName
    );
    setSubmitted(true);
    onRatingSubmitted?.();
  };

  if (submitted && !existingRating) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4">
        <CheckCircle className="w-6 h-6 text-green-600" />
        <div>
          <h3 className="font-medium text-green-900">Thank you for your feedback!</h3>
          <p className="text-sm text-green-700">Your rating helps improve government services.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6">
      <h3 className="text-lg font-medium mb-4">
        {existingRating ? 'Your Rating' : 'Rate This Service'}
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Service: {serviceName}</p>
        <p className="text-sm text-gray-600">Agency: {agencyName}</p>
      </div>

      {/* Star Rating */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!!existingRating}
            onClick={() => !existingRating && setRating(star as 1 | 2 | 3 | 4 | 5)}
            onMouseEnter={() => !existingRating && setHoveredRating(star)}
            onMouseLeave={() => !existingRating && setHoveredRating(null)}
            className={`transition-all ${existingRating ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                star <= (hoveredRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-4 text-lg font-medium text-gray-700">
          {rating}/5
        </span>
      </div>

      {/* Feedback */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Feedback (Optional)
        </label>
        <textarea
          value={feedback}
          onChange={(e) => !existingRating && setFeedback(e.target.value)}
          disabled={!!existingRating}
          placeholder="Share your experience with this service..."
          className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
          rows={4}
        />
      </div>

      {/* Submit Button */}
      {!existingRating && (
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Send className="w-4 h-4" />
          Submit Rating
        </button>
      )}

      {existingRating && (
        <p className="text-sm text-gray-500 text-center">
          Submitted on {existingRating.submittedAt.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

/**
 * ⭐ COMPACT RATING PROMPT
 * Smaller version for embedding in completion screens
 */
export function CompactRatingPrompt({
  bbid,
  serviceId,
  serviceName,
  agencyId,
  agencyName,
  investorName,
}: ServiceRatingWidgetProps) {
  const alreadyRated = hasRated(bbid, serviceId);
  const [showFullWidget, setShowFullWidget] = useState(false);

  if (alreadyRated) {
    return (
      <div className="bg-green-50/50 border border-green-200/50 rounded-xl p-4 flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="text-sm text-green-800">You've rated this service</span>
      </div>
    );
  }

  if (showFullWidget) {
    return (
      <ServiceRatingWidget
        bbid={bbid}
        serviceId={serviceId}
        serviceName={serviceName}
        agencyId={agencyId}
        agencyName={agencyName}
        investorName={investorName}
        onRatingSubmitted={() => setShowFullWidget(false)}
      />
    );
  }

  return (
    <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Star className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-700">Rate your experience with this service</span>
        </div>
        <button
          onClick={() => setShowFullWidget(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
        >
          Rate Now
        </button>
      </div>
    </div>
  );
}
