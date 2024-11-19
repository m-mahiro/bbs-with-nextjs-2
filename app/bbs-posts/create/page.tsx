"use client"

import { postBBS } from '@/app/actions/postBBSActions'
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

export const formSchema = z.object({
	username: z.string().min(2,{message:"ユーザ名は２文字以上で"}),
	title: z.string().min(2,{message:"タイトルは10文字以上で"}),
	content: z.string()
		.min(2,{message:"本文はは10文字以上で"})		
		.max(140,{message:"本文はは140文字以内で"}),
});

const CreateBBSPage = () => {

	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			title: "",
			content: "",
		}
	});

	async function onSubmit(value: z.infer<typeof formSchema>) {
		const {username, title, content } = value;
		postBBS({username, title, content});

	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel></FormLabel>
							<FormControl>
								<Input placeholder="ユーザー名" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

			<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>タイトル</FormLabel>
							<FormControl>
								<Input placeholder="タイトル" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>本文</FormLabel>
							<FormControl>
								<Textarea
									placeholder='投稿内容'
									className='resize-none'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</FormProvider>
	)
}

export default CreateBBSPage
