import { FieldBase } from "shared/models/SharedModels";
import { SampleTable } from "../models/SampleModels";

export const SAMPLE_FIELDS: FieldBase<Omit<SampleTable, "id">>[] = [
  {
    label: "Nome",
    name: "name",
    component: "input",
    type: "text",
    required: true,
    placeHolder: "Inserisci il nome",
    description: "Il nome del campione deve essere unico."
  },
  {
    label: "Descrizione",
    name: "description",
    component: "textarea",
    required: true,
    placeHolder: "Inserisci una descrizione",
    description: "La descrizione deve essere tra 10 e 200 caratteri.",
    maxLength: 200
  },
];