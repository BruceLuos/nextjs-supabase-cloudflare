"use client";

import { cn } from "@/utils/cn";
import { Button, Modal } from "flowbite-react";
import React from "react";

interface ModalProps {
  title: string;
  openModal: boolean;
  nodeElement?: React.ReactElement;
  buttonText: string;
  buttonLoading: boolean;
  modalSize?: string;
  titleClassName?: string;
  buttonClassName?: string;
  onClose: (openModal: boolean) => any;
  onHandle: () => void;
}

export default function CustomModal({
  title,
  openModal,
  nodeElement,
  buttonText,
  buttonLoading,
  titleClassName,
  buttonClassName,
  modalSize = "sm",
  onClose,
  onHandle,
}: ModalProps) {
  return (
    <>
      <Modal
        theme={{
          root: {
            base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            show: {
              on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
              off: "hidden",
            },
          },
          content: {
            base: "relative h-full w-full p-0 md:h-auto",
            inner:
              "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-800 p-4",
          },
          body: {
            base: "flex-1 overflow-auto pt-5",
            popup: "pt-0",
          },
          header: {
            base: "flex items-start justify-between rounded-t border-b pt-1 pb-4 dark:border-gray-600",
            popup: "border-b-0 pt-1 pb-3",
            title: `font-medium text-gray-900 dark:text-white ${
              titleClassName ? titleClassName : "text-xl"
            }`,
            close: {
              base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
              icon: "h-5 w-5",
            },
          },
          footer: {
            base: "flex items-center space-x-2 rounded-b border-gray-200 pb-[26px] dark:border-gray-600",
            popup: "border-t",
          },
        }}
        show={openModal}
        size={modalSize}
        onClose={() => {
          onClose(false);
        }}
        popup
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          {nodeElement && nodeElement}
          <div className="pt-5 pb-2.5">
            <Button
              isProcessing={buttonLoading}
              className={cn(
                "w-full focus:ring-0 dark:focus:ring-0",
                buttonClassName
              )}
              onClick={() => onHandle()}
            >
              {buttonText}
            </Button>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => onHandle}>{buttonText}</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
