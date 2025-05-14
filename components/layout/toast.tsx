"use client"

import { type ToastItem, ToastContext, ToastType, useToastContext } from "@/hooks/toast";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode, useCallback, useMemo, useRef, useState } from "react";

const TOAST_COOLDOWN = 10000;

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const toast = useToaster();
    return (
        <ToastContext.Provider value={toast}>
            {children}
            <Toast />
        </ToastContext.Provider>
    )
}

const useToaster = () => {
    const [toasts, setToasts] = useState<Map<string, ToastItem>>(new Map());
    const notificationId = useRef(0);

    const removeToast = useCallback((toastId: string) => {
        setToasts(prev => {
            const next = new Map(prev);
            next.delete(toastId);
            return next;
        });
    }, []);

    const pushToast = useCallback((toast: Omit<ToastItem, "id">) => {
        notificationId.current++;
        const id = `toast_notification_id:${notificationId.current}`;
        setToasts(prev => {
            const next = new Map(prev);
            next.set(id, { ...toast, id });
            return next;
        });

        setTimeout(() => removeToast(id), TOAST_COOLDOWN);
    }, [removeToast]);

    return { pushToast, removeToast, toasts };
}

const Toast: FC = () => {
    const { toasts } = useToastContext();

    const items = useMemo(() => Array.from(toasts.values()), [toasts]);

    return (
        <div className="flex flex-col-reverse gap-5 fixed lg:bottom-10 lg:right-10 lg:w-80 lg:inset-x-auto inset-x-5 bottom-5 z-50">
            {items.map(item => <ToastItem key={item.id} item={item} />)}
        </div>
    )
}

const ToastItem: FC<{ item: ToastItem }> = ({ item }) => {
    const { removeToast } = useToastContext();
    const onClose = () => removeToast(item.id);

    const progressColor = useMemo(() => {
        switch(item.type) {
            case ToastType.DANGER:  return "bg-red-400";
            case ToastType.SUCCESS: return "bg-lime-400";
            case ToastType.WARNING: return "bg-amber-400";
        }
    }, [item.type]);

    return (
        <ToastItemLinkWrapper href={item.href}>
            <div className={`relative fade-in bg-container transition-transform duration-200 dark:bg-container-d p-5 rounded-md shadow-md shadow-black/50 flex flex-row gap-5 overflow-clip`}>
                <div className="flex-1">
                    <p className="break-all">{item.message}</p>
                </div>
                <div className="flex flex-col justify-start items-center">
                    <button onClick={onClose} className="cursor-pointer" aria-label="Dismiss notification">
                        <Image src="/icons/x-mark.svg" className="dark:invert" alt="" height={15} width={15} />
                    </button>
                </div>
                <div className={`absolute bottom-0 left-0 h-1 w-full opacity-50 ${progressColor}`}/>
                <div className={`absolute bottom-0 left-0 h-1 w-full ${progressColor}`} style={{ animation: `timer ${TOAST_COOLDOWN}ms linear forwards` }}/>
                <style jsx>{
                `@keyframes timer {
                        from { width: 100%; }
                        to   { width: 0%; }
                    }`
                }</style>
            </div>
        </ToastItemLinkWrapper>
    )
}

const ToastItemLinkWrapper: FC<{ children: ReactNode; href?: string }> = ({ children, href }) =>
    href ? <Link href={href} target="_blank" className="glow rounded-md overflow-clip">{children}</Link> : <>{children}</>;
