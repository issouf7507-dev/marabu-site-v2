import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import logo from "../assets/Logo_Marabu_.png"

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact Us', href: '#contact' },
];

const languages = ['FRANCAIS', 'ENGLISH'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('FRANCAIS');

  return (
    <header className=" fixed top-0 left-0 right-0 w-full bg-white">
      <div className="flex items-center justify-between max-w-[1800px] mx-auto  w-full mt-4">
        {/* Logo */}
        <a href="#home" >
          <img src={logo} className='w-40' />
        </a>

        <div>
          <div className='flex justify-end mb-2'>
            {languages.map(l => (
              <div className='w-28 p-1 text-sm cursor-pointer'
                style={{
                  background: l == lang ? "#1D4851" : "",
                  color: l == lang ? "#fff" : "",
                  border: "1px solid #000"
                }}
                onClick={() => {
                  setLang(l)
                }}
              >

                {l}
              </div>
            ))}
          </div>

          <nav>
            <ul className='flex items-center gap-3 '>
              <li className='underline'>
                <a href="">Home</a>
              </li>
              <li className='underline'>
                <a href="">About Us</a>
              </li>
              <li className='underline'>
                <a href="">Services</a>
              </li>
              <li className='underline'>
                <a href="">Blog
                </a>
              </li>
              <li className='underline'>
                <a href="">Contact Us
                </a>
              </li>
            </ul>
          </nav>


        </div>

      </div>


    </header>
  );
}
