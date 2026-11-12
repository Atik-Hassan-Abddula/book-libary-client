
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    BookOpen,
    Menu,
    X,
    Sun,
    Moon,
    ChevronDown,
    UserRound,
    LogOut,
    Library,
    BookPlus,
    Bookmark,
    Home,
    BookMarked,
    LogIn,
    UserPlus,
} from "lucide-react";

const Navbar = () => {
    const pathname = usePathname();

    // Temporary authentication state
    // Replace with Better Auth session later
    const [user, setUser] = useState(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const navLinks = [
        {
            name: "Home",
            href: "/",
            icon: Home,
            public: true,
        },
        {
            name: "All Books",
            href: "/books",
            icon: Library,
            public: true,
        },
        {
            name: "Add Book",
            href: "/add-book",
            icon: BookPlus,
            private: true,
        },
        {
            name: "My Books",
            href: "/my-books",
            icon: Bookmark,
            private: true,
        },
        {
            name: "My Borrows",
            href: "/my-borrows",
            icon: BookMarked,
            private: true,
        },
    ];

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const handleLogout = async () => {
        try {
            // TODO: Connect Better Auth signOut here
            setUser(null);
            setIsProfileOpen(false);
            setIsMenuOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
        document.documentElement.classList.toggle("dark");
    };

    const visibleLinks = navLinks.filter(
        (link) => link.public || (link.private && user)
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#174C3C]/10 bg-[#F7F5EF]/95 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#101C18]/95">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-2.5"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#174C3C] text-white shadow-md transition-transform duration-300 group-hover:rotate-[-5deg]">
                        <BookOpen size={25} strokeWidth={2.2} />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-2xl font-bold tracking-tight text-[#174C3C] dark:text-[#E8D9B5]">
                            Book<span className="text-[#C59B55]">Nook</span>
                        </span>
                        <span className="hidden text-[9px] font-medium uppercase tracking-[2.5px] text-gray-500 sm:block dark:text-gray-400">
                            Your Reading Corner
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 lg:flex">
                    {visibleLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                    isActive(link.href)
                                        ? "bg-[#174C3C]/10 text-[#174C3C] dark:bg-[#C59B55]/10 dark:text-[#E8D9B5]"
                                        : "text-gray-600 hover:bg-[#174C3C]/5 hover:text-[#174C3C] dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-[#E8D9B5]"
                                }`}
                            >
                                <Icon size={16} />
                                {link.name}

                                {isActive(link.href) && (
                                    <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#C59B55]" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Side Actions */}
                <div className="hidden items-center gap-3 lg:flex">

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-[#174C3C]/10 hover:text-[#174C3C] dark:border-gray-700 dark:text-gray-300 dark:hover:text-[#E8D9B5]"
                    >
                        {isDark ? <Sun size={19} /> : <Moon size={19} />}
                    </button>

                    {!user ? (
                        <>
                            <Link
                                href="/login"
                                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#174C3C] transition hover:bg-[#174C3C]/10 dark:text-[#E8D9B5]"
                            >
                                <LogIn size={17} />
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="flex items-center gap-2 rounded-lg bg-[#174C3C] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#10392D] hover:shadow-lg dark:bg-[#C59B55] dark:text-[#14231D]"
                            >
                                <UserPlus size={17} />
                                Register
                            </Link>
                        </>
                    ) : (
                        /* User Profile Dropdown */
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 rounded-full border border-gray-200 p-1.5 pr-3 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-white/5"
                            >
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        width={36}
                                        height={36}
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#174C3C] text-white">
                                        <UserRound size={19} />
                                    </div>
                                )}

                                <span className="max-w-24 truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    {user.name}
                                </span>

                                <ChevronDown size={16} />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-[#172720]">
                                    <div className="border-b border-gray-100 px-3 py-3 dark:border-gray-700">
                                        <p className="font-semibold text-gray-800 dark:text-white">
                                            {user.name}
                                        </p>
                                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        onClick={() => setIsProfileOpen(false)}
                                        className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/5"
                                    >
                                        <UserRound size={17} />
                                        My Profile
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                                    >
                                        <LogOut size={17} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex h-10 w-10 items-center justify-center rounded-full text-[#174C3C] hover:bg-[#174C3C]/10 dark:text-[#E8D9B5]"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#174C3C] text-white transition hover:bg-[#10392D]"
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden border-t border-[#174C3C]/10 bg-[#F7F5EF] transition-all duration-300 ease-in-out dark:border-white/10 dark:bg-[#101C18] lg:hidden ${
                    isMenuOpen
                        ? "max-h-[650px] opacity-100"
                        : "max-h-0 border-transparent opacity-0"
                }`}
            >
                <div className="mx-auto max-w-7xl space-y-2 px-4 py-5 sm:px-6">

                    {visibleLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                    isActive(link.href)
                                        ? "bg-[#174C3C] text-white dark:bg-[#C59B55] dark:text-[#14231D]"
                                        : "text-gray-700 hover:bg-[#174C3C]/10 dark:text-gray-200 dark:hover:bg-white/5"
                                }`}
                            >
                                <Icon size={19} />
                                {link.name}
                            </Link>
                        );
                    })}

                    {!user ? (
                        <div className="grid grid-cols-2 gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center gap-2 rounded-lg border border-[#174C3C] py-3 text-sm font-semibold text-[#174C3C] dark:border-[#C59B55] dark:text-[#E8D9B5]"
                            >
                                <LogIn size={17} />
                                Login
                            </Link>

                            <Link
                                href="/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center gap-2 rounded-lg bg-[#174C3C] py-3 text-sm font-semibold text-white dark:bg-[#C59B55] dark:text-[#14231D]"
                            >
                                <UserPlus size={17} />
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                            <div className="flex items-center gap-3 px-3">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        width={42}
                                        height={42}
                                        className="h-11 w-11 rounded-full object-cover"
                                    />
                                ) : (
                                    <UserRound size={30} />
                                )}
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-white">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/profile"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/5"
                            >
                                <UserRound size={18} />
                                My Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
