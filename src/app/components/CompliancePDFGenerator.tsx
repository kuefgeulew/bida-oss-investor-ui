import { motion } from 'motion/react';
import { FileText, Download, CheckCircle2, FileCheck, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { approvalSteps } from '@/app/data/mockData';
import { InstrumentCard } from './ui-primitives';

interface ComplianceData {
  investorName: string;
  companyName: string;
  sector: string;
  investmentAmount: number;
  registrationDate: string;
  steps: typeof approvalSteps;
}

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export function CompliancePDFGenerator({ data }: { data: ComplianceData }) {
  
  const generateComplianceChecklist = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Header
    doc.setFillColor(37, 99, 235); // Blue
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Bangladesh Investment', pageWidth / 2, 15, { align: 'center' });
    doc.setFontSize(16);
    doc.text('Compliance Checklist', pageWidth / 2, 28, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Investor Information
    let yPos = 50;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Investor Information', 14, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Investor Name: ${data.investorName}`, 14, yPos);
    yPos += 6;
    doc.text(`Company Name: ${data.companyName}`, 14, yPos);
    yPos += 6;
    doc.text(`Sector: ${data.sector}`, 14, yPos);
    yPos += 6;
    doc.text(`Investment Amount: USD ${data.investmentAmount.toLocaleString()}`, 14, yPos);
    yPos += 6;
    doc.text(`Registration Date: ${new Date(data.registrationDate).toLocaleDateString()}`, 14, yPos);

    // Approval Steps Table
    yPos += 15;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Approval Steps Status', 14, yPos);
    yPos += 5;

    const tableData = data.steps.map(step => [
      step.name,
      step.agency,
      step.status.toUpperCase(),
      `${step.slaHours}h`,
      step.status === 'completed' 
        ? new Date(step.completionDate!).toLocaleDateString() 
        : step.hoursRemaining > 0 
          ? `${step.hoursRemaining}h left` 
          : 'Pending',
      step.documents.join(', ').substring(0, 40) + '...'
    ]);

    doc.autoTable({
      startY: yPos,
      head: [['Step', 'Agency', 'Status', 'SLA', 'Timeline', 'Documents']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 35 },
        2: { cellWidth: 20 },
        3: { cellWidth: 15 },
        4: { cellWidth: 25 },
        5: { cellWidth: 45 }
      },
      didDrawCell: (data: any) => {
        if (data.column.index === 2 && data.cell.section === 'body') {
          const status = data.cell.raw;
          if (status === 'COMPLETED') {
            doc.setFillColor(16, 185, 129); // Green
          } else if (status === 'IN-PROGRESS') {
            doc.setFillColor(249, 115, 22); // Orange
          } else if (status === 'DELAYED') {
            doc.setFillColor(239, 68, 68); // Red
          } else {
            doc.setFillColor(156, 163, 175); // Gray
          }
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          doc.setTextColor(255, 255, 255);
          doc.text(status, data.cell.x + data.cell.width / 2, data.cell.y + 5, { align: 'center' });
          doc.setTextColor(0, 0, 0);
        }
      }
    });

    // Summary Statistics
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    const completedSteps = data.steps.filter(s => s.status === 'completed').length;
    const totalSteps = data.steps.length;
    const completionRate = ((completedSteps / totalSteps) * 100).toFixed(1);

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Summary', 14, finalY);
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Total Steps: ${totalSteps}`, 14, finalY + 8);
    doc.text(`Completed: ${completedSteps}`, 14, finalY + 14);
    doc.text(`In Progress: ${data.steps.filter(s => s.status === 'in-progress').length}`, 14, finalY + 20);
    doc.text(`Pending: ${data.steps.filter(s => s.status === 'pending').length}`, 14, finalY + 26);
    doc.text(`Completion Rate: ${completionRate}%`, 14, finalY + 32);

    // Required Documents Checklist
    if (finalY + 55 < pageHeight - 30) {
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Required Documents Checklist', 14, finalY + 45);
      
      const allDocs = Array.from(new Set(data.steps.flatMap(s => s.documents)));
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      
      let docY = finalY + 52;
      allDocs.slice(0, 10).forEach((doc_name, index) => {
        doc.text(`☐ ${doc_name}`, 20, docY);
        docY += 5;
      });
    }

    // Footer
    const footerY = pageHeight - 15;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Generated by Bangladesh OSS Investment Platform', pageWidth / 2, footerY, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, footerY + 4, { align: 'center' });
    doc.text('Page 1 of 1', pageWidth - 20, footerY, { align: 'right' });

    // Save PDF
    doc.save(`compliance-checklist-${data.companyName.replace(/\s/g, '-')}-${Date.now()}.pdf`);
  };

  const generateInvestmentCertificate = () => {
    const doc = new jsPDF({
      orientation: 'landscape'
    });
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Border
    doc.setLineWidth(2);
    doc.setDrawColor(37, 99, 235);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    
    doc.setLineWidth(0.5);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

    // Title
    doc.setFontSize(28);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('CERTIFICATE OF REGISTRATION', pageWidth / 2, 40, { align: 'center' });

    // Subtitle
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.text('Bangladesh Investment Development Authority', pageWidth / 2, 52, { align: 'center' });

    // Decorative line
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(1);
    doc.line(pageWidth / 4, 60, (pageWidth * 3) / 4, 60);

    // Main content
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    const centerX = pageWidth / 2;
    let contentY = 80;

    doc.text('This is to certify that', centerX, contentY, { align: 'center' });
    
    contentY += 15;
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text(data.companyName, centerX, contentY, { align: 'center' });
    
    contentY += 15;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.text(`Represented by ${data.investorName}`, centerX, contentY, { align: 'center' });
    
    contentY += 12;
    doc.text(`Has been registered for investment in the ${data.sector} sector`, centerX, contentY, { align: 'center' });
    
    contentY += 12;
    doc.text(`with an approved investment amount of USD ${data.investmentAmount.toLocaleString()}`, centerX, contentY, { align: 'center' });

    contentY += 20;
    doc.setFontSize(10);
    doc.text(`Registration Date: ${new Date(data.registrationDate).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, centerX, contentY, { align: 'center' });

    // Completion status
    const completedSteps = data.steps.filter(s => s.status === 'completed').length;
    const totalSteps = data.steps.length;
    
    contentY += 20;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text(`Approval Progress: ${completedSteps} of ${totalSteps} steps completed`, centerX, contentY, { align: 'center' });

    // Signature section
    contentY += 30;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    // Left signature
    const leftX = pageWidth / 3;
    doc.line(leftX - 40, contentY, leftX + 40, contentY);
    doc.text('Executive Director', leftX, contentY + 6, { align: 'center' });
    doc.text('BIDA', leftX, contentY + 12, { align: 'center' });

    // Right signature
    const rightX = (pageWidth * 2) / 3;
    doc.line(rightX - 40, contentY, rightX + 40, contentY);
    doc.text('Authorized Officer', rightX, contentY + 6, { align: 'center' });
    doc.text('Ministry of Commerce', rightX, contentY + 12, { align: 'center' });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('This certificate is electronically generated and is valid without signature.', centerX, pageHeight - 20, { align: 'center' });
    doc.text(`Certificate ID: BIDA-${Date.now()}`, centerX, pageHeight - 15, { align: 'center' });

    doc.save(`investment-certificate-${data.companyName.replace(/\s/g, '-')}.pdf`);
  };

  const completedSteps = data.steps.filter(s => s.status === 'completed').length;
  const totalSteps = data.steps.length;

  return (
    <div className="space-y-6">
      <InstrumentCard>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <FileCheck className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold">Compliance Documents</h3>
              <p className="text-sm text-gray-600">Generate official PDF reports and certificates</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <InstrumentCard>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{completedSteps}/{totalSteps}</div>
                <div className="text-sm text-gray-600">Steps Completed</div>
              </div>
            </InstrumentCard>
            <InstrumentCard>
              <div className="p-4 bg-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600">
                  {((completedSteps / totalSteps) * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Compliance Rate</div>
              </div>
            </InstrumentCard>
            <InstrumentCard>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {data.steps.filter(s => s.status === 'in-progress').length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </InstrumentCard>
          </div>

          {/* Generate Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <motion.button
              onClick={generateComplianceChecklist}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <FileText className="w-6 h-6 text-blue-600 group-hover:text-white transition-all" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold mb-1">Compliance Checklist</h4>
                  <p className="text-sm text-gray-600">Detailed status of all approval steps</p>
                </div>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-all" />
              </div>
            </motion.button>

            <motion.button
              onClick={generateInvestmentCertificate}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 transition-all">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 group-hover:text-white transition-all" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold mb-1">Investment Certificate</h4>
                  <p className="text-sm text-gray-600">Official registration certificate</p>
                </div>
                <Printer className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-all" />
              </div>
            </motion.button>
          </div>

          {/* Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="flex items-start gap-2">
              <span className="text-blue-600 font-semibold">ℹ️</span>
              These documents are officially formatted and suitable for submission to government agencies, banks, and regulatory authorities.
            </p>
          </div>
        </div>
      </InstrumentCard>
    </div>
  );
}