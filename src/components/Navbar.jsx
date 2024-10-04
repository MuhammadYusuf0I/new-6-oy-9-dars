import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100 base-container ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            ></div>
          </div>
          <Link className="btn    text-3xl btn-ghost  ">Phones</Link>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 items-center ">
            <li>
              <Link className=" text-[#294E6A]" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className=" text-[#294E6A]" to={"/about"}>
                About
              </Link>
            </li>
            <li>
              <Link className=" text-[#294E6A]" to={"/contact"}>
                Contact
              </Link>
            </li>
            <ul className="menu menu-horizontal px-1 items-center">
              {" "}
              <li>
                <Link className=" text-[#294E6A]" to={"/register"}>
                  Register
                </Link>{" "}
              </li>
              <li>
                {" "}
                <Link className=" text-[#294E6A]" to={"/login"}>
                  Login
                </Link>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
