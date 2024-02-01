import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import Link from 'next/link';

const Home = () => {
  return (
    <Layout>
      <main className='flex flex-col items-center p-12'>
        <div>
          <h2 className='text-4xl font-medium'>Welcome to Todo-App😆</h2>
          <p className='max-w-md py-4 text-center'>This is a simple todo-app.</p>
        </div>
        <div className='py-4'>
          <Link href='/top'>
            <Button>Get Started</Button>
          </Link>
        </div>
      </main>
    </Layout>
  );
};
export default Home;
