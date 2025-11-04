import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: { type: String, required: true },
        userId: { type: String, required: true }
    },
    { timestamps: true }
);

export type CategoryDocument = InferSchemaType<typeof categorySchema>;
export const CategoryModel = model<CategoryDocument>('category', categorySchema);


export const createCategory = async (category: CategoryDocument): Promise<CategoryDocument> => {
    const categoryModel = new CategoryModel({ ...category });
    return await categoryModel.save();
};


export const updateCategory = async (_id: string, userId: string, category: CategoryDocument): Promise<CategoryDocument | null> => {
    return await CategoryModel.findByIdAndUpdate({ _id, userId }, { $set: category }, { new: true });
};


export const deleteCategory = async (_id: string, userId: string): Promise<CategoryDocument | null> => {
    return await CategoryModel.findOneAndDelete({ _id, userId });
};


export const findAllCategories = async (userId: string): Promise<CategoryDocument[]> => {
    return await CategoryModel.find({ userId }, { __v: 0 });
};


export const findCategoryById = async (_id: string): Promise<CategoryDocument | null> => {
    return await CategoryModel.findById(_id);
};
