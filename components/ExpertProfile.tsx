import React from "react";
import Image from "next/future/image";
export default function ExpertProfile({ expert }: any) {
    console.log("expert", expert);
    return (
        <div className="b flex">
            <div className="w-full max-w-lg self-center lg:self-start">
                {expert?.avatar?.url && (
                    <Image
                        src={expert?.avatar?.url}
                        width={1200}
                        height={800}
                        className="object-cover w-full h-72 lg:h-96 rounded-xl"
                        alt="Picture for expertise posting"
                    />
                )}
            </div>
        </div>
    );
}
