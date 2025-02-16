import { IoSadOutline } from "react-icons/io5";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mb-5 flex min-h-[300px] flex-col items-center justify-center rounded-md border border-slate-100 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <IoSadOutline className="text-gray-500 m-auto text-center text-[60px] " />
        <h3 className="dark:text-gray-100 mt-3 text-2xl font-semibold ">
          {message || "Not found"}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">
          Something went wrong, please try again later or contact with admin.
        </p>
      </div>
    </div>
  );
}
