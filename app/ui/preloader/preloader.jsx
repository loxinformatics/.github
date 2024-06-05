import styles from "./preloader.module.css"

export default function Preloader() {
	return (
		<body>
			<div id="preloader" className={styles.preloader}></div>
		</body>
	);
}
