
import { RealProcessedFile } from './realAiProcessor';
import { DeepAnalysisResult } from './enhancedAiProcessor';

export const getDemoFiles = (): RealProcessedFile[] => [
  {
    id: 'demo-1',
    name: 'AI_Research_Methods_2024.pdf',
    type: 'application/pdf',
    size: 2485760,
    content: 'Sample research document about AI methodologies...',
    extractedText: `# AI Research Methods in 2024: A Comprehensive Analysis

## Abstract
This study examines the evolution of artificial intelligence research methodologies in 2024, focusing on the integration of large language models with traditional research approaches. Our analysis reveals significant improvements in data processing efficiency and analytical depth.

## Introduction
The landscape of AI research has transformed dramatically with the advent of advanced language models like GPT-4 and Claude. These tools have revolutionized how researchers approach complex analytical tasks, enabling deeper insights and more comprehensive analysis of large datasets.

## Methodology
We employed a mixed-methods approach combining quantitative analysis with qualitative insights. Our dataset consisted of 1,500 research papers published between January and June 2024, focusing on AI applications in various domains.

### Data Collection
- Systematic literature review of peer-reviewed publications
- Analysis of citation patterns and research trends
- Interviews with 45 leading AI researchers
- Survey of 300 practitioners in the field

## Key Findings
1. **Integration of AI Tools**: 78% of researchers now use AI assistants for initial analysis
2. **Efficiency Gains**: Average research time reduced by 35%
3. **Quality Improvements**: 92% report enhanced insight generation
4. **Collaboration Patterns**: Cross-disciplinary research increased by 60%

## Discussion
The integration of AI tools in research methodology represents a paradigm shift. However, challenges remain in ensuring reproducibility and addressing potential biases introduced by AI systems.

## Limitations
- Sample bias toward English-language publications
- Limited temporal scope (6 months)
- Potential selection bias in interview participants

## Future Directions
Further research is needed to establish best practices for AI-augmented research methodologies and to develop frameworks for quality assurance.

## Conclusion
AI tools have fundamentally changed research practices, offering unprecedented opportunities for insight generation while requiring careful consideration of methodological rigor.`,
    status: 'completed',
    metadata: {
      wordCount: 2847,
      pageCount: 12,
      language: 'en',
      author: 'Dr. Sarah Chen, MIT AI Lab',
      createdDate: new Date('2024-01-15'),
      lastModified: new Date('2024-01-20'),
      topic: 'AI Research Methodologies',
      category: 'Research',
      keywords: ['artificial intelligence', 'research methods', 'large language models', 'data analysis', 'methodology'],
      confidenceScore: 92,
      summary: 'Comprehensive analysis of how AI tools are transforming research methodologies in 2024, showing significant efficiency gains and quality improvements.'
    },
    uploadedAt: new Date('2024-01-21'),
    preview: 'This study examines the evolution of artificial intelligence research methodologies in 2024, focusing on the integration of large language models...'
  },
  {
    id: 'demo-2',
    name: 'Business_Intelligence_Framework.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 1967104,
    content: 'Business intelligence framework document...',
    extractedText: `# Modern Business Intelligence Framework: Leveraging AI for Strategic Decision Making

## Executive Summary
This document outlines a comprehensive framework for implementing AI-driven business intelligence solutions in modern enterprises. The framework addresses data integration challenges, analytical capabilities, and decision-support systems.

## Current State Analysis
Traditional BI systems face significant limitations in handling unstructured data and providing real-time insights. Our analysis of 200 enterprise implementations reveals:

- 65% struggle with data silos
- 43% lack real-time processing capabilities
- 78% require manual intervention for complex analysis
- 52% report difficulties in scaling analytics

## Proposed Framework Architecture

### Layer 1: Data Foundation
- Unified data lake architecture
- Real-time streaming capabilities
- Advanced ETL/ELT processes
- Data quality management

### Layer 2: AI Processing Engine
- Natural language processing for unstructured data
- Machine learning models for predictive analytics
- Computer vision for image/video analysis
- Automated pattern recognition

### Layer 3: Intelligence Layer
- Advanced analytics and visualization
- Natural language query interface
- Automated insight generation
- Anomaly detection systems

### Layer 4: Decision Support
- Interactive dashboards
- Mobile accessibility
- Collaborative workspace
- Integration with business processes

## Implementation Strategy

### Phase 1: Foundation (Months 1-3)
- Data infrastructure setup
- Initial AI model deployment
- Basic dashboard creation
- User training programs

### Phase 2: Enhancement (Months 4-6)
- Advanced analytics implementation
- Custom model development
- Integration with existing systems
- Performance optimization

### Phase 3: Expansion (Months 7-12)
- Cross-departmental deployment
- Advanced AI capabilities
- Predictive analytics rollout
- Continuous improvement processes

## Benefits Analysis
Expected outcomes from framework implementation:
- 40% reduction in decision-making time
- 60% improvement in forecast accuracy
- 35% increase in operational efficiency
- 25% cost reduction in analytics operations

## Risk Mitigation
Key risks and mitigation strategies:
- Data privacy concerns: Implement robust security protocols
- Change resistance: Comprehensive training and support
- Technical complexity: Phased implementation approach
- Budget overruns: Regular milestone reviews

## Success Metrics
- User adoption rates
- Query response times
- Accuracy of predictions
- Business impact measurements

## Conclusion
The proposed AI-driven BI framework offers significant advantages over traditional approaches, enabling organizations to make faster, more informed decisions based on comprehensive data analysis.`,
    status: 'completed',
    metadata: {
      wordCount: 2156,
      pageCount: 8,
      language: 'en',
      author: 'Business Analytics Team',
      createdDate: new Date('2024-02-01'),
      lastModified: new Date('2024-02-05'),
      topic: 'Business Intelligence and AI Integration',
      category: 'Business Intelligence',
      keywords: ['business intelligence', 'artificial intelligence', 'data analytics', 'decision making', 'enterprise systems'],
      confidenceScore: 88,
      summary: 'Comprehensive framework for implementing AI-driven business intelligence solutions, focusing on data integration and decision support systems.'
    },
    uploadedAt: new Date('2024-02-06'),
    preview: 'This document outlines a comprehensive framework for implementing AI-driven business intelligence solutions in modern enterprises...'
  },
  {
    id: 'demo-3',
    name: 'Climate_Data_Analysis.csv',
    type: 'text/csv',
    size: 856320,
    content: 'Year,Temperature,CO2_Levels,Sea_Level,Precipitation...',
    extractedText: `# Climate Data Analysis Report

## Dataset Overview
This dataset contains comprehensive climate measurements from 1990-2024, including:
- Global temperature anomalies
- Atmospheric CO2 concentrations
- Sea level changes
- Precipitation patterns
- Extreme weather event frequencies

## Key Statistics
- Total records: 12,480
- Geographic coverage: 195 countries
- Measurement stations: 2,847
- Data quality score: 94.2%

## Major Trends Identified

### Temperature Patterns
- Average global temperature increase: +1.2°C since 1990
- Accelerated warming in polar regions: +2.1°C
- Urban heat island effects: +0.8°C additional warming
- Seasonal variations becoming more extreme

### CO2 Concentration
- 1990 baseline: 354 ppm
- 2024 current level: 421 ppm
- Annual increase rate: 2.3 ppm/year
- Acceleration in recent decade: 2.8 ppm/year

### Sea Level Changes
- Global mean sea level rise: 118mm since 1990
- Acceleration observed since 2010
- Regional variations: 45-180mm
- Coastal vulnerability index increasing

### Precipitation Anomalies
- 23% increase in extreme precipitation events
- 18% expansion of arid regions
- Shifting monsoon patterns affecting 2.1B people
- Increased frequency of both droughts and floods

## Regional Analysis

### Arctic Region
- Fastest warming zone globally
- 78% sea ice reduction in summer extent
- Permafrost thaw accelerating
- Ecosystem disruption widespread

### Tropical Zones
- Intensification of hurricane/typhoon systems
- Coral bleaching events increasing
- Rainforest stress indicators rising
- Biodiversity loss accelerating

### Temperate Regions
- Agricultural productivity changes
- Water resource stress increasing
- Energy demand patterns shifting
- Infrastructure adaptation needs

## Predictive Models
Based on current trends and various emission scenarios:

### Conservative Scenario (RCP 4.5)
- Additional 1.5°C warming by 2050
- Sea level rise: 150-250mm by 2050
- 30% increase in extreme weather

### High Emission Scenario (RCP 8.5)
- Additional 2.8°C warming by 2050
- Sea level rise: 280-450mm by 2050
- 85% increase in extreme weather

## Data Quality Assessment
- Missing data points: 3.2%
- Measurement uncertainties: ±0.1°C for temperature
- Satellite calibration verified quarterly
- Quality control flags applied to all records

## Conclusions
The data reveals accelerating climate change impacts across all measured parameters. Immediate action required to mitigate worst-case scenarios. Regional adaptation strategies must be tailored to local conditions while addressing global interconnections.

## Recommendations
1. Enhanced monitoring network deployment
2. Improved data sharing protocols
3. Advanced modeling techniques integration
4. Real-time alert systems implementation
5. Community-based observation programs`,
    status: 'completed',
    metadata: {
      wordCount: 1743,
      pageCount: 6,
      language: 'en',
      author: 'Global Climate Research Consortium',
      createdDate: new Date('2024-03-10'),
      lastModified: new Date('2024-03-15'),
      topic: 'Climate Change Data Analysis',
      category: 'Technology',
      keywords: ['climate change', 'temperature data', 'CO2 levels', 'sea level rise', 'environmental monitoring'],
      confidenceScore: 95,
      summary: 'Comprehensive analysis of global climate data from 1990-2024 showing accelerating warming trends and environmental impacts.'
    },
    uploadedAt: new Date('2024-03-16'),
    preview: 'This dataset contains comprehensive climate measurements from 1990-2024, including global temperature anomalies, atmospheric CO2 concentrations...'
  }
];

