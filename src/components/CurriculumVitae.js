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

  for (var [index, value] of data.cvJson.work.entries()) {
    indexDict[c] = makeDate(value);
    c++;
    items.push(
      makeVerticalTimelineElement(
        value,
        index,
        "work",
        "#f9c95a",
        <WorkIcon />,
        value.position,
        value.company,
        null,
        value.summary,
        value.link,
        value.skills
      )
    );
  }

  for (var [index, value] of data.cvJson.education.entries()) {
    indexDict[c] = makeDate(value);
    c++;
    items.push(
      makeVerticalTimelineElement(
        value,
        index,
        "edu",
        "#c37624",
        <SchoolIcon />,
        value.institution,
        value.studyType,
        value.area,
        value.thesis,
        value.thesislink,
        null
      )
    );
  }

  for (var [index, value] of data.cvJson.projects.entries()) {
    indexDict[c] = makeDate(value);
    c++;
    items.push(
      makeVerticalTimelineElement(
        value,
        index,
        "proj",
        "#bf9336",
        <StarIcon />,
        value.what,
        null,
        null,
        value.summary,
        value.link,
        value.technologies
      )
    );
  }

  for (var [index, value] of data.cvJson.classes.entries()) {
    indexDict[c] = makeDate(value);
    c++;
    items.push(
      makeVerticalTimelineElement(
        value,
        index,
        "classes",
        "#9b8654",
        <LocalLibraryIcon />,
        "Course",
        null,
        value.platform,
        value.name,
        value.link,
        value.technologies
      )
    );
  }

  // sort all items by endDate:
  items = items.sort(function (a, b) {
    return indexDict[items.indexOf(a)] - indexDict[items.indexOf(b)];
  });

  console.log(1);
  return <VerticalTimeline>{items.reverse()}</VerticalTimeline>;
};

function makeDate(value) {
  return value.endDate
    ? getDateNum(value.endDate)
    : getDateNum(value.startDate);
}

function makeVerticalTimelineElement(
  value,
  index,
  name,
  iconBGcolor,
  iconSymbol,
  title,
  subtitle,
  subsubtitle,
  coreText,
  coreLink,
  iterables
) {
  return (
    <VerticalTimelineElement
      className={"vertical-timeline-element-" + name + "--" + index}
      date={
        value.endDate
          ? value.startDate +
            " - " +
            (getDateNum(value.endDate) > Date.now() ? "ongoing" : value.endDate)
          : value.startDate
      }
      iconStyle={{ background: iconBGcolor, color: "#fff" }}
      icon={iconSymbol}
    >
      <h3 className="vertical-timeline-element-title">{title}</h3>
      <h4 className="vertical-timeline-element-subtitle">{subtitle}</h4>
      <h5 className="vertical-timeline-element-subtitle">{subsubtitle}</h5>
      <p>
        {coreLink ? (
          <Link to={coreLink} style={{ color: "#743411" }}>
            {coreText}
          </Link>
        ) : (
          coreText
        )}
      </p>
      <p>
        {value.highlights
          ? value.highlights.map((txt) => <div>{" • " + txt}</div>)
          : null}
      </p>
      <p>{makeTechnoItems(iterables)}</p>
      <p>{value.grade ? "Grade: " + value.grade : null}</p>
      <p>{value.info ? value.info : null}</p>
    </VerticalTimelineElement>
  );
}

// #######################################

function makeTechnoItems(technos) {
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
// #######################################

function getDateNum(s) {
  const regex = /\s+-\s+.*$/gi;
  let s_ = s.replace(regex, "");
  return Date.parse(s_);
}

export default CurriculumVitae;
