import { FC } from "react";
import { AnimatedBlock } from "../../common/AnimatedBlock";
import { Animation } from "../../common/AnimatedBlock/animations";
import { Profile } from "../../models/data";
import { formatTime } from "../../utils/time";
import "./about.scss";
interface IAbout {
  profile: Profile;
}

export const About: FC<IAbout> = ({ profile }) => {
  return (
    <div id="about" className="section !grid grid-cols-12 gap-16 ">
      <div className="lg:col-span-7 md:col-span-12 sm:col-span-12">
        <div className="w-full z-0 h-full bg-cover bg-no-repeat bg-center !items-stretch !flex">
          <div className="about-cover w-full lg:h-screen md:h-[50vh] z-1 relative bg-cover bg-no-repeat bg-center !items-stretch !flex box-border"></div>
        </div>
      </div>
      <AnimatedBlock
        className="justify-end items-center lg:col-span-5 md:col-span-10 relative pl-8"
        animation={Animation.ttb}
      >
        <h1 className="absolute -top-16 left-8 text-[11vh] text-[#ffffff1a] -z-50 font-[900]">
          About
        </h1>
        <h2 className="text-[50px] font-[700] text-white">About me</h2>
        <p className="mb-12">Some basic information about myself!</p>
        <ul className="inline-block p-0 m-0 w-full list-none">
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/4 md:w-1/3">Name:</span>
            <span>{profile.name}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/4 md:w-1/3">
              Nickname:
            </span>
            <span>{profile.nickname}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/4 md:w-1/3">
              Date of birth:
            </span>
            <span>{formatTime(profile.dob, "LL")}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/4 md:w-1/3">
              Address:
            </span>
            <span>{profile.address}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/4 md:w-1/3">
              Zip code:
            </span>
            <span>{profile.zipCode}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/4 md:w-1/3">Email:</span>
            <span>{profile.email}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/4 md:w-1/3">Phone:</span>
            <span>{profile.phone}</span>
          </li>
        </ul>
      </AnimatedBlock>
    </div>
  );
};