export const getDemoAnalysis = (): DeepAnalysisResult => ({
  insights: [
    {
      id: 'insight-1',
      title: 'AI Integration Accelerating Research Efficiency',
      description: 'The integration of AI tools in research methodologies has led to a 35% reduction in research time while improving analytical depth and insight quality.',
      confidence: 92,
      sourceDocuments: ['AI_Research_Methods_2024.pdf'],
      category: 'trend',
      evidence: [
        '78% of researchers now use AI assistants for initial analysis',
        'Average research time reduced by 35%',
        '92% report enhanced insight generation'
      ],
      implications: 'Organizations should invest in AI research tools and training to remain competitive in knowledge generation.',
      severity: 'high'
    },
    {
      id: 'insight-2',
      title: 'Climate Change Acceleration Beyond Predictions',
      description: 'Current climate data shows warming trends exceeding previous projections, with polar regions experiencing double the global average temperature increase.',
      confidence: 95,
      sourceDocuments: ['Climate_Data_Analysis.csv'],
      category: 'finding',
      evidence: [
        'Average global temperature increase: +1.2°C since 1990',
        'Accelerated warming in polar regions: +2.1°C',
        'CO2 levels rising at 2.8 ppm/year in recent decade'
      ],
      implications: 'Urgent need for enhanced climate mitigation strategies and adaptation planning.',
      severity: 'critical'
    },
    {
      id: 'insight-3',
      title: 'Business Intelligence Transformation Required',
      description: 'Traditional BI systems are inadequate for modern data challenges, with 65% of enterprises struggling with data silos and 78% requiring manual intervention for complex analysis.',
      confidence: 88,
      sourceDocuments: ['Business_Intelligence_Framework.docx'],
      category: 'recommendation',
      evidence: [
        '65% struggle with data silos',
        '78% require manual intervention for complex analysis',
        'Proposed framework shows 40% reduction in decision-making time'
      ],
      implications: 'Organizations need to modernize BI infrastructure with AI-driven approaches to remain competitive.',
      severity: 'moderate'
    }
  ],
  relationships: [
    {
      id: 'rel-1',
      sourceDocument: 'AI_Research_Methods_2024.pdf',
      targetDocument: 'Business_Intelligence_Framework.docx',
      relationshipType: 'complementary',
      strength: 85,
      description: 'Both documents highlight the transformative impact of AI on analytical processes and decision-making efficiency.',
      evidence: [
        'AI research shows 35% time reduction, BI framework promises 40% decision-making improvement',
        'Both emphasize integration challenges and training requirements',
        'Similar adoption patterns across research and business domains'
      ]
    },
    {
      id: 'rel-2',
      sourceDocument: 'Climate_Data_Analysis.csv',
      targetDocument: 'AI_Research_Methods_2024.pdf',
      relationshipType: 'supportive',
      strength: 72,
      description: 'Climate data analysis benefits from AI research methodologies for processing large datasets and generating insights.',
      evidence: [
        'Climate research requires advanced analytical capabilities mentioned in AI methods',
        'Large dataset processing aligns with AI tool capabilities',
        'Both emphasize quality control and validation processes'
      ]
    }
  ],
  contradictions: [
    {
      id: 'contra-1',
      documents: ['AI_Research_Methods_2024.pdf', 'Business_Intelligence_Framework.docx'],
      issue: 'Implementation Timeline Discrepancy',
      severity: 'minor',
      description: 'AI research suggests rapid adoption (78% current usage) while BI framework proposes 12-month implementation timeline.',
      recommendation: 'Reconcile adoption timelines by considering organizational readiness and complexity differences between research and enterprise environments.',
      conflictingEvidence: [
        'AI research shows 78% current adoption',
        'BI framework suggests 12-month phased implementation'
      ]
    }
  ],
  timeline: [
    {
      date: '2024-01-15',
      event: 'AI Research Methods Study Published',
      documents: ['AI_Research_Methods_2024.pdf'],
      importance: 'high',
      category: 'research_milestone',
      description: 'Comprehensive analysis of AI integration in research methodologies'
    },
    {
      date: '2024-02-01',
      event: 'Business Intelligence Framework Development Began',
      documents: ['Business_Intelligence_Framework.docx'],
      importance: 'medium',
      category: 'business_initiative',
      description: 'Framework design for AI-driven business intelligence solutions'
    },
    {
      date: '2024-03-10',
      event: 'Climate Data Analysis Completed',
      documents: ['Climate_Data_Analysis.csv'],
      importance: 'high',
      category: 'data_analysis',
      description: 'Comprehensive climate trend analysis covering 1990-2024 period'
    }
  ],
  issues: [
    {
      id: 'issue-1',
      title: 'Data Quality and Bias Concerns',
      description: 'AI research methods study acknowledges potential biases in AI systems, while climate data shows missing data points affecting analysis reliability.',
      severity: 'moderate',
      category: 'methodology',
      affectedDocuments: ['AI_Research_Methods_2024.pdf', 'Climate_Data_Analysis.csv'],
      recommendations: [
        'Implement robust bias detection mechanisms',
        'Develop data quality validation protocols',
        'Establish baseline accuracy requirements'
      ]
    },
    {
      id: 'issue-2',
      title: 'Scalability and Infrastructure Challenges',
      description: 'Business intelligence framework identifies technical complexity as a major risk, while climate monitoring requires enhanced infrastructure.',
      severity: 'high',
      category: 'technical',
      affectedDocuments: ['Business_Intelligence_Framework.docx', 'Climate_Data_Analysis.csv'],
      recommendations: [
        'Invest in robust infrastructure planning',
        'Implement phased scaling approaches',
        'Develop technical expertise internally'
      ]
    }
  ],
  actionableInsights: [
    {
      id: 'action-1',
      title: 'Immediate AI Integration Strategy',
      description: 'Develop comprehensive AI adoption plan based on research efficiency gains and business intelligence transformation requirements.',
      priority: 'high',
      category: 'strategic',
      steps: [
        'Assess current analytical capabilities',
        'Identify AI tool integration opportunities',
        'Develop training programs for staff',
        'Implement pilot projects with measurable outcomes'
      ],
      expectedOutcome: '30-40% improvement in analytical efficiency',
      timeline: '3-6 months',
      resources: 'AI tools, training budget, technical staff'
    },
    {
      id: 'action-2',
      title: 'Climate Monitoring Enhancement',
      description: 'Expand climate data collection and analysis capabilities to support decision-making in climate-sensitive operations.',
      priority: 'medium',
      category: 'operational',
      steps: [
        'Install additional monitoring stations',
        'Implement real-time data processing',
        'Develop predictive models',
        'Create alert systems for extreme events'
      ],
      expectedOutcome: 'Improved climate risk assessment and adaptation planning',
      timeline: '6-12 months',
      resources: 'Monitoring equipment, data infrastructure, analytical tools'
    }
  ],
  statistics: {
    totalDocuments: 3,
    totalWords: 6746,
    avgConfidenceScore: 92,
    processingTime: '2.3 seconds',
    lastAnalyzed: new Date(),
    keywordDensity: {
      'artificial intelligence': 0.08,
      'climate change': 0.06,
      'business intelligence': 0.05,
      'data analysis': 0.09,
      'research methods': 0.04
    },
    documentTypes: {
      'Research': 1,
      'Business Intelligence': 1,
      'Technology': 1
    },
    analysisDepth: 'comprehensive'
  }
});

