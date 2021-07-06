// Assets imports
import filterIcon from "../../assets/filter-icon.svg";

const FilterIcon = ({style}) => {
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <img src={filterIcon} style={{...style}} alt=""/>
    </div>
  );
};

export default FilterIcon;