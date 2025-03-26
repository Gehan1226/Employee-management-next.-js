import { z } from "zod";
import { taskSchema } from "../lib/util/schemas";

export type TaskFormValues = z.infer<typeof taskSchema>;
