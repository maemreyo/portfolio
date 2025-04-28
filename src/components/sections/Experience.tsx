'use client';

import { WorkExperience } from '@/types/portfolio';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer';
import ScrollReveal from '../animations/ScrollReveal';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceProps {
  experiences: WorkExperience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <Section title="Work Experience" className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <StaggerContainer className="space-y-12">
          {experiences.map((experience, index) => (
            <StaggerItem key={index} direction="up">
              <ExperienceItem experience={experience} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}

interface ExperienceItemProps {
  experience: WorkExperience;
}

function ExperienceItem({ experience }: ExperienceItemProps) {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    if (dateString === 'Present') return 'Present';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short'
    }).format(date);
  };

  return (
    <Card className="overflow-visible" hoverEffect={false}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
          <div className="flex items-start gap-4">
            {experience.companyLogo && (
              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)' }}>
                <img 
                  src={experience.companyLogo} 
                  alt={`${experience.companyName} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {experience.jobTitle}
              </h3>
              <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {experience.companyName}
              </h4>
            </div>
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
                {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
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
                {experience.location.city}, {experience.location.country}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-6">
          {experience.projects.map((project, projectIndex) => (
            <div key={projectIndex} className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div 
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleProject(projectIndex)}
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {project.projectName}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {project.roleWithinProject}
                  </p>
                </div>
                
                <motion.div
                  animate={{ rotate: expandedProject === projectIndex ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500 dark:text-gray-400"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </motion.div>
              </div>
              
              <AnimatePresence>
                {expandedProject === projectIndex && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-4">
                      <div>
                        <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                          Description
                        </h5>
                        <p className="text-gray-700 dark:text-gray-300">
                          {project.projectDescription}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                          Responsibilities
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          {project.responsibilities.map((responsibility, respIndex) => (
                            <li key={respIndex}>{responsibility}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                          Key Contributions
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          {project.keyContributions.map((contribution, contIndex) => (
                            <li key={contIndex}>{contribution}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                          Technologies Used
                        </h5>
                        <div className="space-y-2">
                          {project.technologiesUsed.frontend && (
                            <div>
                              <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400">Frontend:</h6>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {project.technologiesUsed.frontend.map((tech, techIndex) => (
                                  <Badge key={techIndex} variant="primary" size="sm">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {project.technologiesUsed.stateManagement && (
                            <div>
                              <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400">State Management:</h6>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {project.technologiesUsed.stateManagement.map((tech, techIndex) => (
                                  <Badge key={techIndex} variant="info" size="sm">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {project.technologiesUsed.uiLibraries && (
                            <div>
                              <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400">UI Libraries:</h6>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {project.technologiesUsed.uiLibraries.map((tech, techIndex) => (
                                  <Badge key={techIndex} variant="success" size="sm">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}