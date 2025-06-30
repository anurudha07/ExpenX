import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      clearUser();
      setInitialized(true);
      return;
    }
    if (user) {
      setInitialized(true);
      return;
    }

    axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
      .then(({ data }) => {
        updateUser(data);
      })
      .catch(() => {
        // Failed to fetch user info; clear context and remove token
        clearUser();
        localStorage.removeItem("token");
      })
      .finally(() => {
        setInitialized(true);
      });
  }, [user, updateUser, clearUser]);

  return initialized;
};
