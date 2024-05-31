import "./Title.css"

export default function Title({ heading, paragraph }) {
    return (
        <div className="title">
            <h2>{heading}</h2>
            <p>{paragraph}</p>
        </div>
    );
}