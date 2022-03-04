import React from "react";
import {BsGithub, BsLinkedin} from "react-icons/bs";

const SocialMedia = () => {
  return (
    <div className="app__social">
        <div>
          <a href="https://github.com/Kumarajeeva?tab=repositories">
            <BsGithub />
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/kumarajeeva-elavarasan-3289641a9/">
            <BsLinkedin/>
          </a>
        </div>
    </div>
  )
}

export default SocialMedia;