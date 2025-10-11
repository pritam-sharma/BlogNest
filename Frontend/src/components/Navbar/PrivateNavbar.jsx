import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slices/users/userSlices";
import BlogNest from "../../assets/BlogNest.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
    window.location.reload();
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Left section */}
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

                {/* Desktop Links */}
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
                </div>
              </div>

              {/* Right section */}
              <div className="flex items-center gap-4">
                {/* Add Post Button */}
                <Link
                  to="/add-post"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Post</span>
                </Link>

                {/* Profile Dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center rounded-full border border-gray-300 bg-white p-1 shadow-sm hover:shadow-md transition">
                    <img
                      className="h-9 w-9 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User Avatar"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-3 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/user-profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/update-profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logoutHandler}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block w-full text-left px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
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
                to="/add-post"
                className="block text-indigo-600 font-medium py-2"
              >
                Add New Post
              </Link>
              <button
                onClick={logoutHandler}
                className="block w-full text-left text-gray-600 hover:text-red-600 font-medium py-2"
              >
                Sign Out
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
