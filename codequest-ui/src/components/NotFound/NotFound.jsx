import "./NotFound.css";

export default function NotFound(props) {
  return (
    <div className="access-forbidden content">
      <h1>
        {props.message ||
          "Oops! That file wasn't found."}
      </h1>
      <img src="src/assets/sad-robot.gif"></img>
    </div>
  );
}
