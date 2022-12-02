import { useEffect, useState } from "react";
import { Col, Container, Row, ListGroup, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_SAVED_PLACES } from "../redux/reducers";

const CityWeather = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedPlaces = useSelector((state) => state.favorites.places);

  const [clickedHeart, SetClickedHeart] = useState(undefined);

  const cityNamePath = location.pathname.substring(1);
  console.log(cityNamePath);

  const [date, SetDate] = useState("");
  const [searchResult, SetSearchResult] = useState(null);

  const fetchCityWeatherByName = async () => {
    if (cityNamePath !== "") {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityNamePath}&appid=5cab541229df0ed7c8f30d451c690442&units=metric`
        );
        if (response.ok) {
          const result = await response.json();
          SetDate(format(new Date(), "MMMM do yyyy - H:mm"));
          SetSearchResult(result);
        } else {
          console.log("An error occured while fetching :(");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchCityWeatherByName();
  }, []);

  useEffect(() => {
    if (searchResult) {
      SetClickedHeart(
        savedPlaces.find((place) => place.id === searchResult.id)
      );
    }
  }, [searchResult, savedPlaces]);

  return (
    searchResult && (
      <div className="custom py-5">
        <Container className="custom-background-color rounded">
          <h1 className="text-light">
            {searchResult.name}, {searchResult.sys.country}
            <Icon.HeartFill
              className={
                clickedHeart !== undefined
                  ? "ml-4 text-danger"
                  : " ml-4 text-secondary"
              }
              onClick={() => {
                if (clickedHeart === undefined) {
                  dispatch({
                    type: ADD_TO_SAVED_PLACES,
                    payload: {
                      city: cityNamePath,
                      clicked: true,
                      id: searchResult.id,
                    },
                  });
                } else {
                  dispatch({
                    type: "REMOVE",
                    payload: searchResult.id,
                  });
                }
              }}
            />
          </h1>
          <Row className="text-left">
            <Col xs={12} md={6}>
              <div className="d-flex flex-column justify-content-between mt-2 text-light">
                <h4>Current Weather</h4>
                <div className="font-weight-bold">{date}</div>
                <div className="d-flex">
                  <div className=" d-flex justify-content-center align-items-center">
                    <Icon.ThermometerHalf className="custom-thermometer-icon" />
                  </div>
                  <div className="d-flex flex-column ml-3">
                    <span className="font-weight-bold">
                      {Math.floor(searchResult.main.temp)} °C
                    </span>
                    <span>
                      <span className="font-weight-bold">Real feel: </span>
                      <span>{Math.floor(searchResult.main.feels_like)} °C</span>
                    </span>
                  </div>
                </div>
                <div className="font-weight-bold">
                  {searchResult.weather[0].description}
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="d-flex flex-column">
                <div className=" mt-2">
                  <ListGroup variant="flush" className="rounded">
                    <ListGroup.Item className="d-flex justify-content-between">
                      <div className="font-weight-bold">Wind (speed):</div>
                      <div>{searchResult.wind.speed} meters/sec</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <div className="font-weight-bold">Wind Gusts:</div>
                      <div>{searchResult.wind.gust} meters/sec</div>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                <div className="d-flex justify-content-end my-2">
                  <Button
                    variant="info"
                    onClick={() => {
                      navigate(`/${cityNamePath}/details`);
                    }}
                  >
                    More Details
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  );
};

export default CityWeather;
