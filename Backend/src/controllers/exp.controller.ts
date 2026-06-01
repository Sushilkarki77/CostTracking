import { RequestHandler } from "express";
import { ErrorWithStatus, ResponseItem } from "../types/interfaces";
import { ExpDocument, findExplistByuserId, createExp, deleteExp, updateExp, createManyExp } from "../models/exp.model";
import { findAllCategories } from "../models/category.model";


export const getExpenseListByUserId: RequestHandler<unknown, ResponseItem<ExpDocument[]>> = async (req, res, next) => {
    try {
        const user = req.user;
        const expList: ExpDocument[] = (await findExplistByuserId(user._id)) ?? [];
        res.status(200).json({ data: expList });
    } catch (error) {
        next(error);
    }
};

export const createExpense: RequestHandler<unknown, ResponseItem<ExpDocument>, Omit<ExpDocument, 'category'>> = async (req, res, next) => {
    try {
        const user = req.user;
        const expObj = req.body;
        const createdItem: ExpDocument = await createExp({ ...expObj, userId: user._id });
        res.status(200).json({ data: createdItem });
    } catch (error) {
        next(error);
    }
};

export const createBulkExpenses: RequestHandler<unknown, ResponseItem<{ insertedCount: number, inserted: ExpDocument[] }>, { expenses: Omit<ExpDocument, 'userId'>[] }> = async (req, res, next) => {
    try {
        const user = req.user;
        const { expenses } = req.body;

        const categories = await findAllCategories(user._id);
        const validCategoryIds = new Set(categories.map(c => String((c as unknown as { _id: unknown })._id)));

        const hasUnknownCategory = expenses.some(exp =>
            (exp.items ?? []).some(item => !item.category?._id || !validCategoryIds.has(item.category._id))
        );

        if (hasUnknownCategory) {
            throw new ErrorWithStatus("One or more expenses reference a category that does not exist", 400);
        }

        const docs = expenses.map(exp => ({ ...exp, userId: user._id })) as ExpDocument[];
        const inserted: ExpDocument[] = await createManyExp(docs);

        res.status(200).json({
            message: "Expenses imported successfully",
            data: { insertedCount: inserted.length, inserted }
        });
    } catch (error) {
        next(error);
    }
};

export const updateExpense: RequestHandler<{ id: string }, ResponseItem<ExpDocument>, ExpDocument> = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const expObj = req.body;

        const updatedItem: ExpDocument | null = await updateExp(user._id, id, expObj);

        if (!updatedItem) throw new ErrorWithStatus("Item does not exist", 404);

        res.status(200).json({ message: "Expense updated successfully", data: { ...updatedItem } });
    } catch (error) {
        next(error);
    }
};




export const deleteExpense: RequestHandler<{ id: string }, ResponseItem<{ deletedItem: ExpDocument | null }>> = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const deletedItem: ExpDocument | null = await deleteExp(id, user._id);
        if (!deletedItem) throw new ErrorWithStatus("Item does not exist", 404);
        res.status(200).json({ message: "Expense deleted successfully", data: { deletedItem } });
    } catch (error) {
        next(error);
    }
};
