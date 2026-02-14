// Comprehensive Translation System for BIDA OSS
// Languages: English (en), Chinese (zh), Korean (ko), Malay/English for Singapore (sg)

export type Language = 'en' | 'zh' | 'ko' | 'sg';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    zh: string;
    ko: string;
    sg: string;
  };
}

export const translations: TranslationDictionary = {
  // Common
  'common.welcome': {
    en: 'Welcome to BIDA OSS',
    zh: '欢迎来到孟加拉国投资发展局一站式服务平台',
    ko: 'BIDA OSS에 오신 것을 환영합니다',
    sg: 'Welcome to BIDA One-Stop Service',
  },
  'common.logout': {
    en: 'Logout',
    zh: '登出',
    ko: '로그아웃',
    sg: 'Logout',
  },
  'common.login': {
    en: 'Login',
    zh: '登录',
    ko: '로그인',
    sg: 'Login',
  },
  'common.submit': {
    en: 'Submit',
    zh: '提交',
    ko: '제출',
    sg: 'Submit',
  },
  'common.cancel': {
    en: 'Cancel',
    zh: '取消',
    ko: '취소',
    sg: 'Cancel',
  },
  'common.back': {
    en: 'Back',
    zh: '返回',
    ko: '뒤로',
    sg: 'Back',
  },
  'common.next': {
    en: 'Next',
    zh: '下一步',
    ko: '다음',
    sg: 'Next',
  },
  'common.save': {
    en: 'Save',
    zh: '保存',
    ko: '저장',
    sg: 'Save',
  },
  'common.download': {
    en: 'Download',
    zh: '下载',
    ko: '다운로드',
    sg: 'Download',
  },
  'common.upload': {
    en: 'Upload',
    zh: '上传',
    ko: '업로드',
    sg: 'Upload',
  },
  'common.search': {
    en: 'Search',
    zh: '搜索',
    ko: '검색',
    sg: 'Search',
  },
  'common.view': {
    en: 'View',
    zh: '查看',
    ko: '보기',
    sg: 'View',
  },
  'common.edit': {
    en: 'Edit',
    zh: '编辑',
    ko: '편집',
    sg: 'Edit',
  },
  'common.delete': {
    en: 'Delete',
    zh: '删除',
    ko: '삭제',
    sg: 'Delete',
  },

  // Dashboard
  'dashboard.title': {
    en: 'Dashboard',
    zh: '仪表板',
    ko: '대시보드',
    sg: 'Dashboard',
  },
  'dashboard.welcomeBack': {
    en: 'Welcome back',
    zh: '欢迎回来',
    ko: '환영합니다',
    sg: 'Welcome back',
  },
  'dashboard.overallProgress': {
    en: 'Overall Progress',
    zh: '整体进度',
    ko: '전체 진행률',
    sg: 'Overall Progress',
  },
  'dashboard.completedSteps': {
    en: 'Completed Steps',
    zh: '已完成步骤',
    ko: '완료된 단계',
    sg: 'Completed Steps',
  },
  'dashboard.pendingApprovals': {
    en: 'Pending Approvals',
    zh: '待审批',
    ko: '승인 대기 중',
    sg: 'Pending Approvals',
  },
  'dashboard.upcomingDeadlines': {
    en: 'Upcoming Deadlines',
    zh: '即将到期',
    ko: '다가오는 마감일',
    sg: 'Upcoming Deadlines',
  },
  'dashboard.projectJourney': {
    en: 'Project Journey',
    zh: '项目进程',
    ko: '프로젝트 진행',
    sg: 'Project Journey',
  },
  'dashboard.viewFullTimeline': {
    en: 'View Full Timeline',
    zh: '查看完整时间表',
    ko: '전체 타임라인 보기',
    sg: 'View Full Timeline',
  },
  'dashboard.suggestedServices': {
    en: 'Suggested Services',
    zh: '推荐服务',
    ko: '추천 서비스',
    sg: 'Suggested Services',
  },
  'dashboard.viewAllServices': {
    en: 'View All Services',
    zh: '查看所有服务',
    ko: '모든 서비스 보기',
    sg: 'View All Services',
  },
  'dashboard.nextSteps': {
    en: 'Next Steps',
    zh: '下一步',
    ko: '다음 단계',
    sg: 'Next Steps',
  },
  'dashboard.reminders': {
    en: 'Reminders',
    zh: '提醒',
    ko: '알림',
    sg: 'Reminders',
  },
  'dashboard.quickActions': {
    en: 'Quick Actions',
    zh: '快速操作',
    ko: '빠른 작업',
    sg: 'Quick Actions',
  },

  // Quick Actions
  'quickActions.viewDocuments': {
    en: 'View All Documents',
    zh: '查看所有文件',
    ko: '모든 문서 보기',
    sg: 'View All Documents',
  },
  'quickActions.makePayment': {
    en: 'Make Payment',
    zh: '付款',
    ko: '결제하기',
    sg: 'Make Payment',
  },
  'quickActions.bookAppointment': {
    en: 'Book Appointment',
    zh: '预约',
    ko: '예약하기',
    sg: 'Book Appointment',
  },
  'quickActions.contactOfficer': {
    en: 'Contact Officer',
    zh: '联系官员',
    ko: '담당자 연락',
    sg: 'Contact Officer',
  },
  'quickActions.downloadReport': {
    en: 'Download Report',
    zh: '下载报告',
    ko: '보고서 다운로드',
    sg: 'Download Report',
  },
  'quickActions.aiAssistant': {
    en: 'AI Assistant',
    zh: 'AI助手',
    ko: 'AI 어시스턴트',
    sg: 'AI Assistant',
  },
  'quickActions.fdiEducation': {
    en: 'Learn About FDI',
    zh: '了解外国直接投资',
    ko: 'FDI 배우기',
    sg: 'Learn About FDI',
  },
  'quickActions.findPartners': {
    en: 'Find Business Partners',
    zh: '寻找商业伙伴',
    ko: '비즈니스 파트너 찾기',
    sg: 'Find Business Partners',
  },
  'quickActions.aiAdvisor': {
    en: 'AI Business Advisor',
    zh: 'AI商业顾问',
    ko: 'AI 비즈니스 어드바이저',
    sg: 'AI Business Advisor',
  },
  'quickActions.aftercare': {
    en: 'Aftercare & Renewals',
    zh: '售后服务与续签',
    ko: '사후관리 및 갱신',
    sg: 'Aftercare & Renewals',
  },

  // Tabs
  'tabs.dashboard': {
    en: 'Dashboard',
    zh: '仪表板',
    ko: '대시보드',
    sg: 'Dashboard',
  },
  'tabs.journeyTracker': {
    en: 'Journey Tracker',
    zh: '进程跟踪',
    ko: '진행 추적',
    sg: 'Journey Tracker',
  },
  'tabs.investmentZones': {
    en: 'Investment Zones',
    zh: '投资区域',
    ko: '투자 지역',
    sg: 'Investment Zones',
  },
  'tabs.documents': {
    en: 'Documents',
    zh: '文件',
    ko: '문서',
    sg: 'Documents',
  },
  'tabs.services': {
    en: 'Services',
    zh: '服务',
    ko: '서비스',
    sg: 'Services',
  },
  'tabs.payments': {
    en: 'Payments',
    zh: '支付',
    ko: '결제',
    sg: 'Payments',
  },
  'tabs.appointments': {
    en: 'Appointments',
    zh: '预约',
    ko: '예약',
    sg: 'Appointments',
  },
  'tabs.rjsc': {
    en: 'RJSC Verification',
    zh: 'RJSC验证',
    ko: 'RJSC 인증',
    sg: 'RJSC Verification',
  },
  'tabs.advisor': {
    en: 'AI Advisor',
    zh: 'AI顾问',
    ko: 'AI 어드바이저',
    sg: 'AI Advisor',
  },
  'tabs.matchmaking': {
    en: 'Matchmaking',
    zh: '配对服务',
    ko: '매칭 서비스',
    sg: 'Matchmaking',
  },
  'tabs.reports': {
    en: 'Reports & PDF',
    zh: '报告和PDF',
    ko: '보고서 및 PDF',
    sg: 'Reports & PDF',
  },
  'tabs.audit': {
    en: 'Audit Trail',
    zh: '审计记录',
    ko: '감사 기록',
    sg: 'Audit Trail',
  },
  'tabs.aftercare': {
    en: 'Aftercare',
    zh: '售后服务',
    ko: '사후관리',
    sg: 'Aftercare',
  },

  // FDI Information
  'fdi.whatIsFDI': {
    en: 'What is Foreign Direct Investment (FDI)?',
    zh: '什么是外国直接投资(FDI)?',
    ko: '외국인 직접투자(FDI)란 무엇인가요?',
    sg: 'What is Foreign Direct Investment (FDI)?',
  },
  'fdi.definition': {
    en: 'FDI is control, presence, and long-term operation inside a country. An overseas investor brings capital + technology + management + risk and becomes part of the real economy of the host country.',
    zh: 'FDI是在一国内部的控制、存在和长期运营。海外投资者带来资本+技术+管理+风险,成为东道国实体经济的一部分。',
    ko: 'FDI는 한 국가 내에서의 통제, 존재 및 장기 운영입니다. 해외 투자자는 자본 + 기술 + 경영 + 위험을 가져와 현지 국가의 실물 경제의 일부가 됩니다.',
    sg: 'FDI is control, presence, and long-term operation within a country. Overseas investors bring capital + technology + management + risk and become part of the host country\'s real economy.',
  },
  'fdi.greenfield': {
    en: 'Greenfield FDI - New Company',
    zh: '绿地投资 - 新公司',
    ko: '그린필드 FDI - 신규 회사',
    sg: 'Greenfield FDI - New Company',
  },
  'fdi.greenfieldDesc': {
    en: 'Creating a brand-new company in Bangladesh: Register new entity, bring foreign equity, build factory/office, hire workers, start operations. This creates new capacity, jobs, and exports.',
    zh: '在孟加拉国创建全新公司:注册新实体,引入外资,建设工厂/办公室,雇用工人,开始运营。这创造了新的产能、就业和出口。',
    ko: '방글라데시에서 완전히 새로운 회사 설립: 신규 법인 등록, 외국 자본 유치, 공장/사무실 건설, 근로자 고용, 운영 시작. 새로운 생산능력, 일자리, 수출을 창출합니다.',
    sg: 'Creating a brand-new company in Bangladesh: Register new entity, bring foreign equity, build factory/office, hire workers, start operations. Creates new capacity, jobs, and exports.',
  },
  'fdi.brownfield': {
    en: 'Brownfield FDI - Invest in Existing Company',
    zh: '棕地投资 - 投资现有公司',
    ko: '브라운필드 FDI - 기존 회사 투자',
    sg: 'Brownfield FDI - Invest in Existing Company',
  },
  'fdi.brownfieldDesc': {
    en: 'Buying shares of a local company and becoming an owner: Purchase equity, take board seats, gain management influence, expand and modernize the business. Makes existing capacity stronger and more efficient.',
    zh: '购买本地公司股份成为所有者:购买股权,获得董事会席位,获得管理影响力,扩大和现代化业务。使现有产能更强大、更高效。',
    ko: '현지 회사의 주식을 구매하여 소유자가 되기: 지분 구매, 이사회 참여, 경영 영향력 확보, 사업 확장 및 현대화. 기존 생산능력을 더 강하고 효율적으로 만듭니다.',
    sg: 'Buying shares of a local company: Purchase equity, take board seats, gain management influence, expand and modernize. Makes existing capacity stronger and more efficient.',
  },
  'fdi.jointVenture': {
    en: 'Joint Venture - Partnership',
    zh: '合资企业 - 合作伙伴关系',
    ko: '합작 투자 - 파트너십',
    sg: 'Joint Venture - Partnership',
  },
  'fdi.jointVentureDesc': {
    en: 'Foreign and Bangladeshi companies form a new company together. Combines local knowledge with foreign capital and technology.',
    zh: '外国公司和孟加拉国公司共同组建新公司。结合本地知识与外国资本和技术。',
    ko: '외국 기업과 방글라데시 기업이 함께 새로운 회사를 설립. 현지 지식과 외국 자본 및 기술을 결합합니다.',
    sg: 'Foreign and Bangladeshi companies form a new company together. Combines local knowledge with foreign capital and technology.',
  },
  'fdi.legalRequirement': {
    en: 'Legal FDI Requirements',
    zh: '合法FDI要求',
    ko: '법적 FDI 요구사항',
    sg: 'Legal FDI Requirements',
  },
  'fdi.legalRequirementDesc': {
    en: 'Money comes from abroad as equity capital, investor owns 10%+ with control/voice, registered with BIDA and reported to Bangladesh Bank.',
    zh: '资金作为股本从国外进入,投资者拥有10%以上股份并具有控制权/发言权,在BIDA注册并向孟加拉国银行报告。',
    ko: '자본금이 해외에서 유입, 투자자가 10% 이상 소유하며 통제권/발언권 보유, BIDA에 등록하고 방글라데시 은행에 보고.',
    sg: 'Money comes from abroad as equity capital, investor owns 10%+ with control/voice, registered with BIDA and reported to Bangladesh Bank.',
  },

  // Status
  'status.completed': {
    en: 'Completed',
    zh: '已完成',
    ko: '완료',
    sg: 'Completed',
  },
  'status.inProgress': {
    en: 'In Progress',
    zh: '进行中',
    ko: '진행 중',
    sg: 'In Progress',
  },
  'status.pending': {
    en: 'Pending',
    zh: '待处理',
    ko: '대기 중',
    sg: 'Pending',
  },
  'status.delayed': {
    en: 'Delayed',
    zh: '延迟',
    ko: '지연됨',
    sg: 'Delayed',
  },
  'status.onTrack': {
    en: 'On track',
    zh: '按计划进行',
    ko: '정상 진행',
    sg: 'On track',
  },
  'status.requiresAttention': {
    en: 'Requires attention',
    zh: '需要关注',
    ko: '주의 필요',
    sg: 'Requires attention',
  },
  'status.thisWeek': {
    en: 'This week',
    zh: '本周',
    ko: '이번 주',
    sg: 'This week',
  },
  
  // Dashboard Subtitle
  'dashboard.trackYourJourney': {
    en: 'Track your investment journey in real-time',
    zh: '实时跟踪您的投资进程',
    ko: '실시간으로 투자 과정 추적',
    sg: 'Track your investment journey in real-time',
  },
  
  // Journey Steps
  'journey.companyRegistration': {
    en: 'Company Registration',
    zh: '公司注册',
    ko: '회사 등록',
    sg: 'Company Registration',
  },
  'journey.tradeLicense': {
    en: 'Trade License',
    zh: '贸易许可证',
    ko: '무역 라이센스',
    sg: 'Trade License',
  },
  'journey.bankAccountSetup': {
    en: 'Bank Account Setup',
    zh: '银行账户设置',
    ko: '은행 계좌 개설',
    sg: 'Bank Account Setup',
  },
  'journey.environmentalClearance': {
    en: 'Environmental Clearance',
    zh: '环境许可',
    ko: '환경 허가',
    sg: 'Environmental Clearance',
  },
  'journey.fireSafetyCertificate': {
    en: 'Fire Safety Certificate',
    zh: '消防安全证书',
    ko: '소방 안전 증명서',
    sg: 'Fire Safety Certificate',
  },
  'journey.factoryLicense': {
    en: 'Factory License',
    zh: '工厂许可证',
    ko: '공장 라이센스',
    sg: 'Factory License',
  },
  
  // Government Agencies
  'agency.rjsc': {
    en: 'RJSC',
    zh: 'RJSC',
    ko: 'RJSC',
    sg: 'RJSC',
  },
  'agency.cityCorporation': {
    en: 'City Corporation',
    zh: '市政府',
    ko: '시 공사',
    sg: 'City Corporation',
  },
  'agency.rupaliBank': {
    en: 'Rupali Bank',
    zh: '鲁帕利银行',
    ko: '루팔리 은행',
    sg: 'Rupali Bank',
  },
  'agency.doe': {
    en: 'DOE',
    zh: '环境部',
    ko: '환경부',
    sg: 'DOE',
  },
  'agency.fireService': {
    en: 'Fire Service',
    zh: '消防局',
    ko: '소방서',
    sg: 'Fire Service',
  },
  'agency.dife': {
    en: 'DIFE',
    zh: '工厂检查局',
    ko: '공장 검사국',
    sg: 'DIFE',
  },
  
  // Time
  'time.daysRemaining': {
    en: 'days remaining',
    zh: '天剩余',
    ko: '일 남음',
    sg: 'days remaining',
  },
  'time.submitted': {
    en: 'Submitted',
    zh: '已提交',
    ko: '제출됨',
    sg: 'Submitted',
  },
  'time.due': {
    en: 'Due',
    zh: '截止',
    ko: '마감',
    sg: 'Due',
  },
  
  // Services
  'service.startupLoanPackage': {
    en: 'Startup Loan Package',
    zh: '创业贷款套餐',
    ko: '스타트업 대출 패키지',
    sg: 'Startup Loan Package',
  },
  'service.startupLoanDesc': {
    en: 'Pre-approved financing up to $500K',
    zh: '预批融资最高50万美元',
    ko: '최대 $500K 사전 승인 자금',
    sg: 'Pre-approved financing up to $500K',
  },
  'service.partnerBank': {
    en: 'Partner Bank',
    zh: '合作银行',
    ko: '파트너 은행',
    sg: 'Partner Bank',
  },
  'service.findLocalSuppliers': {
    en: 'Find Local Suppliers',
    zh: '寻找本地供应商',
    ko: '현지 공급업체 찾기',
    sg: 'Find Local Suppliers',
  },
  'service.findSuppliersDesc': {
    en: 'Connect with textile suppliers',
    zh: '与纺织品供应商联系',
    ko: '섬유 공급업체와 연결',
    sg: 'Connect with textile suppliers',
  },
  'service.bidaMatchmaking': {
    en: 'BIDA Matchmaking',
    zh: 'BIDA配对服务',
    ko: 'BIDA 매칭 서비스',
    sg: 'BIDA Matchmaking',
  },
  'service.sezLandAllocation': {
    en: 'SEZ Land Allocation',
    zh: '经济特区土地分配',
    ko: 'SEZ 토지 할당',
    sg: 'SEZ Land Allocation',
  },
  'service.sezLandDesc': {
    en: 'Available plots in industrial zones',
    zh: '工业区可用地块',
    ko: '산업 지역 내 사용 가능 부지',
    sg: 'Available plots in industrial zones',
  },
  'service.bepza': {
    en: 'BEPZA',
    zh: '经济特区管理局',
    ko: '수출가공구역청',
    sg: 'BEPZA',
  },
  
  // Next Steps Items
  'nextSteps.reviewEnvironmental': {
    en: 'Review Environmental Clearance status',
    zh: '查看环境许可状态',
    ko: '환경 허가 상태 확인',
    sg: 'Review Environmental Clearance status',
  },
  'nextSteps.scheduleFire': {
    en: 'Schedule Fire Safety inspection',
    zh: '安排消防安全检查',
    ko: '소방 안전 점검 일정 예약',
    sg: 'Schedule Fire Safety inspection',
  },
  'nextSteps.submitDocuments': {
    en: 'Submit additional documents for Factory License',
    zh: '提交工厂许可证所需的额外文件',
    ko: '공장 라이센스를 위한 추가 서류 제출',
    sg: 'Submit additional documents for Factory License',
  },
  'nextSteps.viewDetails': {
    en: 'View Details',
    zh: '查看详情',
    ko: '세부정보 보기',
    sg: 'View Details',
  },
  'nextSteps.scheduleNow': {
    en: 'Schedule Now',
    zh: '立即安排',
    ko: '지금 예약',
    sg: 'Schedule Now',
  },
  
  // Reminders
  'reminder.tinRegistration': {
    en: 'TIN Registration Deadline',
    zh: '税号注册截止日期',
    ko: 'TIN 등록 마감일',
    sg: 'TIN Registration Deadline',
  },
  'reminder.utilityConnection': {
    en: 'Utility Connection Follow-up',
    zh: '公用事业连接跟进',
    ko: '유틸리티 연결 후속 조치',
    sg: 'Utility Connection Follow-up',
  },
  
  // Investment Zones
  'zones.title': {
    en: 'Investment Zone Explorer',
    zh: '投资区域浏览器',
    ko: '투자 지역 탐색기',
    sg: 'Investment Zone Explorer',
  },
  'zones.backToDashboard': {
    en: '← Back to Dashboard',
    zh: '← 返回仪表板',
    ko: '← 대시보드로 돌아가기',
    sg: '← Back to Dashboard',
  },
  'zones.filterByIPA': {
    en: 'Filter by Investment Promotion Agency',
    zh: '按投资促进机构筛选',
    ko: '투자 촉진 기관별 필터',
    sg: 'Filter by Investment Promotion Agency',
  },
  'zones.allZones': {
    en: 'All Zones',
    zh: '所有区域',
    ko: '모든 지역',
    sg: 'All Zones',
  },
  'zones.beza': {
    en: 'BEZA',
    zh: 'BEZA',
    ko: 'BEZA',
    sg: 'BEZA',
  },
  'zones.bezaFull': {
    en: 'Bangladesh Economic Zones Authority',
    zh: '孟加拉国经济区管理局',
    ko: '방글라데시 경제 지역 관리청',
    sg: 'Bangladesh Economic Zones Authority',
  },
  'zones.bepza': {
    en: 'BEPZA',
    zh: 'BEPZA',
    ko: 'BEPZA',
    sg: 'BEPZA',
  },
  'zones.bepzaFull': {
    en: 'Bangladesh Export Processing Zones Authority',
    zh: '孟加拉国出口加工区管理局',
    ko: '방글라데시 수출가공구역청',
    sg: 'Bangladesh Export Processing Zones Authority',
  },
  'zones.bhtpa': {
    en: 'BHTPA',
    zh: 'BHTPA',
    ko: 'BHTPA',
    sg: 'BHTPA',
  },
  'zones.bhtpaFull': {
    en: 'Bangladesh Hi-Tech Park Authority',
    zh: '孟加拉国高科技园区管理局',
    ko: '방글라데시 하이테크 파크 관리청',
    sg: 'Bangladesh Hi-Tech Park Authority',
  },
  'zones.recommendedForYou': {
    en: 'Recommended For You',
    zh: '为您推荐',
    ko: '추천 지역',
    sg: 'Recommended For You',
  },
  'zones.basedOnSector': {
    en: 'Based on your sector',
    zh: '基于您的行业',
    ko: '귀하의 부문 기준',
    sg: 'Based on your sector',
  },
  'zones.viewDetails': {
    en: 'View Details',
    zh: '查看详情',
    ko: '세부정보 보기',
    sg: 'View Details',
  },
  'zones.reserveNow': {
    en: 'Reserve Now',
    zh: '立即预订',
    ko: '지금 예약',
    sg: 'Reserve Now',
  },
  'zones.applyForPlot': {
    en: 'Apply for Plot',
    zh: '申请地块',
    ko: '부지 신청',
    sg: 'Apply for Plot',
  },
  'zones.getDirections': {
    en: 'Get Directions',
    zh: '获取路线',
    ko: '길찾기',
    sg: 'Get Directions',
  },
  'zones.zoneInformation': {
    en: 'Zone Information',
    zh: '区域信息',
    ko: '지역 정보',
    sg: 'Zone Information',
  },
  'zones.totalArea': {
    en: 'Total Area',
    zh: '总面积',
    ko: '총 면적',
    sg: 'Total Area',
  },
  'zones.availablePlots': {
    en: 'Available Plots',
    zh: '可用地块',
    ko: '사용 가능 부지',
    sg: 'Available Plots',
  },
  'zones.suitableSectors': {
    en: 'Suitable Sectors',
    zh: '适合行业',
    ko: '적합 부문',
    sg: 'Suitable Sectors',
  },
  'zones.incentives': {
    en: 'Incentives',
    zh: '优惠政策',
    ko: '인센티브',
    sg: 'Incentives',
  },
  'zones.utilitiesAvailable': {
    en: 'Utilities Available',
    zh: '可用设施',
    ko: '사용 가능 시설',
    sg: 'Utilities Available',
  },
  'zones.clickZoneForDetails': {
    en: 'Click on any zone to view details',
    zh: '点击任何区域查看详情',
    ko: '세부정보를 보려면 지역을 클릭하세요',
    sg: 'Click on any zone to view details',
  },
  'zones.selectZoneFromMap': {
    en: 'Select a zone from the map to view details',
    zh: '从地图中选择一个区域以查看详情',
    ko: '지도에서 지역을 선택하여 세부정보 보기',
    sg: 'Select a zone from the map to view details',
  },
  'zones.zoneTypes': {
    en: 'Zone Types',
    zh: '区域类型',
    ko: '지역 유형',
    sg: 'Zone Types',
  },
  'zones.sez': {
    en: 'SEZ - Special Economic Zone',
    zh: 'SEZ - 经济特区',
    ko: 'SEZ - 경제특별구역',
    sg: 'SEZ - Special Economic Zone',
  },
  'zones.epz': {
    en: 'EPZ - Export Processing Zone',
    zh: 'EPZ - 出口加工区',
    ko: 'EPZ - 수출가공구역',
    sg: 'EPZ - Export Processing Zone',
  },
  'zones.hiTechPark': {
    en: 'Hi-Tech Park',
    zh: '高科技园区',
    ko: '하이테크 파크',
    sg: 'Hi-Tech Park',
  },
  'zones.sezZones': {
    en: 'SEZ Zones',
    zh: 'SEZ区域',
    ko: 'SEZ 지역',
    sg: 'SEZ Zones',
  },
  'zones.epzZones': {
    en: 'EPZ Zones',
    zh: 'EPZ区域',
    ko: 'EPZ 지역',
    sg: 'EPZ Zones',
  },
  'zones.hiTechParks': {
    en: 'Hi-Tech Parks',
    zh: '高科技园区',
    ko: '하이테크 파크',
    sg: 'Hi-Tech Parks',
  },
  'zones.availablePlotsCount': {
    en: 'Available Plots',
    zh: '可用地块',
    ko: '사용 가능 부지',
    sg: 'Available Plots',
  },
  'zones.distanceFromPort': {
    en: 'Distance from Port',
    zh: '距港口距离',
    ko: '항구로부터의 거리',
    sg: 'Distance from Port',
  },
  'zones.keyFacilities': {
    en: 'Key Facilities',
    zh: '主要设施',
    ko: '주요 시설',
    sg: 'Key Facilities',
  },
  'zones.contactInfo': {
    en: 'Contact Information',
    zh: '联系信息',
    ko: '연락처 정보',
    sg: 'Contact Information',
  },
  'zones.plotSize': {
    en: 'Plot Size',
    zh: '地块大小',
    ko: '부지 크기',
    sg: 'Plot Size',
  },
  'zones.pricePerSqFt': {
    en: 'Price per sq ft',
    zh: '每平方英尺价格',
    ko: '평방피트당 가격',
    sg: 'Price per sq ft',
  },
  'zones.status': {
    en: 'Status',
    zh: '状态',
    ko: '상태',
    sg: 'Status',
  },
  'zones.available': {
    en: 'Available',
    zh: '可用',
    ko: '사용 가능',
    sg: 'Available',
  },
  'zones.reserved': {
    en: 'Reserved',
    zh: '已预订',
    ko: '예약됨',
    sg: 'Reserved',
  },
  'zones.sold': {
    en: 'Sold',
    zh: '已售',
    ko: '판매됨',
    sg: 'Sold',
  },
  'zones.plot': {
    en: 'Plot',
    zh: '地块',
    ko: '부지',
    sg: 'Plot',
  },
};

export function translate(key: string, lang: Language): string {
  return translations[key]?.[lang] || key;
}