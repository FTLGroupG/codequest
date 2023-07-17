import "./Loading.css";

export default function Loading(props) {
  return (
    <div className="loading-page">
      <div className="loading-content">
        <h1>{props.message || "Loading"}</h1>
      </div>
    </div>
  );
}
