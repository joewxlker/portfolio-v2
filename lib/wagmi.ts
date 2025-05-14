import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { createClient } from 'viem';

export const config = createConfig({
  chains: [sepolia],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});

import type {
  ContractFunctionExecutionErrorType,
  TransactionExecutionErrorType,
  UserRejectedRequestErrorType,
} from 'viem';

export type WriteContractError =
| ContractFunctionExecutionErrorType
| TransactionExecutionErrorType
| UserRejectedRequestErrorType

export type Hash = `0x${string}`;
export type Address = `0x${string}`;