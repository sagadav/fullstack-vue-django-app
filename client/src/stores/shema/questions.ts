import { schema } from "normalizr";

export const questionSchema = new schema.Entity("questions");
export const questionArraySchema = new schema.Array(questionSchema);
