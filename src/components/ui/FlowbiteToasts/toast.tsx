import { Toast } from "flowbite-react";
import React, { useEffect } from "react";

/**
 * @open toast 是否打开
 * @iconElemnt 图标
 * @title 标题
 * @description 描述
 * @onOpenChange toast状态变化时的回调
 */
interface FlowbiteToastProps {
  [key: string]: any;
  open?: boolean | null;
  IconElement?: React.ReactElement;
  title?: string | null;
  description?: string | null;
  onOpenChange?: (open: boolean) => void;
}

const FlowbiteToast: React.FC<FlowbiteToastProps> = ({
  open,
  onOpenChange,
  iconElement,
  title,
  description,
}) => {
  // toast 消失处理
  useEffect(() => {
    let toastTimeout: NodeJS.Timeout;
    if (open) {
      toastTimeout = setTimeout(() => {
        onOpenChange?.(false);
      }, 3000);
    }
    return () => {
      clearTimeout(toastTimeout);
    };
  }, [open]);

  return (
    open && (
      <Toast
        theme={{
          root: {
            base: "text-gray-400 shadow bg-gray-800 dark:text-gray-500 flex w-full max-w-xs items-center rounded-lg dark:bg-white p-4",
          },
          toggle: {
            base: "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white -m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg dark:bg-white p-1.5 dark:text-gray-500 dark:hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 ",
          },
        }}
        className="fixed top-[88px] left-1/2 transform -translate-x-1/2 shadow z-[9999]"
      >
        {iconElement && (
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            {iconElement}
          </div>
        )}
        <div className="text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900">
            {title && title}
          </span>
          <div className="text-sm font-normal">
            {description && description}
          </div>
        </div>
        <Toast.Toggle
          onDismiss={() => {
            // hide toast when X button clicked
            onOpenChange?.(false);
          }}
        />
      </Toast>
    )
  );
};

export default FlowbiteToast;
