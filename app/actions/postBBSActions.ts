'use server'

import { z } from "zod"
import { formSchema } from "../bbs-posts/create/page";
import prisma from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildStaticPaths } from "next/dist/build/utils";

export const postBBS = async ({
	username, 
	title,
	content
}: z.infer<typeof formSchema>) => {
	await prisma.post.create({
		data: {
			username, 
			title,
			content,
		}
	});

	revalidatePath("/");
	redirect("/");
}

export const updateBBS = async ({
		username, 
		title, 
		content
	}: z.infer<typeof formSchema>,
	bbsId: string
) => {
	await prisma.post.update({
		data: {
			username,
			title,
			content,
		},
		where: {
			id: parseInt(bbsId)
		}
	})

	revalidatePath("/");
	redirect("/");

}

export const deleteBBS = async (bbsId: string) => {
	await prisma.post.delete({
		where: {
			id: parseInt(bbsId)
		}
	})
	revalidatePath("/");
	redirect("/");

}