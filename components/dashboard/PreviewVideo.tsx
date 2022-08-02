import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import React, { useEffect, useRef, useState } from 'react';

const PreviewVideo = (props: any) => {
    const videoContainer: any = useRef();

    return (
        <div className='absolute top-0 left-0 bg-gray-700 h-full w-full z-30'>
            <button onClick={() => props.previewStateChanger(false)} className='absolute top-2 right-2 flex justify-center bg-brand-primary-light text-white px-3 py-3 font-semibold rounded-md z-50'>
                <KeyboardBackspaceIcon sx={{ fontSize: 30 }} />
            </button>
            {props.previewVideoURL &&
                <video src={props.previewVideoURL} controls autoPlay className='w-full h-full z-40'></video>
            }


            {/* <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" controls autoPlay className='w-full h-full'></video> */}
        </div>
    )
}

export default PreviewVideo;