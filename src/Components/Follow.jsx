import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin , FaGithub  } from "react-icons/fa";


const FollowOn = () => {
  return (
    <div
      className="faded-text pt-2" //custom - faded-text
    >
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="https://www.linkedin.com/in/surajsavle">
          <FaLinkedin size={20} />
        </a>
        <a href="/">
          <FaInstagram size={20} />
        </a>
        <a href="https://github.com/suraj-savle">
          <FaGithub size={20} />
        </a>
      </div>
    </div>
  );
};

export default FollowOn;