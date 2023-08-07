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

  const [leftOff, setLeftOff] = React.useState(0);

  // useEffect hooks
  const [profiles, setProfiles] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [userProgress, setUserProgress] = React.useState({});

  const profileId = selectedProfile;
  const [profileItem, setProfileItem] = React.useState({});

  // Function to remove a profile by id
  const removeProfile = (id) => {
    setProfiles((prevProfiles) => {
      const updatedProfiles = { ...prevProfiles };
      delete updatedProfiles[id];
      return updatedProfiles;
    });
  };

  /**
   * Calculate the value for `leftOff` based on the completed modules in `userProgress`.
   * This effect runs whenever the `userProgress` changes.
   */
  React.useEffect(() => {
    const leftOffValue = Object.values(userProgress)
      .filter((key) => typeof key === "boolean")
      .filter(Boolean).length;
    setLeftOff(leftOffValue);
  }, [userProgress]);
  /**
   * Fetch data from the backend API for the selected profile.
   * Update the `selectedProfile` and `userProgress` state based on the API response.
   * This effect runs when the `localStorage.getItem("selectedProfile")` changes.
   */
  React.useEffect(() => {
    const fetchDataAndSetSelectedProfile = async () => {
      try {
        const profileId = localStorage.getItem("selectedProfile");
        const response = await apiClient.fetchData(profileId);
        setSelectedProfile(profileId);
        setUserProgress(response.userprogress);
      } catch (error) {
        // Handle any error that might occur during the API call
        console.error("Error fetching data:", error);
      }
    };

    // Call the new function when 'localStorage.getItem("selectedProfile")'
    if (localStorage.getItem("selectedProfile")) {
      fetchDataAndSetSelectedProfile();
    }
  }, [localStorage.getItem("selectedProfile")]);

  React.useEffect(() => {
    // Check if there is a selectedProfile in localStorage;

    if (!selectedProfile) {
      // If there's no selectedProfile, you may choose to return early or do something else
      return;
    }

    // If selectedProfile exists, proceed with the fetch
    const fetchProfile = async () => {
      setIsLoading(true);

      const { data, error } = await apiClient.fetchProfileById(profileId);

      if (data) {
        setProfileItem(data);
      } else {
        setErrors(error);
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, [profileId]);

  /**
   * Calculate the value for `leftOff` based on the completed modules in `userProgress`.
   * This effect runs whenever the `userProgress` changes.
   */
  React.useEffect(() => {
    const leftOffValue = Object.values(userProgress)
      .filter((key) => typeof key === "boolean")
      .filter(Boolean).length;
    setLeftOff(leftOffValue);
  }, [userProgress]);

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

  /**
   * Store the `leftOff` value in localStorage to persist user progress.
   * This effect runs whenever the `leftOff` changes.
   */
  React.useEffect(() => {
    if (leftOff) {
      setLeftOff(leftOff);
    }
  }, [leftOff]);

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
        leftOff,
        setLeftOff,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
