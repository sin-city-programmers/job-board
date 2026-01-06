import './global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'Sin City Tech Jobs',
  description: 'Tech job board by Tech Alley community',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
    >
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
