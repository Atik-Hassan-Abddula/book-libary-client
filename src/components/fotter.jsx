
"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
    BookOpen,
    Mail,
    MapPin,
    Phone,
    ArrowRight,
    Send,
    Heart,
    BookMarked,
} from "lucide-react";

const Fotter = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // Quick Links
    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "All Books", href: "/books" },
        { name: "Add Book", href: "/add-book" },
        { name: "My Books", href: "/my-books" },
        { name: "My Borrows", href: "/my-borrows" },
    ];

    // Book Categories
    const categories = [
        { name: "Fiction", href: "/books?category=Fiction" },
        { name: "Science", href: "/books?category=Science" },
        { name: "History", href: "/books?category=History" },
        { name: "Kids", href: "/books?category=Kids" },
        { name: "Others", href: "/books?category=Others" },
    ];

    // Social Links
    const socialLinks = [
        {
            name: "Facebook",
            href: "https://facebook.com",
            icon: "facebook",
        },
        {
            name: "Instagram",
            href: "https://instagram.com",
            icon: "instagram",
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com",
            icon: "linkedin",
        },
    ];

    // Newsletter Handler
    const handleNewsletter = (e) => {
        e.preventDefault();

        if (!email.trim()) return;

        // Newsletter API can be connected here.
        setMessage("Thank you for subscribing!");
        setEmail("");
    };

    return (
        <footer className="relative overflow-hidden bg-[#102D24] text-white">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#C59B55]/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#174C3C]/50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

                    {/* Brand Section */}
                    <div className="space-y-6">

                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C59B55] text-[#102D24] transition-transform duration-300 group-hover:-rotate-6">
                                <BookOpen size={27} strokeWidth={2.2} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Book<span className="text-[#C59B55]">Nook</span>
                                </h2>

                                <p className="text-[9px] uppercase tracking-[3px] text-gray-400">
                                    Your Reading Corner
                                </p>
                            </div>
                        </Link>

                        <p className="max-w-xs text-sm leading-7 text-gray-300">
                            Discover a world of knowledge, explore inspiring
                            stories, and make reading a part of your everyday
                            life with BookNook.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">

                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-[#C59B55] hover:bg-[#C59B55] hover:text-[#102D24]"
                                >

                                    {/* Facebook */}
                                    {social.icon === "facebook" && (
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-[18px] w-[18px] fill-current"
                                            aria-hidden="true"
                                        >
                                            <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.6V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.2v3h2.8v8h3.5z" />
                                        </svg>
                                    )}

                                    {/* Instagram */}
                                    {social.icon === "instagram" && (
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-[18px] w-[18px] fill-none stroke-current"
                                            strokeWidth="1.8"
                                            aria-hidden="true"
                                        >
                                            <rect
                                                x="3"
                                                y="3"
                                                width="18"
                                                height="18"
                                                rx="5"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="4"
                                            />
                                            <circle
                                                cx="17.5"
                                                cy="6.5"
                                                r="1"
                                                fill="currentColor"
                                                stroke="none"
                                            />
                                        </svg>
                                    )}

                                    {/* LinkedIn */}
                                    {social.icon === "linkedin" && (
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-[18px] w-[18px] fill-current"
                                            aria-hidden="true"
                                        >
                                            <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.1 0H13v1.6h.1A4 4 0 0 1 16.7 8c3.9 0 4.6 2.5 4.6 5.7V21h-3.8v-6.5c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9.4V9Z" />
                                        </svg>
                                    )}

                                </a>
                            ))}

                            {/* X Social Link */}
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-[#C59B55] hover:bg-[#C59B55] hover:text-[#102D24]"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 fill-current"
                                    aria-hidden="true"
                                >
                                    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 13.8 4.9 22H1.7l7.3-8.4L1.2 2h6.5l4.5 7.5L18.9 2Zm-1.1 17.9h1.7L6.7 4H4.9l12.9 15.9Z" />
                                </svg>
                            </a>

                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-[#C59B55]"
                                    >
                                        <ArrowRight
                                            size={14}
                                            className="text-[#C59B55] transition-transform group-hover:translate-x-1"
                                        />

                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold text-white">
                            Explore Categories
                        </h3>

                        <ul className="space-y-4">
                            {categories.map((category) => (
                                <li key={category.name}>
                                    <Link
                                        href={category.href}
                                        className="group flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-[#C59B55]"
                                    >
                                        <BookMarked
                                            size={14}
                                            className="text-[#C59B55]"
                                        />

                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="space-y-6">

                        {/* Contact */}
                        <div>
                            <h3 className="mb-6 text-lg font-bold text-white">
                                Get in Touch
                            </h3>

                            <ul className="space-y-4">

                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <Mail
                                        size={18}
                                        className="mt-0.5 shrink-0 text-[#C59B55]"
                                    />

                                    <a
                                        href="mailto:support@booknook.com"
                                        className="transition hover:text-[#C59B55]"
                                    >
                                        support@booknook.com
                                    </a>
                                </li>

                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <Phone
                                        size={18}
                                        className="mt-0.5 shrink-0 text-[#C59B55]"
                                    />

                                    <span>+880 1XXXXXXXXX</span>
                                </li>

                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <MapPin
                                        size={18}
                                        className="mt-0.5 shrink-0 text-[#C59B55]"
                                    />

                                    <span>Dhaka, Bangladesh</span>
                                </li>

                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="mb-3 text-base font-semibold">
                                Stay Updated
                            </h3>

                            <p className="mb-4 text-xs leading-6 text-gray-400">
                                Get updates about new arrivals and reading
                                inspiration.
                            </p>

                            <form
                                onSubmit={handleNewsletter}
                                className="flex overflow-hidden rounded-lg border border-white/15 bg-white/5 p-1 focus-within:border-[#C59B55]"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setMessage("");
                                    }}
                                    placeholder="Your email address"
                                    required
                                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-xs text-white outline-none placeholder:text-gray-500"
                                />

                                <button
                                    type="submit"
                                    aria-label="Subscribe"
                                    className="flex h-9 w-10 shrink-0 items-center justify-center rounded-md bg-[#C59B55] text-[#102D24] transition hover:bg-[#D9B976]"
                                >
                                    <Send size={16} />
                                </button>
                            </form>

                            {message && (
                                <p
                                    role="status"
                                    className="mt-3 text-xs text-[#D9B976]"
                                >
                                    {message}
                                </p>
                            )}
                        </div>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-4 py-7 text-center sm:flex-row sm:text-left">

                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} BookNook. All rights
                        reserved.
                    </p>

                    <p className="flex items-center gap-1.5 text-xs text-gray-400">
                        Made with

                        <Heart
                            size={13}
                            className="fill-[#C59B55] text-[#C59B55]"
                        />

                        for Book Lovers
                    </p>

                    <div className="flex items-center gap-5 text-xs text-gray-400">
                        <Link
                            href="/privacy"
                            className="transition hover:text-[#C59B55]"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-[#C59B55]"
                        >
                            Terms & Conditions
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Fotter;
