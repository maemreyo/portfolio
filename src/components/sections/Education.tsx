'use client';

import { Education as EducationType } from '@/types/portfolio';
import Section from '../ui/Section';
import Card from '../ui/Card';
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer';

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short'
    }).format(date);
  };

  return (
    <Section title="Education">
      <div className="container mx-auto px-4">
        <StaggerContainer className="grid grid-cols-1 gap-8">
          {education.map((edu, index) => (
            <StaggerItem key={index} direction="up">
              <Card>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {edu.degree} in {edu.major}
                      </h3>
                      <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {edu.institution}
                      </h4>
                    </div>
                    
                    <div className="mt-2 md:mt-0 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 mr-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                          />
                        </svg>
                        <span>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                      
                      <div className="flex items-center mt-1">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 mr-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                          />
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                          />
                        </svg>
                        <span>
                          {edu.location.city}, {edu.location.country}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-yellow-500" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                      </svg>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {edu.graduationStatus} - {edu.honors}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}