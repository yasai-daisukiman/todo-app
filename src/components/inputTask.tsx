/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type FormProps = {
  title: string;
  desc: string;
  date: Date;
};

const formSchema = z.object({
  title: z.string().min(1, {
    message: '*Required',
  }),
  desc: z.string().min(0, {
    message: '',
  }),
  date: z.date({
    required_error: 'A date is required.',
  }),
});

export const InputTask = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      desc: '',
    },
  });

  //firestoreへデータ追加
  const addDocument = async (todo: FormProps) => {
    const docData = {
      title: todo.title,
      desc: todo.desc,
      date: todo.date,
    };
    try {
      await addDoc(collection(db, 'todos'), docData);
      //console.log('Document written with ID: ', docRef.id);
      form.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleSubmit = async () => {
    const values = form.getValues(); // フォームからtitle,desc,dateを取得
    const todo = {
      title: values.title,
      desc: values.desc,
      date: values.date,
    };
    await addDocument(todo); // 取得したporpsを使用して addDocumentを呼び出す
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='y-4 w-full space-y-4'>
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
          <FormField
            control={form.control}
            name='desc'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    className='w-full'
                    placeholder='input description...'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='center' side='right'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='my-2 w-full ' type='submit'>
            Add
            <IoIosAddCircleOutline className=' size-5 pt-0.5 ' />
          </Button>
        </form>
      </Form>
    </>
  );
};
