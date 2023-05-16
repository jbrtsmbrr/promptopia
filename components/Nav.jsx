"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, signIn, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setupProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="gap-2 flex-center">
        <Image
          src="assets/images/logo.svg"
          alt="Promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop view */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                alt="Profile"
                height={37}
                width={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <Fragment>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </Fragment>
        )}
      </div>

      {/* Mobile view */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              alt="Profile"
              height={37}
              width={37}
              className="rounded-full"
              onClick={() => setMenuOpen((prev) => !prev)}
            />
            {isMenuOpen && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link">
                  My Profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link">
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Fragment></Fragment>
        )}
      </div>
    </nav>
  );
};

export default Nav;
