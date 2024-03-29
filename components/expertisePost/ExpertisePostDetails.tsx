import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Head from "next/head";
import { toast } from "react-toastify";
import { StarIcon } from "@heroicons/react/solid";
import { clearErrors } from "../../redux/actionCreators/expertisePostActions";

import Breadcrumbs from "../atoms/Breadcrumbs";
import Image from "next/future/image";
import RatingsWidget from "../atoms/RatingsWidget";
import Loader from "../layout/Loader";
import Link from "next/link";
import { useRouter } from "next/router";
import CreateReviewWidget from "../atoms/CreateReviewWidget";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";
import { useSession } from "next-auth/react";
import ButtonLoader from "../layout/ButtonLoader";

const ExpertisePostDetails = ({ expertisePost, reviews, user }: any) => {
    // Get Session via useSession hook
    const { data: session }: any = useSession();
    const dispatch = useAppDispatch();
    const { query: queryParams } = useRouter();
    const router = useRouter();

    const [isPostOwner, setIsPostOwner] = useState(false);

    // Checking if the logged in user is the owner of the post
    // isPostOwner decides whether to show the update button or not
    useEffect(() => {
        if (user && expertisePost) {
            console.log("user", user);
            if (user._id === expertisePost.user) {
                setIsPostOwner(true);
            }
        }
    }, [expertisePost, isPostOwner, user]);

    const getCategoryHref = (categoryName: string) => {
        switch (categoryName) {
            case "Engineering":
                return "/categories/engineering";
            case "Business":
                return "/categories/business";
            case "Healthcare":
                return "/categories/healthcare";
            case "Other":
                return "/categories/other";
            default:
                return "#";
        }
    };

    const reviewsTotal = reviews.length;
    const reviewsAverage = (() => {
        var average: number = 0;
        for (var i = 0; i < reviews.length; i++) {
            average += reviews[i].rating;
        }
        return (average /= reviews.length);
    })();
    const reviewsCount = [
        { rating: 5, count: reviews.filter((x: any) => x.rating == 5).length },
        { rating: 4, count: reviews.filter((x: any) => x.rating == 4).length },
        { rating: 3, count: reviews.filter((x: any) => x.rating == 3).length },
        { rating: 2, count: reviews.filter((x: any) => x.rating == 2).length },
        { rating: 1, count: reviews.filter((x: any) => x.rating == 1).length },
    ];

    // Used for the Breadcrumbs component
    const pages = [
        {
            name: expertisePost?.category,
            href: getCategoryHref(expertisePost?.category),
            current: false,
        },
    ];

    const [isVisible, setIsVisible] = useState(false);

    // useEffect(() => {
    //     if (reviewsMetadata.error) {
    //         toast.error(reviewsMetadata.error);
    //         dispatch(clearErrors());
    //     }
    // }, [dispatch, reviewsMetadata.error]);

    return (
        <div className="">
            <UniversalFadeAnimation animationType="appear">
                <Head>
                    <title>{expertisePost?.title} | SlicedAdvice</title>
                </Head>
                <div className="flex flex-col items-start gap-5 px-4 py-4 max-w-2xl lg:max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs pages={pages} />

                    <div className="flex justify-between w-full">
                        <h1 className="text-2xl font-semibold">
                            {expertisePost?.title}
                        </h1>
                    </div>
                    {isPostOwner && (
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90"
                            disabled={!session ? true : false}
                            onClick={() =>
                                router.push(
                                    "/expertisePost/update/" + expertisePost._id
                                )
                            }
                        >
                            {!session ? <ButtonLoader /> : "Update Post"}
                        </button>
                    )}

                    <RatingsWidget
                        reviewsTotal={reviewsTotal}
                        reviewsAverage={reviewsAverage}
                    />

                    <div className="flex flex-col lg:flex-row justify-start lg:justify-around items-start w-full gap-7 lg:-mt-2">
                        <div className="expertisePostDetailImageWrapper w-full max-w-lg self-center lg:self-start lg:mt-8">
                            {expertisePost?.images[0] && (
                                <Image
                                    src={expertisePost?.images[0].url}
                                    width={1200}
                                    height={800}
                                    className="object-cover w-full h-72 lg:h-96 rounded-xl"
                                    alt="Picture for expertise posting"
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-5 self-start w-full h-full md:max-w-2xl mx-auto">
                            <h1 className="text-xl font-medium">Description</h1>
                            <p className="font-light opacity-60 -mt-2">
                                {expertisePost?.description}
                            </p>
                            {/* Line Break */}
                            <div className="w-full m-auto h-[1px] bg-black/10"></div>

                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="flex flex-col justify-center items-center gap-4 p-8 w-full sm:w-1/2 sm:h-60 rounded-xl border-[1px] border-black/10">
                                    <p className="text-sm font-light">
                                        Bite-sized submissions might include:
                                    </p>
                                    <ul className="list-disc">
                                        {expertisePost?.submissionTypes?.map(
                                            (type: string, index: number) => (
                                                <li
                                                    className="text-xl font-semibold"
                                                    key={index}
                                                >
                                                    {type}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-4 p-8 w-full sm:w-1/2 sm:h-60 bg-white rounded-xl border-[1px] border-black/10 shadow-md">
                                    {/* Pricing Statement Header Grouping */}
                                    <div className="flex items-center gap-1">
                                        <h1 className="text-2xl font-semibold self-start ">
                                            ${expertisePost?.pricePerSubmission}{" "}
                                        </h1>
                                        <span className="text-md mt-[2px] font-light opacity-60">
                                            / submission
                                        </span>
                                    </div>
                                    <p className="text-sm font-light text-center opacity-60">
                                        You&apos;ll get a response within 7
                                        days, or you&apos;ll never be charged.
                                    </p>
                                    {isPostOwner ? (
                                        ""
                                    ) : (
                                        <Link
                                            href={`/expertisePost/book/singleTextResponse/${queryParams?.id}`}
                                        >
                                            <a className="bg-brand-primary-light rounded-lg text-white w-full py-3 text-lg flex justify-center items-center">
                                                Book Advice
                                            </a>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review Section */}
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
                    <div className="lg:col-span-4">
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                            Customer Reviews
                        </h2>
                        <div className="mt-3 flex items-center">
                            <div>
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                reviewsAverage > rating
                                                    ? "text-yellow-400"
                                                    : "text-gray-300",
                                                "flex-shrink-0 h-5 w-5"
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">
                                    {reviewsAverage} out of 5 stars
                                </p>
                            </div>
                            <p className="ml-2 text-sm text-gray-900">
                                Based on {reviewsTotal} reviews
                            </p>
                        </div>
                        <div className="mt-6">
                            <h3 className="sr-only">Review data</h3>

                            <dl className="space-y-3">
                                {reviewsCount.map((count) => (
                                    <div
                                        key={count.rating}
                                        className="flex items-center text-sm"
                                    >
                                        <dt className="flex-1 flex items-center">
                                            <p className="w-3 font-medium text-gray-900">
                                                {count.rating}
                                                <span className="sr-only">
                                                    {" "}
                                                    star reviews
                                                </span>
                                            </p>
                                            <div
                                                aria-hidden="true"
                                                className="ml-1 flex-1 flex items-center"
                                            >
                                                <StarIcon
                                                    className={classNames(
                                                        count.count > 0
                                                            ? "text-yellow-400"
                                                            : "text-gray-300",
                                                        "flex-shrink-0 h-5 w-5"
                                                    )}
                                                    aria-hidden="true"
                                                />

                                                <div className="ml-3 relative flex-1">
                                                    <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                                                    {count.count > 0 ? (
                                                        <div
                                                            className="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"
                                                            style={{
                                                                width: `calc(${count.count} / ${reviewsTotal} * 100%)`,
                                                            }}
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                        </dt>
                                        <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                                            {count.count === 0
                                                ? 0
                                                : Math.round(
                                                      (count.count /
                                                          reviewsTotal) *
                                                          100
                                                  )}
                                            %
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        {!isPostOwner && session ? (
                            <div className="mt-10">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Share your thoughts
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    If you’ve been helped by this expert, share
                                    your thoughts with other customers
                                </p>
                                {!isVisible ? (
                                    <a
                                        className="mt-6 inline-flex w-full bg-white border border-gray-300 rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                                        onClick={() => setIsVisible(true)}
                                    >
                                        Write a review
                                    </a>
                                ) : (
                                    <div className="mt-10">
                                        <CreateReviewWidget
                                            user={user}
                                            expertisePostId={expertisePost?._id}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <div className="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
                        <h3 className="sr-only">Recent reviews</h3>

                        <div className="flow-root">
                            <div className="-my-12 divide-y divide-gray-200">
                                {reviews?.map((review: any) => (
                                    <div key={review._id} className="py-12">
                                        <div className="flex items-center">
                                            <Image
                                                src={review?.user?.avatar?.url}
                                                alt={`${review?.user}.`}
                                                width={48}
                                                height={48}
                                                className="h-12 w-12 rounded-full"
                                            />
                                            <div className="ml-4">
                                                <h4 className="text-sm font-bold text-gray-900">
                                                    {review?.user?.name}
                                                </h4>
                                                <div className="mt-1 flex items-center">
                                                    {[0, 1, 2, 3, 4].map(
                                                        (rating) => (
                                                            <StarIcon
                                                                key={rating}
                                                                className={classNames(
                                                                    review?.rating >
                                                                        rating
                                                                        ? "text-yellow-400"
                                                                        : "text-gray-300",
                                                                    "h-5 w-5 flex-shrink-0"
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <p className="sr-only">
                                                    {review.rating} out of 5
                                                    stars
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className="mt-4 space-y-6 text-base text-gray-600"
                                            dangerouslySetInnerHTML={{
                                                __html: review.content,
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </UniversalFadeAnimation>
        </div>
    );
};

/**
 * Given an array of classes, return a string of space-separated classes
 * @param {any[]} classes - An array of class names to be added to the class list.
 * @returns A string of all the classes that were passed in.
 */
function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default ExpertisePostDetails;
