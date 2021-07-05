// Global imports
import { useState } from "react";

// Styles imports
import styles from "./TabsContainer.module.css";

/**
 * components: {
 * 		tabID: {
 * 			title: string,
 * 			component: object
 * 		}
 * }
 * @param {Object} components
 * @param {Function} onChangeTab
 * @returns
 */
const TabsContainer = ({ components, onChangeTab }) => {
	const [activeTab, setActiveTab] = useState(Object.keys(components)[0]);

	/**
	 * Change the tab ID onclick of tab button.
	 * @param {String} tabId 
	 */
	const changeTabHandler = (tabId) => {
		setActiveTab(tabId);
	};

	// Tab navigational buttons
	const allTabs = Object.keys(components).map((tabID, idx) => {
		return (
			<button 
				href="/" 
				className={activeTab === tabID ? styles.active : null} 
				onClick={() => {
					changeTabHandler(tabID);
					onChangeTab(tabID);
				}}
				key={`tab-${tabID}-${idx}`}
			>
				{components[tabID].title}
			</button>
		);
	});

	return (
		<>
			<div className={styles.tabs}>{allTabs}</div>
			{components[activeTab].component}
		</>
	);
};

export default TabsContainer;
