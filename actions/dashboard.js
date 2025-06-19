"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
    const serialized = {...obj };

    if(obj.balance){
        serialized.balance = Number(obj.balance);
    }

    if(obj.amount){
        serialized.amount = Number(obj.balance);
    }
}

export async function createAccount(data){
    try{
        const { userId }= await auth();
        if (!userId) { 
            throw new Error("User not authenticated");
        }
        
        const user = await db.user.findUnique({
            where: { clerkUserId: userId }
        });
        if (!user) {
            throw new Error("User not found");
        }

        // convert balance to float before saving
        const balanceFloat = parseFloat(data.balance)
        if (isNaN(balanceFloat)) {
            throw new Error("Invalid balance amount");
        }

        //check if this is the user's first account
        const existingAccounts = await db.account.findMany({
            where: { userId: user.id }
        });

        const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;

        //If this account should be default, set all other accounts to not default
        if(shouldBeDefault){
            // set all other accounts to not default
            await db.account.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false }
            });
        }

        const account = await db.account.create({
            data: {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault,
            }
        });

        const serializedAccount = serializeTransaction(account);

        revalidatePath("/dashboard");
        return { success: true, data: serializedAccount };
    } catch(error) {
        throw new Error(error.message);
    }
}

export async function getUserAccounts(){
    const { userId }= await auth();
        if (!userId) { 
            throw new Error("User not authenticated");
        }
        
        const user = await db.user.findUnique({
            where: { clerkUserId: userId }
        });
        if (!user) {
            throw new Error("User not found");
        }

        const accounts = await db.account.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { transactions: true }
                }
            }
        });

        const serializedAccount = serializeTransaction(account);

        return serializedAccount;
}