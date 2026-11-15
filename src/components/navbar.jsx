
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  BookOpen,
  Menu,
  X,
  UserRound,
  LogOut,
  Plus,
  Library,
  BookMarked,
  ChevronDown,
  Loader2,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  getToken,
  getCurrentUser,
  removeToken,
} from "@/lib/api";

import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const {
    data: sessionData,
    isPending: sessionPending,
  } = useSession();

  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // =====================================
  // CHECK AUTHENTICATED USER
  // =====================================

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      if (sessionPending) return;

      const googleUser = sessionData?.user || null;

      // Check Custom JWT Authentication
      if (getToken()) {
        try {
          const result = await getCurrentUser();

          if (isMounted) {
            setUser(result?.user || googleUser);
          }
        } catch (error) {
          console.error("JWT Authentication Error:", error);

          // Remove token only if authentication is invalid.
          if (error.status === 401 || error.status === 403) {
            removeToken();

            if (isMounted) {
              setUser(googleUser);
            }
          } else {
            // Keep token during server or network errors.
            if (isMounted) {
              setUser((currentUser) => currentUser || googleUser);
            }
          }
        } finally {
          if (isMounted) {
            setIsPending(false);
          }
        }

        return;
      }

      // Google Authentication
      if (isMounted) {
        setUser(googleUser);
        setIsPending(false);
      }
    };

    setIsPending(true);
    checkUser();

    return () => {
      isMounted = false;
    };
  }, [pathname, sessionData, sessionPending]);

  // =====================================
  // LOGOUT
  // =====================================

  const handleSignOut = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      // Remove custom JWT
      removeToken();

      // Sign out from Better Auth
      await signOut();

      setUser(null);
      setProfileOpen(false);
      setMobileMenuOpen(false);

      toast.success("Logged out successfully!");

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);

      // Always clear local authentication.
      removeToken();

      setUser(null);
      setProfileOpen(false);
      setMobileMenuOpen(false);

      toast.error(
        error?.message || "Logout failed. Please try again."
      );

      router.replace("/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  // =====================================
  // CLOSE MENUS
  // =====================================

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  };

  // =====================================
  // USER AVATAR
  // =====================================

  const renderUserAvatar = (size = "h-10 w-10") => {
    const imageUrl =
      user?.image ||
      user?.picture ||
      user?.photoURL ||
      user?.avatar ||
      "";

    const fallback = (
      <div
        className={`${size} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 font-bold text-white shadow-sm`}
      >
        {user?.name?.charAt(0)?.toUpperCase() || "U"}
      </div>
    );

    if (!imageUrl) {
      return fallback;
    }

    return (
      <div className={`${size} relative shrink-0`}>
        <img
          src={imageUrl}
          alt={user?.name || "User"}
          referrerPolicy="no-referrer"
          className={`${size} rounded-full border-2 border-white object-cover shadow-sm`}
          onError={(event) => {
            event.currentTarget.classList.add("hidden");

            event.currentTarget.nextElementSibling?.classList.remove(
              "hidden"
            );
          }}
        />

        <div className="hidden">
          {fallback}
        </div>
      </div>
    );
  };

  // =====================================
  // NAVIGATION LINKS
  // =====================================

  const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: BookOpen,
    },
    {
      name: "All Books",
      href: "/books",
      icon: Library,
    },
    ...(user
      ? [
          {
            name: "Add Book",
            href: "/add-book",
            icon: Plus,
          },
          {
            name: "My Books",
            href: "/my-books",
            icon: BookMarked,
          },
          {
            name: "My Borrows",
            href: "/my-borrows",
            icon: Library,
          },
        ]
      : []),
  ];

  // =====================================
  // ACTIVE NAVIGATION
  // =====================================

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  // =====================================
  // RENDER
  // =====================================

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur-md">

      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}

        <Link
          href="/"
          onClick={closeMenus}
          className="group flex shrink-0 items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md transition group-hover:bg-emerald-800">
            <BookOpen size={23} />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              Book<span className="text-emerald-700">Nook</span>
            </h1>

            <p className="hidden text-[10px] font-medium tracking-widest text-gray-500 sm:block">
              YOUR PERSONAL LIBRARY
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  isActive(link.href)
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-gray-600 hover:bg-gray-50 hover:text-emerald-700"
                }`}
              >
                <Icon size={17} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* DESKTOP AUTH */}

        <div className="hidden items-center gap-3 lg:flex">

          {isPending ? (
            <Loader2
              className="animate-spin text-emerald-700"
              size={22}
            />
          ) : user ? (
            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 pr-3 transition hover:border-emerald-300 hover:shadow-sm"
              >
                {renderUserAvatar("h-9 w-9")}

                <span className="max-w-28 truncate text-sm font-semibold text-gray-700">
                  {user.name || "My Account"}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* PROFILE DROPDOWN */}

              {profileOpen && (
                <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-xl">

                  <div className="flex items-center gap-3 border-b border-gray-100 px-3 py-3">

                    {renderUserAvatar("h-10 w-10")}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-800">
                        {user.name || "User"}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>

                  </div>

                  <Link
                    href="/profile"
                    onClick={closeMenus}
                    className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <UserRound size={17} />
                    My Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {loggingOut ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <LogOut size={17} />
                    )}

                    {loggingOut
                      ? "Logging out..."
                      : "Sign Out"}
                  </button>

                </div>
              )}

            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-emerald-50 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>

      </nav>

      {/* MOBILE MENU */}

      {mobileMenuOpen && (
        <div className="absolute left-0 top-full w-full border-t border-gray-100 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden">

          <div className="mx-auto max-w-7xl space-y-1">

            {/* MOBILE NAVIGATION */}

            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive(link.href)
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={19} />
                  {link.name}
                </Link>
              );
            })}

            <div className="my-3 border-t border-gray-100" />

            {/* MOBILE AUTH */}

            {isPending ? (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin text-emerald-700" />
              </div>
            ) : user ? (
              <>

                {/* MOBILE PROFILE */}

                <Link
                  href="/profile"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-emerald-50"
                >
                  {renderUserAvatar("h-11 w-11")}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-gray-800">
                      {user.name || "My Account"}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <UserRound
                    size={19}
                    className="text-gray-500"
                  />
                </Link>

                {/* MOBILE LOGOUT */}

                <button
                  onClick={handleSignOut}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  {loggingOut ? (
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                  ) : (
                    <LogOut size={19} />
                  )}

                  {loggingOut
                    ? "Logging out..."
                    : "Sign Out"}
                </button>

              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">

                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="rounded-lg border border-emerald-700 py-3 text-center text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="rounded-lg bg-emerald-700 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  Sign Up
                </Link>

              </div>
            )}

          </div>

        </div>
      )}

    </header>
  );
}
