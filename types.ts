
// Fix: Import React to resolve the missing React namespace for ReactNode
import React from 'react';

export interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface AuditResult {
  summary: string;
  quickWins: string[];
  riskAssessment: string;
  suggestedRoadmap: string[];
}
