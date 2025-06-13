import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  reason: z.enum(["contact", "recrutement", "autre"]),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string()
    .min(10, "Le numéro de téléphone doit contenir au moins 10 caractères")
    .regex(/^[0-9]+$/, "Le numéro de téléphone doit contenir uniquement des chiffres"),
  prestation: z.enum(["prestation1", "prestation2", "prestation3"]),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <select
          {...register("reason")}
          id="reason"
          className={styles.field}
        >
          <option value="contact">Contact</option>
          <option value="recrutement">Recrutement</option>
          <option value="autre">Autre</option>
        </select>
        {errors.reason && (
          <span className="text-sm text-red-500">{errors.reason.message}</span>
        )}
      </div>

      <div className="flex gap-4">
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

      <div className="flex flex-col gap-2">
        <select
          {...register("prestation")}
          id="prestation"
          className={styles.field}
        >
          <option value="prestation1">Prestation 1</option>
          <option value="prestation2">Prestation 2</option>
          <option value="prestation3">Prestation 3</option>
        </select>
        {errors.prestation && (
          <span className="text-sm text-red-500">{errors.prestation.message}</span>
        )}
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
        className="bg-primary text-white px-4 py-2 rounded-2xl hover:bg-secondary transition-all duration-300 w-fit self-end"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
      </button>
    </form>
  );
}

const styles = {
  field: "bg-tertiary/30 rounded-xl p-4 placeholder:text-quaternary/50",
};
