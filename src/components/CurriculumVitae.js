import React from "react";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";
import StarIcon from "@material-ui/icons/Star";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import Link from "gatsby-link";

const CurriculumVitae = ({ data }) => {
  var items = [];
  let c = 0;
  var indexDict = [];
  const wrks = data.cvJson.work;
  for (var [index, value] of wrks.entries()) {
    indexDict[c] = value.endDate
      ? getDateNum(value.endDate)
      : getDateNum(value.startDate);
    c++;
    items.push(
      <VerticalTimelineElement
        className={"vertical-timeline-element--work" + index}
        // contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        // contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        date={value.startDate + " - " + value.endDate}
        iconStyle={{ background: "#f9c95a", color: "#fff" }}
        icon={<WorkIcon />}
      >
        <h3 className="vertical-timeline-element-title">{value.position}</h3>
        <h4 className="vertical-timeline-element-subtitle">{value.company}</h4>
        <p>
          {value.link ? (
            <Link to={value.link} style={{ color: "#743411" }}>
              {value.summary}
            </Link>
          ) : (
            value.summary
          )}
        </p>
        <p>
          {value.highlights
            ? value.highlights.map((txt) => <div>{" • " + txt}</div>)
            : null}
        </p>
        <p>{makeTechnoItems(value.skills)}</p>
      </VerticalTimelineElement>
    );
  }
  const edus = data.cvJson.education;
  for (var [index, value] of edus.entries()) {
    indexDict[c] = value.endDate
      ? getDateNum(value.endDate)
      : getDateNum(value.startDate);
    c++;
    items.push(
      <VerticalTimelineElement
        className={"vertical-timeline-element--edu" + index}
        date={value.startDate + " - " + value.endDate}
        iconStyle={{ background: "#c37624", color: "#fff" }}
        icon={<SchoolIcon />}
      >
        <h3 className="vertical-timeline-element-title">{value.studyType}</h3>
        <h4 className="vertical-timeline-element-subtitle">{value.area}</h4>
        <p>
          {value.thesis ? (
            <Link to={value.thesislink} style={{ color: "#743411" }}>
              {"Thesis: " + value.thesis}
            </Link>
          ) : null}
        </p>
        <p>{value.grade ? "Grade: " + value.grade : null}</p>
      </VerticalTimelineElement>
    );
  }
  const projs = data.cvJson.projects;
  for (var [index, value] of projs.entries()) {
    indexDict[c] = value.endDate
      ? getDateNum(value.endDate)
      : getDateNum(value.startDate);
    c++;
    items.push(
      <VerticalTimelineElement
        className={"vertical-timeline-element--proj" + index}
        date={
          value.endDate
            ? value.startDate + " - " + value.endDate
            : value.startDate + " - ongoing"
        }
        iconStyle={{ background: "#bf9336", color: "#fff" }}
        icon={<StarIcon />}
      >
        <h3 className="vertical-timeline-element-title">{value.what}</h3>
        <p>{value.summary}</p>
        <p>{makeTechnoItems(value.technologies)}</p>
      </VerticalTimelineElement>
    );
  }

  const clss = data.cvJson.classes;
  for (var [index, value] of clss.entries()) {
    indexDict[c] = value.endDate
      ? getDateNum(value.endDate)
      : getDateNum(value.startDate);
    c++;
    items.push(
      <VerticalTimelineElement
        className={"vertical-timeline-element--clss" + index}
        date={value.startDate}
        iconStyle={{ background: "#9b8654", color: "#fff" }}
        icon={<LocalLibraryIcon />}
      >
        <h3 className="vertical-timeline-element-title">University Course</h3>
        <p>{value.name}</p>
        <p>{makeTechnoItems(value.technologies)}</p>
      </VerticalTimelineElement>
    );
  }

  items = items.sort(function (a, b) {
    return indexDict[items.indexOf(a)] - indexDict[items.indexOf(b)];
  });

  console.log(1);
  return <VerticalTimeline>{items.reverse()}</VerticalTimeline>;
};

export function makeTechnoItems(technos) {
  if (!technos) {
    return null;
  }
  return (
    <div className="">
      {technos &&
        technos.map((s) => (
          <span
            key={s}
            className="andri-tag"
            style={{
              backgroundColor: "#DAA520",
            }}
          >
            {s}
          </span>
        ))}
    </div>
  );
}

function getDateNum(s) {
  const regex = /\s+-\s+.*$/gi;
  let s_ = s.replace(regex, "");
  return Date.parse(s_);
}

export default CurriculumVitae;
// const CurriculumVitae = ({ data }) => {
//   return (
//     <VerticalTimeline>
//       <VerticalTimelineElement
//         className="vertical-timeline-element--work"
//         contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
//         contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
//         date="2011 - present"
//         iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
//         icon={<work />}
//       >
//         <h3 className="vertical-timeline-element-title">Creative Director</h3>
//         <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
//         <p>
//           Creative Direction, User Experience, Visual Design, Project
//           Management, Team Leading
//         </p>
//       </VerticalTimelineElement>
//       <VerticalTimelineElement
//         className="vertical-timeline-element--work"
//         date="2010 - 2011"
//         iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
//         icon={<work />}
//       >
//         <h3 className="vertical-timeline-element-title">Art Director</h3>
//         <h4 className="vertical-timeline-element-subtitle">
//           San Francisco, CA
//         </h4>
//         <p>
//           Creative Direction, User Experience, Visual Design, SEO, Online
//           Marketing
//         </p>
//       </VerticalTimelineElement>
//       <VerticalTimelineElement
//         className="vertical-timeline-element--work"
//         date="2008 - 2010"
//         iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
//         icon={<work />}
//       >
//         <h3 className="vertical-timeline-element-title">Web Designer</h3>
//         <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
//         <p>User Experience, Visual Design</p>
//       </VerticalTimelineElement>
//       <VerticalTimelineElement
//         className="vertical-timeline-element--work"
//         date="2006 - 2008"
//         iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
//         icon={<work />}
//       >
//         <h3 className="vertical-timeline-element-title">Web Designer</h3>
//         <h4 className="vertical-timeline-element-subtitle">
//           San Francisco, CA
//         </h4>
//         <p>User Experience, Visual Design</p>
//       </VerticalTimelineElement>
//       <VerticalTimelineElement
//         className="vertical-timeline-element--education"
//         date="April 2013"
//         iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
//         icon={<school />}
//       >
//         <h3 className="vertical-timeline-element-title">
//           Content Marketing for Web, Mobile and Social Media
//         </h3>
//         <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
//         <p>Strategy, Social Media</p>
//       </VerticalTimelineElement>
//       <VerticalTimelineElement
//         className="vertical-timeline-element--education"
//         date="November 2012"
//         iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
//         icon={<school />}
//       >
//         <h3 className="vertical-timeline-element-title">
//           Agile Development Scrum Master
//         </h3>
//         <h4 className="vertical-timeline-element-subtitle">Certification</h4>
//         <p>Creative Direction, User Experience, Visual Design</p>
//       </VerticalTimelineElement>
//       <VerticalTimelineElement
//         className="vertical-timeline-element--education"
//         date="2002 - 2006"
//         iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
//         icon={<school />}
//       >
//         <h3 className="vertical-timeline-element-title">
//           Bachelor of Science in Interactive Digital Media Visual Imaging
//         </h3>
//         <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
//         <p>Creative Direction, Visual Design</p>
//       </VerticalTimelineElement>
//       <VerticalTimelineElement
//         iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
//         icon={<star_rate />}
//       />
//     </VerticalTimeline>
//   );
// };
