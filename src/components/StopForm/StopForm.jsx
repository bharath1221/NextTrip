import {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {useParams, useNavigate} from "react-router-dom";
import "./StopForm.css";

const StopForm = ({onTimeSlot, fetchData, baseUrl, onStopApiError, onReset}) => {
  let params = useParams();
  let navigate = useNavigate();
  const [stopNumber, setStopNumber] = useState("");

  useEffect(() => {
    if (!stopNumber && params.stopId) {
      (async function () {
        const timeSlotData = await fetchData(`${baseUrl}/${params.stopId}`);
        if (!timeSlotData) {
          onStopApiError(`${params.stopId} is not a valid stop number.`);
          onReset();
          return;
        }
        onTimeSlot(timeSlotData);
      })();
    }
  }, [params.stopId, stopNumber, onTimeSlot, baseUrl, fetchData, onStopApiError, onReset]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timeSlotData = await fetchData(`${baseUrl}/${stopNumber}`);
    onTimeSlot(timeSlotData);
    if (!timeSlotData) {
      onStopApiError(`${stopNumber} is not a valid stop number.`);
      onReset();
      return;
    }
    navigate(`/${stopNumber}`);
  };

  const handleChange = (e) => {
    setStopNumber((v) => (e.target.validity.valid ? e.target.value : v));
  };

  return (
    <div className="stopContainer">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            id="stop_number"
            data-cy="stop-number"
            pattern="[0-9]*"
            type="text"
            onChange={handleChange}
            value={stopNumber}
          />
          <label htmlFor="stop_number" className={stopNumber ? "hasValue" : ""}>
            Enter stop number
          </label>
        </div>
        <button type="submit" disabled={!stopNumber}>
          <img src="/search.svg" alt="search" />
        </button>
      </form>
    </div>
  );
};

StopForm.propTypes = {
  onTimeSlot: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  onStopApiError: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  baseUrl: PropTypes.string.isRequired
};

export default StopForm;
