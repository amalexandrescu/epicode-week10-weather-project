import { useState } from "react";
import { InputGroup, Form, Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

let recents = [];
let singleSearch = [];

const HomePage = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchCityData = async (search) => {
    if (search !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=5cab541229df0ed7c8f30d451c690442&units=metric`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          console.log("Recents", recents);
          const result = await response.json();
          console.log(result);

          if (recents.slice(0, 3).includes(search) === false) {
            recents.unshift(search);
            // console.log("-----------------");
            let single = await result;
            singleSearch.unshift(single);
            // console.log("single search", singleSearch);
            // console.log("-----------------");
          }
        } else {
          console.log("An error occured while fetching :(");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container fluid className=" custom">
      <Row className=" py-5 justify-content-center ">
        <Col xs={12} md={6}>
          <InputGroup className="mb-3 w-100">
            <Form.Control
              id="search"
              placeholder="search location"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <Button
              className="rounded-right"
              id="custom-search-button"
              onClick={() => {
                fetchCityData(search);
                navigate(`/${search}`);
              }}
            >
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row className="justify-content-center text-light">
        <Col xs={12} md={6}>
          {recents.length !== 0 && (
            <h5 className="d-flex justify-content-start">Recent searches:</h5>
          )}

          <div className="d-flex justify-content-between">
            {recents.slice(0, 3).map((search, index) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/${search}`);
                  }}
                  key={index}
                  className={
                    recents.length <= 2
                      ? "custom-recent-search d-flex flex-column justify-content-between align-items-start py-3 rounded text-light"
                      : "custom-recent-search-smaller d-flex flex-column justify-content-between align-items-start py-3 rounded text-light"
                  }
                >
                  <div className="px-2">
                    {singleSearch[index].name},{" "}
                    {singleSearch[index].sys.country}
                  </div>
                  {/* <div>{singleSearch.sys.country}</div> */}
                  <div className="d-flex">
                    <div className="weather-icon-div d-flex justify-content-center align-items-center">
                      <img
                        src={`http://openweathermap.org/img/wn/${singleSearch[index].weather[0].icon}@2x.png`}
                        alt="weather-icon"
                      ></img>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      {Math.floor(singleSearch[index].main.temp)}°C
                    </div>
                  </div>

                  <div className="px-2">
                    Real feel: {Math.floor(singleSearch[index].main.feels_like)}
                    °C
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