export const getDemoQuestions = () => [
  {
    question: "How do the AI efficiency gains in research compare to the business intelligence improvements proposed?",
    type: "comparative" as const,
    difficulty: "intermediate" as const,
    category: "methodology" as const,
    rationale: "This question explores the relationship between AI adoption in research versus business contexts, helping identify best practices.",
    estimatedTime: "5-7 minutes",
    sourceDocuments: ["AI_Research_Methods_2024.pdf", "Business_Intelligence_Framework.docx"],
    templates: ["Compare efficiency metrics", "Analyze adoption patterns", "Evaluate implementation strategies"]
  },
  {
    question: "What are the implications of accelerated climate change for AI-powered environmental monitoring systems?",
    type: "analytical" as const,
    difficulty: "advanced" as const,
    category: "application" as const,
    rationale: "Connects climate trends with AI capabilities to explore future monitoring and prediction needs.",
    estimatedTime: "8-10 minutes",
    sourceDocuments: ["Climate_Data_Analysis.csv", "AI_Research_Methods_2024.pdf"],
    templates: ["Environmental impact analysis", "Technology application assessment", "Future scenario planning"]
  },
  {
    question: "How can the business intelligence framework address data quality issues identified in climate research?",
    type: "exploratory" as const,
    difficulty: "intermediate" as const,
    category: "evaluation" as const,
    rationale: "Examines how business solutions might solve research challenges, promoting cross-domain learning.",
    estimatedTime: "6-8 minutes",
    sourceDocuments: ["Business_Intelligence_Framework.docx", "Climate_Data_Analysis.csv"],
    templates: ["Quality assurance protocols", "Data validation methods", "Framework adaptation strategies"]
  }
];
