import Navigation from './Navigation';
import Head from 'next/head';

function Layout(props) {
  return (
    <div className='h-screen m-0'>
      <Head>
        <title>Voltran</title>
      </Head>
      <Navigation />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
