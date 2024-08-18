interface SeparatorProps {
  text: string;
}

export default function Separator({ text }: SeparatorProps) {
  return (
    // <div className="relative">
    //   <div className="relative flex items-center py-1">
    //     <div className="grow border-t border-zinc-700"></div>
    //     <span className="mx-3 shrink text-sm leading-8 text-zinc-500 dark:text-white">
    //       {text}
    //     </span>
    //     <div className="grow border-t border-zinc-700"></div>
    //   </div>
    // </div>

    <div className="flex items-center">
      <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="px-5 text-center text-gray-500 dark:text-gray-400">
        {text}
      </div>
      <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );
}
