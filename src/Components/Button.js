import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";

const Button = (props) => {
  const name = props.name;

  return (
    <NavLink to={`/${name}`}>
      <Image fluid={true} roundedCircle={true}>
        {name}
      </Image>
    </NavLink>
  );
};

export default Button;
