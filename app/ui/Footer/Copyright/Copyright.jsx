// import styles from "./styles.module.css"

export default function Copyright({ root }) {
    return (
        <div className="copyright text-center pt-4">
            &copy; Copyright <strong><span>{root.name}</span></strong>. All Rights Reserved
        </div>
    );
}