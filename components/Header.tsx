import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 bg-black bg-opacity-30 backdrop-blur-lg shadow-lg z-50">
      <nav className="flex justify-center space-x-8">
        <Link href="/dashboard">
          <span className="text-white text-lg font-semibold hover:text-gray-400 transition duration-300 cursor-pointer">
            Dashboard
          </span>
        </Link>
        <Link href="/upload">
          <span className="text-white text-lg font-semibold hover:text-gray-400 transition duration-300 cursor-pointer">
            Upload
          </span>
        </Link>
        <Link href="/music">
          <span className="text-white text-lg font-semibold hover:text-gray-400 transition duration-300 cursor-pointer">
            Music
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
