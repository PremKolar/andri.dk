import React from "react";
import { periodToString, TimelineItem } from "../cv/elements"

const Experience = ({data}) => {
  return (
    <div>
         {data.cvJson.work.slice(0, 100).map((w, idx) => (
            <TimelineItem
              idx={idx}
              key={`${w.company + w.startDate}`}
              title={w.position}
              employer={w.company}
              period={periodToString(w.startDate, w.endDate)}
              tags={w.skills}              
            >
              {w.summary}
            </TimelineItem>
          ))}   
    </div>
  );
};


export default Experience;

