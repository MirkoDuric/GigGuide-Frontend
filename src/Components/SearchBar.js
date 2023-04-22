import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { countryNames, genreNames } from "../utils";

import "../SearchBar.css";

const SearchBar = (props) => {
  return (
    <Form>
      <Row className="searchdiv">
        <Col className="mb-3 searchbar" controlId="search">
          <Form.Control
            type="search"
            placeholder="Search"
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <Row className="mb-3 subsearchdiv">
        <Col className="col">
          <Form.Control
            type="search"
            placeholder="City"
            onChange={props.onChangeCity}
          />
        </Col>
        <Col className="col">
          <Form.Select onChange={props.onChangeCountry} placeholder="Country">
            <option key="blankChoice" hidden value>
              {" "}
              --Country--{" "}
            </option>
            <option>None</option>
            {countryNames.map((countryName) => {
              return <option key={countryName}>{countryName}</option>;
            })}
          </Form.Select>
        </Col>
        <Col className="col">
          <Form.Select onChange={props.onChangeGenre} placeholder="Genre">
            <option key="blankChoice" hidden value>
              {" "}
              --Genre--{" "}
            </option>
            <option>None</option>
            {genreNames.map((genreName) => {
              return <option>{genreName}</option>;
            })}
          </Form.Select>
        </Col>
      </Row>
      <Col className="submitbuttondiv mb-3">
        <Button variant="primary" onClick={props.onClick}>
          Search
        </Button>
      </Col>
    </Form>
  );
};

export default SearchBar;
