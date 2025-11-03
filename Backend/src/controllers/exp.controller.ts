import { RequestHandler } from "express";
import { ResponseItem } from "../types/interfaces";
import { ExpDocument, findExplistByuserId, createExp, deleteExp, updateExp } from "../models/exp.model";


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

export const updateExpense: RequestHandler<{ id: string }, ResponseItem<{ updatedItem: ExpDocument | null }>, ExpDocument> = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const expObj = req.body;
        const updatedItem: ExpDocument | null = await updateExp(user._id, id, expObj);
        if (!updatedItem) res.status(404).json({ message: "Item does not exist" });
        res.status(200).json({ message: "Expense deleted successfully", data: { updatedItem } });
    } catch (error) {
        next(error);
    }
};



export const deleteExpense: RequestHandler<{ id: string }, ResponseItem<{ deletedItem: ExpDocument | null }>> = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const deletedItem: ExpDocument | null = await deleteExp(id, user._id);
        if (!deletedItem) res.status(404).json({ message: "Item does not exist" });
        res.status(200).json({ message: "Expense deleted successfully", data: { deletedItem } });
    } catch (error) {
        next(error);
    }
};
