import './Select.css';

const Select = (props) => {
  return (
    <select className="select" {...props}>
      {props.children}
    </select>
  )
}

export default Select;
