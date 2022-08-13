import Head from "next/head";
import Link from "next/link";
import { ElementType } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

import logoTransparent from "../../public/images/SlicedAdviceLogoTransparent.svg";
import Image from "next/future/image";

const MinimalLayout = ({
    children,
    title = "SlicedAdvice - Marketplace for Bite-Sized Career Advice",
}: any) => {
    return (
        <div className="py-4 flex flex-col items-start gap-2 bg-brand-bg-light px-2 sm:px-6 md:px-8 md:py-4 lg:px-10 overflow-hidden max-w-[65rem] mx-auto">
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>

            {/* <TopNav /> */}
            <div className="flex-shrink-0 flex justify-start items-center">
                <Link href="/">
                    <a className="w-48 lg:w-56">
                        <Image src={logoTransparent} alt="SlicedAdvice" />
                    </a>
                </Link>
            </div>
            {/* <div className="border-t border-gray-200"></div> */}
            <div className="bg-brand-bg-light mt-4 mb-8">
                {children}
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default MinimalLayout;
