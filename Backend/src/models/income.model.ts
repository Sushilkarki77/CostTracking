import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const incomeSchema = new Schema(
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        amount: { type: String, required: true },
        currency: { type: String, required: true },
        date: { type: String, required: true },
        note: { type: String }
    },
    { timestamps: true }
);

export type IncomeDocument = InferSchemaType<typeof incomeSchema>;
export const IncomeModel = model<IncomeDocument>('income', incomeSchema);

export const createIncome = async (income: IncomeDocument): Promise<IncomeDocument> => {
    const incomeModel = new IncomeModel({ ...income });
    return await incomeModel.save();
};

export const seedIncome = async (incomes: IncomeDocument[]): Promise<IncomeDocument[]> => {
    return await IncomeModel.insertMany(incomes);
};

export const updateIncome = async (userId: string, _id: string, income: IncomeDocument): Promise<IncomeDocument | null> => {
    return await IncomeModel.findOneAndUpdate({ userId, _id }, { $set: income }, { new: true, lean: true });
};

export const deleteIncome = async (_id: string, userId: string): Promise<IncomeDocument | null> => {
    return await IncomeModel.findOneAndDelete({ _id, userId });
};

export const findIncomeListByUserId = async (userId: string): Promise<IncomeDocument[]> => {
    return await IncomeModel.find({ userId }).sort({ createdAt: -1 });
};
