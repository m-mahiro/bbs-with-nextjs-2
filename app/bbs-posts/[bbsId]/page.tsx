import { BBSData } from '@/app/types/types';
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

			<Link href = {"/"} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
				戻る
			</Link>
			<Link href = {`/bbs-posts/${bbsId}/edit`} className='bg-green-500 text-white font-bold py-2 px-4 rounded-md ml-4'>
				編集
			</Link>
		</div>
	)
}

export default BBSDetailPage
