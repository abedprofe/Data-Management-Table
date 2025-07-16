"use client";
import { useContext, useEffect, useRef } from "react";
import { dataContext } from "@/context/dataContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Download, Trash2 } from "lucide-react";
import { deleteBulkData } from "@/app/api/users";

export default function NumberOfSelected() {
  const { view, setSelected } = useContext(dataContext);
  const toastIdRef = useRef(null);
  const router = useRouter();

  async function handleDelete() {
    await deleteBulkData(view);
    setSelected(new Set());
    router.refresh();
  }

  useEffect(() => {
    if (view?.size > 0) {
      if (toastIdRef.current) {
        toast(<ToastContent />, {
          id: toastIdRef.current,
          duration: Infinity,
          dismissible: false,
        });
      } else {
        toastIdRef.current = toast(<ToastContent />, {
          duration: Infinity,
          dismissible: false,
        });
      }
    } else {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  }, [view]);

  const ToastContent = () => (
    <div className="flex justify-between items-center gap-4">
      <p className="p-1.5 border-2 rounded-md text-center">
        {view.size} Selected
      </p>
      <div className="flex items-center justify-between gap-4">
        <Button size="sm">
          <Download />
        </Button>
        <Button size="sm" onClick={handleDelete}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
