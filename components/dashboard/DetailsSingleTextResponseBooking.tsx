import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { PencilAltIcon } from "@heroicons/react/outline";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cloudinary from "cloudinary-react";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CenterFocusWeakOutlinedIcon from '@mui/icons-material/CenterFocusWeakOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import {
    clearBookingsErrors,
    clearBookingsSuccess,
    getBookings,
    updateBooking,
} from "../../redux/actionCreators/bookingActionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Badge from "../atoms/Badge";
import ButtonLoader from "../layout/ButtonLoader";
import RecordVideo from "./RecordVideo";
import PreviewVideo from "./PreviewVideo";

interface DetailsSingleTextResponseBookingInterface {
    booking: any;
    dashboardType: "Advice Seeker" | "Expert";
}

// The DetailsSingleTextResponseBooking component is used to display the details of a
// single booking. It is used in the BookingsDashboard component, and flexible
// to both the advice seeker's dashboard as well as the expert dashboard.
// Most of the initial code pertains to experts, as they need to respond.
// For now, advice seekers simply view the details and the expert's response,
// if it is there.
const DetailsSingleTextResponseBooking = ({
    booking,
    dashboardType,
}: DetailsSingleTextResponseBookingInterface) => {
    const dispatch = useAppDispatch();

    const { metadata: bookingsMetadata, bookings } = useAppSelector(
        (state) => state.bookings
    );

    // Holds text that expert types in
    const [textResponse, setTextResponse] = useState("");

    // Decides if display video recording or not
    const [recordVideo, setRecordVideo] = useState<Boolean>(false);
    const [previewVideo, setPreviewVideo] = useState<Boolean>(false);
    const [videoBlob, setVideoBlob] = useState<Blob>();

    const [imagePublicId, setImagePublicId] = useState("");
    const [videoURL, setVideoURL] = useState<any>();

    const openWidget = () => {
        // create the widget
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "slicedadvice",
                uploadPreset: "q2k9cym0",
                clientAllowedFormats: ["mp4", "webm"],
                sources: ['local'],
                theme: "minimal",
                showPoweredBy: false,
                multiple: false,
            },
            (error: any, result: any) => {
                console.log("In function!");
                if (
                    result.event === "success" &&
                    result.info.resource_type === "video"
                ) {
                    console.log("DEEPER In function!");
                    console.log(result.info);
                    setImagePublicId(result.info.public_id);
                    setVideoURL(result.info.secure_url);
                }
            }
        );
        widget.open(); // open up the widget after creation
    };

    const changeVideo = () => {
        cloudinary.uploader.destroy(imagePublicId, (result) => {
            console.log(result);
        })
    }

    // Handle the send response button click, updating the booking
    // if the current booking's status is "Not Completed",
    // also charging the Stripe payment intent (denoted by inputting
    // true as the second argument to updateBooking)
    const handleSendResponseClick = () => {
        if (booking.status !== "Completed") {

            // console.log(videoURL);

            dispatch(
                updateBooking(booking._id, true, {
                    ...booking,
                    singleTextResponse: {
                        customerSubmission:
                            booking.singleTextResponse.customerSubmission,
                        expertResponse: textResponse,
                        videoResponse: videoURL,
                        videoPublicId: imagePublicId
                    },
                    status: "Completed",
                })
            );
        }
    };

    /* Checking if there is an error or success message in the bookingsMetadata object. If there is, it
    will display a toast message. */
    useEffect(() => {
        if (bookingsMetadata.error) {
            toast.error(bookingsMetadata.error);
            dispatch(clearBookingsErrors());
        }

        if (bookingsMetadata.success) {
            toast.success("Responded to booking successfully!");
            dispatch(clearBookingsSuccess());
        }
    }, [dispatch, bookingsMetadata]);
    return (
        <>
            <Head>
                <script
                    src="https://widget.Cloudinary.com/v2.0/global/all.js"
                    type="text/javascript"
                ></script>
            </Head>
            <div className="mx-auto flex flex-col gap-4 p-6 py-8 bg-white shadow-lg rounded-lg w-full max-w-xl h-fit border border-black/10">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center justify-center">
                        {/* <div className="flex items-center w-14 h-14 rounded-full bg-black/10">
                        <PencilAltIcon className="w-3/5 m-auto" />
                    </div> */}
                        <h1 className="text-2xl font-bold tracking-tight text-brand-primary-light">
                            {booking?.bookingType} Booking
                        </h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2 ">
                        {/* Status Badges  */}
                        {booking?.status === "Not Completed" && (
                            <Badge color="red" text={booking?.status} />
                        )}
                        {booking?.status === "Completed" && (
                            <Badge color="green" text={booking?.status} />
                        )}
                        <p className="text-xs opacity-50 whitespace-nowrap">
                            {moment(booking?.createdAt).format("MMM Do, YYYY")}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-4">
                        <h1 className="text-sm md:text-md">
                            {/* Display different text depending on the booking type  */}
                            {dashboardType === "Advice Seeker"
                                ? `Your submission`
                                : `From: ${booking?.customer?.name}`}
                        </h1>

                        {/* Display preview and link to the expertisePost associated with this booking  */}
                        <Link
                            href={`/expertisePost/${booking?.expertisePost?._id}`}
                            passHref={true}
                        >
                            <a
                                target="_blank"
                                className="text-xs max-w-[8rem] sm:max-w-[13rem] opacity-60 hover:opacity-100 overflow-scroll whitespace-nowrap"
                            >
                                Expertise Post: {booking?.expertisePost?.title}
                            </a>
                        </Link>
                    </div>
                    {/* <div className="w-full h-72 min-h-[18rem] border border-black/10 font-light leading-relaxed p-4 rounded-lg"> */}

                    {/* Display the customer submission */}
                    <div
                        className={classNames(
                            dashboardType === "Advice Seeker"
                                ? " h-32 max-h-[10rem]"
                                : "h-72 min-h-[18rem]",
                            "w-full border border-black/10 font-light leading-relaxed p-4 rounded-lg overflow-auto"
                        )}
                    >
                        {booking?.singleTextResponse?.customerSubmission}
                    </div>
                </div>
                {/* Display the expert response */}
                <h1 className="text-md -mb-2">Expert&apos;s Response</h1>
                {dashboardType === "Advice Seeker" && (
                    <div className="w-full h-60 sm:h-72 border border-black/10 font-light leading-relaxed p-4 rounded-lg overflow-auto">
                        {booking?.singleTextResponse?.expertResponse}
                    </div>
                )}

                {/* If the dashboardType is Expert, display the textarea for expert input,
                and a reactive button that changes values based on the expert's response, 
                and the status of the booking.*/}
                {dashboardType === "Expert" && (
                    <div className="flex flex-col gap-2">
                        {recordVideo &&
                            <RecordVideo isEnabled={recordVideo} recordingStateChanger={setRecordVideo} changeBlobState={setVideoBlob} />
                        }

                        {previewVideo &&
                            <PreviewVideo previewVideoURL={videoURL} previewStateChanger={setPreviewVideo} />
                        }

                        <div className="w-full h-28 border border-black/10 p-2 rounded-lg">
                            <textarea
                                id="textareaInput"
                                name="textareaInput"
                                autoComplete="none"
                                required
                                // maxLength={maxDescriptionLength}
                                className="block px-3 py-2 h-full w-full rounded-md placeholder-gray-400 resize-none focus:ring-0 border-transparent focus:border-transparent sm:text-md"
                                placeholder={
                                    "Hey! I'm happy to help. My best advice would be..."
                                }
                                value={
                                    booking?.status === "Completed"
                                        ? booking.singleTextResponse.expertResponse
                                        : textResponse
                                }
                                disabled={
                                    bookingsMetadata.loading ||
                                        booking?.status === "Completed"
                                        ? true
                                        : false
                                }
                                onChange={(e) => setTextResponse(e.target.value)}
                            />
                        </div>

                        {/* <button onClick={() => setRecordVideo(true)} className="flex justify-center items-center rounded-xl bg-black hover:bg-gray-900 text-white p-3 font-semibold text-md md:text-lg">
                            Record Video
                        </button> */}

                        {imagePublicId ? (
                            <section className="py-4 block">
                                <div className="flex justify-center">
                                    <p className="text-gray-800 font-medium text-md text-center text-xl font-semibold">Video Attached</p>
                                </div>

                                <div className="flex justify-center items-center mt-2">
                                    <button onClick={() => setPreviewVideo(true)} className="flex items-center mx-2 text-white font-medium text-md text-center text-md font-semibold bg-green-600 rounded-lg px-4 py-3">
                                        <RemoveRedEyeOutlinedIcon sx={{ fontSize: 24, marginRight: "5px" }} />
                                        Preview Video
                                    </button>

                                    <button onClick={openWidget} className="flex items-center text-white font-medium text-center text-md font-semibold bg-red-500 rounded-lg px-4 py-3">
                                        <DeleteOutlinedIcon sx={{ fontSize: 24, marginRight: "5px" }} />
                                        Remove Video
                                    </button>
                                </div>
                            </section>
                        ) : (
                            <section className="py-4 block justify-between items-center">
                                <div className="flex justify-center items-center">
                                    <p className="text-gray-800 font-medium text-md text-center text-xl font-semibold">No Video Attached</p>
                                </div>

                                <div className="flex mt-4 justify-center">
                                    <button onClick={openWidget} className="flex items-center rounded-lg bg-brand-primary hover:bg-gray-900 text-white px-4 py-3 mx-2 font-semibold text-sm md:text-lg">
                                        <FileUploadOutlinedIcon sx={{ fontSize: 26, color: "#fff", marginRight: "5px" }} />
                                        Attach a Video
                                    </button>

                                    <button onClick={() => setRecordVideo(true)} className="flex items-center rounded-lg bg-brand-primary-light hover:bg-gray-900 text-white px-4 py-3 font-semibold text-sm md:text-lg">
                                        <CenterFocusWeakOutlinedIcon sx={{ fontSize: 26, color: "#fff", marginRight: "5px" }} />
                                        Record Video
                                    </button>
                                </div>
                            </section>
                        )}

                        <button
                            className={classNames(
                                booking?.status === "Completed" ||
                                    bookingsMetadata.loading ||
                                    textResponse.length < 30
                                    ? "opacity-40"
                                    : "opacity-100",
                                `flex justify-center items-center rounded-xl bg-brand-primary-light hover:bg-brand-primary-light/80 text-white p-3 font-semibold text-md md:text-lg`
                            )}
                            onClick={handleSendResponseClick}
                            disabled={
                                bookingsMetadata.loading ||
                                    textResponse.length < 30 ||
                                    booking?.status === "Completed"
                                    ? true
                                    : false
                            }
                        >
                            {bookingsMetadata.loading ? (
                                <ButtonLoader />
                            ) : booking?.status === "Completed" ? (
                                "Booking Completed"
                            ) : textResponse.length < 30 ? (
                                "Type a Response First!"
                            ) : (
                                "Send Response"
                            )}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default DetailsSingleTextResponseBooking;
