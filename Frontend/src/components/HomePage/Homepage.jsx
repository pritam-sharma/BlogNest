import Register from "../Users/Register";
import PublicPosts from "../Posts/PublicPosts";

const Homepage = () => {
  return (
    <div>
      <section
        className="relative bg-white overflow-hidden"
        style={{
          backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
          backgroundPosition: "center",
        }}
      >
        <div className="bg-transparent">
          {/* Mobile navbar overlay (optional if you use navbar separately) */}
          <div className="navbar-menu hidden fixed top-0 left-0 z-50 w-full h-full bg-coolGray-900 bg-opacity-50">
            <div className="fixed top-0 left-0 bottom-0 w-4/6 max-w-xs bg-white">
              <a className="navbar-close absolute top-5 p-4 right-3" href="#">
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.94 6L11.14 1.81C11.27 1.68 11.34 1.51 11.34 1.33C11.34 1.16 11.27 0.99 11.14 0.86C11.01 0.73 10.84 0.66 10.67 0.66C10.49 0.66 10.32 0.73 10.19 0.86L6 5.06 1.81 0.86C1.68 0.73 1.51 0.66 1.33 0.66C1.16 0.66 0.99 0.73 0.86 0.86C0.73 0.99 0.66 1.16 0.66 1.33C0.66 1.51 0.73 1.68 0.86 1.81L5.06 6 0.86 10.19C0.8 10.25 0.75 10.33 0.71 10.41C0.68 10.49 0.66 10.58 0.66 10.67C0.66 10.75 0.68 10.84 0.71 10.92C0.75 11 0.8 11.08 0.86 11.14C0.92 11.2 1 11.25 1.08 11.29C1.16 11.32 1.25 11.34 1.33 11.34C1.42 11.34 1.51 11.32 1.59 11.29C1.67 11.25 1.74 11.2 1.81 11.14L6 6.94 10.19 11.14C10.26 11.2 10.33 11.25 10.41 11.29C10.49 11.32 10.58 11.34 10.67 11.34C10.75 11.34 10.84 11.32 10.92 11.29C11 11.25 11.08 11.2 11.14 11.14C11.2 11.08 11.25 11 11.29 10.92C11.32 10.84 11.34 10.75 11.34 10.67C11.34 10.58 11.32 10.49 11.29 10.41C11.25 10.33 11.2 10.25 11.14 10.19L6.94 6Z"
                    fill="#556987"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-center">
              {/* Left Content */}
              <div className="w-full lg:w-1/2 mb-20 lg:mb-0">
                <div className="flex justify-center">
                  <span className="inline-block mb-6 px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                    Welcome to BlogNest
                  </span>
                </div>

                <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight text-coolGray-900 font-bold tracking-tight">
                  Share your stories, ideas, and passions with the world.
                </h1>
                <p className="mb-8 text-lg md:text-xl leading-7 text-coolGray-500 font-medium">
                  BlogNest is a community-driven platform where writers and
                  readers connect. Whether you want to inspire, teach, or simply
                  express yourself — your voice belongs here.
                </p>
                <ul>
                  <li className="mb-6 flex items-center">
                    <p className="text-lg md:text-xl leading-7 text-coolGray-500 font-medium">
                      ✍️ Write and publish blogs effortlessly
                    </p>
                  </li>
                  <li className="mb-6 flex items-center">
                    <p className="text-lg md:text-xl leading-7 text-coolGray-500 font-medium">
                      🌍 Connect with readers worldwide
                    </p>
                  </li>
                  <li className="flex items-center">
                    <p className="text-lg md:text-xl leading-7 text-coolGray-500 font-medium">
                      💬 Engage with comments & discussions
                    </p>
                  </li>
                </ul>
              </div>

              {/* Register Form */}
              <Register />
            </div>
          </div>
        </div>
      </section>

      {/* Public Posts Section */}
      <PublicPosts />
    </div>
  );
};

export default Homepage;
