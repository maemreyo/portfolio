import { About } from './components/About';
import { Hero } from './components/Hero';
import { NavBar } from './components/Navbar';

function App() {
  return (
    <main className="container mx-auto">
      <NavBar />
      <Hero />
      <About />
    </main>
  );
}

export default App;
