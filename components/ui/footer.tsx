import Logo from './logo'
import { IconBrandTwitter, IconBrandGithub } from '@tabler/icons-react';

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-4 order-1 lg:order-none">
            <div className="h-full flex flex-col justify-between">
              <div className="mb-4">
                <div className="mb-4">
                  <Logo />
                </div>
                <div className="text-sm text-slate-300">Confidential AI for everyone.</div>
              </div>
              {/* Social links */}
              <ul className="flex">
                <li>
                  <a
                    className="flex justify-center items-center text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out"
                    href="https://twitter.com/blyssprivacy"
                    aria-label="Twitter">
                    <IconBrandTwitter />
                  </a>
                </li>
                <li className="ml-2">
                  <a
                    className="flex justify-center items-center text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out"
                    href="https://github.com/blyssprivacy"
                    aria-label="Github">
                    <IconBrandGithub />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Spacer block */}
          <div className="hidden lg:block sm:col-span-6 md:col-span-3 lg:col-span-2"></div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Products</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">
                  Confidential AI
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">
                  Homomorphic Encryption
                </a>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Company</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">
                  About
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Resources</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out"
                  href="mailto:founders@blyss.dev">
                  Contact
                </a>
              </li>
              <li>
                <a
                  className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out"
                  href="mailto:security@blyss.dev">
                  Report a bug
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
