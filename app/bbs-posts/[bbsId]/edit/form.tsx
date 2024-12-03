'use client'


import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from '../../create/page'
import { updateBBS } from '@/app/actions/postBBSActions'
import { getDetailBBSData } from '../page'

const EditionForm = (props:{bbsId:number}) => {	
	const bbsId = props.bbsId;
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			title: "",
			content: "",
		}
	});
	
	useEffect(() => {
		const fetchData = async () => {
			const { username, title, content } = await getDetailBBSData(bbsId);
	
			// Update the form's default values after data fetching	
			form.reset({ username, title, content });

		};
		fetchData();
	},
		[bbsId, form]
	);
	
	
	async function onSubmit(value: z.infer<typeof formSchema>) {
		const { username, title, content } = value;
		updateBBS({ username, title, content }, bbsId.toString());
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
								<Input placeholder="ユーザー名" {...field}/>
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
				<Button type="submit">Update</Button>
			</form>
		</FormProvider>
	)	
}

export default EditionForm;