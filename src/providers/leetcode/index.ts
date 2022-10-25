/**
 * Follow this link: https://github.com/JeremyTsaii/leetcode-stats-api
 * @param username
 * @returns leetcode stats
 */
const getLeetcodeStats = async (
  username = process.env.REACT_APP_GH_USERNAME
) => {
  const response = await fetch(
    `https://leetcode-stats-api.herokuapp.com/${username}`
  );
  const data = await response.json();
  return data;
};

export { getLeetcodeStats };
