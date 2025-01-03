import { Loader as LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      <LoaderIcon className="h-8 w-8 text-gray-500 animate-spin" />
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );
};

export default Loader;
