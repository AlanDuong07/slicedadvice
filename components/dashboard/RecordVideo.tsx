import React, { JSXElementConstructor, useEffect, useRef, useState } from 'react';
import { CloseRounded, VideoCameraBackRounded } from '@mui/icons-material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DoneIcon from '@mui/icons-material/Done';
import VideoRecorder from "react-video-recorder"; // Ignore types issue, this library doesn't have @types/module

const RecordVideo = (props: any) => {
    const [recordStatus, setRecordStatus] = useState<Boolean>(false);
    const [videoResponseBlob, setVideoResponseBlob] = useState<Blob | undefined>();

    const clearVideo = () => {
        setVideoResponseBlob(undefined);
        props.recordingStateChanger(false);
    }

    const approveVideo = (blob: Blob) => {
        // console.log("Inside approve video:");
        // console.log(blob);
        // props.changeBlobState(videoResponseBlob);
        // console.log(videoResponseBlob);
        props.recordingStateChanger(false)

        const url = URL.createObjectURL(blob);

        const a: HTMLAnchorElement = document.createElement('a');
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "recording.webm";
        a.click();
    }


    return (
        <div className='absolute top-0 left-0 bg-gray-700 h-full w-full z-30'>
            <section className='bg-gray-700 w-full h-full'>

                <VideoRecorder
                    onRecordingComplete={(blob: Blob) => {
                        console.log("Recording Ended!");
                        setVideoResponseBlob(blob);
                    }}
                />

                {!videoResponseBlob ? (
                    <button onClick={() => props.recordingStateChanger(false)} className='absolute top-2 right-2 flex justify-center bg-brand-primary-light text-white px-3 py-3 font-semibold rounded-md'>
                        <KeyboardBackspaceIcon sx={{ fontSize: 30 }} />
                    </button>
                ) : (
                    <div className='absolute top-2 right-5 flex justify-start'>
                        <button onClick={clearVideo} className='mx-2 flex justify-center bg-brand-primary text-white px-3 py-3 font-semibold rounded-md'>
                            <CloseRounded />
                        </button>
                        <button onClick={() => approveVideo(videoResponseBlob)} className='flex justify-center bg-green-600 text-white px-3 py-3 font-semibold rounded-md'>
                            <DoneIcon />
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}

export default RecordVideo;