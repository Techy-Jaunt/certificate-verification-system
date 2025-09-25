import { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import logo from "/images/image 2.png";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border border-b-(--color-normal-hover) shadow px-8 sm:px-20 py-4 flex items-center justify-between ">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 ">
        <h1 className="text-2xl text-(--color-primary-500)">
          <span className="font-bold">Techy</span>
          <span className="">Jaunt</span>
        </h1>
        <img src={logo} alt="TechyJaunt Logo" className="w-8 h-8" />
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-2 ">
        <li className="">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "text-(--color-primary-500) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                : "text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
            }
          >
            Home
          </NavLink>
        </li>

        <li className="">
          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              isActive
                ? "text-(--color-primary-500) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                : "text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
            }
          >
            About
          </NavLink>
        </li>

        <li className="">
          <NavLink
            to={"/download-certificate"}
            className={({ isActive }) =>
              isActive
                ? "text-(--color-primary-500) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                : "text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
            }
          >
           Download Certificate
          </NavLink>
        </li>

        <li className="">
          <NavLink
            to={"/recruiter-search"}
            className={({ isActive }) =>
              isActive
                ? "text-(--color-primary-500) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                : "text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
            }
          >
            Verify Graduates
          </NavLink>
        </li>

      </ul>

      <div
        type="button"
        onClick={() => setIsOpen(true)}
        className="md:hidden cursor-pointer"
      >
        <FaBars />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg py-6  transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex justify-end pb-6 pr-18  shadow cursor-pointer">
          <button onClick={() => setIsOpen(false)} className="">
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-col px-4 py-6 space-y-6 ">
          <li className="">
            <NavLink
              onClick={() => setIsOpen(false)}
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-(--color-primary-500) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2 w-full"
                  : "text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2 w-full"
              }
            >
              Home
            </NavLink>
          </li>

          <li className="">
            <NavLink
              onClick={() => setIsOpen(false)}
              to={"/about"}
              className={({ isActive }) =>
                isActive
                  ? "text-(--color-primary-500) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                  : "text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
              }
            >
              About
            </NavLink>
          </li>

          <li className="">
            <NavLink
              onClick={() => setIsOpen(false)}
              to={"/download-certificate"}
              className={({ isActive }) =>
                isActive
                  ? "text-(--color-primary-500) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                  : "text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
              }
            >
              Download Certificate
            </NavLink>
          </li>

          <li className="">
            <NavLink
              onClick={() => setIsOpen(false)}
              to={"/recruiter-search"}
              className={({ isActive }) =>
                isActive
                  ? "text-(--color-primary-500) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
                  : "text-(--color-darkened) rounded-md hover:bg-(--color-primary-50) font-medium py-2 px-2"
              }
            >
              Verify Graduates
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
