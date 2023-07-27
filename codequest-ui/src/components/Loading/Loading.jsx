import "./Loading.css";
import loading_wheel from "../../assets/loading-wheel.gif";

export default function Loading(props) {
  return (
    <div className="loading-page">
      <div className="loading-content">
        <h2>{props.message || "Loading..."}</h2>
        <img className="loading-gif" src={loading_wheel} width="100px"></img>
      </div>
    </div>
  );
}
