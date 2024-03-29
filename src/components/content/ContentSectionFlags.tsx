import { faFlag, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { faFlag as faFlagRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VSC_Icon from "./../../assets/img/VSC.png";
import SC_Icon from "./../../assets/img/SC.png";
import Divided_Flag_Icon from "./../../assets/img/Divided_Flag.png";
import Stripes_Flag_Icon from "./../../assets/img/Stripes_Flag.png";
import { ContentSection } from "./ContentSection";

export const ContentSectionFlags = () => {
  return (
    <ContentSection title="Flags">
      <div className="grid grid-cols-2 mt-2 text-lg col-span-2">
        <div className="col-span-1">
          <div>
            <FontAwesomeIcon icon={faFlagCheckered} className="mr-2" />
            Checkered Flag
          </div>
          <div>
            <FontAwesomeIcon icon={faFlag} className="text-red-600 mr-2" />
            Red Flag
          </div>
          <div>
            <FontAwesomeIcon icon={faFlag} className="text-yellow-400 mr-2" />
            Yellow Flag
          </div>
          <div>
            <FontAwesomeIcon icon={faFlag} className="text-yellow-400 mr-2" />
            <FontAwesomeIcon icon={faFlag} className="text-yellow-400 mr-2" />
            Double Yellow Flag
          </div>
          <div>
            <FontAwesomeIcon icon={faFlag} className="text-yellow-400 mr-2" />
            <img
              src={SC_Icon}
              alt="Imagen de Bandera"
              className="inline-block mr-2 h-4"
            />
            Yellow Flag with SC
          </div>
          <div>
            <FontAwesomeIcon icon={faFlag} className="text-yellow-400 mr-2" />
            <img
              src={VSC_Icon}
              alt="Imagen de Bandera"
              className="inline-block mr-2 h-4"
            />
            Yellow Flag with VSC
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <FontAwesomeIcon icon={faFlag} className="text-green-600 mr-2" />
            Green Flag
          </div>
          <div>
            <FontAwesomeIcon icon={faFlag} className="text-blue-600 mr-2" />
            Blue Flag
          </div>
          <div>
            <img
              src={Stripes_Flag_Icon}
              alt="Imagen de Bandera"
              className="inline-block mr-2 h-4"
            />
            Yellow Flag With Red Stripes
          </div>
          <div>
            <img
              src={Divided_Flag_Icon}
              alt="Imagen de Bandera"
              className="inline-block mr-2 h-4"
            />
            Divided Flag
          </div>
          <div>
            <FontAwesomeIcon icon={faFlag} className="mr-2 dark:text-black" />
            Black Flag
          </div>
          <div>
            <FontAwesomeIcon
              icon={faFlagRegular}
              className="mr-2 dark:hidden"
            />
            <FontAwesomeIcon
              icon={faFlag}
              className="mr-2 hidden dark:text-white dark:inline-block"
            />
            White Flag
          </div>
        </div>
      </div>
    </ContentSection>
  );
};
