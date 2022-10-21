import { motion, useScroll, useSpring } from "framer-motion";
import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { NavBar } from "./components/Navbar";
import data from "./data.json";
import { UserData } from "./models/data";
import { generateImagePath } from "./utils/path";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const store: UserData = JSON.parse(JSON.stringify(data));

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <main className="container mx-auto">
        <NavBar />
        <Hero logo={generateImagePath(store.images.logo)} />
        <About profile={store.profile} />
      </main>
    </>
  );
}

export default App;
