import React from 'react';
import styles from "./Input.module.css";

/**
 * Simple input component.
 */
const Input = React.forwardRef(({ label, input }, ref) => {
	return (
		<div className={styles.input}>
			<label htmlFor={input.id}>{label}</label>
			<input {...input} ref={ref}/>
		</div>
	);
});

export default Input;