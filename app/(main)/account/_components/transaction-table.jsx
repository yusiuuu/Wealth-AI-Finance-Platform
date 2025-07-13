"use client";

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { categoryColors } from '@/data/categories';
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, MoreHorizontal, RefreshCw } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
}

const TransactionTable = ({transactions}) => {
    const Router = useRouter();
    const [selectedIds, setSelectedIds]= useState([]);
    const [sortConfig, setSortConfig] = useState({
        field: "date",
        direction: "desc",
    });

    const filterAndSortedTransactions = transactions;
    const handleSort =(field)=>{
        setSortConfig(current=>({
            field,
            direction:
                current.field==field && current.direction==="asc" ? "desc" : "asc"
        }))
    }

    const handleSelect = (id)=> {
        setSelectedIds((current)=>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    }

    const handleSelectAll = (id) => {}

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
                    <TableHead
                    className="cursor-pointer" 
                    onClick={()=> handleSort("date")}
                    >
                        <div className='flex items-center'>Date{" "}{sortConfig.field==='date'&&
                        (sortConfig.direction === "asc"? (
                            <ChevronUp className="ml-1 h-4 w-4"/>
                        ):( 
                            <ChevronDown className="ml-1 h-4 w-4"/>
                        ))}
                        </div>
                    </TableHead>
                    <TableHead className='font-semibold text-sm tracking-wider'>Description</TableHead>
                    <TableHead className="cursor-pointer" onClick={()=> handleSort("category")}>
                        <div className='flex items-center'>Category{sortConfig.field==='category'&&
                        (sortConfig.direction === "asc"? (
                            <ChevronUp className="ml-1 h-4 w-4"/>
                        ):( 
                            <ChevronDown className="ml-1 h-4 w-4"/>
                        ))}
                        </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={()=> handleSort("amount")}>
                        <div className='flex items-center font-semibold test-sm'>Amount
                            {sortConfig.field==='amount'&&
                        (sortConfig.direction === "asc"? (
                            <ChevronUp className="ml-1 h-4 w-4"/>
                        ):( 
                            <ChevronDown className="ml-1 h-4 w-4"/>
                        ))}
                        </div>
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
                        <Checkbox onCheckedChange={()=> handleSelect(transaction.id)}
                        checked={selectedIds.includes(transaction.id)}
                        />
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
                            <TooltipTrigger>
                                <Badge variant="outline" className={"gap-1 bg-purple-100 text-purple-800 hover:bg-purple-200"}>
                                    <RefreshCw className="h-3 w-3"/>{RECURRING_INTERVALS[transaction.recurringInterval]}</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                <div className='text-sm'>
                                    <div className='font-medium'>Next Date:</div>
                                    <div>
                                        {format(new Date(transaction.nextRecurringDate), "PP")}
                                    </div>
                                </div>
                            </TooltipContent>
                            </Tooltip>
                    </TooltipProvider>
                    ):(<Badge variant="outline" className={"gap-1"}>
                        <Clock className="h-3 w-3"/>One-time</Badge>)}
                    </TableCell>

                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"ghost"} className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel
                                    onClick={()=>
                                        Router.push(`/transaction/create?edit=${transaction.id}`)
                                    }
                                >Edit</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className={"text-destructive"}
                                //onClick={()=> deleteFn([transaction.id])}
                                >Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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