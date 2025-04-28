import { promises as fs } from 'fs';
import path from 'path';
import { PortfolioData } from '@/types/portfolio';

// Components
import Header from '@/components/sections/Header';
import Summary from '@/components/sections/Summary';
import KeyHighlights from '@/components/sections/KeyHighlights';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Contributions from '@/components/sections/Contributions';
import Interests from '@/components/sections/Interests';
import Footer from '@/components/sections/Footer';
import Navigation from '@/components/ui/Navigation';
import ParallaxBackground, { ParallaxItem } from '@/components/animations/ParallaxBackground';
import PortfolioWithSplash from '@/components/PortfolioWithSplash';

export default async function Home() {
  // Read portfolio data from JSON file
  const filePath = path.join(process.cwd(), 'src/data/portfolioData.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const portfolioData: PortfolioData = JSON.parse(fileContents);

  // Portfolio content component
  const PortfolioContent = () => (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <Navigation personalInfo={portfolioData.personalInfo} />
      
      <main>
        <ParallaxBackground className="min-h-screen">
          <section id="about">
            <Header personalInfo={portfolioData.personalInfo} />
            <Summary profileSummary={portfolioData.profileSummary} />
            <KeyHighlights highlights={portfolioData.keyHighlights} />
          </section>
        </ParallaxBackground>
        
        <section id="experience">
          <Experience experiences={portfolioData.workExperience} />
        </section>
        
        <section id="skills">
          <Skills 
            skills={portfolioData.skills} 
            skillCategories={portfolioData.skillCategories} 
          />
        </section>
        
        <section id="education">
          <Education education={portfolioData.education} />
        </section>
        
        {portfolioData.contributionsAndActivities && (
          <section id="contributions">
            <Contributions contributions={portfolioData.contributionsAndActivities} />
          </section>
        )}
        
        {portfolioData.interests && (
          <section id="interests">
            <Interests interests={portfolioData.interests} />
          </section>
        )}
      </main>
      
      <section id="contact">
        <Footer personalInfo={portfolioData.personalInfo} />
      </section>
    </div>
  );

  return (
    <PortfolioWithSplash 
      portfolioData={portfolioData}
      portfolioContent={<PortfolioContent />}
    />
  );
}
