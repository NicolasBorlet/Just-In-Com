import { zodResolver } from "@hookform/resolvers/zod";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getStrapiURL } from "@/utils/get-strapi-url";

const contactFormSchema = z.object({
    reason: z.enum(["mariage", "prive", "professionnel", "autre"]),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    email: z.email("Veuillez entrer une adresse email valide"),
    phone: z.string()
        .min(10, "Le numéro de téléphone doit contenir au moins 10 caractères")
        .regex(/^[0-9]+$/, "Le numéro de téléphone doit contenir uniquement des chiffres"),
    date: z.string().optional(),
    lieu: z.string().optional(),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            // Execute reCAPTCHA
            const token = await window.grecaptcha.execute('6LfqwGErAAAAABEybCAm-aK4QKM0siG4vU7Tf1uj', {
                action: 'submit_contact_form'
            });

            const response = await fetch(`${getStrapiURL()}/api/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    recaptchaToken: token
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi du message");
            }

            reset();
            alert("Message envoyé avec succès !");
        } catch (error) {
            alert(`Une erreur est survenue lors de l'envoi du message: ${error}`);
        }
    };

    return (
        <>
            <Script
                src={`https://www.google.com/recaptcha/api.js?render=6LfqwGErAAAAABEybCAm-aK4QKM0siG4vU7Tf1uj`}
                strategy="afterInteractive"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <select
                        {...register("reason")}
                        id="reason"
                        defaultValue="mariage"
                        className={styles.field}
                    >
                        <option value="mariage">Mariage</option>
                        <option value="prive">Événement privé</option>
                        <option value="professionnel">Professionnel</option>
                        <option value="autre">Autre</option>
                    </select>
                    {errors.reason && (
                        <span className="text-sm text-red-500">{errors.reason.message}</span>
                    )}
                </div>

                <div className="flex gap-4 md:flex-row flex-col">
                    <div className="flex flex-col gap-2 flex-1">
                        <input
                            {...register("lastName")}
                            type="text"
                            id="lastName"
                            placeholder="Nom"
                            className={styles.field}
                        />
                        {errors.lastName && (
                            <span className="text-sm text-red-500">{errors.lastName.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <input
                            {...register("firstName")}
                            type="text"
                            id="firstName"
                            placeholder="Prénom"
                            className={styles.field}
                        />
                        {errors.firstName && (
                            <span className="text-sm text-red-500">{errors.firstName.message}</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <input
                        {...register("phone")}
                        type="tel"
                        id="phone"
                        placeholder="Téléphone"
                        className={styles.field}
                    />
                    {errors.phone && (
                        <span className="text-sm text-red-500">{errors.phone.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        placeholder="Adresse email"
                        className={styles.field}
                    />
                    {errors.email && (
                        <span className="text-sm text-red-500">{errors.email.message}</span>
                    )}
                </div>

                <div className="flex gap-4 md:flex-row flex-col">
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="date" className="text-sm text-[#3B1621]/70">Date de l&apos;événement</label>
                        <input
                            {...register("date")}
                            type="date"
                            id="date"
                            className={styles.field}
                        />
                        {errors.date && (
                            <span className="text-sm text-red-500">{errors.date.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="lieu" className="text-sm text-[#3B1621]/70">Lieu de l&apos;événement</label>
                        <input
                            {...register("lieu")}
                            type="text"
                            id="lieu"
                            placeholder="Ville, domaine, salle..."
                            className={styles.field}
                        />
                        {errors.lieu && (
                            <span className="text-sm text-red-500">{errors.lieu.message}</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <textarea
                        {...register("message")}
                        id="message"
                        rows={5}
                        placeholder="Message"
                        className={styles.field}
                    />
                    {errors.message && (
                        <span className="text-sm text-red-500">{errors.message.message}</span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#772D44] text-white px-4 py-2 rounded-2xl hover:bg-[#772D44]/80 transition-all duration-300 w-fit self-end"
                >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                </button>
            </form>
        </>
    );
}

const styles = {
    field: "bg-[#F4E1E7]/60 rounded-xl p-4 placeholder:text-[#3B1621]",
};
