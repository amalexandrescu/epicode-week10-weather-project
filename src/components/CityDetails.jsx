import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const CityDetails = () => {
  const params = useParams();

  const [date, SetDate] = useState("");
  const [searchResult, SetSearchResult] = useState(null);

  const mainUrl = `https://api.openweathermap.org/data/2.5/weather?q=${params.cityName}&appid=5cab541229df0ed7c8f30d451c690442&units=metric`;
  const fetchCityWeatherByName = async (url) => {
    if (params.cityName !== "") {
      try {
        const response = await fetch(url);
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
    fetchCityWeatherByName(mainUrl);
  }, []);

  return (
    searchResult && (
      <div className="custom py-5">
        <Container className="custom-background-color py-5 rounded">
          <h1 className="text-light">
            {searchResult.name}, {searchResult.sys.country}
          </h1>
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <h4 className="text-light">{date}</h4>
              <ListGroup variant="flush" className="rounded">
                <ListGroup.Item className="d-flex justify-content-between">
                  <div className="font-weight-bold">Temp:</div>
                  <div>{Math.floor(searchResult.main.temp)} °C</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <div className="font-weight-bold">Real feel:</div>
                  <div>{Math.floor(searchResult.main.feels_like)} °C</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <div className="font-weight-bold">Overall:</div>
                  <div>{searchResult.weather[0].description}</div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center mr-2 font-weight-bold">
                      Coordinates:
                    </div>
                    <div>
                      <div className="d-flex justify-content-end">
                        Latitude:{searchResult.coord.lat}
                      </div>
                      <div className="d-flex justify-content-end">
                        Longitude: {searchResult.coord.lon}
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <div className="font-weight-bold">Humidity:</div>
                  <div>{searchResult.main.humidity} %</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <div className="font-weight-bold">Pressure:</div>
                  <div>{searchResult.main.pressure} hPa</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <div className="font-weight-bold">Wind (speed):</div>
                  <div>{searchResult.wind.speed} meters/sec</div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <div className="font-weight-bold">Wind Gusts:</div>
                  <div>{searchResult.wind.gust} meters/sec</div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  );
};

export default CityDetails;
