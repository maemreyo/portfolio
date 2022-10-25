import { useEffect, useState } from "react";
import { getLeetcodeStats } from "../../providers/leetcode";

export const LeetCodeStats = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [leetcodeStats, setLeetcodeStats] = useState<any>(null);
  console.log(leetcodeStats);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLeetcodeStats();
      setLeetcodeStats(data);
    };

    fetchData();
  }, []);

  return <div>Leetcode</div>;
};
