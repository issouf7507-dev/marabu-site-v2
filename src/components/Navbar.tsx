import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo_Marabu_.png";

const languages = ["FRANCAIS", "ENGLISH"];

export default function Navbar() {
  const [lang, setLang] = useState("FRANCAIS");
  const location = useLocation();

  return (
    <header className=" fixed top-0 left-0 right-0 w-full bg-transparent z-50">
      <div className="flex items-center justify-between maxwidth mx-auto  w-full mt-4">
        {/* Logo */}
        <Link to="/">
          <img src={logo} className="w-40" />
        </Link>

        <div>
          <div className="flex justify-end mb-2">
            {languages.map((l) => (
              <div
                className="w-28 p-1 text-sm cursor-pointer"
                style={{
                  background: l == lang ? "#224851" : "",
                  color: l == lang ? "#fff" : "",
                  border: "1px solid #000",
                }}
                onClick={() => {
                  setLang(l);
                }}
              >
                {l}
              </div>
            ))}
          </div>

          <nav>
            <ul className="flex items-center gap-3">
              <li className="underline">
                <Link
                  to="/"
                  className={location.pathname === "/" ? "font-semibold" : ""}
                >
                  Home
                </Link>
              </li>
              <li className="underline">
                <Link
                  to="/about"
                  className={
                    location.pathname === "/about" ? "font-semibold" : ""
                  }
                >
                  About Us
                </Link>
              </li>
              <li className="underline">
                <Link
                  to="/services"
                  className={
                    location.pathname === "/services" ? "font-semibold" : ""
                  }
                >
                  Services
                </Link>
              </li>
              <li className="underline">
                <a href="">Blog</a>
              </li>
              <li className="underline">
                <a href="/#contact">Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
