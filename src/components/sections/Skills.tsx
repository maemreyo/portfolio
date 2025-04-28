"use client";

import { useState, useRef } from "react";
import Section from "../ui/Section";
import StaggerContainer, { StaggerItem } from "../animations/StaggerContainer";
import ScrollReveal from "../animations/ScrollReveal";
import { motion, AnimatePresence, useInView } from "framer-motion";

import { Skill, SkillCategory } from "@/types/portfolio";

interface SkillsProps {
  skills?: Skill[];
  skillCategories?: SkillCategory[];
}

export default function Skills({ skills }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    skills && skills.length > 0 ? skills[0].category : null
  );

  // Group skills by category
  const groupedSkills: Record<string, Skill[]> = {};

  if (skills && skills.length > 0) {
    skills.forEach((skill) => {
      if (!groupedSkills[skill.category]) {
        groupedSkills[skill.category] = [];
      }
      groupedSkills[skill.category].push(skill);
    });
  }

  const categories = Object.keys(groupedSkills);

  // Animation variants for category buttons
  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  return (
    <Section title="Skills" className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {categories.length > 0 && (
          <>
            <ScrollReveal>
              <div className="flex flex-wrap gap-3 mb-10 justify-center">
                {categories.map((category, index) => (
                  <motion.button
                    key={index}
                    custom={index}
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm ${
                      activeCategory === category
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <SkillsList
                  skills={groupedSkills[activeCategory || ""]}
                  activeCategory={activeCategory}
                />
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </Section>
  );
}

interface SkillsListProps {
  skills: Skill[];
  activeCategory: string | null;
}

function SkillsList({ skills }: SkillsListProps) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skills.map((skill, index) => (
        <StaggerItem key={index}>
          <SkillCard skill={skill} index={index} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Convert skill level to percentage
  const percentage = skill.level;

  // Generate a color based on the skill level
  const levelColor = (() => {
    if (skill.level >= 90)
      return "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500";
    if (skill.level >= 70) return "bg-purple-500";
    if (skill.level >= 40) return "bg-blue-500";
    return "bg-green-500";
  })();

  // Get text representation of level
  const getLevelText = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 70) return "Advanced";
    if (level >= 40) return "Intermediate";
    return "Beginner";
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full"
      whileHover={{
        y: -5,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {skill.name}
          </h3>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
              {skill.years} {skill.years === 1 ? "year" : "years"}
            </span>
            <motion.div
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <motion.svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-1 text-sm font-medium">
            <span className="text-gray-700 dark:text-gray-300">
              {getLevelText(skill.level)}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {skill.level}%
            </span>
          </div>
          <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${levelColor} rounded-full`}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                {skill.projectHighlights.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Project Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.projectHighlights.map((project, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full"
                        >
                          {project}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {skill.specificApplications.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Specific Applications
                    </h4>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                      {skill.specificApplications.map((application, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex items-start"
                        >
                          <svg
                            className="w-4 h-4 mt-0.5 mr-2 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {application}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
