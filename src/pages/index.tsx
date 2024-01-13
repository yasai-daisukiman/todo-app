import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import Link from 'next/link';

const Home = () => {
  return (
    <Layout>
      <main className='flex flex-col p-12 items-center'>
        <div>
          <h2 className='font-medium text-4xl text-center'>Welcome to MyPage!</h2>
          <p className='py-4'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio tenetur, in,
            temporibus commodi doloribus, nobis obcaecati adipisci aspernatur laborum rem
            accusantium deleniti pariatur. Repudiandae esse temporibus optio possimus
            voluptatibus tenetur, ipsum debitis ratione quas quo consectetur ullam dolorem
            nobis eaque necessitatibus eos vitae vel sunt tempore nostrum quam culpa
            pariatur?
          </p>
        </div>
        <div className='py-4'>
          <Link href='/login'>
            <Button>Get Sterted</Button>
          </Link>
        </div>
      </main>
    </Layout>
  );
};
export default Home;
