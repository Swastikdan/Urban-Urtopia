"use client"
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => setIsRazorpayLoaded(false);
    document.body.appendChild(script);
  }, []);

  const makePayment = async () => {
    if (!isRazorpayLoaded) {
      alert('Razorpay SDK Failed to load');
      return;
    }

    const response = await fetch('/api/order', { method: 'POST' });
    const data = await response.json();

    const options = {
      key: process.env.NEXT_PUBLIC_key_id,
      name: 'Manu Arora Pvt Ltd',
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: 'Thankyou for your test donation',
      image: 'https://manuarora.in/logo.png',
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: 'Swastik Dan',
        email: 'thisisswastikdan@gmail.com',
        contact: '9609591515',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <main className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-[#252B30] to-[#191C22]">
        <div className="relative z-10 mx-auto mt-10 flex max-w-6xl flex-col  items-center justify-evenly md:flex-row">
          <div className="mx-10 mb-20 md:mb-0 md:w-1/3">
            <h1 className="text-4xl text-white font-bold">Integrate Payments</h1>
            <p className="text-white mt-4">
              Integrate payments in your React and Next.js application with TailwindCSS and Razorpay
            </p>
            <button
              onClick={makePayment}
              className="mt-10 px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              Make Payment
            </button>

        </div>
        </div>
      </main>
    </div>
  );
}

