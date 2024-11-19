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
import BBSCard from './BBSCard';
import { BBSData } from '../types/types';

type CardProps = React.ComponentProps<typeof Card>

interface BBSAllDataProps {
	bbsAllData: BBSData[];
}


const BBSCardList = ({bbsAllData}: BBSAllDataProps) => {
	return (
		<div  className="grid lg:grid-cols-3 px-4 py-4">
			{bbsAllData.map((bbsData:BBSData) => (
				<BBSCard key={bbsData.id} bbsData = {bbsData}/>
			))}
		</div>
	)
}

export default BBSCardList
