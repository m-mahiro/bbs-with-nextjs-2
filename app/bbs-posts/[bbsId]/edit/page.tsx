
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
import createForm from './form'
import EditionForm from './form'



const CreateBBSPage = async ({ params }: { params: Promise<{ bbsId: number }> }) => {
	const {bbsId} = await params;

	console.log(bbsId);
	return (

		<div>
			<EditionForm bbsId = {bbsId} />
		</div>

	)
}

export default CreateBBSPage
