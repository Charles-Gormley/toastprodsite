'use client'

import { useRouter } from "next/router";
import VerificationInput from "react-verification-input";

export default function Verification({ params }: { params: { email: string}}) {
    
    // const router = useRouter()
    async function handleComplete(verification_code: string) {
        try {
            const response = await fetch("https://api.tokenizedtoast.com/verify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: decodeURIComponent(params.email), verification_code: verification_code })
        });
        const data = await response.json();
        if (response.ok) {
            console.log("verification successful:", data);
            // router.push('/login');
        } else {
            console.log(data.message || 'Verification failed');
        }

        } catch (error:any) {
            console.error("Error verifying code:", error.message);
        }
    }

    
    return (
        <div className="h-screen flex items-center justify-center">
        <section className="flex-col">
            <p className="text-lg font-bold text-center mb-3">Enter Verification Code</p>
            <VerificationInput 
                validChars="0-9"
                placeholder=""
                autoFocus
                onComplete={handleComplete}
                classNames={{
                    character: "character",
                  }}
            />
        </section>
        </div>
    )
}