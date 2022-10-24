import { ProgressBar } from "./common/ProgressBar";
import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { NavBar } from "./components/Navbar";
import { Resume } from "./components/Resume";
import data from "./data.json";
import { UserData } from "./models/data";
import { generateImagePath } from "./utils/path";

function App() {
  const store: UserData = JSON.parse(JSON.stringify(data));

  return (
    <>
      <ProgressBar />
      <main className="container mx-auto">
        {/* <NavBar /> */}
        <Hero logo={generateImagePath(store.images.logo)} />
        <About profile={store.profile} />
        <Resume resume={store.resume} />
      </main>
    </>
  );
}

export default App;
