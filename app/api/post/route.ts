'use server'

import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient";


export async function GET(req: Request) {
	const allBBSPost = await prisma.post.findMany();
	console.log(allBBSPost);
	return NextResponse.json(allBBSPost);
}


// export async function POST(req: Request) {
// 	const { username, title, content} = await req.json();

// 	const post = await prisma.post.create({
// 		data: {
// 			username, 
// 			title,
// 			content,
// 		}
// 	});
// 	return NextResponse.json(post);
// }