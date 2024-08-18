"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Toast from "./toast";
import { ToastProvider } from "@radix-ui/react-toast";
import { useToast } from "./use-toast";

export default function FlowbiteToaster() {
  const { toast, toasts } = useToast();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get("status");
    const status_description = searchParams.get("status_description");
    const error = searchParams.get("error");
    const error_description = searchParams.get("error_description");
    if (error || status) {
      toast({
        title: error
          ? error ?? "Hmm... Something went wrong."
          : status ?? "Alright!",
        description: error ? error_description : status_description,
        variant: error ? "destructive" : undefined,
      });
      // Clear any 'error', 'status', 'status_description', and 'error_description' search params
      // so that the toast doesn't show up again on refresh, but leave any other search params
      // intact.
      const newSearchParams = new URLSearchParams(searchParams.toString());
      const paramsToRemove = [
        "error",
        "status",
        "status_description",
        "error_description",
      ];
      paramsToRemove.forEach((param) => newSearchParams.delete(param));
      const redirectPath = `${pathname}?${newSearchParams.toString()}`;
      router.replace(redirectPath, { scroll: false });
    }
  }, [searchParams]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        console.log(id, title, description, action, props);
        return (
          <Toast key={id} title={title} description={description} {...props} />
        );
      })}
    </ToastProvider>
    // <>
    //   {toasts.map(({ id, title, description, action, ...props }) => (
    //     <Toast key={id} title={title} description={description} {...props} />
    //   ))}
    // </>
  );
}
