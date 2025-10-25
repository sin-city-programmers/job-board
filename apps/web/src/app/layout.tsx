import './global.css';

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
        {/* Header - appears on all pages */}
        <header className="flex justify-between items-center px-8 py-4 border-b bg-white">
          <h1 className="text-xl font-semibold">
            Sin City Tech Jobs{' '}
            <span className="text-gray-500 text-sm">by Tech Alley</span>
          </h1>
          <button className="btn btn-primary">Login / Sign Up</button>
        </header>

        {/* Main content area - pages render here */}
        <main>{children}</main>

        {/* Footer - appears on all pages */}
        <footer className="text-center text-sm text-gray-500 border-t py-4">
          Sin City Tech Jobs - A Tech Alley Community Project
          <br />
          <a href="#" className="link link-hover text-gray-400">
            About
          </a>{' '}
          •{' '}
          <a href="#" className="link link-hover text-gray-400">
            Contact
          </a>{' '}
          •{' '}
          <a href="#" className="link link-hover text-gray-400">
            Privacy Policy
          </a>
        </footer>
      </body>
    </html>
  );
}
