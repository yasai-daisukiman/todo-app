'use client';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <Layout>
      <main className='flex flex-col p-12 items-center'>
        <h2 className='font-medium text-4xl'>Login</h2>
        <div className='flex py-4 gap-4 justify-between'>
          <Link href='/'>
            <Button>Start Menu</Button>
          </Link>
          <Link href='/top'>
            <Button>LOGIN</Button>
          </Link>
        </div>
      </main>
    </Layout>
  );
};
export default LoginPage;
