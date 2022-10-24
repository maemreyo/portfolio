import { FC } from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { Resume } from "../../models/data";
import { toCapitalize } from "../../utils/string";
import { getTime } from "../../utils/time";
import { Link } from "../../common/Anchor";
import { getColorByIndex } from "../../utils/color";
import { ReactComponent as Learning } from "../../resources/svg/learning.svg";
import { ReactComponent as Working } from "../../resources/svg/working.svg";
import { Badge, Chip } from "@mui/material";

interface ITimelineItem {
  item: Resume;
  index: number;
}

export const TimelineItem: FC<ITimelineItem> = ({ item, index }) => {
  const icon = item.type === "learning" ? <Learning /> : <Working />;

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      date={getTime(item.fromDate, item.toDate)}
      icon={icon}
      contentStyle={{
        background: getColorByIndex(index),
        color: "#fff",
      }}
      iconStyle={{
        background: "#ffe062",
        color: "#000",
      }}
    >
      <h3 className="vertical-timeline-element-title font-semibold text-xl">
        <span>{toCapitalize(item.role)} at </span>
        <Link
          className="italic underline underline-offset-2"
          value={item.organization.link}
        >
          {item.organization.name}
        </Link>
      </h3>
      <h4 className="vertical-timeline-element-subtitle">
        {toCapitalize(item.location)}
      </h4>
      {item.description.map((value, key) => (
        <p key={key}>{value}</p>
      ))}
      <br />
      <>
        {item.accquiredKnowledge.map((value, key) => (
          <Badge
            key={key}
            badgeContent={value.isNew ? "New" : null}
            className="mr-4 mb-4"
            color="error"
          >
            <Chip
              className="font-[900] italic"
              label={value.name}
              onClick={() => false}
              color="info"
            />
          </Badge>
        ))}
      </>
    </VerticalTimelineElement>
  );
};
