import VSC_Icon from "./../../../../assets/img/VSC.png";
import SC_Icon from "./../../../../assets/img/SC.png";
import Divided_Flag_Icon from "./../../../../assets/img/Divided_Flag.png";
import Stripes_Flag_Icon from "./../../../../assets/img/Stripes_Flag.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { faFlag as faFlagRegular } from "@fortawesome/free-regular-svg-icons";

export const SectionFlags = () => {
    return (
        <div className="seccion">
            <div className="titulo__seccion">Flags</div>
            <div className="grid__seccion">
                <div className="subgrid__seccion">
                    <div className="info__seccion">
                        <FontAwesomeIcon icon={faFlagCheckered} />
                        Checkered Flag
                    </div>
                    <div className="info__seccion">
                        <FontAwesomeIcon icon={faFlag} className="red" />
                        Red Flag
                    </div>
                    <div className="info__seccion">
                        <FontAwesomeIcon icon={faFlag} className="yellow" />
                        Yellow Flag
                    </div>
                    <div className="info__seccion">
                        <FontAwesomeIcon icon={faFlag} className="yellow" />
                        <FontAwesomeIcon icon={faFlag} className="yellow" />
                        Double Yellow Flag
                    </div>
                    <div className="info__seccion">
                        <FontAwesomeIcon icon={faFlag} className="yellow" />
                        <img src={SC_Icon} className="icon__flag" />
                        Yellow Flag with SC
                    </div>
                    <div className="info__seccion">
                        <FontAwesomeIcon icon={faFlag} className="yellow" />
                        <img src={VSC_Icon} className="icon__flag" />
                        Yellow Flag with VSC
                    </div>
                </div>
                <div className="subgrid__seccion">
                    <div className="info__seccion">
                        <FontAwesomeIcon icon={faFlag} className="green" />
                        Green Flag
                    </div>
                    <div className="info__seccion">
                        <FontAwesomeIcon icon={faFlag} className="blue" />
                        Blue Flag
                    </div>
                    <div className="info__seccion">
                        <img src={Stripes_Flag_Icon} className="icon__flag" />
                        Yellow Flag With Red Stripes
                    </div>
                    <div className="info__seccion">
                        <img src={Divided_Flag_Icon} className="icon__flag" />
                        Divided Flag
                    </div>
                    <div className="info__seccion">
                        <FontAwesomeIcon icon={faFlag} />
                        Black Flag
                    </div>
                    <div className="info__seccion">
                        <FontAwesomeIcon icon={faFlagRegular} />
                        White Flag
                    </div>
                </div>
            </div>
        </div>
    )
}