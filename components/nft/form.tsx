"use client"

import { type ChangeEvent, type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { type Address, type Hash } from "@/lib/wagmi";
import type { Abi } from 'viem';
import { useTransactionResultNotifier } from "@/hooks/notifier";
import { useConnectWithConfig } from "@/hooks/connect";
import { Spinner } from "../layout/spinner";

const useMintTransaction = (nftAddress: Address, nftAbi: Abi) => {
    const [txHash, setTxHash] = useState<Hash | undefined>(undefined);
    const account = useAccount();
    const contract = useWriteContract();
    const results = useWaitForTransactionReceipt({ hash: txHash, confirmations: 1 });

    const mint = useCallback(async (to: Address) => {
        const hash = await contract.writeContractAsync({
            abi: nftAbi,
            address: nftAddress,
            functionName: "mint",
            args: [to]
        });

        if(hash) setTxHash(hash);
    }, [contract, nftAddress, nftAbi]);

    const clearHash = useCallback(() => 
        setTxHash(undefined), []);

    return [{ account, results, contract }, mint, clearHash] as const;
};

const useNftMintForm = () => {
    const [values, setValues] = useState<{ address: string }>({ address: "" });

    const isValid = useMemo(() => {
        return values.address !== "" && /^0x[a-fA-F0-9]{40}$/.test(values.address);
    }, [values.address]);

    const clearForm = useCallback(() => 
        setValues({ address: "" }), []);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => 
        setValues({ address: event.target.value }), []);

    return [{ values, isValid }, clearForm, handleChange] as const;
};

export default function MintForm({ nftAddress, nftAbi }: { nftAddress: Address, nftAbi: Abi }) {
    const [transaction, mint, clearHash] = useMintTransaction(nftAddress, nftAbi);
    const [form, clearForm, handleChange] = useNftMintForm();
    const { onError, onTransactionFailed, onTransactionSuccess } = useTransactionResultNotifier();
    const connect = useConnectWithConfig();

    const handleMint = useCallback(() => {
        void mint(form.values.address as Address)
            .catch(onError);
    }, [form.values.address, mint, onError]);

    const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!transaction.account.isConnected) {
            connect();
        } else {
            handleMint();
        }
    }, [transaction.account.isConnected, connect, handleMint]);

    useEffect(() => {
        if (transaction.results.isSuccess && transaction.results.data) {
            if (transaction.results.data.status === "success") {
                onTransactionSuccess(transaction.results.data);
                clearForm();
                clearHash();
            } else {
                onTransactionFailed(transaction.results.data);
                clearHash();
            }
        }
        
        if (transaction.results.isError) {
            onError(transaction.results.error);
            clearHash();
        }

    }, [clearForm, clearHash, onTransactionSuccess, onTransactionFailed, onError, transaction.results.data, transaction.results.error, transaction.results.isSuccess, transaction.results.isError]);

    const buttonText = useMemo(() => {
        if(!transaction.account.isConnected) return "Connect Wallet";
        if(transaction.results.isLoading) return "Transaction Pending";
        if(transaction.contract.isPending) return "Preparing Transaction";
        if(!form.isValid) return "Enter a valid Ethereum address";
        if(form.isValid) return "Mint";
        return "Mint"
    }, [transaction.account.isConnected, transaction.results.isLoading, transaction.contract.isPending, form.isValid]);

    const busy = transaction.account.isConnecting || transaction.contract.isPending || transaction.results.isLoading;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3 items-stretch">
            <Input 
                form={form} 
                onChange={handleChange}
                disabled={busy} />
            <ActionButton 
                disabled={busy || (transaction.account.isConnected && !form.isValid)}
                loading={busy}
                text={buttonText} />
        </form>
    );
};

const Input = ({ form, onChange, disabled }: { 
    form: { isValid: boolean, values: { address: string }}, 
    onChange: (event: ChangeEvent<HTMLInputElement>) => void, 
    disabled: boolean 
}) => {
    return (<input
        value={form.values.address}
        onChange={onChange}
        name="receiver"
        disabled={disabled}
        className="input-primary"
        placeholder="Mint to: 0xE51d12D..."/>)
}

const ActionButton = ({ disabled, loading, text }: { disabled: boolean, loading: boolean, text: string }) => {
    return (<button type="submit" disabled={disabled} className="button-primary w-full px-5 h-12">
        {text}
        {loading && <Spinner/>}
    </button>)
}