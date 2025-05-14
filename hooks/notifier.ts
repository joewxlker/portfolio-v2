import { ToastType, useToastContext } from "@/hooks/toast";
import { useCallback } from "react";
import type { TransactionReceipt } from 'viem';
import { sepolia } from "wagmi/chains";

export const useTransactionResultNotifier = () => {
    const { pushToast } = useToastContext();

    const onTransactionSuccess = useCallback((tx: TransactionReceipt) => {
        pushToast({
            message: `Success: ${tx.transactionHash}`, 
            type: ToastType.SUCCESS,
            href:  `${sepolia.blockExplorers.default.url}/tx/${tx.transactionHash}`,
        });
    }, [pushToast]);

    const onTransactionFailed = useCallback((tx: TransactionReceipt) => {
        pushToast({
            message: `Failed: ${tx.transactionHash}`, 
            type: ToastType.DANGER,
            href:  `${sepolia.blockExplorers.default.url}/tx/${tx.transactionHash}`,
        });
    }, [pushToast]);

    const onError = useCallback((error: { details: string } | object) => {
        if("details" in error){
            pushToast({ 
                message: `Error: ${error.details}`, 
                type: ToastType.DANGER 
            });
        } else {
            pushToast({ 
                message: `Error: unknown error occurred`, 
                type: ToastType.DANGER 
            });
        }
    }, [pushToast]);

    return { onTransactionFailed, onTransactionSuccess, onError };
}