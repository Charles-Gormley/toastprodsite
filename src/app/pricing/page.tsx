import React from "react";
import Container from "../../components/Container";
import SectionHead from "../../components/SectionAhead";
import PricingCard from "../../components/PricingCards";

type PricingPlan = {
  name: string;
  price:
    | string
    | {
        monthly: string;
        annual: string;
        discount: string;
      };
  popular: boolean;
  features: string[];
  button: {
    text: string;
    link: string;
  };
};

const pricing: PricingPlan[] = [
  {
    name: "Personal",
    price: "Free",
    popular: false,
    features: [
      "3000 word limit",
      "General Text-to-Speech",
    ],
    button: {
      text: "Get Started",
      link: "/",
    },
  },
  {
    name: "Standard",
    price: {
      monthly: "$5",
      annual: "$16",
      discount: "10%",
    },
    popular: true,
    features: [
      "61,000 word limit",
      "Standard Text-to-Speech",

    ],
    button: {
      text: "Get Started",
      link: "https://buy.stripe.com/test_aEU3d622f01bdzidQQ",
    },
  },
  {
    name: "Premium",
    price: "Custom",
    popular: false,
    features: [
      "61,000 word limit",
      "Neural Text-to-Speech,",
    ],
    button: {
      text: "Contact us",
      link: "/contact",
    },
  },
];

const PricingPage = () => {
  return (
    <div className="h-screen">
      <Container>
        <SectionHead
          title="Pricing"
          description="Stream & Listen with Ease. Transparent Pricing, No Hidden Fees."
        />
        <div className="grid md:grid-cols-3 gap-10 mx-auto max-w-screen-lg mt-12">
          {pricing.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PricingPage;
