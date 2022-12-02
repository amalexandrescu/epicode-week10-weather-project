import { Col, Row, Button, Container, ListGroup } from "react-bootstrap";
// import { FaTrash } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const SavedPlaces = () => {
  const savedPlaces = useSelector((state) => state.favorites.places);
  console.log("saved places", savedPlaces);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="custom">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col sm={12} md={6}>
            <ListGroup>
              {/* <ul style={{ listStyle: "none" }}> */}
              {savedPlaces.map((city, i) => (
                <ListGroup.Item
                  key={i}
                  className=" d-flex justify-content-between"
                >
                  <div
                    id="city-name-container"
                    onClick={() => {
                      navigate(`/${savedPlaces[i].city}`);
                    }}
                  >
                    {capitalizeFirstLetter(savedPlaces[i].city)}
                  </div>
                  <div
                    id="trash-icon-container"
                    className="ml-2"
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_SAVED_PLACES",
                        payload: i,
                      });
                    }}
                  >
                    <Icon.TrashFill />
                  </div>
                </ListGroup.Item>
              ))}
              {/* </ul> */}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SavedPlaces;
