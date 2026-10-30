import React from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import type { Recommendation } from "../types/recommendation";
import {
  getRecommendationsCacheKey,
  readRecommendationsCache,
  writeRecommendationsCache,
} from "../lib/recommendationsCache";

interface RecommendationsContextType {
  recommendations: Recommendation[];
  isLoading: boolean;
  error: string | null;
  noHistory: boolean;
  refresh: () => void;
}

interface RecommendationsProviderProps {
  children: React.ReactNode;
}

export const RecommendationsContext =
  React.createContext<RecommendationsContextType | null>(null);

function getCachedRecommendations(
  token: string | null | undefined
): Recommendation[] | null {
  if (!token) return null;
  return readRecommendationsCache(getRecommendationsCacheKey(token));
}

export const RecommendationsProvider: React.FC<RecommendationsProviderProps> = ({
  children,
}) => {
  const authContext = React.useContext(AuthContext);
  const token = authContext?.token;
  const logout = authContext?.logout;

  const [recommendations, setRecommendations] = React.useState<Recommendation[]>(
    () => getCachedRecommendations(token) ?? []
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(
    () => Boolean(token) && getCachedRecommendations(token) === null
  );
  const [error, setError] = React.useState<string | null>(null);
  const [noHistory, setNoHistory] = React.useState<boolean>(false);
  const [reloadKey, setReloadKey] = React.useState<number>(0);
  const lastReloadKey = React.useRef<number>(0);

  const refresh = React.useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  React.useEffect(() => {
    if (!token) {
      setRecommendations([]);
      setError(null);
      setNoHistory(false);
      setIsLoading(false);
      lastReloadKey.current = reloadKey;
      return;
    }

    const isManualRefresh = lastReloadKey.current !== reloadKey;
    lastReloadKey.current = reloadKey;

    const cacheKey = getRecommendationsCacheKey(token);

    if (!isManualRefresh) {
      const cached = readRecommendationsCache(cacheKey);

      if (cached) {
        setRecommendations(cached);
        setError(null);
        setNoHistory(false);
        setIsLoading(false);
        return;
      }
    }

    let cancelled = false;

    setIsLoading(true);
    setError(null);
    setNoHistory(false);
    setRecommendations([]);

    axios
      .get<Recommendation[]>(import.meta.env.VITE_URL + "/recommendations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (cancelled) return;
        setRecommendations(response.data);
        writeRecommendationsCache(cacheKey, response.data);
        setIsLoading(false);
      })
      .catch((requestError) => {
        if (cancelled) return;

        const status = requestError?.response?.status;

        if (status === 401) {
          setError("Unauthorized access. Please log in.");
          logout?.();
        } else if (status === 400) {
          setNoHistory(true);
        } else if (status === 502) {
          setError(
            "The recommendation service is unavailable right now. Please try again later."
          );
        } else if (status) {
          setError(
            "An error occurred while generating recommendations. Please try again later."
          );
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }

        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token, reloadKey, logout]);

  const value: RecommendationsContextType = {
    recommendations,
    isLoading,
    error,
    noHistory,
    refresh,
  };

  return (
    <RecommendationsContext.Provider value={value}>
      {children}
    </RecommendationsContext.Provider>
  );
};
