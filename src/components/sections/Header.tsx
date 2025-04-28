"use client";

import { useState, useEffect } from "react";
import { PersonalInfo } from "@/types/portfolio";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

interface HeaderProps {
  personalInfo: PersonalInfo;
}

export default function Header({ personalInfo }: HeaderProps) {
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const controls = useAnimation();

  // Typing animation effect
  useEffect(() => {
    const text = personalInfo.motto;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [personalInfo.motto]);

  // Animate background gradient
  useEffect(() => {
    controls.start({
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 15,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const linkVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.5 + custom * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  };

  return (
    <header className="relative py-24 md:py-32 overflow-hidden">
      {/* Cover image if available */}
      {personalInfo.coverImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={personalInfo.coverImage}
            alt="Cover background"
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white dark:from-gray-900/0 dark:to-gray-900"></div>
        </div>
      )}

      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-10 dark:opacity-20"
        animate={controls}
        style={{
          backgroundImage:
            "linear-gradient(120deg, #84fab0 0%, #8fd3f4 50%, #a3a8f0 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-12 md:mb-0 flex flex-col md:flex-row items-start md:items-center gap-8">
            {personalInfo.photoUrl && (
              <motion.div
                className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl flex items-center justify-center"
                variants={itemVariants}
              >
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.displayName || personalInfo.fullName}
                  className="w-full h-full object-cover object-center"
                  style={{ aspectRatio: "1/1" }}
                />
              </motion.div>
            )}

            <div>
              <motion.div className="mb-4" variants={itemVariants}>
                {/* {personalInfo.logoUrl ? (
                  <img 
                    src={personalInfo.logoUrl} 
                    alt={personalInfo.displayName || personalInfo.fullName}
                    className="h-16 md:h-20 w-auto"
                  />
                ) : ( */}
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    {personalInfo.displayName || personalInfo.fullName}
                  </span>
                </h1>
                {/* )} */}
              </motion.div>

              <motion.h2
                className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-medium mb-6"
                variants={itemVariants}
              >
                {personalInfo.title}
              </motion.h2>

              <motion.div className="relative h-8 mb-8" variants={itemVariants}>
                <p className="text-gray-600 dark:text-gray-400 text-lg italic min-h-[2rem]">
                  "{typedText}
                  <AnimatePresence>
                    {!isTypingComplete && (
                      <motion.span
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="inline-block w-1 h-5 ml-1 bg-blue-500 align-middle"
                      />
                    )}
                  </AnimatePresence>
                </p>
              </motion.div>

              <motion.div
                className="flex items-center text-gray-600 dark:text-gray-300"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-blue-500"
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
                </motion.div>
                <span className="text-lg">
                  {personalInfo.location.city}, {personalInfo.location.country}
                </span>
              </motion.div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <motion.div
                className="flex flex-col space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="flex items-center text-gray-700 dark:text-gray-300"
                  variants={linkVariants}
                  custom={0}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <svg
                      className="h-5 w-5 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <a
                    href={`mailto:${personalInfo.contact.email}`}
                    className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {personalInfo.contact.email}
                  </a>
                </motion.div>

                <motion.div
                  className="flex items-center text-gray-700 dark:text-gray-300"
                  variants={linkVariants}
                  custom={1}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <svg
                      className="h-5 w-5 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <a
                    href={`tel:${personalInfo.contact.phone}`}
                    className="text-lg hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    {personalInfo.contact.phone}
                  </a>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4 mt-2 pt-4 border-t border-gray-200 dark:border-gray-700"
                  variants={linkVariants}
                  custom={2}
                >
                  {personalInfo.links.map((link, index) => (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                      whileHover={{
                        scale: 1.2,
                        rotate: 5,
                        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {link.platform === "GitHub" ? (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Floating shapes for visual interest */}
        <div className="absolute top-20 left-10 z-0 opacity-20 dark:opacity-10">
          <motion.div
            className="w-20 h-20 rounded-full bg-blue-500"
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="absolute bottom-10 right-20 z-0 opacity-20 dark:opacity-10">
          <motion.div
            className="w-32 h-32 rounded-lg bg-purple-500 rotate-12"
            animate={{
              rotate: [12, -12, 12],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
      </div>
    </header>
  );
}
