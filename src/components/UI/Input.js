import React from 'react';
import styles from "./Input.module.css";

/**
 * Simple input component.
 */
const Input = React.forwardRef(({ label, input, value, onChange }, ref) => {
	
	const inputChangeHandler = (e) => {
		onChange(e.target.value);
	};

	return (
		<div className={styles.input}>
			<label htmlFor={input.id}>{label}</label>
			<input value={value} {...input} ref={ref && ref} onChange={onChange && inputChangeHandler}/>
		</div>
	);
});

export default Input;