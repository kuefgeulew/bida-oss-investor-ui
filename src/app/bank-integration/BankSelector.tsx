// Bank Selector Component - Choose FDI Banking Partner
import { useState } from 'react';
import { ChevronDown, Building2, Check, Star, Clock } from 'lucide-react';
import { BANK_PARTNERS, BankPartner } from './bankTypes';
import { BankDataProvider } from './bankDataProvider';
import { useLanguage } from '@/app/components/LanguageContext';

interface BankSelectorProps {
  investorId: string;
  currentBankId: string;
  onBankChange?: (bankId: string) => void;
}

export function BankSelector({ investorId, currentBankId, onBankChange }: BankSelectorProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(currentBankId);
  
  // 🎯 DEMO-ONLY: Chinese translations
  const zh: Record<string, string> = {
    bankingPartner: '银行合作伙伴',
    selectBankingPartner: '选择银行合作伙伴',
    choosePreferredBank: '选择您首选的外资服务银行',
    premium: '高级',
    setupTime: '设置时间',
    'BRAC Bank': '布拉克银行',
    'DBS Bank': '星展银行',
    'Emirates NBD': '阿联酋国民银行',
    'Bank of Kigali': '基加利银行'
  };
  
  const t = (key: string, fallback: string) => {
    if (language === 'zh') {
      return zh[key] || fallback;
    }
    return fallback;
  };

  const handleSelectBank = (bankId: string) => {
    const success = BankDataProvider.selectBank(investorId, bankId);
    if (success) {
      setSelectedBank(bankId);
      setIsOpen(false);
      if (onBankChange) onBankChange(bankId);
    }
  };

  const currentBank = BANK_PARTNERS.find(b => b.id === selectedBank);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-xl border border-[#e3ebf7] hover:bg-white/80 transition-all"
      >
        <Building2 className="w-5 h-5 text-[#3b82f6]" />
        <div className="text-left">
          <div className="text-xs text-[#64748b] mb-0.5">{t('bankingPartner', 'Banking Partner')}</div>
          <div className="font-semibold text-[#0f172a] flex items-center gap-2">
            {currentBank?.name ? t(currentBank.name, currentBank.name) : ''}
            {currentBank?.tier === 'premium' && (
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            )}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#64748b] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-[420px] z-50 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#e3ebf7] shadow-xl overflow-hidden">
            <div className="p-4 border-b border-[#e3ebf7]">
              <h3 className="font-semibold text-[#0f172a] mb-1">{t('selectBankingPartner', 'Select Banking Partner')}</h3>
              <p className="text-xs text-[#64748b]">{t('choosePreferredBank', 'Choose your preferred bank for FDI services')}</p>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {BANK_PARTNERS.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => handleSelectBank(bank.id)}
                  className={`w-full p-4 text-left hover:bg-[#f8fafc] transition-colors border-b border-[#e3ebf7] last:border-b-0 ${
                    bank.id === selectedBank ? 'bg-[#eff6ff]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#3b82f6]" />
                      <div>
                        <div className="font-semibold text-[#0f172a] flex items-center gap-2">
                          {t(bank.name, bank.name)}
                          {bank.tier === 'premium' && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                              {t('premium', 'Premium')}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#64748b]">{bank.country}</div>
                      </div>
                    </div>
                    {bank.id === selectedBank && (
                      <Check className="w-5 h-5 text-[#3b82f6]" />
                    )}
                  </div>

                  <p className="text-xs text-[#475569] mb-3">{bank.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {bank.capabilities.map(cap => (
                      <span 
                        key={cap} 
                        className="px-2 py-0.5 rounded-md bg-[#eff6ff] text-[#3b82f6] text-xs font-medium"
                      >
                        {cap.replace('_', ' ')}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-[#64748b]">
                      <Clock className="w-3 h-3" />
                      <span>KYC: {bank.processingTime.kyc}h</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#64748b]">
                      <Clock className="w-3 h-3" />
                      <span>Account: {bank.processingTime.accountOpening}h</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#64748b]">
                      <Clock className="w-3 h-3" />
                      <span>LC: {bank.processingTime.lcIssuance}h</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#64748b]">
                      <Clock className="w-3 h-3" />
                      <span>Loan: {bank.processingTime.loanApproval}d</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-[#e3ebf7] bg-[#f8fafc]">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-1 flex-shrink-0" />
                <p className="text-xs text-[#475569]">
                  <strong>Why choose a banking partner?</strong> Integrated banking accelerates your approval process by providing officers with verified KYC, escrow protection, and financial readiness proof.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Compact version for toolbar
export function BankSelectorCompact({ investorId, currentBankId, onBankChange }: BankSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(currentBankId);

  const handleSelectBank = (bankId: string) => {
    const success = BankDataProvider.selectBank(investorId, bankId);
    if (success) {
      setSelectedBank(bankId);
      setIsOpen(false);
      if (onBankChange) onBankChange(bankId);
    }
  };

  const currentBank = BANK_PARTNERS.find(b => b.id === selectedBank);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/40 backdrop-blur-xl border border-[#e3ebf7] hover:bg-white/60 transition-all text-sm"
      >
        <Building2 className="w-4 h-4 text-[#3b82f6]" />
        <span className="font-medium text-[#0f172a]">{currentBank?.name}</span>
        <ChevronDown className={`w-3 h-3 text-[#64748b] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-[300px] z-50 rounded-xl bg-white/95 backdrop-blur-xl border border-[#e3ebf7] shadow-xl overflow-hidden">
            {BANK_PARTNERS.map((bank) => (
              <button
                key={bank.id}
                onClick={() => handleSelectBank(bank.id)}
                className={`w-full p-3 text-left hover:bg-[#f8fafc] transition-colors border-b border-[#e3ebf7] last:border-b-0 ${
                  bank.id === selectedBank ? 'bg-[#eff6ff]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-[#0f172a] text-sm">{bank.name}</div>
                  {bank.id === selectedBank && (
                    <Check className="w-4 h-4 text-[#3b82f6]" />
                  )}
                </div>
                <div className="text-xs text-[#64748b]">{bank.country}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}