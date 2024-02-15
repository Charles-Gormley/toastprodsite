'use client'

import { headers } from "next/headers";
import { useState } from "react";
import VerificationInput from "react-verification-input";

export default function Verification({ params }: { params: { email: string}}) {
    
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
            <p className="text-lg font-bold text-center">Enter Verification Code</p>
            <VerificationInput 
                validChars="0-9"
                placeholder=""
                autoFocus
                onComplete={handleComplete}
            />
        </section>
        </div>
    )
}