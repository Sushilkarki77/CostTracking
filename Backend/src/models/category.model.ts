import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: { type: String, required: true }
    },
    { timestamps: true }
);

export type CategoryDocument = InferSchemaType<typeof categorySchema>;
export const CategoryModel = model<CategoryDocument>('category', categorySchema);


export const createCategory = async (category: CategoryDocument): Promise<CategoryDocument> => {
    const categoryModel = new CategoryModel({ ...category });
    return await categoryModel.save();
};


export const updateCategory = async (_id: string, category: CategoryDocument): Promise<CategoryDocument | null> => {
    return await CategoryModel.findByIdAndUpdate(_id, { $set: category }, { new: true });
};


export const deleteCategory = async (_id: string): Promise<CategoryDocument | null> => {
    return await CategoryModel.findByIdAndDelete(_id);
};


export const findAllCategories = async (): Promise<CategoryDocument[]> => {
    return await CategoryModel.find();
};


export const findCategoryById = async (_id: string): Promise<CategoryDocument | null> => {
    return await CategoryModel.findById(_id);
};
