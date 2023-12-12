import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="fixed z-[99999] bg-white dark:bg-black dark:text-white">
      <div className="absolute bottom-[63px] left-0 flex h-screen w-screen flex-col items-center justify-center">
        <h2 className="text-[20px] md:text-[44px]">Loading...</h2>
        <FaSpinner className="h-8 w-8 animate-spin" />
      </div>
    </div>
  );
}
