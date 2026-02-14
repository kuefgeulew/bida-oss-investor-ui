/**
 * 🌍 COMPLETE TRANSLATION SYSTEM
 * Every single text in the application must be here
 * Languages: English, Dutch, Chinese, Korean
 */

export type Language = 'en' | 'nl' | 'zh' | 'ko';

export const LANGUAGE_NAMES = {
  en: 'English',
  nl: 'Nederlands', // Dutch
  zh: '中文',
  ko: '한국어'
};

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    nl: string;
    zh: string;
    ko: 'string';
  };
}

export const completeTranslations: TranslationDictionary = {
  // ============================================================================
  // COMMON / UNIVERSAL
  // ============================================================================
  'common.welcome': {
    en: 'Welcome to BIDA OSS',
    nl: 'Welkom bij BIDA OSS',
    zh: '欢迎来到BIDA一站式服务平台',
    ko: 'BIDA OSS에 오신 것을 환영합니다'
  },
  'common.back': {
    en: 'Back',
    nl: 'Terug',
    zh: '返回',
    ko: '뒤로'
  },
  'common.backToHome': {
    en: 'Back to Home',
    nl: 'Terug naar Home',
    zh: '返回首页',
    ko: '홈으로 돌아가기'
  },
  'common.next': {
    en: 'Next',
    nl: 'Volgende',
    zh: '下一步',
    ko: '다음'
  },
  'common.submit': {
    en: 'Submit',
    nl: 'Indienen',
    zh: '提交',
    ko: '제출'
  },
  'common.cancel': {
    en: 'Cancel',
    nl: 'Annuleren',
    zh: '取消',
    ko: '취소'
  },
  'common.save': {
    en: 'Save',
    nl: 'Opslaan',
    zh: '保存',
    ko: '저장'
  },
  'common.download': {
    en: 'Download',
    nl: 'Downloaden',
    zh: '下载',
    ko: '다운로드'
  },
  'common.upload': {
    en: 'Upload',
    nl: 'Uploaden',
    zh: '上传',
    ko: '업로드'
  },
  'common.search': {
    en: 'Search',
    nl: 'Zoeken',
    zh: '搜索',
    ko: '검색'
  },
  'common.view': {
    en: 'View',
    nl: 'Bekijken',
    zh: '查看',
    ko: '보기'
  },
  'common.edit': {
    en: 'Edit',
    nl: 'Bewerken',
    zh: '编辑',
    ko: '편집'
  },
  'common.delete': {
    en: 'Delete',
    nl: 'Verwijderen',
    zh: '删除',
    ko: '삭제'
  },
  'common.close': {
    en: 'Close',
    nl: 'Sluiten',
    zh: '关闭',
    ko: '닫기'
  },
  'common.days': {
    en: 'days',
    nl: 'dagen',
    zh: '天',
    ko: '일'
  },
  'common.minutes': {
    en: 'minutes',
    nl: 'minuten',
    zh: '分钟',
    ko: '분'
  },
  'common.confirm': {
    en: 'Confirm',
    nl: 'Bevestigen',
    zh: '确认',
    ko: '확인'
  },
  'common.yes': {
    en: 'Yes',
    nl: 'Ja',
    zh: '是',
    ko: '예'
  },
  'common.no': {
    en: 'No',
    nl: 'Nee',
    zh: '否',
    ko: '아니요'
  },
  'common.loading': {
    en: 'Loading...',
    nl: 'Laden...',
    zh: '加载中...',
    ko: '로딩 중...'
  },
  'common.error': {
    en: 'Error',
    nl: 'Fout',
    zh: '错误',
    ko: '오류'
  },
  'common.success': {
    en: 'Success',
    nl: 'Succes',
    zh: '成功',
    ko: '성공'
  },
  'common.warning': {
    en: 'Warning',
    nl: 'Waarschuwing',
    zh: '警告',
    ko: '경고'
  },
  'common.info': {
    en: 'Information',
    nl: 'Informatie',
    zh: '信息',
    ko: '정보'
  },
  'common.logout': {
    en: 'Logout',
    nl: 'Uitloggen',
    zh: '登出',
    ko: '로그아웃'
  },

  // ============================================================================
  // NAVIGATION / TABS
  // ============================================================================
  'nav.dashboard': {
    en: 'Dashboard',
    nl: 'Dashboard',
    zh: '仪表板',
    ko: '대시보드'
  },
  'nav.journey': {
    en: 'Journey Tracker',
    nl: 'Reis Tracker',
    zh: '旅程跟踪器',
    ko: '여정 추적기'
  },
  'nav.zones': {
    en: 'Investment Zones',
    nl: 'Investeringszones',
    zh: '投资区',
    ko: '투자 구역'
  },
  'nav.documents': {
    en: 'Documents',
    nl: 'Documenten',
    zh: '文件',
    ko: '서류'
  },
  'nav.services': {
    en: 'Services',
    nl: 'Diensten',
    zh: '服务',
    ko: '서비스'
  },
  'nav.payments': {
    en: 'Payments',
    nl: 'Betalingen',
    zh: '付款',
    ko: '결제'
  },
  'nav.compliance': {
    en: 'Compliance',
    nl: 'Naleving',
    zh: '合规',
    ko: '규정 준수'
  },
  'nav.reports': {
    en: 'Reports',
    nl: 'Rapporten',
    zh: '报告',
    ko: '보고서'
  },
  'nav.scenarios': {
    en: 'Scenarios',
    nl: 'Scenario\'s',
    zh: '场景',
    ko: '시나리오'
  },
  'nav.operations': {
    en: 'Operations',
    nl: 'Operaties',
    zh: '运营',
    ko: '운영'
  },

  // ============================================================================
  // DASHBOARD
  // ============================================================================
  'dashboard.title': {
    en: 'Investment Dashboard',
    nl: 'Investeringsdashboard',
    zh: '投资仪表板',
    ko: '투자 대시보드'
  },
  'dashboard.welcome': {
    en: 'Welcome back',
    nl: 'Welkom terug',
    zh: '欢迎回来',
    ko: '환영합니다'
  },
  'dashboard.overview': {
    en: 'Overview',
    nl: 'Overzicht',
    zh: '概览',
    ko: '개요'
  },
  'dashboard.quickActions': {
    en: 'Quick Actions',
    nl: 'Snelle Acties',
    zh: '快速操作',
    ko: '빠른 작업'
  },
  'dashboard.recentActivity': {
    en: 'Recent Activity',
    nl: 'Recente Activiteit',
    zh: '最近活动',
    ko: '최근 활동'
  },
  'dashboard.notifications': {
    en: 'Notifications',
    nl: 'Meldingen',
    zh: '通知',
    ko: '알림'
  },

  // ============================================================================
  // FDI EDUCATION
  // ============================================================================
  'fdi.whatIsFDI': {
    en: 'What is Foreign Direct Investment?',
    nl: 'Wat is Directe Buitenlandse Investering?',
    zh: '什么是外国直接投资？',
    ko: '외국인직접투자란 무엇인가?'
  },
  'fdi.definition': {
    en: 'FDI means control, presence, and long-term operation',
    nl: 'FDI betekent controle, aanwezigheid en langdurige exploitatie',
    zh: 'FDI意味着控制、存在和长期运营',
    ko: 'FDI는 통제, 존재 및 장기 운영을 의미합니다'
  },
  'fdi.greenfield': {
    en: 'Greenfield Investment',
    nl: 'Greenfield Investering',
    zh: '绿地投资',
    ko: '그린필드 투자'
  },
  'fdi.greenfieldDesc': {
    en: 'Building a new facility from scratch in Bangladesh',
    nl: 'Een nieuwe faciliteit vanaf nul bouwen in Bangladesh',
    zh: '在孟加拉国从零开始建设新设施',
    ko: '방글라데시에서 새로운 시설을 처음부터 건설'
  },
  'fdi.brownfield': {
    en: 'Brownfield Investment',
    nl: 'Brownfield Investering',
    zh: '棕地投资',
    ko: '브라운필드 투자'
  },
  'fdi.brownfieldDesc': {
    en: 'Acquiring or leasing existing facilities in Bangladesh',
    nl: 'Bestaande faciliteiten in Bangladesh verwerven of huren',
    zh: '收购或租赁孟加拉国现有设施',
    ko: '방글라데시의 기존 시설 인수 또는 임대'
  },
  'fdi.jointVenture': {
    en: 'Joint Venture',
    nl: 'Joint Venture',
    zh: '合资企业',
    ko: '합작 투자'
  },
  'fdi.jointVentureDesc': {
    en: 'Partnering with local Bangladeshi companies',
    nl: 'Samenwerken met lokale Bangladese bedrijven',
    zh: '与孟加拉国当地公司合作',
    ko: '방글라데시 현지 기업과 파트너십'
  },
  'fdi.legalRequirement': {
    en: 'Legal Requirements',
    nl: 'Wettelijke Vereisten',
    zh: '法律要求',
    ko: '법적 요건'
  },
  'fdi.legalRequirementDesc': {
    en: 'Minimum investment thresholds and registration with BIDA',
    nl: 'Minimale investeringsdrempels en registratie bij BIDA',
    zh: '最低投资门槛和BIDA注册',
    ko: '최소 투자 기준액 및 BIDA 등록'
  },

  // ============================================================================
  // MISSION CONTROL WIDGETS
  // ============================================================================
  'widget.predictedGoLive': {
    en: 'Predicted Go-Live Date',
    nl: 'Verwachte Live Datum',
    zh: '预计上线日期',
    ko: '예상 가동 날짜'
  },
  'widget.riskMeter': {
    en: 'Risk Meter',
    nl: 'Risicometre',
    zh: '风险计',
    ko: '위험 측정기'
  },
  'widget.thisWeek': {
    en: 'This Week\'s Actions',
    nl: 'Acties Deze Week',
    zh: '本周行动',
    ko: '이번 주 작업'
  },
  'widget.officerQueue': {
    en: 'Officer Queue Status',
    nl: 'Officer Wachtrij Status',
    zh: '官员队列状态',
    ko: '담당자 대기열 상태'
  },
  'widget.confidence': {
    en: 'Investor Confidence',
    nl: 'Beleggers Vertrouwen',
    zh: '投资者信心',
    ko: '투자자 신뢰도'
  },
  'widget.delayImpact': {
    en: 'Delay Impact Calculator',
    nl: 'Vertragingsimpact Calculator',
    zh: '延迟影响计算器',
    ko: '지연 영향 계산기'
  },

  // ============================================================================
  // FACTORY OPERATIONS
  // ============================================================================
  'factory.title': {
    en: 'Factory Operations Dashboard',
    nl: 'Fabriek Operaties Dashboard',
    zh: '工厂运营仪表板',
    ko: '공장 운영 대시보드'
  },
  'factory.production': {
    en: 'Production',
    nl: 'Productie',
    zh: '生产',
    ko: '생산'
  },
  'factory.todayProduction': {
    en: 'Today\'s Production',
    nl: 'Productie Vandaag',
    zh: '今日生产',
    ko: '오늘의 생산'
  },
  'factory.efficiency': {
    en: 'Efficiency',
    nl: 'Efficiëntie',
    zh: '效率',
    ko: '효율성'
  },
  'factory.defectRate': {
    en: 'Defect Rate',
    nl: 'Defectpercentage',
    zh: '缺陷率',
    ko: '불량률'
  },
  'factory.capacity': {
    en: 'Capacity Utilization',
    nl: 'Capaciteitsbenutting',
    zh: '产能利用率',
    ko: '용량 활용도'
  },
  'factory.productionLine': {
    en: 'Production Line',
    nl: 'Productielijn',
    zh: '生产线',
    ko: '생산 라인'
  },
  'factory.workers': {
    en: 'Workers',
    nl: 'Werknemers',
    zh: '工人',
    ko: '근로자'
  },
  'factory.downtime': {
    en: 'Downtime',
    nl: 'Stilstand',
    zh: '停机时间',
    ko: '가동 중지 시간'
  },
  'factory.quality': {
    en: 'Quality Metrics',
    nl: 'Kwaliteitsmetingen',
    zh: '质量指标',
    ko: '품질 지표'
  },
  'factory.safety': {
    en: 'Safety Incidents',
    nl: 'Veiligheidsincidenten',
    zh: '安全事故',
    ko: '안전 사고'
  },
  'factory.certifications': {
    en: 'Quality Certifications',
    nl: 'Kwaliteitscertificaten',
    zh: '质量认证',
    ko: '품질 인증'
  },

  // ============================================================================
  // LABOR COMPLIANCE
  // ============================================================================
  'labor.title': {
    en: 'Labor Law Compliance Monitor',
    nl: 'Arbeidsrecht Naleving Monitor',
    zh: '劳动法合规监控',
    ko: '노동법 준수 모니터'
  },
  'labor.compliance': {
    en: 'Compliance Score',
    nl: 'Nalevingsscore',
    zh: '合规分数',
    ko: '준수 점수'
  },
  'labor.minWage': {
    en: 'Minimum Wage',
    nl: 'Minimumloon',
    zh: '最低工资',
    ko: '최저 임금'
  },
  'labor.avgWage': {
    en: 'Average Wage',
    nl: 'Gemiddeld Loon',
    zh: '平均工资',
    ko: '평균 임금'
  },
  'labor.overtime': {
    en: 'Overtime',
    nl: 'Overwerk',
    zh: '加班',
    ko: '초과 근무'
  },
  'labor.leave': {
    en: 'Leave Entitlements',
    nl: 'Verlofrechten',
    zh: '休假权利',
    ko: '휴가 자격'
  },
  'labor.providentFund': {
    en: 'Provident Fund',
    nl: 'Pensioenfonds',
    zh: '公积金',
    ko: '퇴직 기금'
  },
  'labor.festivalBonus': {
    en: 'Festival Bonus',
    nl: 'Festivalbonus',
    zh: '节日奖金',
    ko: '명절 보너스'
  },
  'labor.totalWorkers': {
    en: 'Total Workers',
    nl: 'Totaal Werknemers',
    zh: '总工人数',
    ko: '총 근로자'
  },

  // ============================================================================
  // CUSTOMS TRACKER
  // ============================================================================
  'customs.title': {
    en: 'Real-Time Customs Tracker',
    nl: 'Realtime Douane Tracker',
    zh: '实时海关追踪',
    ko: '실시간 세관 추적기'
  },
  'customs.shipment': {
    en: 'Shipment',
    nl: 'Zending',
    zh: '货物',
    ko: '선적'
  },
  'customs.port': {
    en: 'Port',
    nl: 'Haven',
    zh: '港口',
    ko: '항구'
  },
  'customs.arrival': {
    en: 'Arrival',
    nl: 'Aankomst',
    zh: '到达',
    ko: '도착'
  },
  'customs.cargoValue': {
    en: 'Cargo Value',
    nl: 'Ladingwaarde',
    zh: '货物价值',
    ko: '화물 가치'
  },
  'customs.duty': {
    en: 'Duty Payable',
    nl: 'Te Betalen Rechten',
    zh: '应付关税',
    ko: '납부 관세'
  },
  'customs.demurrage': {
    en: 'Demurrage',
    nl: 'Ligdagen',
    zh: '滞期费',
    ko: '체선료'
  },
  'customs.clearance': {
    en: 'Customs Clearance',
    nl: 'Douane Inklaring',
    zh: '清关',
    ko: '통관'
  },
  'customs.stage': {
    en: 'Stage',
    nl: 'Fase',
    zh: '阶段',
    ko: '단계'
  },

  // ============================================================================
  // BANKING OPERATIONS
  // ============================================================================
  'banking.title': {
    en: 'Banking Operations Hub',
    nl: 'Bank Operaties Hub',
    zh: '银行业务中心',
    ko: '은행 업무 허브'
  },
  'banking.account': {
    en: 'Account',
    nl: 'Rekening',
    zh: '账户',
    ko: '계정'
  },
  'banking.balance': {
    en: 'Balance',
    nl: 'Saldo',
    zh: '余额',
    ko: '잔액'
  },
  'banking.transactions': {
    en: 'Transactions',
    nl: 'Transacties',
    zh: '交易',
    ko: '거래'
  },
  'banking.inwardRemittance': {
    en: 'Inward Remittance',
    nl: 'Inkomende Geldtransfer',
    zh: '汇入汇款',
    ko: '송금 수령'
  },
  'banking.outwardRemittance': {
    en: 'Outward Remittance',
    nl: 'Uitgaande Geldtransfer',
    zh: '汇出汇款',
    ko: '송금 발송'
  },
  'banking.lc': {
    en: 'Letter of Credit',
    nl: 'Kredietbrief',
    zh: '信用证',
    ko: '신용장'
  },
  'banking.loan': {
    en: 'Loan Facility',
    nl: 'Leningsfaciliteit',
    zh: '贷款设施',
    ko: '대출 시설'
  },
  'banking.sanctioned': {
    en: 'Sanctioned',
    nl: 'Goedgekeurd',
    zh: '批准',
    ko: '승인됨'
  },
  'banking.utilized': {
    en: 'Utilized',
    nl: 'Gebruikt',
    zh: '已使用',
    ko: '사용됨'
  },
  'banking.available': {
    en: 'Available',
    nl: 'Beschikbaar',
    zh: '可用',
    ko: '이용 가능'
  },

  // ============================================================================
  // REGULATORY REPORTS
  // ============================================================================
  'reports.title': {
    en: 'Auto-Generated Regulatory Reports',
    nl: 'Automatisch Gegenereerde Regelgeving Rapporten',
    zh: '自动生成监管报告',
    ko: '자동 생성 규제 보고서'
  },
  'reports.monthly': {
    en: 'Monthly',
    nl: 'Maandelijks',
    zh: '每月',
    ko: '월간'
  },
  'reports.quarterly': {
    en: 'Quarterly',
    nl: 'Kwartaal',
    zh: '季度',
    ko: '분기'
  },
  'reports.annually': {
    en: 'Annually',
    nl: 'Jaarlijks',
    zh: '年度',
    ko: '연간'
  },
  'reports.dueDate': {
    en: 'Due Date',
    nl: 'Vervaldatum',
    zh: '截止日期',
    ko: '마감일'
  },
  'reports.status': {
    en: 'Status',
    nl: 'Status',
    zh: '状态',
    ko: '상태'
  },
  'reports.ready': {
    en: 'Ready to Submit',
    nl: 'Klaar om In te Dienen',
    zh: '准备提交',
    ko: '제출 준비 완료'
  },
  'reports.inProgress': {
    en: 'In Progress',
    nl: 'In Behandeling',
    zh: '进行中',
    ko: '진행 중'
  },
  'reports.notStarted': {
    en: 'Not Started',
    nl: 'Niet Begonnen',
    zh: '未开始',
    ko: '시작 안 됨'
  },
  'reports.autoFilled': {
    en: 'Auto-filled',
    nl: 'Automatisch Ingevuld',
    zh: '自动填充',
    ko: '자동 입력'
  },

  // ============================================================================
  // POLICY SIMULATOR
  // ============================================================================
  'policy.title': {
    en: 'National Policy Simulator',
    nl: 'Nationaal Beleid Simulator',
    zh: '国家政策模拟器',
    ko: '국가 정책 시뮬레이터'
  },
  'policy.corporateTax': {
    en: 'Corporate Tax Rate',
    nl: 'Vennootschapsbelasting',
    zh: '企业税率',
    ko: '법인세율'
  },
  'policy.taxHoliday': {
    en: 'Tax Holiday',
    nl: 'Belastingvrijstelling',
    zh: '免税期',
    ko: '세금 면제'
  },
  'policy.greenIncentive': {
    en: 'Green Incentive',
    nl: 'Groene Stimulans',
    zh: '绿色激励',
    ko: '친환경 인센티브'
  },
  'policy.roiImpact': {
    en: 'ROI Impact',
    nl: 'ROI Impact',
    zh: '投资回报影响',
    ko: 'ROI 영향'
  },
  'policy.breakEven': {
    en: 'Break-even Time',
    nl: 'Break-even Tijd',
    zh: '盈亏平衡时间',
    ko: '손익 분기점'
  },

  // ============================================================================
  // TIME/DATE
  // ============================================================================
  'time.days': {
    en: 'days',
    nl: 'dagen',
    zh: '天',
    ko: '일'
  },
  'time.months': {
    en: 'months',
    nl: 'maanden',
    zh: '月',
    ko: '개월'
  },
  'time.years': {
    en: 'years',
    nl: 'jaar',
    zh: '年',
    ko: '년'
  },
  'time.hours': {
    en: 'hours',
    nl: 'uur',
    zh: '小时',
    ko: '시간'
  },
  'time.minutes': {
    en: 'minutes',
    nl: 'minuten',
    zh: '分钟',
    ko: '분'
  },
  'time.today': {
    en: 'Today',
    nl: 'Vandaag',
    zh: '今天',
    ko: '오늘'
  },
  'time.yesterday': {
    en: 'Yesterday',
    nl: 'Gisteren',
    zh: '昨天',
    ko: '어제'
  },
  'time.thisWeek': {
    en: 'This Week',
    nl: 'Deze Week',
    zh: '本周',
    ko: '이번 주'
  },
  'time.thisMonth': {
    en: 'This Month',
    nl: 'Deze Maand',
    zh: '本月',
    ko: '이번 달'
  },

  // ============================================================================
  // STATUS INDICATORS
  // ============================================================================
  'status.pending': {
    en: 'Pending',
    nl: 'In Behandeling',
    zh: '待处理',
    ko: '대기 중'
  },
  'status.approved': {
    en: 'Approved',
    nl: 'Goedgekeurd',
    zh: '已批准',
    ko: '승인됨'
  },
  'status.rejected': {
    en: 'Rejected',
    nl: 'Afgewezen',
    zh: '已拒绝',
    ko: '거부됨'
  },
  'status.completed': {
    en: 'Completed',
    nl: 'Voltooid',
    zh: '已完成',
    ko: '완료됨'
  },
  'status.inProgress': {
    en: 'In Progress',
    nl: 'In Behandeling',
    zh: '进行中',
    ko: '진행 중'
  },
  'status.onTrack': {
    en: 'On Track',
    nl: 'Op Schema',
    zh: '按计划',
    ko: '계획대로'
  },
  'status.delayed': {
    en: 'Delayed',
    nl: 'Vertraagd',
    zh: '延迟',
    ko: '지연됨'
  },
  'status.active': {
    en: 'Active',
    nl: 'Actief',
    zh: '活跃',
    ko: '활성'
  },
  'status.inactive': {
    en: 'Inactive',
    nl: 'Inactief',
    zh: '非活跃',
    ko: '비활성'
  },
  'status.notStarted': {
    en: 'Not Started',
    nl: 'Niet Begonnen',
    zh: '未开始',
    ko: '시작 안 됨'
  },

  // ============================================================================
  // COMMON ACTIONS
  // ============================================================================
  'common.fullscreen': {
    en: 'Fullscreen',
    nl: 'Volledig Scherm',
    zh: '全屏',
    ko: '전체 화면'
  },

  // ============================================================================
  // KYA (KNOW YOUR APPROVAL) - TIMELINE & CRITICAL PATH
  // ============================================================================
  'kya.timelineTitle': {
    en: 'Approval Timeline & Critical Path',
    nl: 'Goedkeuringstijdlijn & Kritiek Pad',
    zh: '审批时间线和关键路径',
    ko: '승인 타임라인 및 중요 경로'
  },
  'kya.subtitle': {
    en: 'Visualize your approval journey and critical dependencies',
    nl: 'Visualiseer uw goedkeuringsreis en kritieke afhankelijkheden',
    zh: '可视化您的审批流程和关键依赖项',
    ko: '승인 여정 및 중요 종속성 시각화'
  },
  'kya.totalSteps': {
    en: 'Total Steps',
    nl: 'Totaal Aantal Stappen',
    zh: '总步骤数',
    ko: '총 단계'
  },
  'kya.completed': {
    en: 'Completed',
    nl: 'Voltooid',
    zh: '已完成',
    ko: '완료됨'
  },
  'kya.criticalPath': {
    en: 'Critical Path',
    nl: 'Kritiek Pad',
    zh: '关键路径',
    ko: '중요 경로'
  },
  'kya.estimatedDays': {
    en: 'Estimated Days',
    nl: 'Geschatte Dagen',
    zh: '预计天数',
    ko: '예상 일수'
  },
  'kya.showCriticalPathOnly': {
    en: 'Show Critical Path Only',
    nl: 'Toon Alleen Kritiek Pad',
    zh: '仅显示关键路径',
    ko: '중요 경로만 표시'
  },
  'kya.approvalStep': {
    en: 'Approval Step',
    nl: 'Goedkeuringsstap',
    zh: '审批步骤',
    ko: '승인 단계'
  },
  'kya.critical': {
    en: 'Critical',
    nl: 'Kritiek',
    zh: '关键',
    ko: '중요'
  },
  'kya.agency': {
    en: 'Agency',
    nl: 'Agentschap',
    zh: '机构',
    ko: '기관'
  },
  'kya.startDay': {
    en: 'Start Day',
    nl: 'Startdag',
    zh: '开始日',
    ko: '시작일'
  },
  'kya.endDay': {
    en: 'End Day',
    nl: 'Einddag',
    zh: '结束日',
    ko: '종료일'
  },
  'kya.sla': {
    en: 'SLA',
    nl: 'SLA',
    zh: '服务水平协议',
    ko: 'SLA'
  },
  'kya.status': {
    en: 'Status',
    nl: 'Status',
    zh: '状态',
    ko: '상태'
  },
  'kya.dependencies': {
    en: 'Dependencies',
    nl: 'Afhankelijkheden',
    zh: '依赖项',
    ko: '종속성'
  },
  'kya.legend': {
    en: 'Legend',
    nl: 'Legenda',
    zh: '图例',
    ko: '범례'
  },

  // ============================================================================
  // NUMBERS/METRICS
  // ============================================================================
  'metric.target': {
    en: 'Target',
    nl: 'Doel',
    zh: '目标',
    ko: '목표'
  },
  'metric.actual': {
    en: 'Actual',
    nl: 'Werkelijk',
    zh: '实际',
    ko: '실제'
  },
  'metric.percentage': {
    en: 'Percentage',
    nl: 'Percentage',
    zh: '百分比',
    ko: '백분율'
  },
  'metric.total': {
    en: 'Total',
    nl: 'Totaal',
    zh: '总计',
    ko: '합계'
  },
  'metric.average': {
    en: 'Average',
    nl: 'Gemiddelde',
    zh: '平均',
    ko: '평균'
  },
  'metric.minimum': {
    en: 'Minimum',
    nl: 'Minimum',
    zh: '最小',
    ko: '최소'
  },
  'metric.maximum': {
    en: 'Maximum',
    nl: 'Maximum',
    zh: '最大',
    ko: '최대'
  },

  // ============================================================================
  // ACTIONS
  // ============================================================================
  'action.viewDetails': {
    en: 'View Details',
    nl: 'Bekijk Details',
    zh: '查看详情',
    ko: '세부 정보 보기'
  },
  'action.downloadPDF': {
    en: 'Download PDF',
    nl: 'Download PDF',
    zh: '下载PDF',
    ko: 'PDF 다운로드'
  },
  'action.exportData': {
    en: 'Export Data',
    nl: 'Exporteer Gegevens',
    zh: '导出数据',
    ko: '데이터 내보내기'
  },
  'action.printReport': {
    en: 'Print Report',
    nl: 'Print Rapport',
    zh: '打印报告',
    ko: '보고서 인쇄'
  },
  'action.scheduleAppointment': {
    en: 'Schedule Appointment',
    nl: 'Plan Afspraak',
    zh: '预约',
    ko: '약속 예약'
  },
  'action.contactOfficer': {
    en: 'Contact Officer',
    nl: 'Contact Officer',
    zh: '联系官员',
    ko: '담당자 연락'
  },

  // ============================================================================
  // TABS
  // ============================================================================
  'tabs.dashboard': {
    en: 'Dashboard',
    nl: 'Dashboard',
    zh: '仪表板',
    ko: '대시보드'
  },
  'tabs.journeyTracker': {
    en: 'Journey Tracker',
    nl: 'Reis Tracker',
    zh: '旅程跟踪器',
    ko: '여정 추적기'
  },
  'tabs.investmentZones': {
    en: 'Investment Zones',
    nl: 'Investeringszones',
    zh: '投资区',
    ko: '투자 구역'
  },
  'tabs.documents': {
    en: 'Documents',
    nl: 'Documenten',
    zh: '文件',
    ko: '서류'
  },
  'tabs.services': {
    en: 'Services',
    nl: 'Diensten',
    zh: '服务',
    ko: '서비스'
  },
  'tabs.payments': {
    en: 'Payments',
    nl: 'Betalingen',
    zh: '付款',
    ko: '결제'
  },
  'tabs.appointments': {
    en: 'Appointments',
    nl: 'Afspraken',
    zh: '预约',
    ko: '약속'
  },
  'tabs.rjsc': {
    en: 'RJSC',
    nl: 'RJSC',
    zh: 'RJSC',
    ko: 'RJSC'
  },
  'tabs.advisor': {
    en: 'AI Advisor',
    nl: 'AI Adviseur',
    zh: 'AI顾问',
    ko: 'AI 조언자'
  },
  'tabs.matchmaking': {
    en: 'Matchmaking',
    nl: 'Matchmaking',
    zh: '配对',
    ko: '매칭'
  },
  'tabs.reports': {
    en: 'Reports',
    nl: 'Rapporten',
    zh: '报告',
    ko: '보고서'
  },
  'tabs.audit': {
    en: 'Audit Trail',
    nl: 'Controle Spoor',
    zh: '审计跟踪',
    ko: '감사 추적'
  },
  'tabs.aftercare': {
    en: 'Aftercare',
    nl: 'Nazorg',
    zh: '售后服务',
    ko: '사후 관리'
  },
  
  // ============================================================================
  // DASHBOARD SPECIFIC
  // ============================================================================
  'dashboard.welcomeBack': {
    en: 'Welcome back',
    nl: 'Welkom terug',
    zh: '欢迎回来',
    ko: '환영합니다'
  },
  'dashboard.trackYourJourney': {
    en: 'Track your investment journey in real-time',
    nl: 'Volg uw investeringsreis in realtime',
    zh: '实时追踪您的投资旅程',
    ko: '실시간으로 투자 여정 추적'
  },
  'dashboard.overallProgress': {
    en: 'Overall Progress',
    nl: 'Totale Voortgang',
    zh: '整体进度',
    ko: '전체 진행 상황'
  },
  'dashboard.completedSteps': {
    en: 'Completed Steps',
    nl: 'Voltooide Stappen',
    zh: '完成的步骤',
    ko: '완료된 단계'
  },
  'dashboard.pendingApprovals': {
    en: 'Pending Approvals',
    nl: 'In Afwachting van Goedkeuring',
    zh: '待批准',
    ko: '승인 대기 중'
  },
  'dashboard.upcomingDeadlines': {
    en: 'Upcoming Deadlines',
    nl: 'Komende Deadlines',
    zh: '即将到来的截止日期',
    ko: '다가오는 마감일'
  },
  'dashboard.projectJourney': {
    en: 'Project Journey',
    nl: 'Project Reis',
    zh: '项目旅程',
    ko: '프로젝트 여정'
  },
  'dashboard.viewFullTimeline': {
    en: 'View Full Timeline',
    nl: 'Bekijk Volledige Tijdlijn',
    zh: '查看完整时间线',
    ko: '전체 일정 보기'
  },
  'dashboard.nextSteps': {
    en: 'Next Steps',
    nl: 'Volgende Stappen',
    zh: '下一步',
    ko: '다음 단계'
  },

  // Quick Actions
  'quickActions.viewDocuments': {
    en: 'Documents',
    nl: 'Documenten',
    zh: '文件',
    ko: '서류'
  },
  'quickActions.makePayment': {
    en: 'Payment',
    nl: 'Betaling',
    zh: '付款',
    ko: '결제'
  },
  'quickActions.bookAppointment': {
    en: 'Appointment',
    nl: 'Afspraak',
    zh: '预约',
    ko: '약속'
  },
  'quickActions.contactOfficer': {
    en: 'Contact',
    nl: 'Contact',
    zh: '联系',
    ko: '연락'
  },
  'quickActions.downloadReport': {
    en: 'Report',
    nl: 'Rapport',
    zh: '报告',
    ko: '보고서'
  },
  'quickActions.aiAssistant': {
    en: 'AI Help',
    nl: 'AI Hulp',
    zh: 'AI帮助',
    ko: 'AI 도움'
  },
  'quickActions.fdiEducation': {
    en: 'Learn',
    nl: 'Leren',
    zh: '学习',
    ko: '학습'
  },

  // Status Messages
  'status.requiresAttention': {
    en: 'Requires Attention',
    nl: 'Vereist Aandacht',
    zh: '需要关注',
    ko: '주의 필요'
  },
  'status.thisWeek': {
    en: 'This Week',
    nl: 'Deze Week',
    zh: '本周',
    ko: '이번 주'
  },

  // Zones
  'zones.backToDashboard': {
    en: '← Back to Dashboard',
    nl: '← Terug naar Dashboard',
    zh: '← 返回仪表板',
    ko: '← 대시보드로 돌아가기'
  },

  // ============================================================================
  // HOME PAGE
  // ============================================================================
  'home.oneStopService': {
    en: 'One Stop Service',
    nl: 'One Stop Service',
    zh: '一站式服务',
    ko: '원스톱 서비스'
  },
  'home.phone': {
    en: '+880-967-877-153',
    nl: '+880-967-877-153',
    zh: '+880-967-877-153',
    ko: '+880-967-877-153'
  },
  'home.email': {
    en: 'ossbida@ba-systems.com',
    nl: 'ossbida@ba-systems.com',
    zh: 'ossbida@ba-systems.com',
    ko: 'ossbida@ba-systems.com'
  },
  'home.investor': {
    en: 'Investor',
    nl: 'Investeerder',
    zh: '投资者',
    ko: '투자자'
  },
  'home.logout': {
    en: 'Logout',
    nl: 'Uitloggen',
    zh: '登出',
    ko: '로그아웃'
  },
  'home.bangladeshAuthority': {
    en: 'Bangladesh Investment Development Authority',
    nl: 'Bangladesh Investment Development Authority',
    zh: '孟加拉国投资发展局',
    ko: '방글라데시 투자 개발청'
  },
  'home.ossPortal': {
    en: 'One Stop Service (OSS) Digital Portal',
    nl: 'One Stop Service (OSS) Digitaal Portaal',
    zh: '一站式服务(OSS)数字平台',
    ko: '원스톱 서비스(OSS) 디지털 포털'
  },
  'home.welcomeTo': {
    en: 'Welcome to',
    nl: 'Welkom bij',
    zh: '欢迎来到',
    ko: '환영합니다'
  },
  'home.bidaOss': {
    en: 'BIDA OSS',
    nl: 'BIDA OSS',
    zh: 'BIDA OSS',
    ko: 'BIDA OSS'
  },
  'home.yourGatewayTo': {
    en: 'Your Unified Gateway To',
    nl: 'Uw Toegangspoort Tot',
    zh: '您的统一门户',
    ko: '통합 게이트웨이'
  },
  'home.investingIn': {
    en: 'INVESTING IN',
    nl: 'INVESTEREN IN',
    zh: '投资于',
    ko: '투자처'
  },
  'home.bangladesh': {
    en: 'BANGLADESH',
    nl: 'BANGLADESH',
    zh: '孟加拉国',
    ko: '방글라데시'
  },
  'home.heroDescription': {
    en: 'Start your business journey in Bangladesh today: learn, apply, and secure all approvals through our intelligent One-Stop Service platform.',
    nl: 'Begin vandaag uw zakelijke reis in Bangladesh: leer, solliciteer en verzeker alle goedkeuringen via ons intelligente One-Stop Service platform.',
    zh: '今天开始您在孟加拉国的商业旅程：通过我们智能的一站式服务平台学习、申请并获得所有批准。',
    ko: '오늘 방글라데시에서 비즈니스 여정을 시작하세요: 지능형 원스톱 서비스 플랫폼을 통해 학습하고 신청하며 모든 승인을 확보��세요.'
  },
  'home.yourGateway': {
    en: 'Your Gateway to Investment Excellence in Bangladesh',
    nl: 'Uw Toegangspoort tot Investerings Excellentie in Bangladesh',
    zh: '您通往孟加拉国卓越投资的门户',
    ko: '방글라데시 우수 투자의 관문'
  },
  'home.governmentVerified': {
    en: 'Government Verified',
    nl: 'Overheid Geverifieerd',
    zh: '政府验证',
    ko: '정부 인증'
  },
  'home.secureTransparent': {
    en: 'Secure & Transparent',
    nl: 'Veilig & Transparant',
    zh: '安全透明',
    ko: '안전하고 투명함'
  },
  'home.avgDays': {
    en: '26-32 Days Average',
    nl: '26-32 Dagen Gemiddeld',
    zh: '平均26-32天',
    ko: '평균 26-32일'
  },
  'home.startInvestment': {
    en: 'Start My Investment Now',
    nl: 'Start Nu Mijn Investering',
    zh: '立即开始我的投资',
    ko: '지금 투자 시작'
  },
  'home.seeHowItWorks': {
    en: 'See How It Works',
    nl: 'Zie Hoe Het Werkt',
    zh: '了解如何运作',
    ko: '작동 방식 보기'
  },
  'home.unifiedAccess': {
    en: 'Unified Access',
    nl: 'Geïntegreerde Toegang',
    zh: '统一访问',
    ko: '통합 액세스'
  },
  'home.unifiedAccessDesc': {
    en: "Access all investment services of Bangladesh's six investment agencies (BIDA, BEZA, BEPZA, BHTPA, BSCIC, PPPA) in one place.",
    nl: "Toegang tot alle investeringsdiensten van Bangladesh's zes investeringsagentschappen (BIDA, BEZA, BEPZA, BHTPA, BSCIC, PPPA) op één plek.",
    zh: '在一个地方访问孟加拉国六个投资机构（BIDA、BEZA、BEPZA、BHTPA、BSCIC、PPPA）的所有投资服务。',
    ko: '방글라데시의 6개 투자 기관(BIDA, BEZA, BEPZA, BHTPA, BSCIC, PPPA)의 모든 투자 서비스를 한 곳에서 이용하세요.'
  },
  'home.smartGuidance': {
    en: 'Smart Guidance',
    nl: 'Slimme Begeleiding',
    zh: '智能指导',
    ko: '스마트 가이드'
  },
  'home.smartGuidanceDesc': {
    en: "Our 'How to apply' navigator tool helps find the best IPA OSS fit for your investment requirements.",
    nl: "Onze 'Hoe aan te vragen' navigator tool helpt de beste IPA OSS match te vinden voor uw investeringseisen.",
    zh: '我们的"如何申请"导航工具帮助您找到最适合您投资需求的IPA OSS。',
    ko: '우리의 "신청 방법" 내비게이터 도구는 귀하의 투자 요구사항에 가장 적합한 IPA OSS를 찾는 데 도움을 줍니다.'
  },
  'home.streamlinedServices': {
    en: 'Streamlined Services',
    nl: 'Gestroomlijnde Diensten',
    zh: '简化服务',
    ko: '간소화된 서비스'
  },
  'home.streamlinedServicesDesc': {
    en: 'Seamless navigation to 100+ services across IPAs with direct IPA OSS access.',
    nl: "Naadloze navigatie naar 100+ diensten via IPA's met directe IPA OSS toegang.",
    zh: '无缝导航至100多项IPA服务，直接访问IPA OSS。',
    ko: 'IPA OSS 직접 액세스를 통해 100개 이상의 IPA 서비스에 원활하게 이동할 수 있습니다.'
  },

  // More Home Page Content
  'home.whyBanglaBiz': {
    en: 'Why OSS?',
    nl: 'Waarom OSS?',
    zh: '为什么选择OSS？',
    ko: '왜 OSS인가?'
  },
  'home.howWillHelp': {
    en: 'HOW WILL OSS HELP YOU?',
    nl: 'HOE KAN OSS U HELPEN?',
    zh: 'OSS如何帮助您？',
    ko: 'OSS가 어떻게 도와드릴까요?'
  },
  'home.showMeHowToApply': {
    en: 'Show me how to apply',
    nl: 'Laat me zien hoe ik moet aanvragen',
    zh: '告诉我如何申请',
    ko: '신청 방법 보기'
  },
  'home.ourPartnersInvestment': {
    en: 'Our Partners in Investment',
    nl: 'Onze Partners in Investeringen',
    zh: '我们的投资合作伙伴',
    ko: '투자 파트너'
  },
  'home.nationalInvestmentAgencies': {
    en: 'THE NATIONAL INVESTMENT PROMOTION AGENCIES',
    nl: 'DE NATIONALE INVESTERINGSPROMOTIE AGENTSCHAPPEN',
    zh: '国家投资促进机构',
    ko: '국가 투자 진흥 기관'
  },
  'home.nationalInvestmentDesc': {
    en: 'Get a quick overview of the six national Investment Promotion Agencies (IPAs) for seamless business journey in Bangladesh',
    nl: 'Krijg een snel overzicht van de zes nationale Investment Promotion Agencies (IPAs) voor een naadloze zakelijke reis in Bangladesh',
    zh: '快速了解孟加拉国六个国家投资促进机构（IPAs），助您顺利开展业务',
    ko: '방글라데시에서 원활한 비즈니스 여정을 위한 6개 국가 투자 진흥 기관(IPA) 개요 확인'
  },
  'home.learnMore': {
    en: 'Learn more',
    nl: 'Meer informatie',
    zh: '了解更多',
    ko: '자세히 보기'
  },
  'home.ossPlatform': {
    en: 'OSS Investment Platform',
    nl: 'OSS Investeringsplatform',
    zh: 'OSS投资平台',
    ko: 'OSS 투자 플랫폼'
  },
  'home.ossPlatformDesc': {
    en: 'Based on global best practices and international standards, our OSS platform provides everything you need for a smooth investment journey in Bangladesh.',
    nl: 'Op basis van wereldwijde best practices en internationale normen biedt ons OSS-platform alles wat u nodig heeft voor een soepele investeringsreis in Bangladesh.',
    zh: '基于全球最佳实践和国际标准，我们的OSS平台为您在孟加拉国的顺利投资之旅提供一切所需。',
    ko: '글로벌 모범 사례와 국제 표준을 기반으로 한 OSS 플랫폼은 방글라데시에서의 원활한 투자 여정에 필요한 모든 것을 제공합니다.'
  },
  'home.benefit1': {
    en: 'Single Investor Identity across all agencies',
    nl: 'Enkele Investeerder Identiteit bij alle agentschappen',
    zh: '所有机构的单一投资者身份',
    ko: '모든 기관에서 단일 투자자 ID'
  },
  'home.benefit2': {
    en: 'Real-time application tracking',
    nl: 'Realtime applicatie tracking',
    zh: '实时申请跟踪',
    ko: '실시간 신청 추적'
  },
  'home.benefit3': {
    en: 'Integrated bank & utility services',
    nl: 'Geïntegreerde bank- en nutsdiensten',
    zh: '集成银行和公用事业服务',
    ko: '통합 은행 및 유틸리티 서비스'
  },
  'home.benefit4': {
    en: 'AI-powered investment advisor',
    nl: 'AI-aangedreven investeringsadviseur',
    zh: 'AI驱动的投资顾问',
    ko: 'AI 기반 투자 자문'
  },
  'home.benefit5': {
    en: '24/7 online support',
    nl: '24/7 online ondersteuning',
    zh: '24/7在线支持',
    ko: '연중무휴 온라인 지원'
  },
  'home.benefit6': {
    en: 'Multilingual platform (EN/BN/CN/AR)',
    nl: 'Meertalig platform (EN/BN/CN/AR)',
    zh: '多语言平台（EN/BN/CN/AR）',
    ko: '다국어 플랫폼 (EN/BN/CN/AR)'
  },
  'home.bangladeshInvestment': {
    en: 'Bangladesh Investment Development Authority',
    nl: 'Bangladesh Investeringsontwikkelingsautoriteit',
    zh: '孟加拉国投资发展局',
    ko: '방글라데시 투자개발청'
  },
  'home.welcomeTitle': {
    en: 'Your Gateway to Bangladesh Investment',
    nl: 'Uw Toegangspoort tot Investeringen in Bangladesh',
    zh: '您通往孟加拉国投资的门户',
    ko: '방글라데시 투자의 관문'
  },
  'home.welcomeSubtitle': {
    en: 'Complete your entire investment journey through one intelligent platform — from registration to operation.',
    nl: 'Voltooi uw volledige investeringsreis via één intelligent platform — van registratie tot operatie.',
    zh: '通过一个智能平台完成您的整个投资之旅 — 从注册到运营。',
    ko: '하나의 지능형 플랫폼을 통해 전체 투자 여정을 완료하세요 — 등록부터 운영까지.'
  },
  'home.getStarted': {
    en: 'Get Started',
    nl: 'Aan de Slag',
    zh: '开始使用',
    ko: '시작하기'
  },
  'home.modernFeatures': {
    en: 'Modern Features for Smart Investors',
    nl: 'Moderne Functies voor Slimme Investeerders',
    zh: '为智能投资者提供的现代功能',
    ko: '스마트 투자자를 위한 현대적 기능'
  },
  'home.modernFeaturesDesc': {
    en: 'Everything you need to establish and grow your business in Bangladesh, powered by intelligent automation.',
    nl: 'Alles wat u nodig heeft om uw bedrijf in Bangladesh op te zetten en te laten groeien, aangedreven door intelligente automatisering.',
    zh: '在孟加拉国建立和发展业务所需的一切，由智能自动化提供支持。',
    ko: '방글라데시에서 비즈니스를 시작하고 성장시키는 데 필요한 모든 것, 지능형 자동화로 구동됩니다.'
  },
  'home.connectedAgencies': {
    en: 'Connected Government Agencies',
    nl: 'Verbonden Overheidsinstanties',
    zh: '连接的政府机构',
    ko: '연결된 정부 기관'
  },
  'home.connectedAgenciesDesc': {
    en: 'Seamless integration with all major investment authorities in Bangladesh.',
    nl: 'Naadloze integratie met alle grote investeringsautoriteiten in Bangladesh.',
    zh: '与孟加拉国所有主要投资机构无缝集成。',
    ko: '방글라데시의 모든 주요 투자 기관과의 원활한 통합.'
  },
  'home.transparencyTitle': {
    en: 'Full Transparency & Accountability',
    nl: 'Volledige Transparantie & Verantwoordelijkheid',
    zh: '完全透明和问责制',
    ko: '완전한 투명성 및 책임성'
  },
  'home.transparencyDesc': {
    en: 'Track real-time performance metrics, agency statistics, and open government data to build investor confidence.',
    nl: 'Volg realtime prestatiemetrics, agentschapsstatistieken en open overheidsgegevens om het vertrouwen van investeerders op te bouwen.',
    zh: '跟踪实时绩效指标、机构统计数据和开放政府数据，以建立投资者信心。',
    ko: '실시간 성과 지표, 기관 통계 및 개방형 정부 데이터를 추적하여 투자자 신뢰를 구축하세요.'
  },
  'home.viewTransparencyPortal': {
    en: 'View Transparency Portal',
    nl: 'Bekijk Transparantie Portaal',
    zh: '查看透明度门户',
    ko: '투명성 포털 보기'
  },
  'home.readyToStart': {
    en: 'Ready to Start Your Investment Journey?',
    nl: 'Klaar om Uw Investeringsreis te Beginnen?',
    zh: '准备好开始您的投资之旅了吗？',
    ko: '투자 여정을 시작할 준비가 되셨나요?'
  },
  'home.readyToStartDesc': {
    en: 'Join hundreds of successful investors who have streamlined their business setup through our intelligent platform.',
    nl: 'Sluit u aan bij honderden succesvolle investeerders die hun bedrijfsopzet hebben gestroomlijnd via ons intelligente platform.',
    zh: '加入数百名成功投资者的行列，他们通过我们的智能平台简化了业务设置。',
    ko: '우리의 지능형 플랫폼을 통해 비즈니스 설정을 간소화한 수백 명의 성공적인 투자자와 함께하세요.'
  },
  'home.startApplication': {
    en: 'Start Your Application',
    nl: 'Start Uw Aanvraag',
    zh: '开始您的申请',
    ko: '신청 시작'
  },
  'home.getStartedToday': {
    en: 'Get Started Today',
    nl: 'Begin Vandaag',
    zh: '今天开始',
    ko: '오늘 시작하세요'
  },
  'home.step1': {
    en: 'Create your unified investor profile',
    nl: 'Maak uw uniforme investeerdersprofiel aan',
    zh: '创建您的统一投资者档案',
    ko: '통합 투자자 프로필 만들기'
  },
  'home.step2': {
    en: 'Choose your investment sector & location',
    nl: 'Kies uw investeringssector en locatie',
    zh: '选择您的投资部门和地点',
    ko: '투자 부문 및 위치 선택'
  },
  'home.step3': {
    en: 'Apply for services through smart wizard',
    nl: 'Vraag diensten aan via slimme wizard',
    zh: '通过智能向导申请服务',
    ko: '스마트 마법사를 통해 서비스 신청'
  },
  'home.step4': {
    en: 'Track your journey in real-time',
    nl: 'Volg uw reis in realtime',
    zh: '实时跟踪您的旅程',
    ko: '실시간으로 여정 추적'
  },
  'home.startYourJourney': {
    en: 'Start Your Investment Journey',
    nl: 'Begin Uw Investeringsreis',
    zh: '开始您的投资之旅',
    ko: '투자 여정 시작'
  },
  'home.openGovernmentData': {
    en: 'Open Government Data',
    nl: 'Open Overheidsgegevens',
    zh: '开放政府数据',
    ko: '개방형 정부 데이터'
  },
  'home.publicTransparency': {
    en: 'Public Transparency Portal',
    nl: 'Openbaar Transparantie Portaal',
    zh: '公共透明度门户',
    ko: '공공 투명성 포털'
  },
  'home.publicTransparencyDesc': {
    en: 'Real-time access to government performance data, service metrics, and inter-agency statistics. Built on proven international interoperability standards.',
    nl: 'Realtime toegang tot overheidsprestatiegegevens, servicemetingen en interagentschap statistieken. Gebouwd op bewezen internationale interoperabiliteitsnormen.',
    zh: '实时访问政府绩效数据、服务指标和机构间统计数据。基于经过验证的国际互操作性标准构建。',
    ko: '정부 성과 데이터, 서비스 지표 및 기관 간 통계에 대한 실시간 액세스. 검증된 국제 상호 운용성 표준을 기반으로 구축되었습니다.'
  },
  'home.livePerformanceMetrics': {
    en: 'Live Performance Metrics',
    nl: 'Live Prestatie Metingen',
    zh: '실시간 성능 지표',
    ko: '실시간 성능 지표'
  },
  'home.livePerformanceDesc': {
    en: 'Track approval timelines, SLA compliance, and service delivery across all 6 agencies',
    nl: 'Volg goedkeuringstijdlijnen, SLA-naleving en serviceverlening bij alle 6 agentschappen',
    zh: '跟踪所有6个机构的批准时间表、SLA合规性和服务交付',
    ko: '모든 6개 기관의 승인 일정, SLA 준수 및 서비스 제공 추적'
  },
  'home.agencyStatistics': {
    en: 'Agency Statistics',
    nl: 'Agentschap Statistieken',
    zh: '기관 통계',
    ko: '기관 통계'
  },
  'home.agencyStatisticsDesc': {
    en: 'View application volumes, processing times, and success rates for each IPA',
    nl: 'Bekijk aanvraagvolumes, verwerkingstijden en succespercentages voor elke IPA',
    zh: '查看每个IPA의 신청량, 처리 시간 및 성공률',
    ko: '각 IPA의 신청량, 처리 시간 및 성공률 보기'
  },
  'home.openDataStandards': {
    en: 'Open Data Standards',
    nl: 'Open Data Standaarden',
    zh: '开放数据标准',
    ko: '개방형 데이터 표준'
  },
  'home.openDataStandardsDesc': {
    en: 'API access, data exports, and integration following international best practices',
    nl: 'API-toegang, data-exports en integratie volgens internationale best practices',
    zh: 'API访问、数据导출和集成，遵循国际最佳实践',
    ko: '국제 모범 사례에 따른 API 액세스, 데이터 내보내기 및 통합'
  },
  'home.viewTransparencyData': {
    en: 'View Public Transparency Data',
    nl: 'Bekijk Openbare Transparantiegegevens',
    zh: '查看公共透明도 데이터',
    ko: '공공 투명성 데이터 보기'
  },
  'home.hotline': {
    en: 'Hotline',
    nl: 'Hotline',
    zh: '热线',
    ko: '핫라인'
  },
  'home.emailSupport': {
    en: 'Email Support',
    nl: 'E-mail Ondersteuning',
    zh: '电子邮件支持',
    ko: '이메일 지원'
  },
  'home.available247': {
    en: 'Available 24/7',
    nl: '24/7 Beschikbaar',
    zh: '24/7可用',
    ko: '연중무휴'
  },
  'home.onlineSupport': {
    en: 'Online Support',
    nl: 'Online Ondersteuning',
    zh: '在线支持',
    ko: '온라인 지원'
  },
  'home.governmentVerifiedPlatform': {
    en: 'Government-verified platform • 26-32 days average approval',
    nl: 'Door de overheid geverifieerd platform • 26-32 dagen gemiddelde goedkeuring',
    zh: '정부 인증 플랫폼 • 평균 26-32일 승인',
    ko: '정부 인증 플랫폼 • 평균 26-32일 승인'
  },
  'home.activeInvestors': {
    en: 'Active Investors',
    nl: 'Actieve Investeerders',
    zh: '活跃投资者',
    ko: '활성 투자자'
  },
  'home.fdiApproved': {
    en: 'FDI Approved (2023-24)',
    nl: 'FDI Goedgekeurd (2023-24)',
    zh: 'FDI批准（2023-24）',
    ko: 'FDI 승인 (2023-24)'
  },
  'home.servicesAvailable': {
    en: 'Services Available',
    nl: 'Beschikbare Diensten',
    zh: '可用服务',
    ko: '사용 가능한 서비스'
  },
  'home.investmentZones': {
    en: 'Investment Zones',
    nl: 'Investeringszones',
    zh: '投资区',
    ko: '투자 구역'
  },

  // ============================================================================
  // INVESTOR PORTAL WELCOME SCREEN
  // ============================================================================
  'portal.welcomeTo': {
    en: 'Welcome to',
    nl: 'Welkom bij',
    zh: '欢迎来到',
    ko: '환영합니다'
  },
  'portal.bidaOss': {
    en: 'BIDA OSS',
    nl: 'BIDA OSS',
    zh: 'BIDA OSS',
    ko: 'BIDA OSS'
  },
  'portal.gatewayExcellence': {
    en: 'Your Gateway to Investment Excellence in Bangladesh',
    nl: 'Uw Toegangspoort tot Investerings Excellentie in Bangladesh',
    zh: '您通往孟加拉国卓越投资的门户',
    ko: '방글라데시 우수 투자의 관문'
  },
  'portal.governmentVerified': {
    en: 'Government Verified',
    nl: 'Overheid Geverifieerd',
    zh: '政府验证',
    ko: '정부 인증'
  },
  'portal.secureTransparent': {
    en: 'Secure & Transparent',
    nl: 'Veilig & Transparant',
    zh: '安全透明',
    ko: '안전하고 투명함'
  },
  'portal.daysAverage': {
    en: '26-32 Days Average',
    nl: '26-32 Dagen Gemiddeld',
    zh: '平均26-32天',
    ko: '평균 26-32일'
  },
  'portal.startJourney': {
    en: 'Start Your Investment Journey',
    nl: 'Begin Uw Investeringsreis',
    zh: '开始您的投资之旅',
    ko: '투자 여정 시작'
  },
  'portal.exploreFeatures': {
    en: 'Explore Features',
    nl: 'Verken Functies',
    zh: '探索功能',
    ko: '기능 색'
  },
  'portal.needHelp': {
    en: 'Need Help?',
    nl: 'Hulp Nodig?',
    zh: '需要帮助？',
    ko: '도움이 필요하세요?'
  },
  'portal.logout': {
    en: 'Logout',
    nl: 'Uitloggen',
    zh: '登出',
    ko: '로그아웃'
  },
  'portal.oneStopService': {
    en: 'One Stop Service',
    nl: 'One Stop Service',
    zh: '一站式服务',
    ko: '원스톱 서비스'
  },
  'portal.bangladeshAuthority': {
    en: 'Bangladesh Investment Development Authority',
    nl: 'Bangladesh Investment Development Authority',
    zh: '孟加拉国投资发展局',
    ko: '방글라데시 투자 개발청'
  },
  'portal.ossPortal': {
    en: 'One Stop Service (OSS) Digital Portal',
    nl: 'One Stop Service (OSS) Digitaal Portaal',
    zh: '一站式服务(OSS)数字平台',
    ko: '원스톱 서비스(OSS) 디지털 ���털'
  },

  // Portal Feature Cards
  'portal.createProfile': {
    en: 'Create Investor Profile',
    nl: 'Creëer Investeerdersprofiel',
    zh: '创建投资者档案',
    ko: '투자자 프로필 만들기'
  },
  'portal.createProfileDesc': {
    en: 'Unified identity across all government agencies',
    nl: 'Uniforme identiteit bij alle overheidsinstanties',
    zh: '所有政府机构的统一身份',
    ko: '모든 정부 기관의 통합 ID'
  },
  'portal.step1': {
    en: 'STEP 1',
    nl: 'STAP 1',
    zh: '步骤 1',
    ko: '1단계'
  },
  'portal.step2': {
    en: 'STEP 1→2',
    nl: 'STAP 1→2',
    zh: '步骤 1→2',
    ko: '1→2단계'
  },
  'portal.singleSignOn': {
    en: 'Single sign-on across 30+ agencies',
    nl: 'Eenmalige aanmelding bij 30+ agentschappen',
    zh: '30多个机构的单点登录',
    ko: '30개 이상 기관의 단일 로그인'
  },
  'portal.autoFillForms': {
    en: 'Auto-fill forms instantly',
    nl: 'Formulieren automatisch invullen',
    zh: '即时自动填写表格',
    ko: '즉시 양식 자동 채우기'
  },
  'portal.saveResume': {
    en: 'Save & resume anytime',
    nl: 'Opslaan en hervatten op elk moment',
    zh: '随时保存和恢复',
    ko: '언제든지 저장 및 재개'
  },
  'portal.getStarted': {
    en: 'Get Started',
    nl: 'Begin Nu',
    zh: '开始',
    ko: '시작하기'
  },
  'portal.businessSetup': {
    en: 'Business Setup Wizard',
    nl: 'Bedrijfsopstelling Wizard',
    zh: '业务设置向导',
    ko: '비즈니스 설정 마법사'
  },
  'portal.businessSetupDesc': {
    en: 'AI-powered guidance through your setup journey',
    nl: 'AI-aangedreven begeleiding door uw opstellingstraject',
    zh: 'AI驱动的设置旅程指导',
    ko: 'AI 기반 설정 여정 안내'
  },
  'portal.smartSector': {
    en: 'Smart sector recommendations',
    nl: 'Slimme sectoraanbevelingen',
    zh: '智能行业推荐',
    ko: '스마트 부문 추천'
  },
  'portal.predictTimeline': {
    en: 'Predict timeline & costs upfront',
    nl: 'Voorspel tijdlijn en kosten vooraf',
    zh: '预先预测时间表和成本',
    ko: '사전에 일정 및 비용 예측'
  },
  'portal.documentChecklist': {
    en: 'Document checklist generator',
    nl: 'Document checklist generator',
    zh: '文档清单生成器',
    ko: '문서 체크리스트 생성기'
  },
  'portal.startApplication': {
    en: 'Start Application',
    nl: 'Start Aanvraag',
    zh: '开始申请',
    ko: '신청 시작'
  },
  'portal.activeInvestors': {
    en: 'Active Investors',
    nl: 'Actieve Investeerders',
    zh: '活跃投资者',
    ko: '활성 투자자'
  },
  'portal.fdiApproved': {
    en: 'FDI Approved (2023-24)',
    nl: 'FDI Goedgekeurd (2023-24)',
    zh: 'FDI批准（2023-24）',
    ko: 'FDI 승인 (2023-24)'
  },
  'portal.servicesAvailable': {
    en: 'Services Available',
    nl: 'Beschikbare Diensten',
    zh: '可用服务',
    ko: '이용 가능한 서비스'
  },
  'portal.digitalServices': {
    en: 'Digital Services',
    nl: 'Digitale Diensten',
    zh: '数字服务',
    ko: '디지털 서비스'
  },
  'portal.investmentZones': {
    en: 'Investment Zones',
    nl: 'Investeringszones',
    zh: '投资区',
    ko: '투자 구역'
  },

  // Portal Contact & Support
  'portal.phoneSupport': {
    en: 'Phone Support',
    nl: 'Telefoonondersteuning',
    zh: '电话支持',
    ko: '전화 지원'
  },
  'portal.emailSupport': {
    en: 'Email Support',
    nl: 'E-mailondersteuning',
    zh: '电子邮件支持',
    ko: '이메일 지원'
  },
  'portal.liveChat': {
    en: 'Live Chat',
    nl: 'Live Chat',
    zh: '在线聊天',
    ko: '실시간 채팅'
  },
  'portal.available247': {
    en: 'Available 24/7',
    nl: 'Beschikbaar 24/7',
    zh: '全天候可用',
    ko: '연중무휴 이용 가능'
  },
  'portal.teamReady': {
    en: 'Our team is ready to assist you 24/7',
    nl: 'Ons team staat 24/7 voor u klaar',
    zh: '我们的团队随时准备为您提供帮助',
    ko: '우리 팀이 연중무휴로 도와드립니다'
  },
  'portal.hotline': {
    en: 'Hotline',
    nl: 'Hotline',
    zh: '热线',
    ko: '핫라인'
  },
  'portal.hotlineNumber': {
    en: '+880-9666-710000',
    nl: '+880-9666-710000',
    zh: '+880-9666-710000',
    ko: '+880-9666-710000'
  },
  'portal.email': {
    en: 'Email',
    nl: 'E-mail',
    zh: '电子邮件',
    ko: '이메일'
  },
  'portal.supportEmail': {
    en: 'support@bida.gov.bd',
    nl: 'support@bida.gov.bd',
    zh: 'support@bida.gov.bd',
    ko: 'support@bida.gov.bd'
  },

  // Portal Stats & Services
  'portal.trackApplications': {
    en: 'Track Applications',
    nl: 'Toepassingen Volgen',
    zh: '跟踪申请',
    ko: '신청 추적'
  },
  'portal.trackApplicationsDesc': {
    en: 'Real-time status tracking with SLA monitoring',
    nl: 'Realtime status tracking met SLA monitoring',
    zh: '실시간 상태跟踪与SLA监控',
    ko: 'SLA 모니터링을 통한 실시간 상태 추적'
  },
  'portal.investmentZonesTitle': {
    en: 'Investment Zones',
    nl: 'Investeringszones',
    zh: '投资区',
    ko: '투자 구역'
  },
  'portal.investmentZonesDesc': {
    en: 'Explore SEZ, EPZ and Hi-Tech parks with live data',
    nl: 'Verken SEZ, EPZ en Hi-Tech parken met live data',
    zh: '探索经济特区、出口加工区和高科技园区的实时数据',
    ko: '실시간 데이터로 SEZ, EPZ 및 하이테크 파크 탐색'
  },
  'portal.aiPoweredSupport': {
    en: 'AI-Powered Support',
    nl: 'AI-aangedreven Ondersteuning',
    zh: 'AI驱动的支持',
    ko: 'AI 기반 지원'
  },
  'portal.aiPoweredSupportDesc': {
    en: '24/7 intelligent advisor and dedicated helpdesk',
    nl: '24/7 intelligente adviseur en toegewijde helpdesk',
    zh: '24/7智能顾问和专用服务台',
    ko: '연중무휴 지능형 자문 및 전용 헬프데스크'
  },
  'portal.copyright': {
    en: '© 2026 Bangladesh Investment Development Authority (BIDA) | Powered by OSS Digital Platform',
    nl: '© 2026 Bangladesh Investment Development Authority (BIDA) | Aangedreven door OSS Digitaal Platform',
    zh: '© 2026 孟加拉国投资发展局（BIDA）| 由OSS数字平台提供支持',
    ko: '© 2026 방글라데시 투자 개발청(BIDA) | OSS 디지털 플랫폼 제공'
  },
  'portal.implementation': {
    en: 'One Stop Service Implementation under One Stop Service Act 2017',
    nl: 'One Stop Service Implementatie onder One Stop Service Act 2017',
    zh: '根据2017年一站式服务法实施一站式服务',
    ko: '2017년 원스톱 서비스법에 따른 원스톱 서비스 구현'
  },

  // Investment Zones
  'zones.title': {
    en: 'Investment Zones Explorer',
    nl: 'Investeringszones Verkenner',
    zh: '投资区探索器',
    ko: '투자 구역 탐색기'
  },
  'zones.allZones': {
    en: 'All Zones',
    nl: 'Alle Zones',
    zh: '所有区域',
    ko: '모든 구역'
  },
  'zones.beza': {
    en: 'BEZA',
    nl: 'BEZA',
    zh: 'BEZA',
    ko: 'BEZA'
  },
  'zones.bezaFull': {
    en: 'Bangladesh Economic Zones Authority',
    nl: 'Bangladesh Economische Zones Autoriteit',
    zh: '孟加拉国经济区管理局',
    ko: '방글라데시 경제 구역 당국'
  },
  'zones.bepza': {
    en: 'BEPZA',
    nl: 'BEPZA',
    zh: 'BEPZA',
    ko: 'BEPZA'
  },
  'zones.bepzaFull': {
    en: 'Bangladesh Export Processing Zones Authority',
    nl: 'Bangladesh Export Processing Zones Autoriteit',
    zh: '孟加拉国出口加工区管理局',
    ko: '방글라데시 수출 가공 구역 당국'
  },
  'zones.bhtpa': {
    en: 'BHTPA',
    nl: 'BHTPA',
    zh: 'BHTPA',
    ko: 'BHTPA'
  },
  'zones.bhtpaFull': {
    en: 'Bangladesh Hi-Tech Park Authority',
    nl: 'Bangladesh Hi-Tech Park Autoriteit',
    zh: '孟加拉国高科技园区管理局',
    ko: '방글라데시 하이테크 파크 당국'
  },
  'zones.clickZoneForDetails': {
    en: 'Click on a zone marker to view details',
    nl: 'Klik op een zone marker om details te bekijken',
    zh: '点击区域标记查看详情',
    ko: '구역 마커를 클릭하여 세부 정보 보기'
  },
  'zones.filterByIPA': {
    en: 'Filter by Investment Promotion Agency',
    nl: 'Filteren op Investeringspromotie Bureau',
    zh: '按投资促进机构筛选',
    ko: '투자 촉진 기관별 필터링'
  },
  'zones.recommendedForYou': {
    en: 'Recommended for You',
    nl: 'Aanbevolen voor Jou',
    zh: '为您推荐',
    ko: '추천 항목'
  },
  'zones.basedOnSector': {
    en: 'Based on your sector',
    nl: 'Gebaseerd op uw sector',
    zh: '根据您的行业',
    ko: '귀하의 섹터 기준'
  },
  'zones.availablePlots': {
    en: 'Available Plots',
    nl: 'Beschikbare Percelen',
    zh: '可用地块',
    ko: '사용 가능한 구획'
  },
  'zones.reserveNow': {
    en: 'Reserve Now',
    nl: 'Nu Reserveren',
    zh: '即预订',
    ko: '지금 예약'
  },
  'zones.zoneTypes': {
    en: 'Zone Types',
    nl: 'Zone Types',
    zh: '区域类型',
    ko: '구역 유형'
  },
  'zones.sez': {
    en: 'SEZ - Special Economic Zone',
    nl: 'SEZ - Speciale Economische Zone',
    zh: 'SEZ - 经济特区',
    ko: 'SEZ - 경제특구'
  },
  'zones.epz': {
    en: 'EPZ - Export Processing Zone',
    nl: 'EPZ - Export Processing Zone',
    zh: 'EPZ - 出口加工区',
    ko: 'EPZ - 수출 가공 구역'
  },
  'zones.hiTechPark': {
    en: 'Hi-Tech Park',
    nl: 'Hi-Tech Park',
    zh: '高科技园区',
    ko: '하이테크 파크'
  },
  'zones.totalArea': {
    en: 'Total Area',
    nl: 'Totale Oppervlakte',
    zh: '总面积',
    ko: '총 면적'
  },
  'zones.viewDetails': {
    en: 'View Details',
    nl: 'Details Bekijken',
    zh: '查看详情',
    ko: '세부 정보 보기'
  },
  'zones.selectZoneFromMap': {
    en: 'Select a zone from the map to see details',
    nl: 'Selecteer een zone op de kaart om details te zien',
    zh: '从地图中选择区域以查看详情',
    ko: '지도에서 구역을 선택하여 세부 정보 보기'
  },
  'zones.sezZones': {
    en: 'SEZ Zones',
    nl: 'SEZ Zones',
    zh: '经济特구',
    ko: 'SEZ 구역'
  },
  'zones.epzZones': {
    en: 'EPZ Zones',
    nl: 'EPZ Zones',
    zh: '수출 가공 구역',
    ko: 'EPZ 구역'
  },
  'zones.hiTechParks': {
    en: 'Hi-Tech Parks',
    nl: 'Hi-Tech Parks',
    zh: '하이테크 파크',
    ko: '하이테크 파크'
  },
  'zones.availablePlotsCount': {
    en: 'plots available',
    nl: 'percelen beschikbaar',
    zh: '개 구획 사용 가능',
    ko: '개 구획 사용 가능'
  },
  'zones.getDirections': {
    en: 'Get Directions',
    nl: 'Routebeschrijving',
    zh: '获取路线',
    ko: '길찾기'
  },
  'zones.zoneInformation': {
    en: 'Zone Information',
    nl: 'Zone Informatie',
    zh: '区域 정보',
    ko: '구역 정보'
  },
  'zones.suitableSectors': {
    en: 'Suitable Sectors',
    nl: 'Geschikte Sectoren',
    zh: '适合行业',
    ko: '적합한 섹터'
  },
  'zones.incentives': {
    en: 'Incentives',
    nl: 'Incentives',
    zh: '优惠政策',
    ko: '인센티브'
  },
  'zones.utilitiesAvailable': {
    en: 'Utilities Available',
    nl: 'Beschikbare Voorzieningen',
    zh: '可用公用设施',
    ko: '사용 가능한 유틸리티'
  },
  'zones.plot': {
    en: 'Plot',
    nl: 'Perceel',
    zh: '地块',
    ko: '구획'
  },
  'zones.available': {
    en: 'Available',
    nl: 'Beschikbaar',
    zh: '可用',
    ko: '사용 가능'
  },
  'zones.reserved': {
    en: 'Reserved',
    nl: 'Gereserveerd',
    zh: '已预订',
    ko: '예약됨'
  },
  'zones.applyForPlot': {
    en: 'Apply for Plot',
    nl: 'Aanvragen voor Perceel',
    zh: '申请地块',
    ko: '구획 신청'
  },

  // ============================================================================
  // FEE CALCULATOR
  // ============================================================================
  'fee.calculator': {
    en: 'Fee Calculator',
    nl: 'Kostenberekening',
    zh: '费用计算器',
    ko: '수수료 계산기'
  },
  'fee.investmentAmount': {
    en: 'Investment Amount',
    nl: 'Investeringsbedrag',
    zh: '投资金额',
    ko: '투자 금액'
  },
  'fee.estimatedTotal': {
    en: 'Estimated Total',
    nl: 'Geschat Totaal',
    zh: '预计总额',
    ko: '예상 총액'
  },
  'fee.ofInvestment': {
    en: 'of investment',
    nl: 'van investering',
    zh: '投资的',
    ko: '투자의'
  },
  'fee.oneTime': {
    en: 'One-time',
    nl: 'Eenmalig',
    zh: '一次性',
    ko: '일회성'
  },
  'fee.annual': {
    en: 'Annual',
    nl: 'Jaarlijks',
    zh: '年度',
    ko: '연간'
  },
  'fee.oneTimeFees': {
    en: 'One-time Fees',
    nl: 'Eenmalige Kosten',
    zh: '一次性费用',
    ko: '일회성 수수료'
  },
  'fee.annualFees': {
    en: 'Annual Recurring Fees',
    nl: 'Jaarlijkse Terugkerende Kosten',
    zh: '年度经常性费用',
    ko: '연간 정기 수수료'
  },
  'fee.monthlyFees': {
    en: 'Monthly Fees',
    nl: 'Maandelijkse Kosten',
    zh: '月度费用',
    ko: '월간 수수료'
  },
  'fee.grandTotal': {
    en: 'Grand Total',
    nl: 'Totaalbedrag',
    zh: '总计',
    ko: '총합계'
  },
  'fee.percentOfInvestment': {
    en: '% of Investment Amount',
    nl: '% van Investeringsbedrag',
    zh: '投资金额百分比',
    ko: '투자 금액의 %'
  },
  'fee.disclaimer': {
    en: 'Important Notice',
    nl: 'Belangrijke Mededeling',
    zh: '重要提示',
    ko: '중요 공지'
  },
  'fee.disclaimerText': {
    en: 'These are estimated fees based on standard government rates. Actual fees may vary depending on specific business circumstances. Please consult with BIDA for exact fee calculations.',
    nl: 'Dit zijn geschatte kosten op basis van standaard overheidstarieven. Werkelijke kosten kunnen variëren afhankelijk van specifieke bedrijfsomstandigheden. Raadpleeg BIDA voor exacte kostenberekeningen.',
    zh: '这些是基于标准政府费率的估算费用。实际费用可能因具体业务情况而异。请咨询 BIDA 以获得准确的费用计算。',
    ko: '이는 표준 정부 요율을 기반으로 한 예상 수수료입니다. 실제 수수료는 특정 사업 상황에 따라 달라질 수 있습니다. 정확한 수수료 계산은 BIDA에 문의하십시오.'
  },

  // ============================================================================
  // AFTERCARE
  // ============================================================================
  'aftercare.title': {
    en: 'Aftercare Services',
    nl: 'Nazorgdiensten',
    zh: '售后服务',
    ko: '사후 관리 서비스'
  },
  'aftercare.portalTitle': {
    en: 'Aftercare Portal',
    nl: 'Nazorg Portaal',
    zh: '售后服务门户',
    ko: '사후 관리 포털'
  },
  'aftercare.subtitle': {
    en: 'Comprehensive support for established investors',
    nl: 'Uitgebreide ondersteuning voor gevestigde investeerders',
    zh: '为成熟投资者提供全面支持',
    ko: '기존 투자자를 위한 종합 지원'
  },
  'aftercare.newRequest': {
    en: 'New Request',
    nl: 'Nieuw Verzoek',
    zh: '新请求',
    ko: '새 요청'
  },
  'aftercare.activeServices': {
    en: 'Active Services',
    nl: 'Actieve Diensten',
    zh: '活跃服务',
    ko: '활성 서비스'
  },
  'aftercare.openTickets': {
    en: 'Open Tickets',
    nl: 'Open Tickets',
    zh: '待处理工单',
    ko: '열린 티켓'
  },
  'aftercare.opportunities': {
    en: 'Opportunities',
    nl: 'Kansen',
    zh: '机会',
    ko: '기회'
  },
  'aftercare.services': {
    en: 'Services',
    nl: 'Diensten',
    zh: '服务',
    ko: '서비스'
  },
  'aftercare.supportTickets': {
    en: 'Support Tickets',
    nl: 'Ondersteuningstickets',
    zh: '支持工单',
    ko: '지원 티켓'
  },
  'aftercare.expansion': {
    en: 'Expansion',
    nl: 'Uitbreiding',
    zh: '扩张',
    ko: '확장'
  },
  'aftercare.contact': {
    en: 'Contact',
    nl: 'Contact',
    zh: '联系',
    ko: '연락'
  },
  'aftercare.category.all': {
    en: 'All Categories',
    nl: 'Alle Categorieën',
    zh: '所有类别',
    ko: '모든 카테고리'
  },
  'aftercare.category.expansion': {
    en: 'Expansion Support',
    nl: 'Uitbreidingsondersteuning',
    zh: '扩张支持',
    ko: '확장 지원'
  },
  'aftercare.category.compliance': {
    en: 'Compliance Assistance',
    nl: 'Nalevingsondersteuning',
    zh: '合规协助',
    ko: '규정 준수 지원'
  },
  'aftercare.category.operational': {
    en: 'Operational Support',
    nl: 'Operationele Ondersteuning',
    zh: '运营支持',
    ko: '운영 지원'
  },
  'aftercare.category.advisory': {
    en: 'Advisory Services',
    nl: 'Adviesdiensten',
    zh: '咨询服务',
    ko: '자문 서비스'
  },
  'aftercare.category.grievance': {
    en: 'Grievance Handling',
    nl: 'Klachtenafhandeling',
    zh: '申诉处理',
    ko: '불만 처리'
  },
  'aftercare.requestService': {
    en: 'Request Service',
    nl: 'Dienst Aanvragen',
    zh: '请求服务',
    ko: '서비스 요청'
  },
  'aftercare.viewDetails': {
    en: 'View Details',
    nl: 'Details Bekijken',
    zh: '查看详情',
    ko: '세부정보 보기'
  },
  'aftercare.active': {
    en: 'Active',
    nl: 'Actief',
    zh: '活跃',
    ko: '활성'
  },
  'aftercare.completed': {
    en: 'Completed',
    nl: 'Voltooid',
    zh: '已完成',
    ko: '완료'
  },
  'aftercare.tickets': {
    en: 'Support Tickets',
    nl: 'Ondersteuningstickets',
    zh: '支持工单',
    ko: '지원 티켓'
  },
  'aftercare.recent': {
    en: 'Recent',
    nl: 'Recent',
    zh: '最近',
    ko: '최근'
  },

  // ============================================================================
  // STATUS & PRIORITY
  // ============================================================================
  'status.available': {
    en: 'Available',
    nl: 'Beschikbaar',
    zh: '可用',
    ko: '사용 가능'
  },
  'status.in-progress': {
    en: 'In Progress',
    nl: 'Bezig',
    zh: '进行中',
    ko: '진행 중'
  },
  'status.requested': {
    en: 'Requested',
    nl: 'Aangevraagd',
    zh: '已请求',
    ko: '요청됨'
  },
  'priority.low': {
    en: 'Low',
    nl: 'Laag',
    zh: '低',
    ko: '낮음'
  },
  'priority.medium': {
    en: 'Medium',
    nl: 'Gemiddeld',
    zh: '中',
    ko: '중간'
  },
  'priority.high': {
    en: 'High',
    nl: 'Hoog',
    zh: '高',
    ko: '높음'
  },
  'priority.urgent': {
    en: 'Urgent',
    nl: 'Dringend',
    zh: '紧急',
    ko: '긴급'
  },

  // ============================================================================
  // COMPLIANCE
  // ============================================================================
  'compliance.alertsTitle': {
    en: 'Compliance Alerts',
    nl: 'Nalevingswaarschuwingen',
    zh: '合规警报',
    ko: '규정 준수 알림'
  },
  'compliance.subtitle': {
    en: 'Stay ahead of regulatory requirements',
    nl: 'Blijf regelgevingsvereisten voor',
    zh: '领先于监管要求',
    ko: '규제 요구사항을 앞서가세요'
  },
  'compliance.settings': {
    en: 'Settings',
    nl: 'Instellingen',
    zh: '设置',
    ko: '설정'
  },
  'compliance.exportReport': {
    en: 'Export Report',
    nl: 'Rapport Exporteren',
    zh: '导出报告',
    ko: '보고서 내보내기'
  },
  'compliance.dueIn14Days': {
    en: 'Due in 14 Days',
    nl: 'Vervalt over 14 dagen',
    zh: '14天内到期',
    ko: '14일 내 마감'
  },
  'compliance.newRegulations': {
    en: 'New Regulations',
    nl: 'Nieuwe Regelgeving',
    zh: '新规定',
    ko: '새로운 규정'
  },
  'compliance.resolved': {
    en: 'Resolved',
    nl: 'Opgelost',
    zh: '已解决',
    ko: '해결됨'
  },
  'compliance.searchAlerts': {
    en: 'Search alerts...',
    nl: 'Zoek waarschuwingen...',
    zh: '搜索警报...',
    ko: '알림 검색...'
  },
  'compliance.allSeverities': {
    en: 'All Severities',
    nl: 'Alle Ernstniveaus',
    zh: '所有严重程度',
    ko: '모든 심각도'
  },
  'compliance.medium': {
    en: 'Medium',
    nl: 'Gemiddeld',
    zh: '中',
    ko: '중간'
  },
  'compliance.low': {
    en: 'Low',
    nl: 'Laag',
    zh: '低',
    ko: '낮음'
  },
  'compliance.info': {
    en: 'Info',
    nl: 'Info',
    zh: '信息',
    ko: '정보'
  },
  'compliance.dueDate': {
    en: 'Due Date',
    nl: 'Vervaldatum',
    zh: '截止日期',
    ko: '마감일'
  },
  'compliance.source': {
    en: 'Source',
    nl: 'Bron',
    zh: '来源',
    ko: '출처'
  },
  'compliance.affects': {
    en: 'Affects',
    nl: 'Betreft',
    zh: '影响',
    ko: '영향'
  },
  'compliance.issued': {
    en: 'Issued',
    nl: 'Uitgegeven',
    zh: '发布',
    ko: '발행'
  },
  'compliance.actionRequired': {
    en: 'Action Required',
    nl: 'Actie Vereist',
    zh: '需要行动',
    ko: '조치 필요'
  },
  'compliance.takeAction': {
    en: 'Take Action',
    nl: 'Actie Ondernemen',
    zh: '采取行动',
    ko: '조치하기'
  },
  'compliance.acknowledge': {
    en: 'Acknowledge',
    nl: 'Bevestigen',
    zh: '确认',
    ko: '확인'
  },
  'compliance.dismiss': {
    en: 'Dismiss',
    nl: 'Afwijzen',
    zh: '关闭',
    ko: '해제'
  },
  'compliance.alerts': {
    en: 'Compliance Alerts',
    nl: 'Nalevingswaarschuwingen',
    zh: '合规警报',
    ko: '규정 준수 알림'
  },
  'compliance.critical': {
    en: 'Critical',
    nl: 'Kritisch',
    zh: '关键',
    ko: '중요'
  },
  'compliance.high': {
    en: 'High Priority',
    nl: 'Hoge Prioriteit',
    zh: '高优先级',
    ko: '높은 우선순위'
  },
  'compliance.urgent': {
    en: 'Urgent',
    nl: 'Dringend',
    zh: '紧急',
    ko: '긴급'
  },

  // ============================================================================
  // GIS + LOCATION INTELLIGENCE
  // ============================================================================
  'gis.title': {
    en: 'GIS + Location Intelligence',
    nl: 'GIS + Locatie Intelligentie',
    zh: 'GIS + 位置智能',
    ko: 'GIS + 위치 인텔리전스'
  },
  'gis.subtitle': {
    en: 'Smart zone recommendations based on your investment profile',
    nl: 'Slimme zone-aanbevelingen op basis van uw investeringsprofiel',
    zh: '基于您的投资概况的智能区域推荐',
    ko: '투자 프로필을 기반으로 한 스마트 구역 추천'
  },
  'gis.intelligent': {
    en: 'Intelligent',
    nl: 'Intelligent',
    zh: '智能',
    ko: '지능형'
  },
  'gis.aiPowered': {
    en: 'AI Powered',
    nl: 'AI Aangedreven',
    zh: 'AI驱动',
    ko: 'AI 기반'
  },
  'gis.aiRecommendations': {
    en: 'AI Zone Recommendations',
    nl: 'AI Zone Aanbevelingen',
    zh: 'AI区域推荐',
    ko: 'AI 구역 추천'
  },
  'gis.poweredByAI': {
    en: 'Powered by AI',
    nl: 'Aangedreven door AI',
    zh: '由AI驱动',
    ko: 'AI 기반'
  },
  'gis.recommended': {
    en: 'Recommended',
    nl: 'Aanbevolen',
    zh: '推荐',
    ko: '추천'
  },
  'gis.sectorFit': {
    en: 'Sector Fit',
    nl: 'Sector Geschiktheid',
    zh: '行业适配度',
    ko: '섹터 적합성'
  },
  'gis.searchZone': {
    en: 'Search Zone',
    nl: 'Zoek Zone',
    zh: '搜索区域',
    ko: '구역 검색'
  },
  'gis.searchPlaceholder': {
    en: 'Type zone name...',
    nl: 'Typ zonenaam...',
    zh: '输入区域名称...',
    ko: '구역 이름 입력...'
  },
  'gis.zoneType': {
    en: 'Zone Type',
    nl: 'Zone Type',
    zh: '区域类型',
    ko: '구역 유형'
  },
  'gis.sector': {
    en: 'Sector',
    nl: 'Sector',
    zh: '行业',
    ko: '섹터'
  },
  'gis.sortBy': {
    en: 'Sort By',
    nl: 'Sorteer Op',
    zh: '排序方式',
    ko: '정렬 기준'
  },
  'gis.aiScore': {
    en: 'AI Score',
    nl: 'AI Score',
    zh: 'AI评分',
    ko: 'AI 점수'
  },
  'gis.lowestCost': {
    en: 'Lowest Cost',
    nl: 'Laagste Kosten',
    zh: '最低成本',
    ko: '최저 비용'
  },
  'gis.availability': {
    en: 'Availability',
    nl: 'Beschikbaarheid',
    zh: '可用性',
    ko: '가용성'
  },
  'gis.zoneComparison': {
    en: 'Zone Comparison & Analysis',
    nl: 'Zone Vergelijking & Analyse',
    zh: '区域比较与分析',
    ko: '구역 비교 및 분석'
  },
  'gis.rank': {
    en: 'Rank',
    nl: 'Rang',
    zh: '排名',
    ko: '순위'
  },
  'gis.zone': {
    en: 'Zone',
    nl: 'Zone',
    zh: '区域',
    ko: '구역'
  },
  'gis.infrastructure': {
    en: 'Infrastructure',
    nl: 'Infrastructuur',
    zh: '基础设施',
    ko: '인프라'
  },
  'gis.cost': {
    en: 'Cost',
    nl: 'Kosten',
    zh: '成本',
    ko: '비용'
  },
  'gis.keyBenefit': {
    en: 'Key Benefit',
    nl: 'Belangrijkste Voordeel',
    zh: '主要优势',
    ko: '주요 혜택'
  },
  'gis.strengths': {
    en: 'Strengths',
    nl: 'Sterke Punten',
    zh: '优势',
    ko: '강점'
  },
  'gis.considerations': {
    en: 'Considerations',
    nl: 'Overwegingen',
    zh: '考虑因素',
    ko: '고려사항'
  },
  'gis.zoneStatistics': {
    en: 'Investment Zone Statistics',
    nl: 'Investeringszone Statistieken',
    zh: '投资区域统计',
    ko: '투자 구역 통계'
  },
  'gis.filters': {
    en: 'Filters & Search',
    nl: 'Filters & Zoeken',
    zh: '筛选与搜索',
    ko: '필터 및 검색'
  },
  'gis.interactiveMap': {
    en: 'Investment Zone Map - Bangladesh',
    nl: 'Investeringszone Kaart - Bangladesh',
    zh: '投资区域地图 - 孟加拉国',
    ko: '투자 구역 지도 - 방글라데시'
  },
  'gis.legend': {
    en: 'Legend',
    nl: 'Legenda',
    zh: '图例',
    ko: '범례'
  },
  'gis.topRecommended': {
    en: 'Top Zones',
    nl: 'Top Zones',
    zh: '顶级区域',
    ko: '상위 구역'
  },
  'gis.otherZones': {
    en: 'Other Zones',
    nl: 'Andere Zones',
    zh: '其他区域',
    ko: '기타 구역'
  },
  'gis.totalZones': {
    en: 'Total Zones',
    nl: 'Totaal Zones',
    zh: '总区域数',
    ko: '전체 구역'
  },
  'gis.availablePlots': {
    en: 'Available Plots',
    nl: 'Beschikbare Percelen',
    zh: '可用地块',
    ko: '사용 가능한 부지'
  },
  'gis.topMatches': {
    en: 'AI Matches',
    nl: 'AI Matches',
    zh: 'AI匹配',
    ko: 'AI 매칭'
  },

  // ============================================================================
  // TALENT ENGINE
  // ============================================================================
  'talent.engine': {
    en: 'Talent Engine',
    nl: 'Talent Engine',
    zh: '人才引擎',
    ko: '인재 엔진'
  },
  'talent.available': {
    en: 'Available Talent',
    nl: 'Beschikbaar Talent',
    zh: '可用人才',
    ko: '사용 가능한 인재'
  },
  'talent.programs': {
    en: 'Training Programs',
    nl: 'Trainingsprogramma\'s',
    zh: '培训计划',
    ko: '교육 프로그램'
  },
  'talent.topMatches': {
    en: 'Top Matches',
    nl: 'Beste Overeenkomsten',
    zh: '最佳匹配',
    ko: '최고 매치'
  },

  // ============================================================================
  // VIDEO LIBRARY
  // ============================================================================
  'video.library': {
    en: 'Video Library',
    nl: 'Videobibliotheek',
    zh: '视频库',
    ko: '비디오 라이브러리'
  },
  'video.videos': {
    en: 'Videos',
    nl: 'Video\'s',
    zh: '视频',
    ko: '비디오'
  },
  'video.upcoming': {
    en: 'Upcoming',
    nl: 'Aankomend',
    zh: '即将推出',
    ko: '예정'
  },
  'video.recent': {
    en: 'Recent Videos',
    nl: 'Recente Video\'s',
    zh: '最近视频',
    ko: '최근 비디오'
  },

  // ============================================================================
  // CHAT
  // ============================================================================
  'chat.askQuestion': {
    en: 'Ask a question...',
    nl: 'Stel een vraag...',
    zh: '提问...',
    ko: '질문하기...'
  },
  'chat.assistant': {
    en: 'AI Assistant',
    nl: 'AI Assistent',
    zh: 'AI助手',
    ko: 'AI 어시스턴트'
  },
  'chat.online': {
    en: 'Online',
    nl: 'Online',
    zh: '在线',
    ko: '온라인'
  },
  'chat.typeMessage': {
    en: 'Type your message...',
    nl: 'Typ uw bericht...',
    zh: '输入您的消息...',
    ko: '메시지를 입력하세요...'
  },
  
  // ============================================================================
  // FEE CALCULATOR
  // ============================================================================
  'fee.calculatorTitle': {
    en: 'Fee Transparency Calculator',
    nl: 'Kostenberekening Calculator',
    zh: '费用透明度计算器',
    ko: '수수료 투명성 계산기'
  },
  'fee.subtitle': {
    en: 'Calculate total costs and breakdown for your business setup',
    nl: 'Bereken totale kosten en uitsplitsing voor uw bedrijfsopzet',
    zh: '计算您业务设置的总成本和明细',
    ko: '비즈니스 설정을 위한 총 비용 및 세부내역 계산'
  },
  'fee.totalCost': {
    en: 'Total Cost',
    nl: 'Totale Kosten',
    zh: '总成本',
    ko: '총 비용'
  },
  'fee.inputParameters': {
    en: 'Input Parameters',
    nl: 'Invoerparameters',
    zh: '输入参数',
    ko: '입력 매개변수'
  },
  'fee.currency': {
    en: 'Currency',
    nl: 'Valuta',
    zh: '货币',
    ko: '통화'
  },
  'fee.businessType': {
    en: 'Business Type',
    nl: 'Bedrijfstype',
    zh: '业务类型',
    ko: '비즈니스 유형'
  },
  'fee.location': {
    en: 'Location',
    nl: 'Locatie',
    zh: '地点',
    ko: '위치'
  },
  'fee.employeeCount': {
    en: 'Employee Count',
    nl: 'Aantal Werknemers',
    zh: '员工人数',
    ko: '직원 수'
  },
  'fee.includeOptional': {
    en: 'Include Optional Services',
    nl: 'Inclusief Optionele Diensten',
    zh: '包含可选服务',
    ko: '선택 서비스 포함'
  },
  'fee.detailedBreakdown': {
    en: 'Detailed Breakdown',
    nl: 'Gedetailleerde Uitsplitsing',
    zh: '详细明细',
    ko: '상세 내역'
  },
  'businessType.manufacturing': {
    en: 'Manufacturing',
    nl: 'Productie',
    zh: '制造业',
    ko: '제조업'
  },
  'businessType.service': {
    en: 'Service',
    nl: 'Diensten',
    zh: '服务业',
    ko: '서비스업'
  },
  'businessType.trading': {
    en: 'Trading',
    nl: 'Handel',
    zh: '贸易',
    ko: '무역'
  },
  'businessType.it': {
    en: 'IT & Software',
    nl: 'IT & Software',
    zh: 'IT与软件',
    ko: 'IT 및 소프트웨어'
  },
  'businessType.other': {
    en: 'Other',
    nl: 'Andere',
    zh: '其他',
    ko: '기타'
  },
  'location.dhaka': {
    en: 'Dhaka',
    nl: 'Dhaka',
    zh: '达卡',
    ko: '다카'
  },
  'location.chittagong': {
    en: 'Chittagong',
    nl: 'Chittagong',
    zh: '吉大港',
    ko: '치타공'
  },
  'location.sez': {
    en: 'SEZ (Special Economic Zone)',
    nl: 'SEZ (Speciale Economische Zone)',
    zh: '经济特区',
    ko: '경제특구'
  },
  'location.other': {
    en: 'Other Cities',
    nl: 'Andere Steden',
    zh: '其他城市',
    ko: '기타 도시'
  },
  'common.reset': {
    en: 'Reset',
    nl: 'Resetten',
    zh: '重置',
    ko: '재설정'
  },
  'common.export': {
    en: 'Export',
    nl: 'Exporteren',
    zh: '导出',
    ko: '내보내기'
  },
  'common.collapse': {
    en: 'Collapse',
    nl: 'Inklappen',
    zh: '折叠',
    ko: '접기'
  },
  'common.required': {
    en: 'Required',
    nl: 'Verplicht',
    zh: '必填',
    ko: '필수'
  },
  'common.all': {
    en: 'All',
    nl: 'Alle',
    zh: '全部',
    ko: '전체'
  },
  'common.filters': {
    en: 'Filters',
    nl: 'Filters',
    zh: '筛选',
    ko: '필터'
  },
  'common.years': {
    en: 'years',
    nl: 'jaren',
    zh: '年',
    ko: '년'
  },
  
  // ============================================================================
  // VIDEO LIBRARY
  // ============================================================================
  'video.libraryTitle': {
    en: 'Video Library',
    nl: 'Videobibliotheek',
    zh: '视频库',
    ko: '비디오 라이브러리'
  },
  'video.subtitle': {
    en: 'Educational resources and guides',
    nl: 'Educatieve bronnen en handleidingen',
    zh: '教育资源和指南',
    ko: '교육 자료 및 가이드'
  },
  'video.saved': {
    en: 'Saved',
    nl: 'Opgeslagen',
    zh: '已保存',
    ko: '저장됨'
  },
  'video.live': {
    en: 'Live',
    nl: 'Live',
    zh: '直播',
    ko: '라이브'
  },
  'video.totalVideos': {
    en: 'Total Videos',
    nl: 'Totaal Video\'s',
    zh: '视频总数',
    ko: '총 비디오'
  },
  'video.upcomingWebinars': {
    en: 'Upcoming Webinars',
    nl: 'Komende Webinars',
    zh: '即将举行的网络研讨会',
    ko: '예정된 웨비나'
  },
  'video.totalViews': {
    en: 'Total Views',
    nl: 'Totaal Weergaven',
    zh: '总观看次数',
    ko: '총 조회수'
  },
  'video.totalContent': {
    en: 'Total Content',
    nl: 'Totale Inhoud',
    zh: '总内容',
    ko: '총 콘텐츠'
  },
  'video.videoLibrary': {
    en: 'Video Library',
    nl: 'Videobibliotheek',
    zh: '视频库',
    ko: '비디오 라이브러리'
  },
  'video.savedVideos': {
    en: 'Saved Videos',
    nl: 'Opgeslagen Video\'s',
    zh: '保存的视频',
    ko: '저장된 비디오'
  },
  'video.search': {
    en: 'Search videos...',
    nl: 'Video\'s zoeken...',
    zh: '搜索视频...',
    ko: '비디오 검색...'
  },
  'video.allCategories': {
    en: 'All Categories',
    nl: 'Alle Categorieën',
    zh: '所有类别',
    ko: '모든 카테고리'
  },
  'video.registration': {
    en: 'Registration',
    nl: 'Registratie',
    zh: '注册',
    ko: '등록'
  },
  'video.compliance': {
    en: 'Compliance',
    nl: 'Naleving',
    zh: '合规',
    ko: '규정 준수'
  },
  'video.taxation': {
    en: 'Taxation',
    nl: 'Belasting',
    zh: '税务',
    ko: '세금'
  },
  'video.export': {
    en: 'Export',
    nl: 'Export',
    zh: '出口',
    ko: '수출'
  },
  'video.sez': {
    en: 'SEZ',
    nl: 'SEZ',
    zh: '经济特区',
    ko: '경제특구'
  },
  'video.general': {
    en: 'General',
    nl: 'Algemeen',
    zh: '一般',
    ko: '일반'
  },
  'video.allLevels': {
    en: 'All Levels',
    nl: 'Alle Niveaus',
    zh: '所有级别',
    ko: '모든 레벨'
  },
  'video.beginner': {
    en: 'Beginner',
    nl: 'Beginner',
    zh: '初级',
    ko: '초급'
  },
  'video.intermediate': {
    en: 'Intermediate',
    nl: 'Gemiddeld',
    zh: '中级',
    ko: '중급'
  },
  'video.advanced': {
    en: 'Advanced',
    nl: 'Gevorderd',
    zh: '高级',
    ko: '고급'
  },
  'video.resources': {
    en: 'Resources',
    nl: 'Bronnen',
    zh: '资源',
    ko: '리소스'
  },
  
  // ============================================================================
  // TALENT ENGINE
  // ============================================================================
  'talent.engineTitle': {
    en: 'Talent Pool Engine',
    nl: 'Talentenpool Engine',
    zh: '人才库引擎',
    ko: '인재풀 엔진'
  },
  'talent.subtitle': {
    en: 'Find and hire qualified professionals',
    nl: 'Vind en huur gekwalificeerde professionals',
    zh: '寻找和雇用合格的专业人员',
    ko: '자격을 갖춘 전문가 찾기 및 채용'
  },
  'talent.exportReport': {
    en: 'Export Report',
    nl: 'Rapport Exporteren',
    zh: '导出报告',
    ko: '보고서 내보내기'
  },
  'talent.postJob': {
    en: 'Post Job',
    nl: 'Vacature Plaatsen',
    zh: '发布职位',
    ko: '채용 공고 게시'
  },
  'talent.talentPool': {
    en: 'Talent Pool',
    nl: 'Talentenpool',
    zh: '人才库',
    ko: '인재풀'
  },
  'talent.trained': {
    en: 'Trained',
    nl: 'Getraind',
    zh: '已培训',
    ko: '교육받음'
  },
  'talent.trainingPrograms': {
    en: 'Training Programs',
    nl: 'Trainingsprogramma\'s',
    zh: '培训项目',
    ko: '교육 프로그램'
  },
  'talent.literacyRate': {
    en: 'Literacy Rate',
    nl: 'Alfabetiseringsgraad',
    zh: '识字率',
    ko: '문해율'
  },
  'talent.searchTalent': {
    en: 'Search Talent',
    nl: 'Talent Zoeken',
    zh: '搜索人才',
    ko: '인재 검색'
  },
  'talent.training': {
    en: 'Training',
    nl: 'Training',
    zh: '培训',
    ko: '교육'
  },
  'talent.marketInsights': {
    en: 'Market Insights',
    nl: 'Marktinzichten',
    zh: '市场洞察',
    ko: '시장 인사이트'
  },
  'talent.requirements': {
    en: 'Requirements',
    nl: 'Vereisten',
    zh: '要求',
    ko: '요구사항'
  },
  'talent.searchPlaceholder': {
    en: 'Search by name, skills, or location...',
    nl: 'Zoeken op naam, vaardigheden of locatie...',
    zh: '按姓名、技能或地点搜索...',
    ko: '이름, 기술 또는 위치로 검색...'
  },
  'talent.location': {
    en: 'Location',
    nl: 'Locatie',
    zh: '地点',
    ko: '위치'
  },
  'talent.minExperience': {
    en: 'Min Experience',
    nl: 'Min. Ervaring',
    zh: '最低经验',
    ko: '최소 경력'
  },
  'talent.skills': {
    en: 'Skills',
    nl: 'Vaardigheden',
    zh: '技能',
    ko: '기술'
  },
  'talent.candidates': {
    en: 'candidates',
    nl: 'kandidaten',
    zh: '候选人',
    ko: '후보자'
  },
  'talent.match': {
    en: 'match',
    nl: 'match',
    zh: '匹配',
    ko: '일치'
  },
  'talent.viewProfile': {
    en: 'View Profile',
    nl: 'Profiel Bekijken',
    zh: '查看个人资料',
    ko: '프로필 보기'
  },

  // ============================================================================
  // INTELLIGENCE LAYER - FDI REALTIME DASHBOARD
  // ============================================================================
  'intelligence.fdi.dashboard': {
    en: 'FDI Intelligence Dashboard',
    nl: 'FDI Intelligence Dashboard',
    zh: 'FDI 情报仪表板',
    ko: 'FDI 인텔리전스 대시보드'
  },
  'intelligence.fdi.realtimeFlows': {
    en: 'Real-time investment flows and economic impact',
    nl: 'Real-time investeringsstromen en economische impact',
    zh: '实时投资流动和经济影响',
    ko: '실시간 투자 흐름 및 경제 영향'
  },
  'intelligence.fdi.dataSource': {
    en: 'Data',
    nl: 'Gegevens',
    zh: '数据',
    ko: '데이터'
  },
  'intelligence.fdi.totalApproved': {
    en: 'Total FDI Approved',
    nl: 'Totaal Goedgekeurd FDI',
    zh: 'FDI 总批准额',
    ko: '승인된 총 FDI'
  },
  'intelligence.fdi.activeProjects': {
    en: 'Active Projects',
    nl: 'Actieve Projecten',
    zh: '活跃项目',
    ko: '활성 프로젝트'
  },
  'intelligence.fdi.jobsCreated': {
    en: 'Jobs Created',
    nl: 'Gecreëerde Banen',
    zh: '创造就业',
    ko: '일자리 창출'
  },
  'intelligence.fdi.sourceCountries': {
    en: 'Source Countries',
    nl: 'Bronlanden',
    zh: '来源国',
    ko: '출처 국가'
  },
  'intelligence.fdi.yoyChange': {
    en: 'YoY',
    nl: 'JoJ',
    zh: '同比',
    ko: '전년 대비'
  },
  'intelligence.fdi.thisMonth': {
    en: 'this month',
    nl: 'deze maand',
    zh: '本月',
    ko: '이번 달'
  },
  'intelligence.fdi.thisQuarter': {
    en: 'this quarter',
    nl: 'dit kwartaal',
    zh: '本季度',
    ko: '이번 분기'
  },
  'intelligence.fdi.acrossContinents': {
    en: 'Across 5 continents',
    nl: 'Over 5 continenten',
    zh: '横跨5大洲',
    ko: '5개 대륙에 걸쳐'
  },
  'intelligence.fdi.downloadReport': {
    en: 'Download Annual Report',
    nl: 'Download Jaarverslag',
    zh: '下载年度报告',
    ko: '연간 보고서 다운로드'
  },
  'intelligence.fdi.sectorDistribution': {
    en: 'Investment by Sector',
    nl: 'Investeringen per Sector',
    zh: '按部门划分的投资',
    ko: '부문별 투자'
  },
  'intelligence.fdi.countryFlow': {
    en: 'Top Source Countries',
    nl: 'Top Bronlanden',
    zh: '主要来源国',
    ko: '주요 출처 국가'
  },

  // ============================================================================
  // INTELLIGENCE LAYER - POLICY ALERTS
  // ============================================================================
  'intelligence.policy.highPriority': {
    en: 'High Priority Policy Updates',
    nl: 'Hoge Prioriteit Beleidsupdates',
    zh: '高优先级政策更新',
    ko: '높은 우선순위 정책 업데이트'
  },
  'intelligence.policy.additional': {
    en: 'Additional Policy Updates',
    nl: 'Extra Beleidsupdates',
    zh: '其他政策更新',
    ko: '추가 정책 업데이트'
  },
  'intelligence.policy.actionRequired': {
    en: 'ACTION REQUIRED',
    nl: 'ACTIE VEREIST',
    zh: '需要行动',
    ko: '조치 필요'
  },
  'intelligence.policy.relevance': {
    en: 'relevance',
    nl: 'relevantie',
    zh: '相关性',
    ko: '관련성'
  },
  'intelligence.policy.learnMore': {
    en: 'Learn More',
    nl: 'Meer Informatie',
    zh: '了解更多',
    ko: '더 알아보기'
  },
  'intelligence.policy.upcomingDeadlines': {
    en: 'Upcoming Deadlines',
    nl: 'Aankomende Deadlines',
    zh: '即将到来的截止日期',
    ko: '다가오는 마감일'
  },
  'intelligence.policy.viewAll': {
    en: 'View All',
    nl: 'Alles Bekijken',
    zh: '查看全部',
    ko: '모두 보기'
  },

  // ============================================================================
  // INTELLIGENCE LAYER - COST BENCHMARK
  // ============================================================================
  'intelligence.cost.title': {
    en: 'Operating Cost Intelligence',
    nl: 'Operationele Kostenintelligentie',
    zh: '运营成本情报',
    ko: '운영 비용 인텔리전스'
  },
  'intelligence.cost.comparison': {
    en: 'Bangladesh vs. Regional Competitors',
    nl: 'Bangladesh vs. Regionale Concurrenten',
    zh: '孟加拉国与区域竞争对手',
    ko: '방글라데시 vs. 지역 경쟁사'
  },
  'intelligence.cost.yourSavings': {
    en: 'Your Projected Savings',
    nl: 'Uw Verwachte Besparingen',
    zh: '您的预计节省',
    ko: '예상 절감액'
  },
  'intelligence.cost.tenYearSavings': {
    en: '10-Year Savings',
    nl: '10-Jarige Besparingen',
    zh: '10年节省',
    ko: '10년 절감'
  },
  'intelligence.cost.roiImprovement': {
    en: 'ROI Improvement',
    nl: 'ROI-verbetering',
    zh: 'ROI 改善',
    ko: 'ROI 개선'
  },
  'intelligence.cost.compareWith': {
    en: 'Compare with',
    nl: 'Vergelijk met',
    zh: '与...比较',
    ko: '비교 대상'
  },
  'intelligence.cost.yourCost': {
    en: 'Your Cost',
    nl: 'Uw Kosten',
    zh: '您的成本',
    ko: '귀하의 비용'
  },

  // ============================================================================
  // INTELLIGENCE LAYER - KYA GANTT
  // ============================================================================
  'intelligence.kya.smartGantt': {
    en: 'Smart Gantt Timeline',
    nl: 'Slimme Gantt Tijdlijn',
    zh: '智能甘特图时间线',
    ko: '스마트 간트 타임라인'
  },
  'intelligence.kya.criticalPath': {
    en: 'Critical Path',
    nl: 'Kritisch Pad',
    zh: '关键路径',
    ko: '크리티컬 패스'
  },
  'intelligence.kya.canParallelize': {
    en: 'Can Parallelize',
    nl: 'Kan Parallelliseren',
    zh: '可并行',
    ko: '병렬화 가능'
  },
  'intelligence.kya.currentDay': {
    en: 'Current Day',
    nl: 'Huidige Dag',
    zh: '当前日期',
    ko: '현재 날짜'
  },
  'intelligence.kya.daysDuration': {
    en: 'days',
    nl: 'dagen',
    zh: '天',
    ko: '일'
  },

  // ============================================================================
  // INTELLIGENCE LAYER - INCENTIVE AUTO-DETECT
  // ============================================================================
  'intelligence.incentive.autoDetect': {
    en: 'Incentive Auto-Detection',
    nl: 'Automatische Incentive Detectie',
    zh: '激励自动检测',
    ko: '인센티브 자동 감지'
  },
  'intelligence.incentive.youQualify': {
    en: 'You qualify for',
    nl: 'U komt in aanmerking voor',
    zh: '您符合资格',
    ko: '다음 자격이 있습니다'
  },
  'intelligence.incentive.incentivesWorth': {
    en: 'incentives worth',
    nl: 'incentives ter waarde van',
    zh: '激励价值',
    ko: '인센티브 가치'
  },
  'intelligence.incentive.totalSavings': {
    en: 'Total Estimated Savings',
    nl: 'Totaal Geschatte Besparingen',
    zh: '总预计节省',
    ko: '총 예상 절감액'
  },
  'intelligence.incentive.applyNow': {
    en: 'Apply Now',
    nl: 'Nu Aanvragen',
    zh: '立即申请',
    ko: '지금 신청'
  },
  'intelligence.incentive.eligibilityScore': {
    en: 'Eligibility',
    nl: 'Geschiktheid',
    zh: '资格',
    ko: '자격'
  },

  // ============================================================================
  // INTELLIGENCE LAYER - OFFICER ACCESS LOG
  // ============================================================================
  'intelligence.access.documentAccessLog': {
    en: 'Document Access Transparency',
    nl: 'Document Toegang Transparantie',
    zh: '文档访问透明度',
    ko: '문서 접근 투명성'
  },
  'intelligence.access.whoViewed': {
    en: 'Who viewed your documents',
    nl: 'Wie heeft uw documenten bekeken',
    zh: '谁查看了您的文档',
    ko: '누가 귀하의 문서를 확인했는지'
  },
  'intelligence.access.officer': {
    en: 'Officer',
    nl: 'Ambtenaar',
    zh: '官员',
    ko: '담당자'
  },
  'intelligence.access.document': {
    en: 'Document',
    nl: 'Document',
    zh: '文档',
    ko: '문서'
  },
  'intelligence.access.viewedAt': {
    en: 'Viewed At',
    nl: 'Bekeken Op',
    zh: '查看时间',
    ko: '확인 시간'
  },
  'intelligence.access.duration': {
    en: 'Duration',
    nl: 'Duur',
    zh: '持续时间',
    ko: '지속 시간'
  },
  'intelligence.access.seconds': {
    en: 'sec',
    nl: 'sec',
    zh: '秒',
    ko: '초'
  },

  // ============================================================================
  // INTELLIGENCE LAYER - COMPLIANCE & CALENDAR
  // ============================================================================
  'intelligence.compliance.calendar': {
    en: 'Compliance Calendar',
    nl: 'Compliance Kalender',
    zh: '合规日历',
    ko: '규정 준수 캘린더'
  },
  'intelligence.compliance.exportCalendar': {
    en: 'Export (.ics)',
    nl: 'Exporteer (.ics)',
    zh: '导出 (.ics)',
    ko: '내보내기 (.ics)'
  },
  'intelligence.compliance.upcomingDeadlines': {
    en: 'Upcoming Compliance Deadlines',
    nl: 'Aankomende Compliance Deadlines',
    zh: '即将到来的合规截止日期',
    ko: '다가오는 규정 준수 마감일'
  },
  'intelligence.compliance.dueSoon': {
    en: 'Due Soon',
    nl: 'Binnenkort Vervallend',
    zh: '即将到期',
    ko: '곧 만료'
  },
  'intelligence.compliance.completed': {
    en: 'Completed',
    nl: 'Voltooid',
    zh: '已完成',
    ko: '완료됨'
  },
  'intelligence.compliance.renewLicense': {
    en: 'Renew License',
    nl: 'Licentie Vernieuwen',
    zh: '更新许可证',
    ko: '라이센스 갱신'
  },
  'intelligence.compliance.oneClick': {
    en: 'One-Click Renew',
    nl: 'Eén-Klik Vernieuwen',
    zh: '一键更新',
    ko: '원클릭 갱신'
  },

  // Add more as needed...
};

// Helper function to get translation
export function getTranslation(key: string, lang: Language): string {
  const translation = completeTranslations[key];
  if (!translation) {
    console.warn(`Missing translation for key: ${key}`);
    return key;
  }
  return translation[lang] || translation.en;
}