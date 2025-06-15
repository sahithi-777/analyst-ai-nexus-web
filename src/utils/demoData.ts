
import { RealProcessedFile, RealAnalysisResult } from './realAiProcessor';
import { DeepAnalysisResult } from './enhancedAiProcessor';

export const getDemoFiles = (): RealProcessedFile[] => [
  {
    id: '1',
    name: 'Climate_Change_Research_2024.pdf',
    size: 2048576,
    type: 'application/pdf',
    content: 'This comprehensive study examines the impact of climate change on global ecosystems. The research indicates that global temperatures have risen by 1.2°C since pre-industrial times, with significant implications for biodiversity, sea levels, and extreme weather patterns. Our analysis of 50 years of climate data reveals accelerating trends in ice cap melting, ocean acidification, and species migration patterns. The study recommends immediate policy interventions including carbon pricing, renewable energy incentives, and international cooperation frameworks.',
    status: 'completed' as const,
    progress: 100,
    metadata: {
      wordCount: 5420,
      pageCount: 15,
      language: 'en',
      author: 'Dr. Sarah Climate',
      createdDate: new Date('2024-01-10'),
      lastModified: new Date('2024-01-15'),
      topic: 'Climate Change',
      category: 'Research',
      keywords: ['climate', 'environment', 'ecosystem', 'policy'],
      confidenceScore: 0.95,
      summary: 'Comprehensive climate change impact study with policy recommendations'
    },
    analysisResults: {
      summary: 'A detailed analysis of climate change effects on biodiversity and ecosystem resilience with policy recommendations.',
      keyPoints: [
        'Global temperature increase of 1.2°C since pre-industrial times',
        'Significant impact on polar ice caps and sea level rise',
        'Biodiversity loss accelerating in tropical regions',
        'Urgent need for policy intervention and international cooperation'
      ],
      themes: ['Climate Science', 'Biodiversity', 'Environmental Policy', 'International Cooperation'],
      sentiment: 'neutral' as const,
      complexity: 'high' as const
    },
    extractedText: 'This comprehensive study examines the impact of climate change on global ecosystems...'
  },
  {
    id: '2',
    name: 'Economic_Impact_Renewable_Energy.docx',
    size: 1024000,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    content: 'Economic analysis of renewable energy transition costs and benefits shows promising results. Initial investment costs are high, approximately $2.5 trillion globally, but return on investment is positive within 7 years. Job creation in green energy sector offsets losses in fossil fuels by a ratio of 2:1. Government incentives are crucial for adoption rates, with tax credits and subsidies increasing deployment by 300%. Case studies from Denmark, Germany, and Costa Rica demonstrate successful transitions. The analysis includes cost-benefit projections, employment impact assessments, and policy recommendations for accelerating adoption.',
    status: 'completed' as const,
    progress: 100,
    metadata: {
      wordCount: 3200,
      pageCount: 8,
      language: 'en',
      author: 'Economic Research Team',
      createdDate: new Date('2024-01-05'),
      lastModified: new Date('2024-01-10'),
      topic: 'Economic Analysis',
      category: 'Business',
      keywords: ['economics', 'renewable energy', 'transition', 'ROI'],
      confidenceScore: 0.88,
      summary: 'Economic feasibility study of renewable energy transition with job impact analysis'
    },
    analysisResults: {
      summary: 'Economic feasibility study of transitioning to renewable energy sources with comprehensive job market analysis.',
      keyPoints: [
        'Initial investment costs of $2.5 trillion globally required',
        'Positive ROI within 7 years of implementation',
        'Job creation in green energy sector exceeds fossil fuel losses 2:1',
        'Government incentives increase deployment rates by 300%',
        'Successful case studies from Denmark, Germany, and Costa Rica'
      ],
      themes: ['Economics', 'Renewable Energy', 'Policy Analysis', 'Job Creation'],
      sentiment: 'positive' as const,
      complexity: 'medium' as const
    },
    extractedText: 'Economic analysis of renewable energy transition costs and benefits...'
  },
  {
    id: '3',
    name: 'AI_Technology_Trends_2024.txt',
    size: 512000,
    type: 'text/plain',
    content: 'Artificial Intelligence technology trends for 2024 show exponential growth in large language models, computer vision, and autonomous systems. The market size has reached $150 billion with 40% year-over-year growth. Key developments include multimodal AI systems, improved reasoning capabilities, and energy-efficient computing architectures. Enterprise adoption has accelerated with 78% of Fortune 500 companies implementing AI solutions. Challenges include ethical considerations, data privacy, regulatory compliance, and the need for skilled workforce development.',
    status: 'completed' as const,
    progress: 100,
    metadata: {
      wordCount: 1800,
      pageCount: 4,
      language: 'en',
      author: 'Tech Analysis Group',
      createdDate: new Date('2024-02-01'),
      lastModified: new Date('2024-02-05'),
      topic: 'Artificial Intelligence',
      category: 'Technology',
      keywords: ['AI', 'machine learning', 'technology trends', 'enterprise'],
      confidenceScore: 0.92,
      summary: 'Comprehensive analysis of AI technology trends and enterprise adoption in 2024'
    },
    analysisResults: {
      summary: 'Analysis of artificial intelligence technology trends showing exponential growth and enterprise adoption.',
      keyPoints: [
        'AI market size reached $150 billion with 40% YoY growth',
        'Major developments in multimodal AI and reasoning capabilities',
        '78% of Fortune 500 companies have implemented AI solutions',
        'Key challenges include ethics, privacy, and workforce development'
      ],
      themes: ['Artificial Intelligence', 'Technology Trends', 'Enterprise Adoption', 'Market Analysis'],
      sentiment: 'positive' as const,
      complexity: 'medium' as const
    },
    extractedText: 'Artificial Intelligence technology trends for 2024 show exponential growth...'
  }
];

