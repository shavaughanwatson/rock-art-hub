import { Outlet } from 'react-router-dom';
import MainHeader from './components/mainheader.jsx';
import Footer from './components/footer.jsx';

function RootLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
      <Footer />
    </>
  );
}
export default RootLayout;
