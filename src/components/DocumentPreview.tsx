
import React from 'react';
import { X, Download, FileText, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface DocumentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: number;
    name: string;
    type: string;
    size: string;
    date: string;
    content?: string;
    author?: string;
    tags?: string[];
  } | null;
}

const DocumentPreview = ({ isOpen, onClose, document }: DocumentPreviewProps) => {
  if (!document) return null;

  const mockContent = `
# Executive Summary

This research document provides comprehensive analysis of market trends and consumer behavior patterns observed in Q4 2024. The findings indicate significant shifts in purchasing decisions and brand loyalty metrics.

## Key Findings

1. **Consumer Preference Shifts**: 68% of surveyed customers now prioritize sustainability over price
2. **Digital Transformation**: Online purchases increased by 42% compared to previous quarter
3. **Brand Loyalty Decline**: Traditional brand loyalty decreased by 15% across all demographics

## Methodology

Our research methodology included:
- Survey of 2,500 consumers across 5 major markets
- Analysis of purchasing data from 50 retail partners
- Focus groups with 200 participants
- Competitive analysis of top 20 brands

## Recommendations

Based on our findings, we recommend:
1. Implementing sustainable packaging solutions
2. Enhancing digital customer experience
3. Developing loyalty programs focused on values alignment
4. Investing in direct-to-consumer channels

## Conclusion

The market landscape continues to evolve rapidly, with consumers becoming more conscious and digitally savvy. Companies that adapt to these trends will be best positioned for success in 2025.
  `;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-900 border-gray-800">
        <DialogHeader className="border-b border-gray-800 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-blue-400" />
              <div>
                <DialogTitle className="text-white text-lg">{document.name}</DialogTitle>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-gray-400 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {document.date}
                  </span>
                  <span className="text-sm text-gray-400">{document.size}</span>
                  {document.author && (
                    <span className="text-sm text-gray-400 flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {document.author}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {document.tags && (
            <div className="flex items-center space-x-2 mt-3">
              {document.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-950 rounded-lg mt-4">
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {document.content || mockContent}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPreview;
