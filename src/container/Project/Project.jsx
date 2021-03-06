import React, {useState, useEffect} from "react";
import {AiFillEye, AiFillGithub} from "react-icons/ai";
import {motion} from "framer-motion";
import {AppWrap, MotionWrap} from "../../wrapper";
import {urlFor,client} from "../../client";
import "./Project.scss";

const tabs= ["React", "MERN Full Stack", "Node JS with MongoDB","All"];
const Project = () => {
  const [activeFilter, setActiveFilter] = useState("React");
  const [animateCard, setAnimateCard] = useState({y: 0, opacity: 1});
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  useEffect(() => {
    const query='*[_type=="works"]';

    client.fetch(query)
      .then((data) =>{
        setWorks(data);
        setFilterWork(data.filter((datum) => datum.tags.includes("React")));
      })
  }, [])

  
  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{y: 100, opacity: 0}]);

    setTimeout(() => {
      setAnimateCard([{y: 0, opacity: 1}]);

      if(item==="All"){
        setFilterWork(works);
      } else{
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    },500);
  }

  return (

    <>
      <h2 className="head-text project-heading">
        My Sample<span> Projects </span>Section
      </h2> 

      <div className="app__work-filter">
        {tabs.map((item,index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className = {`app__work-filter-item app__flex p-text ${activeFilter === item ? "item-active" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
          animate={animateCard}
          transition={{duration: 0.5, delayChildren: 0.5}}
          className="app__work-portfolio"
      >
          {filterWork.map((work, index) => ( 
            <div className="app__work-item app__flex" key={index}>
              <div className="app__work-img app__flex">
                <img src={urlFor(work.imgUrl)} alt={work.name} />

                <motiondiv
                  whileHover={{opacity: [0, 1]}}
                  transition={{duration: 0.25, ease: "easeInOut", staggerChildren: 0.5}}
                  className="app__work-hover app__flex"  
                >
                  <a href={work.projectLink} target="_blank" rel="noreferrer">
                    
                    <motiondiv
                      whileInView={{scale: [0,1]}}
                      whileHover={{scale: [1, 0.9]}}
                      transition={{duration: 0.25}}
                      className="app__flex" 
                    >
                      <AiFillEye/>
                    </motiondiv>
                  </a>
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motiondiv
                      whileInView={{scale: [0,1]}}
                      whileHover={{scale: [1, 0.9]}}
                      transition={{duration: 0.25}}
                      className="app__flex" 
                    >
                      <AiFillGithub/>
                    </motiondiv>
                  </a>
                </motiondiv>
              </div>
              
              <div className="app__work-content app_flex">
                <h4 className=""bold-text>{work.title}</h4>
                <p className="p-text" style={{marginTop: 10}}>{work.description}</p>
                
                <div className="app__work-tag app__flex">
                  <p className="p-text">{work.tags[0]}</p>
                </div>
              </div>

            </div>
          ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Project,"app__works"), 
  "projects",
  "app__primarybg"
);