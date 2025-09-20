import Spinner from "../components/ui/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0E0C15]">
      <div className="flex flex-col items-center gap-4">
        <Spinner size={100} />
        <p className="text-white/70 font-vazirmatn text-lg">
          در حال بارگذاری...
        </p>
      </div>
    </div>
  );
}
