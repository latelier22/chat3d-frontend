import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="max-h-screen">
      <nav>
        <ul className="flex flex-col md:flex-row items-end md:justify-end px-8 space-x-4 p-4 bg-gray-800 text-white">
          <li>
            <Link to="/" className="hover:underline">
              Avatar
            </Link>
          </li>
          <li>
            <Link to="/cube" className="hover:underline">
              Cube
            </Link>
          </li>
          <li>
            <Link to="/google" className="hover:underline">
              Google
            </Link>
          </li>
          <li>
            <Link to="/coque" className="hover:underline">
              Coque
            </Link>
          </li>
          <li>
            <Link to="/textures" className="hover:underline">
              Textures
            </Link>
          </li>
        </ul>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
