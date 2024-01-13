'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const formSchema = z.object({
  title: z.string().min(0, {
    message: 'Title must be at least 2 characters.',
  }),
});

export const InputTask = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const addDocument = async (title: string) => {
    const docData = {
      title: title,
      detail: 'test',
    };
    try {
      const docRef = await addDoc(collection(db, 'todos'), docData);
      console.log('Document written with ID: ', docRef.id);
      form.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleSubmit = () => {
    const { title } = form.getValues(); // フォームからタイトルを取得
    addDocument(title); // 取得したタイトルを使用して addDocument を呼び出す
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 w-full y-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input className='w-full' placeholder='input title...' {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='my-2 w-full ' type='submit'>
            Add
          </Button>
        </form>
      </Form>
    </>
  );
};
