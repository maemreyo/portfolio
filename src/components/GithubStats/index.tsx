/**
 * Follow this link: https://github.com/anuraghazra/github-readme-stats
 * to generate markdowns.
 */

export const GithubStats = () => {
  return (
    <div id="github-stats" className="mt-24">
      <div className="relative col-span-10 col-start-2 text-center mb-12">
        <h1 className="text-center absolute top-0 left-0 right-0 text-[11vh] text-[#ffffff1a] -z-50 font-[900]">
          Github
        </h1>
        <h2 className="text-[50px] text-white font-[700] mb-[1.5rem]">
          Github
        </h2>
        <p>This is what I did on Github.</p>
      </div>
      <div className="flex flex-col container">
        <div className="flex justify-around">
          <img
            src={`${process.env.REACT_APP_GIT_STATS}?username=maemreyo&show_icons=true&theme=nightowl`}
          />
          <img
            src={`${process.env.REACT_APP_GIT_STREAK}?user=maemreyo&theme=nightowl`}
          />
        </div>
      </div>
    </div>
  );
};
