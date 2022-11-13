import HomeHeader from '../../layout/home/HomeHeader';

import HomeEventList from '../../layout/home/HomeEventList';

export default function Home() {
  return (
    <>
      <HomeHeader />
      <main>
        <HomeEventList type='categories' />
        <HomeEventList type='past' />
      </main>
    </>
  );
}
