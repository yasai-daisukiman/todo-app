'use client';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { signInUser } from './firebase/signinUser';

type LoginForm = {
  username: string;
  password: string;
};

const loginFormSchema = z.object({
  username: z.string().min(1, {
    message: '*Required',
  }),
  password: z
    .string()
    .min(8, {
      message: 'password needs more than 8 words',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message: 'a-z,A-Z,0-9',
    }),
});

const LoginPage = () => {
  const loginForm = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = loginForm;

  const onSubmit: SubmitHandler<LoginForm> = async (user) => {
    const res = await signInUser(user);
    console.log(res);
  };

  return (
    <Layout>
      <Form {...loginForm}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={loginForm.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>mail</FormLabel>
                <FormControl>
                  <Input placeholder='username' {...register('username')} {...field} />
                </FormControl>
                <FormMessage>{errors.username && errors.username.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='password' {...register('password')} {...field} />
                </FormControl>
                <FormMessage>{errors.password && errors.password.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button type='submit'>Login</Button>
        </form>
      </Form>
    </Layout>
  );
};
export default LoginPage;
