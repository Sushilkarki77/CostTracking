import { RequestHandler } from "express";
import { ErrorWithStatus, ResponseItem } from "../types/interfaces";
import { 
    IncomeDocument, 
    findIncomeListByUserId, 
    createIncome, 
    deleteIncome, 
    updateIncome 
} from "../models/income.model";

export const getIncomeListByUserId: RequestHandler<unknown, ResponseItem<IncomeDocument[]>> = async (req, res, next) => {
    try {
        const user = req.user;
        const incomeList: IncomeDocument[] = (await findIncomeListByUserId(user._id)) ?? [];
        res.status(200).json({ data: incomeList });
    } catch (error) {
        next(error);
    }
};

export const createIncomeItem: RequestHandler<unknown, ResponseItem<IncomeDocument>, IncomeDocument> = async (req, res, next) => {
    try {
        const user = req.user;
        const incomeObj = req.body;
        const createdItem: IncomeDocument = await createIncome({ ...incomeObj, userId: user._id });
        res.status(200).json({ data: createdItem });
    } catch (error) {
        next(error);
    }
};

export const updateIncomeItem: RequestHandler<{ id: string }, ResponseItem<IncomeDocument>, IncomeDocument> = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const incomeObj = req.body;

        const updatedItem: IncomeDocument | null = await updateIncome(user._id, id, incomeObj);

        if (!updatedItem) throw new ErrorWithStatus("Item does not exist", 404);

        res.status(200).json({ message: "Income updated successfully", data: { ...updatedItem } });
    } catch (error) {
        next(error);
    }
};

export const deleteIncomeItem: RequestHandler<{ id: string }, ResponseItem<{ deletedItem: IncomeDocument | null }>> = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const deletedItem: IncomeDocument | null = await deleteIncome(id, user._id);
        if (!deletedItem) res.status(404).json({ message: "Item does not exist" });
        res.status(200).json({ message: "Income deleted successfully", data: { deletedItem } });
    } catch (error) {
        next(error);
    }
};
