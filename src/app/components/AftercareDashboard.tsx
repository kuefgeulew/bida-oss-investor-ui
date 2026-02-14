import { motion } from 'motion/react';
import { 
  ExpansionReadinessScore, 
  NewIncentivesQualified, 
  OpenSecondFactoryButton,
  InvestorMilestones 
} from './EnhancedAftercare';

/**
 * TAB 13 - AFTERCARE DASHBOARD
 * Post-setup support and expansion opportunities
 */

export function AftercareDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Aftercare & Growth</h2>
        <p className="text-gray-600">
          Your partnership with BIDA doesn't end after setup - we support your expansion
        </p>
      </div>
      
      <ExpansionReadinessScore />
      <NewIncentivesQualified />
      <InvestorMilestones />
      <OpenSecondFactoryButton />
    </div>
  );
}
