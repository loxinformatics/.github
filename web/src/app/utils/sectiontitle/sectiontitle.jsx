import styles from "./sectiontitle.module.css"

export default function SectionTitle({ heading, paragraph }) {
    return (
        <div className={styles.title}>
            <h2 className={styles.h2}>{heading}</h2>
            <p className={styles.p}>{paragraph}</p>
        </div>
    );
}