"use client";

export default function AddToCartButton({ plan, productInfo, className = "" }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  console.log({plan,productInfo});

  return (
    <button
      onClick={()=>{}}
      disabled={loading}
      className={`w-full mb-6 bg-amber-50 text-black rounded-2xl px-6 py-3 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className} ${
        success ? "bg-green-500 text-white" : ""
      }`}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          در حال افزودن...
        </div>
      ) : success ? (
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          افزوده شد!
        </div>
      ) : (
        "BUY"
      )}
    </button>
  );
}
