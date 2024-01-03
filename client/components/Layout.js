import Navigation from './Navigation';
import Head from 'next/head';

function Layout(props) {
  return (
    <div>
      <Head>
        <title>Voltran</title>
      </Head>
      <Navigation />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
