import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

const Loading = () => {

    const loadingSize = "size-48 text-lg"

  return (
    <div className="bg-slate-300 fixed top-0 left-0 flex items-center justify-center h-full w-full">
      <Badge variant="secondary" className="">
        <Spinner className={loadingSize} />
        Loading...
      </Badge>
    </div>
  );
};

export default Loading;
