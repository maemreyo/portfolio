'use client';

import { ContributionActivity } from '@/types/portfolio';
import Section from '../ui/Section';
import Card from '../ui/Card';
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer';
import { motion } from 'framer-motion';

interface ContributionsProps {
  contributions?: ContributionActivity[];
}

export default function Contributions({ contributions }: ContributionsProps) {
  if (!contributions || contributions.length === 0) return null;

  // Group contributions by type
  const groupedContributions: Record<string, ContributionActivity[]> = {};
  
  contributions.forEach((contribution) => {
    if (!groupedContributions[contribution.type]) {
      groupedContributions[contribution.type] = [];
    }
    groupedContributions[contribution.type].push(contribution);
  });

  const contributionTypes = Object.keys(groupedContributions);

  return (
    <Section title="Contributions & Activities">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {contributionTypes.map((type, typeIndex) => (
            <div key={typeIndex}>
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                {type}
              </h3>
              
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupedContributions[type].map((contribution, index) => (
                  <StaggerItem key={index}>
                    <ContributionCard contribution={contribution} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

interface ContributionCardProps {
  contribution: ContributionActivity;
}

function ContributionCard({ contribution }: ContributionCardProps) {
  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'open source':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'community':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'speaking':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'volunteering':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4 text-blue-600 dark:text-blue-400">
            {getIconForType(contribution.type)}
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
              {contribution.name}
            </h4>
            
            {contribution.organization && (
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">
                {contribution.organization}
                {contribution.role && ` - ${contribution.role}`}
              </p>
            )}
            
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {contribution.description}
            </p>
            
            {contribution.impact && (
              <p className="text-gray-700 dark:text-gray-300 italic text-sm">
                <span className="font-semibold">Impact:</span> {contribution.impact}
              </p>
            )}
            
            <div className="mt-4 flex items-center justify-between">
              {contribution.date && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {contribution.date}
                </span>
              )}
              
              {contribution.url && (
                <motion.a
                  href={contribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  View More
                  <svg 
                    className="w-4 h-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}