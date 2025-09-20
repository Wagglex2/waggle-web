import { Outlet } from 'react-router-dom';
import MainHeader from '../components/layout/MainHeader';
import MainNav from '../components/layout/MainNav';

const MainLayout = () => {
  return (
    <div>
      <MainHeader />
      <MainNav />
      <Outlet />
    </div>
  );
};

export default MainLayout;
