import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import BlogNest from "../../assets/BlogNest.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PublicNavbar() {
  return (
    <Disclosure
      as="nav"
      className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Left Section */}
              <div className="flex items-center gap-3">
                {/* Mobile menu button */}
                <div className="flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                  <img
                    src={BlogNest}
                    alt="BlogNest Logo"
                    className="w-10 h-10 rounded-full object-cover shadow-sm border border-indigo-200"
                  />
                  <span className="hidden md:block text-xl font-bold text-indigo-600 tracking-tight">
                    BlogNest
                  </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:ml-8 md:flex md:space-x-6">
                  <Link
                    to="/"
                    className="text-gray-800 hover:text-indigo-600 font-medium transition-colors duration-200"
                  >
                    Home
                  </Link>
                  <Link
                    to="/posts"
                    className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200"
                  >
                    Posts
                  </Link>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200"
                  >
                    Register
                  </Link>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center">
                <Link
                  to="/add-post"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Post</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 transform scale-95"
            enterTo="opacity-100 transform scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 transform scale-100"
            leaveTo="opacity-0 transform scale-95"
          >
            <Disclosure.Panel className="md:hidden border-t border-gray-200 bg-white">
              <div className="space-y-1 py-3 px-4">
                <Link
                  to="/"
                  className="block text-gray-800 hover:text-indigo-600 font-medium py-2"
                >
                  Home
                </Link>
                <Link
                  to="/posts"
                  className="block text-gray-600 hover:text-indigo-600 font-medium py-2"
                >
                  Posts
                </Link>
                <Link
                  to="/login"
                  className="block text-gray-600 hover:text-indigo-600 font-medium py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-gray-600 hover:text-indigo-600 font-medium py-2"
                >
                  Register
                </Link>
                <Link
                  to="/add-post"
                  className="block text-indigo-600 font-medium py-2"
                >
                  Add Post
                </Link>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
