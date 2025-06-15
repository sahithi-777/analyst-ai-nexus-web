
import { RealProcessedFile } from './realAiProcessor';
import { DeepAnalysisResult } from './enhancedAiProcessor';

export const getDemoFiles = (): RealProcessedFile[] => [
  {
    id: '1',
    name: 'Research_Paper_Climate_Change.pdf',
    size: 2048576,
    type: 'application/pdf',
    content: 'This comprehensive study examines the impact of climate change on global ecosystems...',
    status: 'completed' as const,
    metadata: {
      wordCount: 5420,
      pageCount: 15,
      language: 'en',
      author: 'Dr. Climate Research',
      createdDate: new Date('2024-01-10'),
      lastModified: new Date('2024-01-15'),
      topic: 'Climate Change',
      category: 'Research',
      keywords: ['climate', 'environment', 'ecosystem'],
      confidenceScore: 0.95,
      summary: 'Comprehensive climate change impact study'
    },
    analysisResults: {
      summary: 'A detailed analysis of climate change effects on biodiversity and ecosystem resilience.',
      keyPoints: [
        'Global temperature increase of 1.2°C since pre-industrial times',
        'Significant impact on polar ice caps and sea level rise',
        'Biodiversity loss accelerating in tropical regions'
      ],
      themes: ['Climate Science', 'Biodiversity', 'Environmental Policy'],
      sentiment: 'neutral' as const,
      complexity: 'high' as const
    }
  },
  {
    id: '2',
    name: 'Economic_Impact_Analysis.docx',
    size: 1024000,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    content: 'Economic analysis of renewable energy transition costs and benefits...',
    status: 'completed' as const,
    metadata: {
      wordCount: 3200,
      pageCount: 8,
      language: 'en',
      author: 'Economic Research Team',
      createdDate: new Date('2024-01-05'),
      lastModified: new Date('2024-01-10'),
      topic: 'Economic Analysis',
      category: 'Business',
      keywords: ['economics', 'renewable energy', 'transition'],
      confidenceScore: 0.88,
      summary: 'Economic feasibility study of renewable energy'
    },
    analysisResults: {
      summary: 'Economic feasibility study of transitioning to renewable energy sources.',
      keyPoints: [
        'Initial investment costs are high but ROI is positive within 7 years',
        'Job creation in green energy sector offsets losses in fossil fuels',
        'Government incentives crucial for adoption rates'
      ],
      themes: ['Economics', 'Renewable Energy', 'Policy Analysis'],
      sentiment: 'positive' as const,
      complexity: 'medium' as const
    }
  }
];

