import React from 'react';
import styles from "./Input.module.css";

/**
 * Simple input component.
 */
const Input = React.forwardRef(({ label, input, value, onChange, containerStyle, inputStyle, labelStyle }, ref) => {
	
	const inputChangeHandler = (e) => {
		onChange(e.target.value);
	};

	return (
		<div className={styles.input} style={containerStyle && {...containerStyle}}>
			<label htmlFor={input.id} style={labelStyle && {...labelStyle}}>{label}</label>
			<input value={value} {...input} ref={ref && ref} onChange={onChange && inputChangeHandler} style={inputStyle && {...inputStyle}}/>
		</div>
	);
});

export default Input;