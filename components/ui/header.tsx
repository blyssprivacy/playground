import Link from 'next/link'
import Logo from './logo'
import { GrayOutlineGradient } from '../buttons';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';

export default function Header() {
  const { user } = useUser();
  const isSignedIn = Boolean(user);

  return (
    <header className="absolute w-full z-30 mt-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="mr-4">
            <Logo />
          </div>

          {isSignedIn ? (
            <div className="flex gap-4 items-center">
              <GrayOutlineGradient buttonText="Dashboard" linkTarget="/console" arrow={true} />
              <UserButton />
            </div>
          ) : (
            <nav className="flex grow">
              {/* Desktop sign in links */}
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link
                    className="font-medium text-sm text-slate-300 hover:text-white transition duration-150 ease-in-out"
                    href="/signin">
                    Sign in
                  </Link>
                </li>
                <li className="ml-6">
                  <GrayOutlineGradient buttonText="Sign up" linkTarget="/signup" arrow={true} />
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
