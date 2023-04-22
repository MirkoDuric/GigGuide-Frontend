import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";

const Button = (props) => {
  const name = props.name;

  return name === "homepage" ? (
    <NavLink to={`/`}>
      <Image
        fluid={true}
        roundedCircle={true}
        src={`${process.env.REACT_APP_BACKEND_URL}/profile-pics/${name}.png`}
        alt={name}
        className="buttons"
      ></Image>
    </NavLink>
  ) : name !== "Logo" ? (
    <NavLink to={`/${name}`}>
      <Image
        fluid={true}
        roundedCircle={true}
        src={`${process.env.REACT_APP_BACKEND_URL}/profile-pics/${name}.png`}
        alt={name}
        className="buttons"
      ></Image>
    </NavLink>
  ) : (
    <Image
      fluid={true}
      roundedCircle={true}
      src={`${process.env.REACT_APP_BACKEND_URL}/profile-pics/${name}.png`}
      alt={name}
      className="buttons"
    ></Image>
  );
};

export default Button;
