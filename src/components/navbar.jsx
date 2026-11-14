"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  BookOpen,
  Menu,
  X,
  ChevronDown,
  UserRound,
  LogOut,
  Loader2,
} from "lucide-react";

import { toast } from "react-toastify";
import {
  getToken,
  getCurrentUser,
  removeToken,
} from "@/lib/api";

const publicLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
];

const privateLinks = [
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);

  const isLoggedIn = Boolean(user);

  const navLinks = isLoggedIn
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  // Verify JWT and get current user
  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      if (!getToken()) {
        if (isMounted) {
          setUser(null);
          setIsPending(false);
        }
        return;
      }

      try {
        const result = await getCurrentUser();

        if (isMounted) {
          setUser(result.user || null);
        }
      } catch (error) {
        console.error("Authentication Error:", error);

        removeToken();

        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsPending(false);
        }
      }
    };

    setIsPending(true);
    checkUser();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  // Close menus after navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Close dropdown on outside click and Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideDesktop =
        desktopProfileRef.current?.contains(event.target);

      const clickedInsideMobile =
        mobileProfileRef.current?.contains(event.target);

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Logout
  const handleSignOut = () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      removeToken();
      setUser(null);
      setProfileOpen(false);
      setMobileMenuOpen(false);

      toast.success("Logged out successfully!");

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.message || "Logout failed!");
    } finally {
      setLoggingOut(false);
    }
  };

  // Active link checker
  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Navigation links
  const renderNavLinks = (mobile = false) => (
    <>
      {navLinks.map((link) => {
        const active = isActiveLink(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => {
              if (mobile) setMobileMenuOpen(false);
            }}
            className={`relative rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 ${
              active
                ? "bg-[#14532D]/10 text-[#14532D]"
                : "text-gray-700 hover:bg-[#14532D]/10 hover:text-[#14532D]"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );

  // User avatar
  const renderUserAvatar = (size = "h-9 w-9") => {
    if (user?.image) {
      return (
        <img
          src={user.image}
          alt={user.name || "User"}
          className={`${size} rounded-full object-cover`}
        />
      );
    }

    return (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-[#14532D] font-bold text-white`}
      >
        {user?.name?.charAt(0)?.toUpperCase() || "U"}
      </div>
    );
  };

  // Profile dropdown
  const renderProfileDropdown = () => (
    <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
      <div className="border-b border-gray-100 bg-[#F7F5EF] p-4">
        <p className="truncate font-bold text-[#14532D]">
          {user?.name || "BookNook User"}
        </p>

        <p className="mt-1 truncate text-xs text-gray-500">
          {user?.email}
        </p>
      </div>

      <div className="p-2">
        <Link
          href="/profile"
          onClick={() => setProfileOpen(false)}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-[#14532D]"
        >
          <UserRound size={18} />
          My Profile
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
        >
          {loggingOut ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <LogOut size={18} />
          )}

          {loggingOut ? "Signing Out..." : "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-[#F7F5EF]/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#14532D] text-white shadow-md">
            <BookOpen size={25} />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#14532D] sm:text-2xl">
              BookNook
            </h1>

            <p className="text-[10px] font-medium tracking-widest text-gray-500">
              YOUR ONLINE LIBRARY
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {renderNavLinks()}
        </nav>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 lg:flex">
          {!isPending && !isLoggedIn && (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-[#14532D] px-5 py-2.5 text-sm font-semibold text-[#14532D] transition hover:bg-[#14532D] hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-[#14532D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D4A853] hover:text-[#14251B]"
              >
                Register
              </Link>
            </>
          )}

          {!isPending && isLoggedIn && (
            <div className="relative" ref={desktopProfileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-label="Open user menu"
                aria-expanded={profileOpen}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 pr-3 transition hover:border-[#14532D]"
              >
                {renderUserAvatar()}

                <span className="max-w-24 truncate text-sm font-semibold text-gray-700">
                  {user?.name || "Account"}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && renderProfileDropdown()}
            </div>
          )}

          {isPending && (
            <Loader2
              className="animate-spin text-[#14532D]"
              size={22}
            />
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          {!isPending && isLoggedIn && (
            <div className="relative" ref={mobileProfileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-label="Open user menu"
                aria-expanded={profileOpen}
                className="rounded-full border-2 border-[#14532D] p-0.5"
              >
                {renderUserAvatar()}
              </button>

              {profileOpen && renderProfileDropdown()}
            </div>
          )}

          {isPending && (
            <Loader2
              className="animate-spin text-[#14532D]"
              size={21}
            />
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#14532D] transition hover:bg-[#14532D]/10"
          >
            {mobileMenuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-gray-200 bg-[#F7F5EF] transition-all duration-300 lg:hidden ${
          mobileMenuOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {renderNavLinks(true)}

          <div className="mt-3 border-t border-gray-200 pt-4">
            {!isPending && !isLoggedIn && (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 rounded-lg border border-[#14532D] px-4 py-2.5 text-center text-sm font-semibold text-[#14532D] transition hover:bg-[#14532D] hover:text-white"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 rounded-lg bg-[#14532D] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#D4A853] hover:text-[#14251B]"
                >
                  Register
                </Link>
              </div>
            )}

            {!isPending && isLoggedIn && (
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#14532D]">
                    {user?.name || "BookNook User"}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {user?.email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={loggingOut}
                  className="flex shrink-0 items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                >
                  {loggingOut ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <LogOut size={17} />
                  )}

                  {loggingOut ? "Signing Out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}