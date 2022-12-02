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

// Cart now needs to read/"write" to the store, reading the value
// of cart.content and being able to dispatch an action for removing
// an element from the cart!

// const Favorites = () => {
//   const favorites = useSelector((state) => state.jobs.favorites);
//   const dispatch = useDispatch();

//   return (
//     <Row>
//       <Col sm={12}>
//         <ul style={{ listStyle: "none" }}>
//           {favorites.map((job, i) => (
//             <li key={i} className="my-4">
//               <span
//                 className="text-danger mr-2"
//                 onClick={() => {
//                   dispatch({
//                     type: "REMOVE_FROM_FAVORITES",
//                     payload: i,
//                   });
//                 }}
//               >
//                 <Icon.TrashFill />
//               </span>
//               {job.title} at {job.company_name} Company
//             </li>
//           ))}
//         </ul>
//       </Col>
//     </Row>
//   );
// };

// export default Favorites
