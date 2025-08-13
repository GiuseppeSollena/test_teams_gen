import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useRenderFields from "shared/hooks/UseRenderFields";
import { sampleFormSchema } from "../schemas/SampleSchemas";
import { SAMPLE_FIELDS } from "../configs/FieldConfigs";
import GenericDialog from "shared/components/GenericDialog";

interface SampleModalProps {
  description: string;
  name: string;
}

const SampleModal: FC<SampleModalProps> = ({ description, name }) => {
  const { t } = useTranslation();
  // 1. Inizializza react-hook-form
  const form = useForm<SampleModalProps>({
    // 2. Collega Zod per la validazione
    resolver: zodResolver(sampleFormSchema),
    // 3. Imposta i valori di default usando le props del componente
    defaultValues: {
      name,
      description,
    },
  });

  // 4. Ottieni il renderer dall'hook, passandogli il contesto del form
  const { renderFieldWrapper } = useRenderFields({
    trigger: form.trigger,
    control: form.control,
    register: form.register,
    errors: form.formState.errors,
    t
  });

  // 5. Funzione di submit che viene chiamata solo se la validazione ha successo
  const onSubmit = (data: SampleModalProps) => {
    console.log("Dati del form validi:", data);
    alert("Form inviato con successo! Controlla la console.");
  };

  const onError = (errors: any) => {
    console.error("Errori di validazione:", errors);
  };

  return (

    <GenericDialog>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} noValidate>
        {SAMPLE_FIELDS.map(fieldConfig => renderFieldWrapper({
          field: fieldConfig,
        }))}

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          style={{ padding: '0.75rem 1.5rem', background: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {form.formState.isSubmitting ? 'Salvataggio...' : 'Salva Modifiche'}
        </button>
      </form>
    </GenericDialog>


  );
};

export default SampleModal;