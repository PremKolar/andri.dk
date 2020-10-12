import React from "react";
import { FaHeart } from "react-icons/fa";
import { SkillDataTransform, Skills } from "../components/skills/skills";



const Technology = ({data}) => {
  // const { data } = data;

  return (
    <div>
      
      <div className="pl-6 md:pl-0 text-sm mb-4 italic">
        Sorted by experience. Preference indicated by{" "}
        <FaHeart className="inline text-red-700" />
      </div>
      <SkillDataTransform
        workSkills={data.cvJson.work}
        rootSkills={data.cvJson.skills}
      >       
        {(categories) => (
          <Skills
            categories={categories}
            focus={[
              "React",
              "Go",
              "Linux",
              "TypeScript",
              "Postgres",
              "React Native",
              "Kubernetes",
            ]}
          />
        )}
      </SkillDataTransform>
    </div>
  );
};

export default Technology;
