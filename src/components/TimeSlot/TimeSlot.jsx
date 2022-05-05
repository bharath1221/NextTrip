import {useState} from "react";
import PropTypes from 'prop-types';
import "./TimeSlot.css";

const TimeSlot = ({timeSlot}) => {
  const [showAll, setShowAll] = useState(false);

  if (!timeSlot) return null;

  const {stops, departures} = timeSlot;

  const filteredDepartures =
    showAll || departures.length <= 5 ? departures : departures.slice(0, 3);

  const handleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <section className="timeSlotContainer">
      <div className="stopDescription">
        <h3 data-cy="stop-description">{stops[0].description}</h3>
        <p>
          <span>Stop #: </span>
          {stops[0].stop_id}
        </p>
      </div>
      <div className="timeSlotTableContainer">
        <table>
          <thead>
            <tr>
              <th>Route</th>
              <th>Destination</th>
              <th>Departs</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartures.map((dep) => (
              <tr data-cy={dep.trip_id}>
                <td>{dep.route_short_name}</td>
                <td>{dep.description}</td>
                <td>
                  {dep.departure_text.toLowerCase().includes("min") && (
                    <img
                      className="broadcastImage"
                      src="/broadcast-blue.svg"
                      alt="Broadcast"
                    />
                  )}{" "}
                  {dep.departure_text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredDepartures.length === 0 && (
        <div className="emptyContainer">
          <p>No departures at this time</p>
        </div>
      )}
      {(departures.length > 5) && (
        <div className="showAllContainer">
          <button onClick={handleShowAll}>
            {showAll ? (
              <img src="/minus-outline.svg" alt="hide" />
            ) : (
              <img src="/add-outline.svg" alt="show" />
            )}
            Departures
          </button>
        </div>
      )}
    </section>
  );
};

TimeSlot.propTypes = {
  timeSlot: PropTypes.object
};

export default TimeSlot;
