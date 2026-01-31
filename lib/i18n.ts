export const SUPPORTED_LOCALES = ['en', 'zh', 'ja', 'ko'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';
export const ROUTED_LOCALES: Locale[] = SUPPORTED_LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE
);

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어'
};

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-Hans',
  ja: 'ja',
  ko: 'ko'
};

export const LOCALE_OG: Record<Locale, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR'
};

export function isLocale(value?: string): value is Locale {
  if (!value) return false;
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function normalizeLocale(value?: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function withLocale(locale: Locale, path: string): string {
  const safePath = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return safePath;
  return safePath === '/' ? `/${locale}` : `/${locale}${safePath}`;
}

export const UI_STRINGS: Record<Locale, {
  siteTitle: string;
  siteDescription: string;
  nav: {
    home: string;
  };
  hero: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  features: {
    title: string;
    description: string;
  }[];
  brand: {
    label: string;
    title: string;
    description: string;
  };
  navCards: {
    install: { title: string; description: string };
    skills: { title: string; description: string };
    pitfalls: { title: string; description: string };
    cta: string;
  };
  ecosystem: {
    methodLabel: string;
    methodTitle: string;
    methodDescription: string;
    collaborationLabel: string;
    collaborationTitle: string;
    collaborationDescription: string;
    growthLabel: string;
    growthTitle: string;
    growthDescription: string;
  };
  latest: {
    title: string;
    subtitle: string;
  };
  join: {
    title: string;
    description: string;
    cta: string;
  };
  hub: {
    heroLabel: string;
    relatedTitle: string;
    relatedEmpty: string;
  };
  notFound: {
    title: string;
    description: string;
    cta: string;
  };
  hubs: {
    install: string;
    skills: string;
    pitfalls: string;
  };
  links: {
    hubHome: string;
    windowsInstall: string;
    macosInstall: string;
    linuxInstall: string;
    pitfallVersion: string;
    pitfallPermissions: string;
    skillsQuickstart: string;
    skillsBestPractices: string;
    apiKeySafety: string;
    performancePitfalls: string;
  };
}> = {
  en: {
    siteTitle: 'Openclaw / Moltbot / Clawdbot - Personal AI Assistant Ecosystem',
    siteDescription:
      'Openclaw (Moltbot / Clawdbot) personal AI assistant ecosystem: unified access, Skills ecosystem, automation, and security best practices.',
    nav: {
      home: 'Home'
    },
    hero: {
      title: 'Openclaw Personal AI Assistant Ecosystem',
      description:
        'Openclaw (also known as Moltbot / Clawdbot) provides unified install access, Skills capabilities, automation workflows, and security governance. Give every assistant clear boundaries and continuous evolution in real-world scenarios.',
      primaryCta: 'Get started',
      secondaryCta: 'Browse Skills'
    },
    features: [
      {
        title: 'Multi-platform access',
        description:
          'Unified access and management across desktop, mobile, and container environments.'
      },
      {
        title: 'Modular capabilities',
        description:
          'Composable Skills with traceable, replaceable capabilities.'
      },
      {
        title: 'Security & observability',
        description:
          'Built-in permissions, logging, rollbacks, and compliance policies.'
      }
    ],
    brand: {
      label: 'Brand overview',
      title: 'Openclaw (Moltbot / Clawdbot)',
      description:
        'Openclaw, Moltbot, and Clawdbot are different names for the same personal AI assistant ecosystem. We provide unified access, Skills capabilities, automation, and security governance so assistants stay extensible and controlled.'
    },
    navCards: {
      install: {
        title: 'Install & access',
        description: 'Covers Windows, macOS, Linux, Docker, and WSL.'
      },
      skills: {
        title: 'Skills ecosystem',
        description: 'From templates to real-world use cases, reuse fast.'
      },
      pitfalls: {
        title: 'Security & governance',
        description: 'Checklists for permissions, versions, performance, and safety.'
      },
      cta: 'Explore'
    },
    ecosystem: {
      methodLabel: 'Ecosystem method',
      methodTitle: 'From access to evolution',
      methodDescription:
        'After unified access, build capability chains with configurable Skills, then close the loop with observability.',
      collaborationLabel: 'Collaboration model',
      collaborationTitle: 'Clear boundaries',
      collaborationDescription:
        'Use permission scopes, logs, and version control to keep assistants operating within safe boundaries.',
      growthLabel: 'Growth path',
      growthTitle: 'Continuous evolution',
      growthDescription:
        'Move from basic installs to advanced automation, unlocking higher-order ecosystem capabilities.'
    },
    latest: {
      title: 'Latest content',
      subtitle: 'Last 5 posts'
    },
    join: {
      title: 'Join the Clawbot ecosystem',
      description:
        'From access to capabilities to governance and best practices, quickly launch your personal AI assistant.',
      cta: 'Start now'
    },
    hub: {
      heroLabel: 'Clawbot / Hub',
      relatedTitle: 'Related links',
      relatedEmpty: 'No related content yet.'
    },
    notFound: {
      title: 'Page not found',
      description: "The page you requested doesn't exist. Head back to the homepage.",
      cta: 'Back home'
    },
    hubs: {
      install: 'Install',
      skills: 'Skills',
      pitfalls: 'Pitfalls'
    },
    links: {
      hubHome: '{hub} hub home',
      windowsInstall: 'Windows install guide',
      macosInstall: 'macOS install guide',
      linuxInstall: 'Linux install guide',
      pitfallVersion: 'Pitfall: version mismatch',
      pitfallPermissions: 'Pitfall: over-permissions',
      skillsQuickstart: 'Skills quickstart',
      skillsBestPractices: 'Skills best practices',
      apiKeySafety: 'API key safety',
      performancePitfalls: 'Performance pitfalls'
    }
  },
  zh: {
    siteTitle: 'Openclaw / Moltbot / Clawdbot - 个人 AI 助手生态',
    siteDescription:
      'Openclaw（Moltbot / Clawdbot）个人 AI 助手生态：统一接入、Skills 生态、自动化与安全最佳实践。',
    nav: {
      home: '首页'
    },
    hero: {
      title: 'Openclaw 个人 AI 助手生态',
      description:
        'Openclaw（又称 Moltbot / Clawdbot）提供统一安装接入、Skills 能力、自动化流程与安全治理。让每个助手拥有可控边界，在真实场景中持续进化。',
      primaryCta: '快速接入',
      secondaryCta: '浏览 Skills'
    },
    features: [
      {
        title: '多端接入',
        description: '桌面、移动与容器环境统一接入与管理。'
      },
      {
        title: '模块化能力',
        description: 'Skills 组合式扩展，能力可追踪、可替换。'
      },
      {
        title: '安全与可观测',
        description: '权限、日志、版本回滚与合规策略内置。'
      }
    ],
    brand: {
      label: '品牌说明',
      title: 'Openclaw（Moltbot / Clawdbot）',
      description:
        'Openclaw、Moltbot、Clawdbot 是同一套个人 AI 助手生态的不同称呼。我们统一提供安装接入、Skills 能力、自动化与安全治理，使个人助手具备可扩展与可控的边界。'
    },
    navCards: {
      install: {
        title: '安装接入',
        description: '覆盖 Windows、macOS、Linux、Docker、WSL。'
      },
      skills: {
        title: 'Skills 生态',
        description: '从能力模板到应用场景，快速复用。'
      },
      pitfalls: {
        title: '安全与治理',
        description: '权限、版本、性能与安全策略清单。'
      },
      cta: '进入'
    },
    ecosystem: {
      methodLabel: '生态方法',
      methodTitle: '从接入到演进',
      methodDescription:
        '统一接入后，以可配置 Skills 构建能力链路，再用可观测体系闭环优化。',
      collaborationLabel: '协作方式',
      collaborationTitle: '清晰边界',
      collaborationDescription: '通过权限域、日志与版本控制保证个人助手在安全边界内执行。',
      growthLabel: '成长路线',
      growthTitle: '持续进化',
      growthDescription: '从基础安装到复杂自动化，逐步解锁更高阶的生态能力。'
    },
    latest: {
      title: '最新内容',
      subtitle: '最近 5 篇'
    },
    join: {
      title: '加入 Clawbot 生态',
      description: '从接入、能力、治理到最佳实践，快速完成你的个人 AI 助手搭建。',
      cta: '开始接入'
    },
    hub: {
      heroLabel: 'Clawbot / 栏目',
      relatedTitle: '相关链接',
      relatedEmpty: '暂无相关内容。'
    },
    notFound: {
      title: '页面不存在',
      description: '你访问的地址不存在，返回首页继续浏览。',
      cta: '返回首页'
    },
    hubs: {
      install: '安装',
      skills: 'Skills',
      pitfalls: '避坑'
    },
    links: {
      hubHome: '{hub} 栏目首页',
      windowsInstall: 'Windows 安装指南',
      macosInstall: 'macOS 安装指南',
      linuxInstall: 'Linux 安装指南',
      pitfallVersion: '避坑：版本不匹配',
      pitfallPermissions: '避坑：权限过大',
      skillsQuickstart: 'Skills 快速上手',
      skillsBestPractices: 'Skills 最佳实践',
      apiKeySafety: 'API Key 安全',
      performancePitfalls: '性能避坑'
    }
  },
  ja: {
    siteTitle: 'Openclaw / Moltbot / Clawdbot - 個人向けAIアシスタント・エコシステム',
    siteDescription:
      'Openclaw（Moltbot / Clawdbot）個人向けAIアシスタント・エコシステム：統合アクセス、Skills エコシステム、自動化とセキュリティのベストプラクティス。',
    nav: {
      home: 'ホーム'
    },
    hero: {
      title: 'Openclaw 個人向けAIアシスタント・エコシステム',
      description:
        'Openclaw（Moltbot / Clawdbot）は、統合インストールアクセス、Skills 機能、自動化ワークフロー、セキュリティガバナンスを提供します。実運用で安全に進化できる境界を用意します。',
      primaryCta: '始める',
      secondaryCta: 'Skills を見る'
    },
    features: [
      {
        title: 'マルチプラットフォーム',
        description: 'デスクトップ、モバイル、コンテナ環境を統合管理。'
      },
      {
        title: 'モジュール化機能',
        description: 'Skills を組み合わせて拡張し、追跡・差し替え可能。'
      },
      {
        title: 'セキュリティと可観測性',
        description: '権限、ログ、ロールバック、コンプライアンスを内蔵。'
      }
    ],
    brand: {
      label: 'ブランド概要',
      title: 'Openclaw（Moltbot / Clawdbot）',
      description:
        'Openclaw、Moltbot、Clawdbot は同じ個人向けAIアシスタント・エコシステムの別名です。統合アクセス、Skills 機能、自動化、セキュリティガバナンスで拡張性と制御性を両立します。'
    },
    navCards: {
      install: {
        title: 'インストールとアクセス',
        description: 'Windows、macOS、Linux、Docker、WSL をカバー。'
      },
      skills: {
        title: 'Skills エコシステム',
        description: 'テンプレートからユースケースまで高速に再利用。'
      },
      pitfalls: {
        title: 'セキュリティとガバナンス',
        description: '権限、バージョン、性能、安全性のチェックリスト。'
      },
      cta: '進む'
    },
    ecosystem: {
      methodLabel: 'エコシステム手法',
      methodTitle: 'アクセスから進化へ',
      methodDescription:
        '統合アクセス後、設定可能な Skills で能力チェーンを構築し、可観測性で改善を閉じます。',
      collaborationLabel: '協業モデル',
      collaborationTitle: '明確な境界',
      collaborationDescription: '権限範囲、ログ、バージョン管理で安全な境界を維持します。',
      growthLabel: '成長ロードマップ',
      growthTitle: '継続的な進化',
      growthDescription:
        '基本インストールから高度な自動化へ、エコシステム能力を段階的に解放します。'
    },
    latest: {
      title: '最新コンテンツ',
      subtitle: '最新 5 件'
    },
    join: {
      title: 'Clawbot エコシステムに参加',
      description:
        'アクセス、機能、ガバナンス、ベストプラクティスまで、個人向けAIアシスタントを素早く構築。',
      cta: '今すぐ開始'
    },
    hub: {
      heroLabel: 'Clawbot / ハブ',
      relatedTitle: '関連リンク',
      relatedEmpty: '関連コンテンツはまだありません。'
    },
    notFound: {
      title: 'ページが見つかりません',
      description: '指定されたページは存在しません。ホームに戻ってください。',
      cta: 'ホームへ戻る'
    },
    hubs: {
      install: 'インストール',
      skills: 'Skills',
      pitfalls: '注意点'
    },
    links: {
      hubHome: '{hub} ハブのホーム',
      windowsInstall: 'Windows インストールガイド',
      macosInstall: 'macOS インストールガイド',
      linuxInstall: 'Linux インストールガイド',
      pitfallVersion: '注意点：バージョン不一致',
      pitfallPermissions: '注意点：過剰権限',
      skillsQuickstart: 'Skills クイックスタート',
      skillsBestPractices: 'Skills ベストプラクティス',
      apiKeySafety: 'API キーの安全性',
      performancePitfalls: '性能の落とし穴'
    }
  },
  ko: {
    siteTitle: 'Openclaw / Moltbot / Clawdbot - 개인 AI 어시스턴트 에코시스템',
    siteDescription:
      'Openclaw (Moltbot / Clawdbot) 개인 AI 어시스턴트 에코시스템: 통합 접근, Skills 에코시스템, 자동화 및 보안 베스트 프랙티스.',
    nav: {
      home: '홈'
    },
    hero: {
      title: 'Openclaw 개인 AI 어시스턴트 에코시스템',
      description:
        'Openclaw (Moltbot / Clawdbot)은 통합 설치 접근, Skills 기능, 자동화 워크플로, 보안 거버넌스를 제공합니다. 현실적인 경계 안에서 지속적으로 진화할 수 있습니다.',
      primaryCta: '시작하기',
      secondaryCta: 'Skills 둘러보기'
    },
    features: [
      {
        title: '멀티 플랫폼 접근',
        description: '데스크톱, 모바일, 컨테이너 환경을 통합 관리합니다.'
      },
      {
        title: '모듈형 기능',
        description: 'Skills를 조합해 확장하고 추적 및 교체가 가능합니다.'
      },
      {
        title: '보안 및 관측성',
        description: '권한, 로그, 롤백, 컴플라이언스를 기본으로 제공합니다.'
      }
    ],
    brand: {
      label: '브랜드 소개',
      title: 'Openclaw (Moltbot / Clawdbot)',
      description:
        'Openclaw, Moltbot, Clawdbot은 동일한 개인 AI 어시스턴트 에코시스템의 다른 이름입니다. 통합 접근, Skills 기능, 자동화, 보안 거버넌스를 제공합니다.'
    },
    navCards: {
      install: {
        title: '설치 및 접근',
        description: 'Windows, macOS, Linux, Docker, WSL을 지원합니다.'
      },
      skills: {
        title: 'Skills 에코시스템',
        description: '템플릿부터 유즈케이스까지 빠르게 재사용합니다.'
      },
      pitfalls: {
        title: '보안 및 거버넌스',
        description: '권한, 버전, 성능, 안전 체크리스트를 제공합니다.'
      },
      cta: '보기'
    },
    ecosystem: {
      methodLabel: '에코시스템 방법',
      methodTitle: '접근에서 진화까지',
      methodDescription:
        '통합 접근 후, 설정 가능한 Skills로 능력 체인을 구성하고 관측성으로 개선합니다.',
      collaborationLabel: '협업 방식',
      collaborationTitle: '명확한 경계',
      collaborationDescription:
        '권한 범위, 로그, 버전 관리를 통해 안전한 경계를 유지합니다.',
      growthLabel: '성장 로드맵',
      growthTitle: '지속적인 진화',
      growthDescription:
        '기본 설치에서 고급 자동화까지, 에코시스템 역량을 단계적으로 확장합니다.'
    },
    latest: {
      title: '최신 콘텐츠',
      subtitle: '최근 5개'
    },
    join: {
      title: 'Clawbot 에코시스템에 참여',
      description:
        '접근, 기능, 거버넌스, 베스트 프랙티스까지 개인 AI 어시스턴트를 빠르게 구축하세요.',
      cta: '지금 시작'
    },
    hub: {
      heroLabel: 'Clawbot / 허브',
      relatedTitle: '관련 링크',
      relatedEmpty: '관련 콘텐츠가 아직 없습니다.'
    },
    notFound: {
      title: '페이지를 찾을 수 없습니다',
      description: '요청한 페이지가 없습니다. 홈으로 돌아가세요.',
      cta: '홈으로'
    },
    hubs: {
      install: '설치',
      skills: 'Skills',
      pitfalls: '주의사항'
    },
    links: {
      hubHome: '{hub} 허브 홈',
      windowsInstall: 'Windows 설치 가이드',
      macosInstall: 'macOS 설치 가이드',
      linuxInstall: 'Linux 설치 가이드',
      pitfallVersion: '주의사항: 버전 불일치',
      pitfallPermissions: '주의사항: 과도한 권한',
      skillsQuickstart: 'Skills 빠른 시작',
      skillsBestPractices: 'Skills 베스트 프랙티스',
      apiKeySafety: 'API 키 보안',
      performancePitfalls: '성능 주의사항'
    }
  }
};

export function getStrings(locale: Locale) {
  return UI_STRINGS[locale] ?? UI_STRINGS[DEFAULT_LOCALE];
}
