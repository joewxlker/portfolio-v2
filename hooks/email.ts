import { ChangeEvent, FormEvent, useCallback, useState } from "react";

export const useSendEmail = () => {
    const [status, setStatus] = useState<"success" | "pending" | "error" | "idle">("idle");

    const sendMessage = useCallback((formData: FormData) => {
        setStatus("pending");

        fetch(`/api/smtp`, { method: 'POST', body: formData })
            .then((response) => { if(!response.ok) throw new Error(`SMTP API returned ${response.status}`) })
            .then(() => setStatus("success"))
            .catch(() => {setStatus("error")});
    }, []);

    const clearState = useCallback(() => {
        setStatus("idle");
    }, []);

    return [status, sendMessage, clearState] as const;
}

export const useEmailForm = () => {
    const [form, setForm] = useState<{ message: string, email: string }>({ email: "", message: "" });

    const handleSubmit = useCallback((event: FormEvent, callback: (data: FormData) => void) => {
        event.preventDefault();
        const formData = new FormData();
        formData.set("message", form.message);
        formData.set("email", form.email);
        callback(formData);
    }, [form]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({...prev, [event.target.name]: event.target.value }));
    }, []);

    const clearForm = useCallback(() => {
        setForm({ email: "", message: "" });
    }, []);

    return [form, handleSubmit, clearForm, handleChange] as const;
}