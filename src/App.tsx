import { ProgressBar } from "./common/ProgressBar";
import { About } from "./components/About";
import { GithubStats } from "./components/GithubStats";
import { Hero } from "./components/Hero";
import { LeetCodeStats } from "./components/Leetcode";
import { Resume } from "./components/Resume";
import data from "./data.json";
import { UserData } from "./models/data";
import { generateImagePath } from "./utils/path";

function App() {
  const store: UserData = JSON.parse(JSON.stringify(data));

  return (
    <>
      <ProgressBar />
      <main className="container mx-auto mb-48">
        <Hero logo={generateImagePath(store.images.logo)} />
        <About profile={store.profile} />
        <Resume resume={store.resume} />
        <GithubStats />
        {/* <LeetCodeStats /> */}
      </main>
    </>
  );
}

export default App;
