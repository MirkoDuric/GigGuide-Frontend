import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";
import homepagebutton from "../css/Homepage.png";
import loginbutton from "../css/Login.png";
import signupbutton from "../css/Signup.png";
import localartistsbutton from "../css/localartists.png";
import logobutton from "../css/logo.png";

const Button = (props) => {
  const name = props.name;

  return name === "homepage" ? (
    <NavLink to={`/`}>
      <Image
        fluid={true}
        roundedCircle={true}
        src={homepagebutton}
        alt={name}
        className="buttons"
      ></Image>
    </NavLink>
  ) : name === "signup" ? (
    <NavLink to={`/${name}`}>
      <Image
        fluid={true}
        roundedCircle={true}
        src={signupbutton}
        alt={name}
        className="buttons"
      ></Image>
    </NavLink>
  ) : name === "login" ? (
    <NavLink to={`/${name}`}>
      <Image
        fluid={true}
        roundedCircle={true}
        src={loginbutton}
        alt={name}
        className="buttons"
      ></Image>
    </NavLink>
  ) : name === "localartists" ? (
    <NavLink to={`/${name}`}>
      <Image
        fluid={true}
        roundedCircle={true}
        src={localartistsbutton}
        alt={name}
        className="buttons"
      ></Image>
    </NavLink>
  ) : (
    <Image
      fluid={true}
      roundedCircle={true}
      src={logobutton}
      alt={name}
      className="buttons"
    ></Image>
  );
};

export default Button;
