import "./ProfileCard.css";
import { capitalize } from "lodash";
import avatar_icon from "../../assets/profile-icon.png";

export default function ProfileCard(props) {
  return (
    <div className="profile-card">
      <div className="profile-card-content">
        <div className="profile-card-header">
          <span className="profile-img">
            <img src={avatar_icon} />
          </span>
          <div className="profile-card-heading">
            <h2>{capitalize(props.firstName)}</h2>
          </div>
        </div>
      </div>
      <div>
        <h3>{props.created_at}</h3>
      </div>
    </div>
  );
}
