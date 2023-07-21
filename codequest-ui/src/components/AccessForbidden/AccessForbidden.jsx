import "./AccessForbidden.css";

export default function AccessForbidden(props) {
  return (
    <div className="access-forbidden content">
      <h1>
        {props.message ||
          "Oops! Looks like you're not logged in. Please, log in or create an account with us."}
      </h1>
    </div>
  );
}
