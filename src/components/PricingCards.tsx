import React from "react";

type PricingPlan = {
  name: string;
  price:
    | string
    | {
        monthly: string;
        annual?: string;
        discount?: string;
        original?: string;
      };
  popular: boolean;
  features: string[];
  button: {
    text: string;
    link: string;
  };
};

type PricingCardProps = {
  plan: PricingPlan;
};

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <div className="flex flex-col w-full lg:order-none border-2 border-gray-300 border-opacity-50 py-5 px-6 rounded-md">
      <div className="text-center">
        <h4 className="text-lg font-medium text-gray-400">{plan.name}</h4>
        <p className="mt-3 text-4xl font-bold text-black">
          {typeof plan.price === "object" ? plan.price.monthly : plan.price}
        </p>
        {typeof plan.price === "object" && plan.price.original && (
          <p className="mt-1 text-xl font-medium text-gray-400 line-through">
            {plan.price.original}
          </p>
        )}
      </div>
      <ul className="mt-8 text-left space-y-4">
        {plan.features.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
              />
            </svg>

            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex mt-8">
        <a
          href={plan.button.link || "#"}
          className={`inline-block w-full text-center py-2 px-4 rounded-md ${
            plan.popular
              ? "bg-blue-500 text-black"
              : "border border-blue-500 text-blue-500"
          }`}
        >
          {plan.button.text || "Get Started"}
        </a>
      </div>
    </div>
  );
};

export default PricingCard;
