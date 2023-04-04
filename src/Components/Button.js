import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";

const Button = (props) => {
  const name = props.name;

  return (
    <NavLink to={`/${name}`}>
      <Image
        fluid={true}
        roundedCircle={true}
        src={`http://localhost:8000/profile-pics/${name}.png`}
        alt={name}
        style={{
          width: "auto",
          height: "3rem",
          marginRight: "0.5rem",
          marginLeft: "0.5rem",
        }}
      ></Image>
    </NavLink>
  );
};

export default Button;
