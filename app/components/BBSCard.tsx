'use client'

import React from 'react'
import { cn } from "@/lib/utils";
import { BellRing, Car, Check, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { BBSData } from '../types/types';
import { deleteBBS } from '../actions/postBBSActions';
import { Button } from '@/components/ui/button';

type CardProps = React.ComponentProps<typeof Card>

interface BBSDataProp {
  bbsData: BBSData
}

const BBSCard = ({bbsData}:BBSDataProp) => {
  const { id, title, content, createdAt, username } = bbsData;

  const deleteCard = () => {
    deleteBBS(id.toString())
  }

	return (
		<div className='mr-2 ml-2 mb-2 mt-2'>
			<Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {username}
          </CardDescription>
          <Button onClick={deleteCard} className='h-8 w-8 bg-grey-500'>
            <Trash className='h-5 w-5 text-red-500' />
          </Button>
        </CardHeader>
        <CardContent>
          {content}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/bbs-posts/${id}`} className="text-blue-500">Read More</Link>
        </CardFooter>
      </Card>

		</div>
	)
}

export default BBSCard
