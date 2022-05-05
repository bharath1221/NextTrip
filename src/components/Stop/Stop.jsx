import PropTypes from 'prop-types';
import {Select} from "..";

const Stop = ({stop, onChange, selectedStop}) => {
  if (!stop) return null;

  return (
    <Select data-cy="select-stop" onChange={onChange("stop")} value={selectedStop}>
      <option value="">Select stop</option>
      {stop.map((r) => (
        <option key={r.place_code} value={r.place_code}>
          {r.description}
        </option>
      ))}
    </Select>
  );
};

Stop.propTypes = {
  stop: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  selectedStop: PropTypes.string.isRequired
};

export default Stop;
