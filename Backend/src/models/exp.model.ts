import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const expSchema = new Schema(
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        date: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        note: { type: String },

        items: [
            {
                currency: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                category: {
                    _id: { type: String },
                    name: { type: String }
                }
            }
        ]
    },
    { timestamps: true }
)

export type ExpDocument = InferSchemaType<typeof expSchema>;
export const ExpModel = model<ExpDocument>('exp', expSchema);


export const createExp = async (exp: ExpDocument): Promise<ExpDocument> => {
    const expModel = new ExpModel({ ...exp });
    return await expModel.save();
};


export const seedExp = async (exps: ExpDocument[]): Promise<ExpDocument[]> => {
    return await ExpModel.insertMany(exps)
};

export const updateExp = async (userId: string, _id: string, exp: ExpDocument): Promise<ExpDocument | null> => {
    return await ExpModel.findOneAndUpdate({ userId, _id }, { $set: exp });
};

export const deleteExp = async (_id: string, userId: string): Promise<ExpDocument | null> => {
    return await ExpModel.findOneAndDelete({ _id, userId });
};

export const findExplistByuserId = async (userId: string): Promise<ExpDocument[]> => {
    return await ExpModel.find({ userId }).sort({ createdAt: -1 });
};
