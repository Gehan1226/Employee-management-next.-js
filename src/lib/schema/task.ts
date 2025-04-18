import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

const dayjsSchema = z
  .custom<Dayjs>((val) => dayjs.isDayjs(val), {
    message: "Invalid date format",
  });

export const taskSchema = z.object({
  description: z.string().min(5, "Description must be at least 5 characters"),
  assignedDateTime: dayjsSchema,
  dueDateTime: dayjsSchema,
  status: z.string().min(1, "Status is required"),
});