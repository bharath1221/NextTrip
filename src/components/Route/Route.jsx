import PropTypes from 'prop-types';
import {Select} from "../../components";

const Route = ({route, onChange, selectedRoute}) => {
  if (!route) return null;

  return (
    <Select data-cy="select-route" onChange={onChange("route")} value={selectedRoute}>
      <option value="">Select route</option>
      {route.map((r) => (
        <option key={r.route_id} value={r.route_id}>
          {r.route_label}
        </option>
      ))}
    </Select>
  );
};

Route.propTypes = {
  route: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  selectedRoute: PropTypes.string.isRequired
};

export default Route;
