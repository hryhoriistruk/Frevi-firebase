// components/ui/LoadingSpinner.js
'use client';
import { ThreeDots } from 'react-loader-spinner';

export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center py-8">
            <ThreeDots
                height={40}
                width={40}
                radius="9"
                color="#0C4A6E"
                ariaLabel="three-dots-loading"
                visible={true}
            />
        </div>
    );
}