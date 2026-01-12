import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, CheckCircle, Smile } from "lucide-react";

/* ================= STEPS CONFIG ================= */
const steps = [
  { label: "Cart", path: "/cart", icon: ShoppingBag },
  { label: "Review", path: "/checkout", icon: CheckCircle },
  { label: "Success", path: "/checkout/success", icon: Smile },
];

const CheckoutLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /* ================= STEP DETECTION (FIXED) ================= */
  const currentStep = (() => {
    if (location.pathname.startsWith("/checkout/success")) return 2;
    if (location.pathname.startsWith("/checkout")) return 1;
    if (location.pathname.startsWith("/cart")) return 0;
    return 0;
  })();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] pt-24 pb-16">

      {/* ================= STEPPER (MEDIUM WIDTH) ================= */}
      <div className="max-w-md mx-auto px-4 mb-14">
        <div className="relative">

          {/* Base line */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-[#e9d6f7] rounded-full -translate-y-1/2" />

          {/* Progress line */}
          <div
            className="absolute top-1/2 left-0 h-3 bg-white rounded-full -translate-y-1/2 transition-all duration-500"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          />

          {/* Step icons */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={step.label}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => navigate(step.path)}
                >
                  <div
                    className={`w-14 h-14 rounded-full border-4 flex items-center justify-center shadow-lg transition
                      ${
                        isCompleted
                          ? "bg-green-400 border-green-400 text-white"
                          : isActive
                          ? "bg-[#9B7BB8] border-[#9B7BB8] text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                  >
                    <step.icon size={22} />
                  </div>

                  <span
                    className={`mt-2 text-sm font-semibold
                      ${
                        isActive
                          ? "text-white"
                          : isCompleted
                          ? "text-green-500"
                          : "text-[#2D1B3D]"
                      }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= PAGE CONTENT (FULL WIDTH CARD) ================= */}
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-3xl">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default CheckoutLayout;
