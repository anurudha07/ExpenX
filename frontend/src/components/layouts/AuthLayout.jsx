
import React from 'react';
import CARD_2 from '../../assets/images/card2.png';
import { LuTrendingUpDown } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-full md:w-3/5 px-12 pt-8 pb-12 flex flex-col">
        <h2 className="text-3xl font-extrabold text-primary mb-4">Expen-X</h2>
        {/* Inline font load */}
        <>
          <link
            href="https://fonts.googleapis.com/css2?family=Allura&display=swap"
            rel="stylesheet"
          />
          <p
            className="text-4xl italic mb-6"
            style={{ fontFamily: 'Allura, cursive', color: '#000' }}
          >
            " Your Expense Tracking Partner... "
          </p>
        </>
        {/* Main content (forms) */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

      {/* Right side: use original purple background style, keep image/card size from second code */}
      <div className="hidden md:block w-2/5 h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative flex flex-col justify-between">
        {/* Top-aligned Stats card */}
        <div className="relative w-full max-w-127 z-20 ">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="--- "
            color="bg-primary"
          />
        </div>

        {/* Bottom-aligned Image */}
        <div className="w-full max-w-lg z-20">
          <img
            src={CARD_2}
            alt="Card"
            className="w-full rounded-2xl shadow-lg shadow-blue-400/15"
          />
        </div>

        {/* Decorative shapes behind */}
        <div className="absolute w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="absolute w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="absolute w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl shadow-md border border-gray-200 z-20">
      <div
        className={`w-12 h-12 flex items-center justify-center text-2xl text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-xl">₹ {value}</span>
      </div>
    </div>
  );
};

