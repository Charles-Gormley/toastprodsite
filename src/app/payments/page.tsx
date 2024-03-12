import Link from "next/link";


export default function PaymentsPage() {
    return (
        <div>
            <h1>Payments</h1>
            <Link href="https://buy.stripe.com/test_aEU3d622f01bdzidQQ">Pay</Link>
        </div>
    );
}