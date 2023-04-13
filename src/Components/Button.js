import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";

const Button = (props) => {
  const name = props.name;

  return name !== "Logo" ? (
    <NavLink to={`/${name}`}>
      <Image
        fluid={true}
        roundedCircle={true}
        src={`http://localhost:8000/profile-pics/${name}.png`}
        alt={name}
        className="buttons"
      ></Image>
    </NavLink>
  ) : (
    <Image
      fluid={true}
      roundedCircle={true}
      src={`http://localhost:8000/profile-pics/${name}.png`}
      alt={name}
      className="buttons"
    ></Image>
  );
};

export default Button;
