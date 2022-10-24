import { FC } from "react";
import { Resume as ResumeTypes } from "../../models/data";
import { Timeline } from "./Timeline";

interface IResume {
  resume: ResumeTypes[];
}
export const Resume: FC<IResume> = ({ resume }) => {
  return (
    <div id="resume" className="section !grid grid-cols-12 gap-16">
      <div className="relative col-span-10 col-start-2 text-center">
        <h1 className="text-center absolute top-0 left-0 right-0 text-[11vh] text-[#ffffff1a] -z-50 font-[900]">
          Resume
        </h1>
        <h2 className="text-[50px] text-white font-[700] mb-[1.5rem]">
          Resume
        </h2>
        <p>This is a timeline about what I did from the very first day.</p>
      </div>
      <div className="col-span-12">
        <Timeline resume={resume} />
      </div>
    </div>
  );
};
