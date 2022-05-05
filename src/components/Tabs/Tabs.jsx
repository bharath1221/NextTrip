import PropTypes from 'prop-types';
import "./Tabs.css";

const Tabs = ({selectedTab, tabData, onChange}) => {
  if (!tabData && !Array.isArray(tabData)) return null;

  return (
    <ul data-cy="tabs" className="tabContainer">
      {tabData.map((tab, index) => (
        <li key={`${tab}-${index}`} className="tabList">
          <button className={selectedTab === index ? 'active tab' : 'tab'} onClick={() => onChange(index)}>
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};

Tabs.propTypes = {
  tabData: PropTypes.array.isRequired,
  selectedTab: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Tabs;
