"use client"

import { postBBS } from '@/app/actions/postBBSActions'
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

export const formSchema = z.object({
	username: z.string().min(2, { message: "ユーザ名は２文字以上で" }),
	title: z.string().min(2, { message: "タイトルは2文字以上で" }),
	content: z.string()
		.min(2, { message: "本文はは2文字以上で" })
		.max(140, { message: "本文はは140文字以内で" }),
});

const CreateBBSPage = () => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false); // 送信中状態を管理

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			title: "",
			content: "",
		}
	});

	async function onSubmit(value: z.infer<typeof formSchema>) {
		setIsSubmitting(true); // 送信中に設定
		try {
			const { username, title, content } = value;
			await postBBS({ username, title, content }); // 送信処理
			router.push('/success'); // 成功後のページ遷移など
		} catch (error) {
			console.error('Error posting data:', error); // エラーハンドリング
		} finally {
			setIsSubmitting(false); // 送信完了
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ユーザー名</FormLabel>
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

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "送信中..." : "Submit"}
				</Button>
			</form>
		</FormProvider>
	)
}

export default CreateBBSPage;
