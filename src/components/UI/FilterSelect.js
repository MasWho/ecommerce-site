// Global imports
import Select, { components } from "react-select";
import FilterIcon from "./FilterIcon";
import { IconContext } from "react-icons";
import { AiFillCaretDown } from "react-icons/ai";

// Styles imports
import styles from "./FilterSelect.module.css";

// Custom styles to override react select
const customStyles = {
	control: (base) => ({
		...base,
		border: "none",
		minWidth: "5rem",
		boxShadow: "none",
	}),
	indicatorContainer: (base, state) => ({
		...base,
	}),
	dropdownIndicator: (base, state) => ({
		...base,
		transition: "all .2s ease",
		transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
	}),
	indicatorSeparator: (base) => ({
		...base,
		opacity: 0,
	}),
	placeholder: (base) => ({
		...base,
		color: "black",
		fontFamily: "Montserrat",
		fontSize: "1rem",
	}),
	valueContainer: (base) => ({
		...base,
		padding: 0,
	}),
	menuList: (base) => ({
		...base,
		paddingTop: 0,
		paddingBottom: 0,
	}),
	menu: (base) => ({
		...base,
		left: "-30%",
		margin: 0,
		borderRadius: 0,
		border: "1px solid #7e7e7e",
		minWidth: "400px"
	}),
	option: (base) => ({
		...base,
		backgroundColor: "white",
		color: "black",
		paddingTop: "1em",
		paddingBottom: "1em",
		"&:hover": {
			backgroundColor: "#7e7e7e2f",
		},
	}),
};

/**
 * Check box to go next to each select option
 * @param {Bool} isSelected 
 * @returns 
 */
const CheckBox = ({ isSelected }) => {
	return (
		<div className={styles["checkbox-container"]}>
			<input type="checkbox" checked={isSelected && "checked"} />
			<span className={styles.checkmark}></span>
		</div>
	);
};

/**
 * Override the dropdown indicator for react select
 * @param {Object} props 
 * @returns 
 */
const DropdownIndicator = (props) => {
	return (
		<IconContext.Provider value={{ color: "#DEB200" }}>
			<components.DropdownIndicator {...props}>
				<AiFillCaretDown />
			</components.DropdownIndicator>
		</IconContext.Provider>
	);
};

/**
 * Override each option component within the react select
 * @param {Object} children
 * @param {Object} props
 */
const Option = ({ children, ...props }) => {
	return (
		<components.Option {...props}>
			<div className={styles["option-container"]}>
				{/* <input type="checkbox" className={styles['option-input']}/> */}
				<CheckBox isSelected={props.isSelected} />
				{children}
			</div>
		</components.Option>
	);
};

/**
 * Custom filter selector based on react select.
 * @param {Array} options 
 * @param {Array} selected 
 * @param {Function} changeSelection 
 * @returns 
 */
const FilterSelect = ({ options, selected, changeSelection }) => {
	return (
		<div className={styles.container}>
			<FilterIcon style={{ width: "70%" }} />
			<Select
				isMulti
				options={options}
				isSearchable={false}
				styles={customStyles}
				placeholder="Filter"
				closeMenuOnSelect={false}
				hideSelectedOptions={false}
				components={{ DropdownIndicator, Option }}
				controlShouldRenderValue={false}
				onChange={changeSelection}
				value={selected}
				isClearable={false}
			/>
		</div>
	);
};

export default FilterSelect;
