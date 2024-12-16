'use server'

import { BBSData } from '@/app/types/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'


export async function getDetailBBSData(id: number) {

	const response = await fetch(`http://localhost:3000/api/post/${id}`, {
		cache: "no-store", //SSR
	});

	const bbsDetailData: BBSData = await response.json();
	console.log(bbsDetailData);

	return bbsDetailData;
}




const BBSDetailPage = async ({ params }: { params: { bbsId: number } }) => {
	const {bbsId} = await params;
	const bbsDetailData = await getDetailBBSData(bbsId);
	const {title, content, username} = bbsDetailData;
	return (
		<div className='mx-auto max-w-4x1 p-4'>
			<div className='mb-8'>
				<h1 className='text-2x1 font-bold'>{title}</h1>
				<p className='text-gray-700'>{username}</p>
			</div>

			<div className='mb-8'>
				<p className='text-gray-900'>{content}</p>
			</div>

			<Button className='bg-blue-500 py-2 px-4'>
				<Link href = {"/"} className=" text-white font-bold  rounded-md">
					戻る
				</Link>
			</Button>
			<Button className='bg-green-500 py-2 px-4 rounded-md ml-4'>
				<Link href = {`/bbs-posts/${bbsId}/edit`} className=' text-white font-bold '>
					編集
				</Link>
			</Button>
		</div>
	)
}

export default BBSDetailPage
