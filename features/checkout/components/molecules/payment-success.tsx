export default function PaymentSuccess({amount}: {amount: string}) {
    return (
      <main>
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
          <h2 className="text-2xl">You successfully sent</h2>
  
          <div className=" p-2 rounded-md  mt-5 text-4xl font-bold">
            ${amount}
          </div>
        </div>
      </main>
    );
  }