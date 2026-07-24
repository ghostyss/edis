import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

interface NetworkContextData {
  isChecking: boolean;

  isOnline: boolean;

  connectionType: string;
}

const NetworkContext = createContext({} as NetworkContextData);

interface Props {
  children: ReactNode;
}

export function NetworkProvider({ children }: Props) {
  const [isChecking, setIsChecking] = useState(true);

  const [isOnline, setIsOnline] = useState(false);

  const [connectionType, setConnectionType] = useState("unknown");

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsOnline(
        state.isConnected === true && state.isInternetReachable !== false,
      );

      setConnectionType(state.type);

      setIsChecking(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      isChecking,

      isOnline,

      connectionType,
    }),
    [isChecking, isOnline, connectionType],
  );

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
}

export function useNetworkContext() {
  return useContext(NetworkContext);
}
