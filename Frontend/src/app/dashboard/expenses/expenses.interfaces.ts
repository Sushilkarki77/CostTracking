import { Field, ExpenseSummary } from "../../core/interfaces/app.interface";

export type FilterState = Partial<{ name: string, startDate: string, endDate: string }>;


export type SortValues = '-1' | '1';

export const Fields: Field<ExpenseSummary>[] = [
  { label: "Name", name: "name", type: "string" },
  { label: "Created", name: "createdAt", type: "date", sortable: true },
  { label: "Method", name: "paymentMethod", type: "string" },
  { label: "Total", name: "total", type: "curency", sortable: true }
]