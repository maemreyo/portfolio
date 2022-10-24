import { FC } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Resume } from "../../models/data";
import { TimelineItem } from "./TimelineItem";

interface ITimeline {
  resume: Resume[];
}

export const Timeline: FC<ITimeline> = ({ resume }) => {
  return (
    <VerticalTimeline animate>
      {resume.map((value, key) => {
        return <TimelineItem key={key} item={value} index={key} />;
      })}
    </VerticalTimeline>
  );
};
