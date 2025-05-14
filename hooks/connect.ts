import { useCallback, useMemo } from "react";
import { injected, useConnect } from "wagmi";
import { sepolia } from "wagmi/chains";

export const useConnectWithConfig = () => {
    const { connect } = useConnect();

    const connector = useMemo(() => injected(), []);

    return useCallback(() => {
        connect({ connector, chainId: sepolia.id });
    }, [connector, connect]);
};