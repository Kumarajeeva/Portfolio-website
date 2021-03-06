import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";
import ReactToolTip from "react-tooltip";
import {AppWrap,MotionWrap} from "../../wrapper";
import {urlFor,client} from "../../client";
import "./Skills.scss";

const Skills = () => {

  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query='*[_type=="education"]';
    const skillsQuery='*[_type=="skills"]';

    client.fetch(query)
      .then((data) =>{
        setEducation(data);
      })

      client.fetch(skillsQuery)
      .then((data) =>{
        setSkills(data);
      })
  }, [])

  return (
    <>
      <h2 className="head-text skills-heading">Skills & Education</h2>

      <div className="app__skills-container">
        <motion.div
          className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{opacity: [0,1]}}
              transition={{duration: 0.5}}
              className="app__skills-item app__flex"
              key={skills.name}
            >
              <div className="app__flex" style={{backgroundColor: skill.bgColor}}>
                <img src={urlFor(skill.icon)} alt={skill.name}/>
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="app__skills-edu">
            {education.map((education) => (
                <motion.div
                  className="app__skills-edu-item"
                  key={education.year}
                > 
                  <div className="app__skills-edu-year">
                    <p className="bold-text">{education.year}</p>
                  </div>
                  <motion.div className="app__skills-edu-works">
                    {education.works.map((work) => (
                      <>
                        <motion.div
                          whileInView={{opacity: [0,1]}}
                          transition={{duration: 0.5}}
                          className="app__skills-edu-work"
                          data-tip
                          data-for={work.name}
                          key={work.name}
                        >
                          <h4 className="bold-text">{work.name}</h4>
                          <p className="p-text">{work.company}</p>
                        </motion.div>
                        <ReactToolTip
                          id={work.name}
                          effect="solid"
                          arrowColor="#fff"
                          className="skills-tooltip"
                        >
                          {work.desc}
                        </ReactToolTip>
                      </>
                    ))}
                  </motion.div>
                </motion.div>
              ))}  
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills,"app__skills"), 
  "skills",
  "app__whitebg"
);