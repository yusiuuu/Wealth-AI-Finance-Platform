"use client";

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns';
import React from 'react'

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
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>$250.00</TableCell>
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