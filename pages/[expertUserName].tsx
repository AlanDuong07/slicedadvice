import React from "react";
import ExpertProfile from "../components/ExpertProfile";
import MinimalLayout from "../components/layout/MinimalLayout";
import dbConnect from "../config/dbConnect";
import User from "../models/user";

export default function ExpertProfilePage({ expert }: any) {
    return (
        <MinimalLayout title={`Expert Profile | SlicedAdvice`}>
            <ExpertProfile expert={expert} />
        </MinimalLayout>
    );
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
    dbConnect();
    // Get expertUserName from url
    const expertUserName: string = context.params.expertUserName.toString();

    // Find expert with that expertUserName
    const expert = await User.findOne({ name: expertUserName });

    if (expert?.expertProfileDetails?.headline) {
        // Redirect to the home page
        return {
            redirect: {
                destination: `/`,
                permanent: false,
            },
        };
    }
    return {
        props: { expert: JSON.parse(JSON.stringify(expert)) },
    };
}
