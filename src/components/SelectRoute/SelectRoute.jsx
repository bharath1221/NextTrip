import {useCallback, useState, useEffect, useRef} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {
  Tabs,
  TimeSlot,
  StopForm,
  Route,
  Direction,
  Stop,
} from "../../components";
import "./SelectRoute.css";

const tabData = ["By route", "By stop #"];

const baseUrl = process.env.REACT_APP_BASE_URL;
const routeUrl = `${baseUrl}/routes`;
const directionUrl = `${baseUrl}/directions`;
const stopUrl = `${baseUrl}/stops`;

const SelectRoute = () => {
  let stopIdInterval = useRef(null);
  let routeDirectionStopInterval = useRef(null);
  let params = useParams();
  let navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(params.stopId ? 1 : 0);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedStop, setSelectedStop] = useState("");
  const [route, setRoute] = useState(null);
  const [direction, setDirection] = useState(null);
  const [timeSlot, setTimeSlot] = useState(null);
  const [stop, setStop] = useState(null);
  const [apiError, setApiError] = useState("");
  const [stopError, setStopError] = useState("");

  /**
   * Helper function to fetch data
   * @params
   * @url - string
   */
  const fetchData = useCallback(async (url) => {
    setApiError("");
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data?.status && data?.status !== 200) {
        throw new Error(data.detail);
      }
      return data;
    } catch (e) {
      setApiError(e.message);
      setTimeSlot(null);
      console.error(e.message);
    }
  }, []);

  /**
   * Fetch route data
   */
  useEffect(() => {
    if (route === null) {
      (async function () {
        const routeData = await fetchData(routeUrl);
        if (routeData) {
          setRoute(routeData);
        }
        
      })();
    }
  }, [route, fetchData]);

  /**
   * Fetch direction data
   * Everytime when route changes
   */
  useEffect(() => {
    if (selectedRoute) {
      (async function () {
        const directionData = await fetchData(`${directionUrl}/${selectedRoute}`);
        if (directionData) {

          setDirection(directionData);
        }
      })();
    }
  }, [selectedRoute, fetchData]);

  /**
   * Fetch stop data
   * Everytime when direction changes
   */
  useEffect(() => {
    if (selectedDirection && selectedRoute) {
      (async function () {
        const stopData = await fetchData(`${stopUrl}/${selectedRoute}/${selectedDirection}`);
        if (stopData) {
          setStop(stopData);
        }
      })();
    }
  }, [selectedDirection, selectedRoute, fetchData]);

  /**
   * Fetch time list and
   * Redirect to the relevent url
   */
  useEffect(() => {
    if (selectedDirection && selectedRoute && selectedStop) {
      (async function () {
        const timeSlotData = await fetchData(
          `${baseUrl}/${selectedRoute}/${selectedDirection}/${selectedStop}`
        );
        if (timeSlotData) {
          const timeSlotData = await fetchData(
            `${baseUrl}/${selectedRoute}/${selectedDirection}/${selectedStop}`
          )
          if (timeSlotData) {
            setTimeSlot(timeSlotData);
            navigate(`/${selectedRoute}/${selectedDirection}/${selectedStop}`);
          }
        }
        
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDirection, selectedRoute, selectedStop]);

  /**
   * Fetch time list
   * On page load if directly url hits
   */
  useEffect(() => {
    if (
      !selectedDirection &&
      !selectedRoute &&
      !selectedStop &&
      params.route &&
      params.direction &&
      params.stop
    ) {
      (async function () {
        const timeSlotData = await fetchData(
          `${baseUrl}/${params.route}/${params.direction}/${params.stop}`
        );
        if (timeSlotData) {
          setTimeSlot(timeSlotData);
        }
      })();
    }
  }, [
    params.route,
    params.direction,
    params.stop,
    selectedDirection,
    selectedRoute,
    selectedStop,
    fetchData,
  ]);

  const handleStopApiError = useCallback((message) => {
    setApiError("");
    setStopError(message);
  }, []);

  const handleReset = useCallback(() => {
    clearInterval(stopIdInterval.current);
    clearInterval(routeDirectionStopInterval.current);
    setSelectedRoute("");
    setDirection(null);
    setTimeSlot(null);
    setStop(null);
  }, []);

  /**
   * Fetch timeslot data on every 20s
   * Based on the url params
   * Params like stopId  or route, direction and stop
   */
  useEffect(() => {
    clearInterval(routeDirectionStopInterval.current);
    clearInterval(stopIdInterval.current);
   
    if (params.stopId) {
      stopIdInterval.current = setInterval(async () => {
        const timeSlotData = await fetchData(`${baseUrl}/${params.stopId}`);
        if (!timeSlotData) {
          handleStopApiError(`${params.stopId} is not a valid stop number.`);
          handleReset();
          return;
        }
        setTimeSlot(timeSlotData);
      }, 20000);
    } else if (params.route && params.direction && params.stop) {
      routeDirectionStopInterval.current = setInterval(async () => {
        const timeSlotData = await fetchData(
          `${baseUrl}/${params.route}/${params.direction}/${params.stop}`
        );
        if (timeSlotData) {
          setTimeSlot(timeSlotData);
        }
      }, 20000);
    }

    return () => {
      clearInterval(stopIdInterval.current);
      clearInterval(routeDirectionStopInterval.current);
    };
  }, [params.route, params.direction, params.stop, params.stopId, fetchData, handleStopApiError, handleReset]);

  const handleTabChange = useCallback((selectedIndex) => {
    setSelectedTab(selectedIndex);
  }, []);

  const handleTimeSlot = useCallback((timeSlot) => {
    setTimeSlot(timeSlot);
  }, []);

  const handleChange = (type) => (e) => {
    const value = e.target.value;
    switch (type) {
      case "route": {
        setApiError("");
        setTimeSlot(null);
        setSelectedDirection("");
        setDirection(null);
        setSelectedStop("");
        setStop(null);
        setSelectedRoute(value);
        break;
      }
      case "direction": {
        setSelectedStop("");
        setStop(null);
        setSelectedDirection(value);
        break;
      }
      case "stop": {
        setSelectedStop(value);
        break;
      }
      default: {
        console.log("Not a valid type");
      }
    }
  };

  const renderTabData = () => {
    if (selectedTab === 0) {
      return (
        <div className="selctionContainer">
          <Route
            route={route}
            onChange={handleChange}
            selectedRoute={selectedRoute}
          />
          <Direction
            direction={direction}
            onChange={handleChange}
            selectedDirection={selectedDirection}
          />
          <Stop
            stop={stop}
            onChange={handleChange}
            selectedStop={selectedStop}
          />
        </div>
      );
    }
    return (
      <StopForm
        onTimeSlot={handleTimeSlot}
        fetchData={fetchData}
        baseUrl={baseUrl}
        onStopApiError={handleStopApiError}
        onReset={handleReset}
      />
    );
  };


  return (
    <section className="selectRoute">
      <div className="container">
        <h2 className="heading" data-cy="sub-heading">Real-time Departures</h2>
        <div className="content">
          <Tabs
            tabData={tabData}
            selectedTab={selectedTab}
            onChange={handleTabChange}
          />
          {apiError && <p className="error">{apiError}</p>}
          {renderTabData()}
          {(stopError && selectedTab === 1 && !timeSlot) && <p className="stopError">{stopError}</p>}
          <TimeSlot timeSlot={timeSlot} />
        </div>
      </div>
    </section>
  );
};

export default SelectRoute;
