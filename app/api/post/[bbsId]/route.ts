import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismaClient";
import { BBSData } from "@/app/types/types";


export async function GET(req: Request, {params}: {params: {bbsId: string}}) {
	const bbsId = params.bbsId;
	const bbsDetailData = await prisma.post.findUnique({where: {
		id : parseInt(bbsId),
	}});
	return NextResponse.json(bbsDetailData);
}	

// export async function DELETE(req: Request, {params}: {params: {bbsId: string}}) {
// 	const bbsId = params.bbsId;
// 	await prisma.post.delete({
// 		where: {
// 			id: parseInt(bbsId),
// 		}
// 	})
// }

// export async function UPDATE(
// 	eq: Request,
// 	{params}: {params: {bbsId: string}},
// 	{username, title, content}: BBSData,
// ) {
// 	const bbsId = params.bbsId;
// 	await prisma.post.update({
// 		where: {
// 			id: parseInt(bbsId),
// 		},
// 		data: {
// 			username,
// 			title,
// 			content,
// 		}
// 	})
// }