import { createContext, useContext } from "react";

export enum ToastType {
    SUCCESS,
    WARNING,
    DANGER
}

export interface ToastItem {
    type: ToastType,
    id: string,
    message: string,
    href?: string
}

type ToastContext = { 
    toasts: Map<string, ToastItem>, 
    pushToast: ((toast: Omit<ToastItem, "id">) => void), 
    removeToast: (toastId: string) => void
};

const initialContext: ToastContext = { 
    pushToast: () => {}, 
    removeToast: () => {}, 
    toasts: new Map() 
};

export const ToastContext = createContext<ToastContext>(initialContext);

export const useToastContext = () => {
    const context = useContext(ToastContext);

    return context;
}