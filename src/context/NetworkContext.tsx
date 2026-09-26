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
    let isMounted = true;

    const updateNetworkState = (state: NetInfoState) => {
      if (!isMounted) {
        return;
      }

      const online =
        state.isConnected === true && state.isInternetReachable !== false;

      /*console.debug("[Network]", {
        type: state.type,
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        isOnline: online,
      });*/

      setIsOnline(online);

      setConnectionType(state.type);

      setIsChecking(false);
    };

    const unsubscribe = NetInfo.addEventListener(updateNetworkState);

    NetInfo.fetch()
      .then(updateNetworkState)
      .catch(() => {
        if (isMounted) {
          setIsOnline(false);
          setConnectionType("unknown");
          setIsChecking(false);
        }
      });

    return () => {
      isMounted = false;
      unsubscribe();
    };
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
