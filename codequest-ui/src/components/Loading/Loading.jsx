import "./Loading.css";

export default function Loading(props) {
  return (
    <div className="loading-page">
      <div className="loading-content">
        <h2>{props.message || "Loading..."}</h2>
        <img
          className="loading-gif"
          src="../src/assets/loading-wheel.gif"
          width="100px"
        ></img>
      </div>
    </div>
  );
}
