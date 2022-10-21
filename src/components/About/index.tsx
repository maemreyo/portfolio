import { FC } from 'react';
import { AnimatedBlock } from '../../common/AnimatedBlock';
import { Profile } from '../../models/data';
import './about.scss';
interface IAbout {
  profile: Profile;
}

export const About: FC<IAbout> = ({ profile }) => {
  return (
    <div id="about" className="grid grid-cols-12 gap-16">
      <div className="col-span-5 col-start-3">
        <div className="w-full z-0 h-full bg-cover bg-no-repeat bg-center !items-stretch !flex">
          <AnimatedBlock className="about-cover w-full h-full z-1 relative bg-cover bg-no-repeat bg-center !items-stretch !flex box-border"></AnimatedBlock>
        </div>
      </div>
      <div className="justify-end items-center col-span-5 relative pl-8">
        <h1 className="absolute -top-16 left-8 text-[7vw] text-[#ffffff1a] -z-50 font-[900]">
          About
        </h1>
        <h2 className="text-[50px] font-[700] text-white">About me</h2>
        <p className="mb-12">Some basic information about myself!</p>
        <ul className="inline-block p-0 m-0 w-full list-none">
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/5">Name:</span>
            <span>{profile.name}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/5">Nickname:</span>
            <span>{profile.nickname}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/5">Date of birth:</span>
            <span>{profile.dob}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/5">Address:</span>
            <span>{profile.address}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/5">Zip code:</span>
            <span>{profile.zipCode}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/5">Email:</span>
            <span>{profile.email}</span>
          </li>
          <li className="flex mb-3">
            <span className="font-[600] text-white w-1/5">Phone:</span>
            <span>{profile.phone}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
