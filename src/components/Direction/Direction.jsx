import PropTypes from 'prop-types';
import {Select} from "..";

const Direction = ({direction, onChange, selectedDirection}) => {
  if (!direction) return null;

  return (
    <Select data-cy="select-direction" onChange={onChange("direction")} value={selectedDirection}>
      <option value="">Select direction</option>
      {direction.map((r) => (
        <option key={r.direction_id} value={r.direction_id}>
          {r.direction_name}
        </option>
      ))}
    </Select>
  );
};

Direction.propTypes = {
  direction: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  selectedDirection: PropTypes.string.isRequired
};

export default Direction;
