"use client";

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { categoryColors } from '@/data/categories';
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import React from 'react'
import { Clock } from 'lucide-react';

const TransactionTable = ({transactions}) => {
    const filterAndSortedTransactions = transactions;
    const handleSort =()=>{}

  return (
    <div className='space-y-4'>
        {/*Filters*/}

        {/* transactions */}
        <div className='rounded-md border'>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader className={"bg-gray-100 text-gray-700"}>
                <TableRow>
                    <TableHead className="w-[50px]">
                        <Checkbox/>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={()=> handleSort("date")} >
                        <div className='font-semibold text-sm tracking-wider'>Date</div>
                    </TableHead>
                    <TableHead className='font-semibold text-sm tracking-wider'>Description</TableHead>
                    <TableHead className="cursor-pointer" onClick={()=> handleSort("category")}>
                        <div className='flex items-center font-semibold text-sm tracking-wider'>Category</div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={()=> handleSort("amount")}>
                        <div className='flex items-center font-semibold tracking-wider test-sm'>Amount</div>
                    </TableHead>
                    <TableHead className='font-semibold text-sm tracking-wider'>Recurring</TableHead>
                    <TableHead className={"w-[50px]"}/>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filterAndSortedTransactions.length===0?(
                    <TableRow>
                        <TableCell colSpan={7} className={"text-center text-muted-foreground"} >No Transactions Found</TableCell>
                    </TableRow>
                ):(
                    filterAndSortedTransactions.map((transaction)=>(
                <TableRow key={transaction.id}>
                    <TableCell>
                        <Checkbox />
                    </TableCell>
                    <TableCell>
                        {format(new Date(transaction.date), "PP")}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={"capitalize"}>
                        <span
                        style={{
                            background: categoryColors[transaction.category],
                        }}
                        className='inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium text-white'>
                            {transaction.category}
                        </span></TableCell>
                    <TableCell className={"text-center font-medium"}
                    style={{
                        color: transaction.type === "EXPENSE" ? "red" : "green"}}>
                        {transaction.type === "EXPENSE" ? "-" : "+"}
                        ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{transaction.isRecurring?(
                        <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>Hover</TooltipTrigger>
                            <TooltipContent>
                                <p>Add to library</p>
                            </TooltipContent>
                            </Tooltip>
                    </TooltipProvider>
                    ):<Badge variant="outline" className={"gap-1"}>
                        <Clock className="h-3 w-3"/>One-time</Badge>}
                    </TableCell>
                </TableRow>    
                    ))
                )}
            </TableBody>
        </Table>
        </div>
    </div>
  )
}

export default TransactionTable