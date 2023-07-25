import * as React from "react";
import apiClient from "../services/apiClient";
import AuthContext from "./auth";
import Loading from "../components/Loading/Loading";

const ProfileContext = React.createContext({});

export const ProfileContextProvider = ({ children }) => {
  // useContext hook
  const { userContext } = React.useContext(AuthContext);
  const [user, setUser] = userContext;

  const [selectedProfile, setSelectedProfile] = React.useState();

  // useEffect hooks
  const [profiles, setProfiles] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [userProgress, setUserProgress] = React.useState({});

  // Function to remove a profile by id
  const removeProfile = (id) => {
    setProfiles((prevProfiles) => {
      const updatedProfiles = { ...prevProfiles };
      delete updatedProfiles[id];
      return updatedProfiles;
    });
  };

  // after component is mounted after authenticating user, fetch all the data if possible
  React.useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);

      try {
        const { data, errorProfile } = await apiClient.fetchProfiles();

        if (errorProfile) setError(errorProfile);
        if (data?.profiles) setProfiles(data?.profiles);
      } catch (error) {
        console.error("Fetching data error:", error);
      }
      setIsLoading(false);
    };

    // check if user is logged in
    if (user?.email) {
      fetchProfile();
    } else {
      setInitialized(true);
    }
  }, [user]);

  // check if there where any errors after doing a request
  if (error) {
    return (
      <h1 style={{ color: "red" }}>
        An error has ocurred while fetching profile items!
      </h1>
    );
  }

  // check if it is loading before rendering main component
  if (isLoading) {
    return <Loading />;
  }

  // check if the profile data has been initialized, if not display a loading message
  return (
    <ProfileContext.Provider
      value={{
        profileContext: [profiles, setProfiles],
        removeProfile,
        selectedProfile,
        setSelectedProfile,
        userProgress,
        setUserProgress,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
