import "../css/Landingpage-slogan.css";
import sloganImg from "../css/Landingpageslogan.png";
const LandingpageSlogan = () => {
  return (
    <div className="slogan-container">
      <div className="slogan-layer"></div>
      <img src={sloganImg}></img>
    </div>
  );
};
export default LandingpageSlogan;