export const getDemoAnalysis = (): DeepAnalysisResult => ({
  summary: 'Comprehensive analysis reveals strong consensus on climate change urgency with economic opportunities in renewable energy transition.',
  confidence: 0.87,
  themes: ['Climate Change', 'Economic Transition', 'Policy Implementation', 'Renewable Energy'],
  insights: [
    {
      id: '1',
      title: 'Economic Viability of Green Transition',
      content: 'The analysis shows that renewable energy investments have positive ROI within 7 years, making the economic case for transition compelling.',
      confidence: 0.92,
      impact: 'high',
      category: 'Economic',
      supportingEvidence: ['Cost-benefit analysis data', 'Historical transition examples', 'Government incentive programs']
    },
    {
      id: '2',
      title: 'Biodiversity Crisis Acceleration',
      content: 'Climate change is accelerating biodiversity loss, particularly in tropical regions, requiring immediate conservation action.',
      confidence: 0.89,
      impact: 'high',
      category: 'Environmental',
      supportingEvidence: ['Species extinction rates', 'Habitat loss data', 'Conservation success stories']
    }
  ],
  relationships: [
    {
      id: '1',
      concept1: 'Climate Change',
      concept2: 'Economic Impact',
      relationshipType: 'supporting',
      strength: 0.85,
      description: 'Climate change creates economic pressures that support the business case for renewable energy adoption.'
    },
    {
      id: '2',
      concept1: 'Renewable Energy',
      concept2: 'Job Creation',
      relationshipType: 'supporting',
      strength: 0.78,
      description: 'Investment in renewable energy infrastructure creates new employment opportunities in green technology sectors.'
    }
  ],
  issues: [
    {
      id: '1',
      title: 'High Initial Investment Costs',
      description: 'The upfront costs for renewable energy infrastructure present a significant barrier to adoption.',
      severity: 'high',
      category: 'Economic',
      mitigation: 'Government subsidies and phased implementation can reduce financial barriers.'
    },
    {
      id: '2',
      title: 'Policy Implementation Gaps',
      description: 'Disconnect between climate policy goals and actual implementation timelines.',
      severity: 'moderate',
      category: 'Policy',
      mitigation: 'Strengthen regulatory frameworks and accountability mechanisms.'
    }
  ],
  timeline: [
    {
      id: '1',
      date: '2015-12-12',
      event: 'Paris Climate Agreement',
      description: 'International commitment to limit global warming to 1.5°C',
      importance: 'high',
      category: 'Policy',
      documents: ['Climate_Policy_Framework.pdf'],
      context: 'Global climate policy milestone',
      significance: 'Established international cooperation framework'
    },
    {
      id: '2',
      date: '2020-01-01',
      event: 'Green New Deal Proposal',
      description: 'Comprehensive plan for economic transition to renewable energy',
      importance: 'medium',
      category: 'Policy',
      documents: ['Economic_Impact_Analysis.docx'],
      context: 'National policy initiative',
      significance: 'Linked environmental and economic policy'
    },
    {
      id: '3',
      date: '2023-09-15',
      event: 'Renewable Energy Cost Parity',
      description: 'Solar and wind energy achieve cost parity with fossil fuels',
      importance: 'high',
      category: 'Economic',
      documents: ['Economic_Impact_Analysis.docx'],
      context: 'Market transformation milestone',
      significance: 'Economic barriers to adoption removed'
    }
  ],
  actionableInsights: [
    {
      id: '1',
      title: 'Accelerate Renewable Energy Investment',
      description: 'Prioritize renewable energy projects to capitalize on economic opportunities and environmental benefits.',
      priority: 'high',
      category: 'Investment',
      actions: [
        'Establish green investment fund',
        'Create tax incentives for renewable projects',
        'Streamline permitting processes'
      ],
      outcomes: [
        'Reduced carbon emissions',
        'Job creation in green sectors',
        'Energy independence'
      ]
    },
    {
      id: '2',
      title: 'Strengthen Conservation Efforts',
      description: 'Implement immediate biodiversity protection measures to address accelerating species loss.',
      priority: 'high',
      category: 'Conservation',
      actions: [
        'Expand protected area networks',
        'Increase conservation funding',
        'Implement species recovery programs'
      ],
      outcomes: [
        'Preserved biodiversity',
        'Ecosystem resilience',
        'Sustainable resource management'
      ]
    }
  ],
  contradictions: []
});

export const getDemoQuestions = () => [
  {
    id: '1',
    question: 'What are the main economic barriers to renewable energy adoption?',
    type: 'analytical' as const,
    difficulty: 'intermediate' as const,
    category: 'methodology' as const,
    rationale: 'Understanding economic barriers is crucial for developing effective policies and strategies to accelerate renewable energy adoption.',
    estimatedTime: '5-7 minutes',
    sourceDocuments: ['Economic_Impact_Analysis.docx'],
    templates: ['Compare cost structures and analyze financial incentives']
  },
  {
    id: '2',
    question: 'How do climate change impacts vary across different ecosystems?',
    type: 'comparative' as const,
    difficulty: 'advanced' as const,
    category: 'theory' as const,
    rationale: 'Comparative analysis of ecosystem vulnerability helps prioritize conservation efforts and resource allocation.',
    estimatedTime: '8-10 minutes',
    sourceDocuments: ['Research_Paper_Climate_Change.pdf'],
    templates: ['Analyze ecosystem-specific vulnerability assessments']
  },
  {
    id: '3',
    question: 'What policy mechanisms have proven most effective for driving clean energy transitions?',
    type: 'exploratory' as const,
    difficulty: 'advanced' as const,
    category: 'application' as const,
    rationale: 'Identifying effective policy mechanisms helps inform future policy development and implementation strategies.',
    estimatedTime: '7-9 minutes',
    sourceDocuments: ['Economic_Impact_Analysis.docx', 'Research_Paper_Climate_Change.pdf'],
    templates: ['Comparative analysis of successful policy implementations']
  }
];