export const getDemoAnalysis = (): RealAnalysisResult => ({
  summary: {
    keyInsights: [
      {
        insight: "Strong correlation between renewable energy investment and economic growth with 7-year ROI",
        confidence: 92,
        category: "Economic",
        sourceDocuments: ["Economic_Impact_Renewable_Energy.docx", "Climate_Change_Research_2024.pdf"]
      },
      {
        insight: "Climate change acceleration requires immediate policy intervention to prevent catastrophic outcomes",
        confidence: 88,
        category: "Environmental",
        sourceDocuments: ["Climate_Change_Research_2024.pdf"]
      },
      {
        insight: "AI technology adoption in enterprises has reached critical mass with 78% Fortune 500 implementation",
        confidence: 90,
        category: "Technology",
        sourceDocuments: ["AI_Technology_Trends_2024.txt"]
      },
      {
        insight: "Green job creation (2:1 ratio) offsets traditional energy sector job losses",
        confidence: 85,
        category: "Employment",
        sourceDocuments: ["Economic_Impact_Renewable_Energy.docx"]
      }
    ],
    overallThemes: ["Climate Change", "Economic Transition", "Technology Innovation", "Policy Implementation"],
    totalDocuments: 3,
    totalWords: 10420
  },
  connections: [
    {
      relationshipType: "supporting",
      strength: 85,
      documents: ["Climate_Change_Research_2024.pdf", "Economic_Impact_Renewable_Energy.docx"],
      description: "Environmental urgency supports economic case for renewable energy transition",
      evidence: ["Climate data showing 1.2°C temperature rise", "Economic analysis showing positive ROI"]
    },
    {
      relationshipType: "complementary",
      strength: 78,
      documents: ["AI_Technology_Trends_2024.txt", "Economic_Impact_Renewable_Energy.docx"],
      description: "AI technology can optimize renewable energy systems and economic efficiency",
      evidence: ["AI adoption in energy sector", "Smart grid optimization potential"]
    }
  ],
  contradictions: [
    {
      severity: "moderate",
      issue: "Short-term economic costs vs. long-term benefits",
      documents: ["Economic_Impact_Renewable_Energy.docx", "Climate_Change_Research_2024.pdf"],
      description: "High initial investment costs may conflict with immediate economic pressures",
      recommendation: "Implement phased transition with government support and incentive programs"
    }
  ],
  gaps: [
    {
      area: "Implementation Timeline",
      priority: "high",
      description: "Lack of specific timelines for policy implementation and technology deployment",
      suggestedSources: ["Government policy documents", "Industry implementation roadmaps"]
    },
    {
      area: "Regional Variation Analysis",
      priority: "medium",
      description: "Missing analysis of how solutions vary by geographic and economic regions",
      suggestedSources: ["Regional economic data", "Local climate impact studies"]
    }
  ],
  statistics: {
    totalDocuments: 3,
    totalWords: 10420,
    avgAnalysisDepth: 82,
    processingTime: "3.7 seconds"
  }
});

export const getDemoQuestions = () => [
  {
    id: '1',
    question: 'What are the main economic barriers to renewable energy adoption and how can they be overcome?',
    type: 'analytical' as const,
    difficulty: 'intermediate' as const,
    category: 'methodology' as const,
    rationale: 'Understanding economic barriers is crucial for developing effective policies and strategies to accelerate renewable energy adoption.',
    estimatedTime: '5-7 minutes',
    sourceDocuments: ['Economic_Impact_Renewable_Energy.docx'],
    templates: ['Compare cost structures and analyze financial incentives']
  },
  {
    id: '2',
    question: 'How do climate change impacts vary across different ecosystems and what are the policy implications?',
    type: 'comparative' as const,
    difficulty: 'advanced' as const,
    category: 'theory' as const,
    rationale: 'Comparative analysis of ecosystem vulnerability helps prioritize conservation efforts and resource allocation.',
    estimatedTime: '8-10 minutes',
    sourceDocuments: ['Climate_Change_Research_2024.pdf'],
    templates: ['Analyze ecosystem-specific vulnerability assessments']
  },
  {
    id: '3',
    question: 'What role can AI technology play in accelerating the renewable energy transition?',
    type: 'exploratory' as const,
    difficulty: 'advanced' as const,
    category: 'application' as const,
    rationale: 'Exploring AI applications in renewable energy can identify innovative solutions and optimization opportunities.',
    estimatedTime: '7-9 minutes',
    sourceDocuments: ['AI_Technology_Trends_2024.txt', 'Economic_Impact_Renewable_Energy.docx'],
    templates: ['Cross-domain analysis of technology applications']
  },
  {
    id: '4',
    question: 'What is the relationship between job creation in green industries and economic growth?',
    type: 'analytical' as const,
    difficulty: 'intermediate' as const,
    category: 'methodology' as const,
    rationale: 'Understanding employment impacts helps build political and social support for renewable energy policies.',
    estimatedTime: '6-8 minutes',
    sourceDocuments: ['Economic_Impact_Renewable_Energy.docx'],
    templates: ['Employment impact analysis framework']
  }
];
