import { Transition, Dialog, Tab, Popover, Menu } from "@headlessui/react";
import Image from "next/future/image";
import {
    GlobeIcon,
    ViewGridIcon,
    TemplateIcon,
    LibraryIcon,
    XIcon,
    MenuIcon,
    SearchIcon,
    ShoppingBagIcon,
} from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import SearchBar from "../atoms/SearchBar";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import logoTransparent from "../../public/images/SlicedAdviceLogoTransparent.svg";
import Flyout from "../atoms/Flyout";

const navigation = {
    mobileFeatured: [
        {
            name: "Engineering",
            href: "/categories/engineering",
            imageSrc:
            "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=20",
            imageAlt:
                "",
        },
        {
            name: "Business",
            href: "/categories/business",
            imageSrc:
            "https://images.unsplash.com/photo-1573497701240-345a300b8d36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=20",
            imageAlt:
                "",
        },
    ],
    links: [
        {
            name: "Product",
            href: "",
            icon: <GlobeIcon className="text-brand-primary-light" />,
            flyout: true,
            children: [
                {
                    name: "For Experts",
                    href: "/experts",
                    description:
                        "Learn why SlicedAdvice is the most convenient, frictionless way to monetize your expertise.",
                },
                {
                    name: "For Advice Seekers",
                    href: "/adviceSeekers",
                    description:
                        "Welcome to the most affordable place to get personalized career advice. Get started in seconds.",
                },
            ],
        },
        {
            name: "Categories",
            href: "/categories",
            flyout: true,
            icon: <ViewGridIcon className="text-brand-primary-light" />,
            children: [
                {
                    name: "Engineering",
                    href: "/categories/engineering",
                    description:
                        "Build your dream engineering career with advice from experienced engineers.",
                },
                {
                    name: "Business",
                    href: "/categories/business",
                    description:
                        "Grow your business career or your own business with guidance from experienced business professionals.",
                },
                {
                    name: "Healthcare",
                    href: "/categories/healthcare",
                    description:
                        "Cultivate your ideal healthcare career with advice from experienced healthcare professionals.",
                },
            ],
            headerText: "See all categories",
        },
        {
            name: "Dashboard",
            href: "#",
            flyout: true,
            icon: <TemplateIcon className="text-brand-primary-light" />,
            children: [
                {
                    name: "For Experts",
                    href: "/dashboard/expert/home",
                    description:
                        "Complete bookings, setup payments, and manage the monetization of your expertise.",
                },
                {
                    name: "For Advice Seekers",
                    href: "/dashboard/adviceSeeker/home",
                    description:
                        "Review and manage your bookings for expertise.",
                },
            ],
        },
        {
            name: "More",
            href: "#",
            flyout: true,
            icon: <LibraryIcon className="text-brand-primary-light" />,
            children: [
                {
                    name: "Meet the Team",
                    href: "/team",
                    description:
                        "We're on a mission to slice and serve the world’s most important, inaccessible knowledge to everyone.",
                },
                {
                    name: "Support",
                    href: "/support",
                    description:
                        "Get support from our team. We're here to help at anytime.",
                },
            ],
        },
    ],
};
const TopNav = () => {
    // Get Session via useSession hook
    const { data: session }: any = useSession();
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        signOut();
    };
    return (
        <>
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 lg:hidden"
                    onClose={setOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            {/* Mobile Side Menu Div. Sweeps from the left.  */}
                            <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                                {/* X Icon in the top left corner to close the menu.  */}
                                <div className="p-4 flex">
                                    <button
                                        type="button"
                                        className="p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <XIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                {/* Navigation links. Hey me in the future! Looking to 
                                do multiple mobile nav tabs, one for advice seekers and one
                                for experts? Head to the TailwindUI code that originated this
                                component: 
                                https://tailwindui.com/components/ecommerce/page-examples/storefront-pages#component-738c2f255a1993e2224c28c461972844*/}

                                <div className="pb-8 px-4 space-y-7">
                                    <div className="grid grid-cols-2 gap-x-4">
                                        {navigation.mobileFeatured.map(
                                            (item) => (
                                                <div
                                                    key={item.name}
                                                    className="group relative text-sm"
                                                >
                                                    <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                        <Image
                                                            src={item.imageSrc}
                                                            alt={item.imageAlt}
                                                            className="object-center object-cover"
                                                            width={1932}
                                                            height={1932}
                                                        />
                                                    </div>
                                                    <Link href={item.href}>
                                                        <a className="mt-6 block font-medium text-gray-900">
                                                            <span
                                                                className="absolute z-10 inset-0"
                                                                aria-hidden="true"
                                                            />
                                                            {item.name}
                                                        </a>
                                                    </Link>
                                                    <p
                                                        aria-hidden="true"
                                                        className="mt-1"
                                                    >
                                                        Ask now
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {navigation.links.map((link) => (
                                        <>
                                            <div key={link.name}>
                                                <p
                                                    id={`${link.name}-heading-mobile`}
                                                    className="font-medium text-gray-900"
                                                >
                                                    {link.name}
                                                </p>
                                                <ul
                                                    role="list"
                                                    aria-labelledby={`${link.name}-heading-mobile`}
                                                    className="mt-4 flex flex-col space-y-4"
                                                >
                                                    {link.flyout &&
                                                        link.children.map(
                                                            (childItem) => (
                                                                <li
                                                                    key={
                                                                        childItem.name
                                                                    }
                                                                    className="flow-root ml-2"
                                                                >
                                                                    <Link
                                                                        href={
                                                                            childItem.href
                                                                        }
                                                                    >
                                                                        <a className="-m-2 p-2 block text-gray-500">
                                                                            {
                                                                                childItem.name
                                                                            }
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </div>
                                            <div className="border-t border-gray-200 px-4"></div>
                                        </>
                                    ))}
                                </div>
                                {!session && (
                                    <div className="border-gray-200 px-4 space-y-6">
                                        <div className="flow-root">
                                            <Link href="/login">
                                                <a className="-m-2 p-2 block font-medium text-gray-900">
                                                    Login
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <Link href="/register">
                                                <a className="-m-2 p-2 block font-medium text-gray-900">
                                                    Register
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>


            {/* Desktop Top Nav  */}
            <div className="mx-auto max-w-[90rem]">
                <div className="relative flex items-center justify-between h-16">
                    <div className="inset-y-0 left-0 flex items-center lg:hidden">
                        {/* Mobile menu button*/}
                        <button
                            onClick={() => setOpen(true)}
                            className="inline-flex items-center justify-center pr-2 rounded-md text-black/60 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <XIcon
                                    className="block h-7 w-7"
                                    aria-hidden="true"
                                />
                            ) : (
                                <MenuIcon
                                    className="block h-7 w-7"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center lg:justify-start">
                        <div className="flex-shrink-0 flex justify-center items-center">
                            <Link href="/">
                                <a className="w-48 lg:w-56">
                                    <Image
                                        src={logoTransparent}
                                        alt="SlicedAdvice"
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className="hidden lg:block lg:ml-6 ">
                            <div className="flex">
                                {navigation.links.map((item, index) =>
                                    item.flyout ? (
                                        <Flyout
                                            name={item.name}
                                            href={item.href}
                                            key={item.name}
                                            headerText={item.headerText}
                                        >
                                            {item.children}
                                        </Flyout>
                                    ) : (
                                        <Link href={item.href} key={item.name}>
                                            <a className="text-gray-800 hover:bg-brand-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                                {item.name}
                                            </a>
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <SearchBar />
                    {!session ? (
                        <Link href="/login">
                            <a className=" bg-brand-primary-light text-white hover:opacity-90 sm:ml-2 px-2 md:px-3 py-2 rounded-md text-sm font-medium">
                                Login
                            </a>
                        </Link>
                    ) : (
                        <div className="inset-y-0 right-0 flex items-center sm:static sm:inset-auto">
                            {/* <button
                                            type="button"
                                            className="bg-brand-bg-dark p-1 rounded-full text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-white"
                                            >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button> */}

                            {/* Profile dropdown */}
                            <Menu as="div" className="ml-3 relative shrink-0">
                                <div>
                                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light">
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <Image
                                            className="h-8 w-8 rounded-full object-cover"
                                            src={session.user.image}
                                            alt="User Profile Picture"
                                            width={32}
                                            height={32}
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {/* <Menu.Item>
                                                    {({ active }) => (
                                                        <Link href="/api/me">
                                                            <a
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                )}
                                                            >
                                                                Your Profile
                                                            </a>
                                                        </Link>
                                                    )}
                                                </Menu.Item> */}
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link href="/me/settings/">
                                                    <a
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        )}
                                                    >
                                                        Account Settings
                                                    </a>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100"
                                                            : "",
                                                        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    )}
                                                    onClick={logoutHandler}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default TopNav;
