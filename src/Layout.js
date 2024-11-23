import Header from './components/Header';
import Navigation from './components/Navigation';

function Layout({ children }) {
  return (

    <div className="flex flex-col min-h-screen bg-white">
      {/* 상단바 */}
      <Header />
      
      {/* 메인 콘텐츠 영역 */}
      <main className="main-content flex-grow">{children}</main>
      
      {/* 하단 네비게이션 바 */}
      <Navigation />
    </div>
  );
}

export default Layout;
