"use client"

import { useEffect } from "react";
import { ToastType, useToastContext } from "@/hooks/toast";
import { Spinner } from "../layout/spinner";
import { useEmailForm, useSendEmail } from "@/hooks/email";

export const EmailForm = () => {
    const [status, sendMessage, clearState] = useSendEmail();
    const [form, handleSubmit, clearForm, handleChange] = useEmailForm();
    const { pushToast } = useToastContext();

    useEffect(() => {
        if (status === "success") {
            pushToast({ 
                message: `Success: Email sent successfully`, 
                type: ToastType.SUCCESS,
            });
            clearState();
            clearForm();
        };
        if (status === "error") {
            pushToast({ 
                message: `Error: Email was not sent`, 
                type: ToastType.DANGER,
            });
            clearState();
        };
    }, [status, clearState, clearForm, pushToast]);

    return (
        <form onSubmit={(e) => handleSubmit(e, sendMessage)} className="flex flex-col gap-2 w-full">
            <input 
                className="input-primary"
                name="email"
                type="email" 
                disabled={status === "pending"} 
                onChange={handleChange}
                value={form.email}
                placeholder="Your email..." 
                required />
            <textarea 
                className="input-primary min-h-40"
                name="message"
                disabled={status === "pending"} 
                onChange={handleChange}
                value={form.message}
                placeholder="Enter a message..." 
                required/>
            <button 
                disabled={status === "pending"}
                type="submit"
                className="w-full px-5 h-12 button-primary">
                    Send Message
                    {status === "pending" && <Spinner/>}
            </button>
        </form>
    )
}