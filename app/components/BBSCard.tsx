import React from 'react'
import { cn } from "@/lib/utils";
import { BellRing, Car, Check } from "lucide-react"
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

type CardProps = React.ComponentProps<typeof Card>

interface BBSDataProp {
  bbsData: BBSData
}

const BBSCard = ({bbsData}:BBSDataProp) => {
  const { id, title, content, createdAt, username } = bbsData;

	return (
		<div>
			<Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {username}
          </CardDescription>
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
