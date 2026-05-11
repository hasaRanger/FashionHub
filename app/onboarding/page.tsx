'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <div className="relative flex-1">
        <Image
          src="/images/onboarding.jpg"
          alt="Fashion model"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      <div className="bg-white px-8 pt-8 pb-12 flex flex-col gap-4">
        <div className="mb-2">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            Find The <br /> Best Collections
          </h1>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Get your dream item easily with FashionHub <br />
            and get other interesting offers
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push('/home')}
            className="flex-1 py-4 rounded-full border border-gray-300 text-gray-800 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push('/home')}
            className="flex-1 py-4 rounded-full bg-brand text-white font-semibold text-sm hover:bg-orange-500 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}