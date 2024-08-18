import { Flowbite, theme } from "flowbite-react";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

/** 修改flowbite-react全局组件样式 */
export function CustomTheme({ children }: PropsWithChildren) {
  return (
    <Flowbite
      theme={{
        theme: {
          navbar: {
            root: {
              base: "mx-auto max-w-screen-2xl bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-900 sm:px-4",
            },
            collapse: {
              base: "w-full lg:block lg:w-auto",
            },
            link: {
              base: "block py-2 pl-3 pr-4 lg:p-0",
              active: {
                on: "bg-blue-700 text-white dark:text-white md:bg-transparent md:text-blue-700",
                off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:hover:bg-transparent lg:hover:text-blue-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white",
              },
              disabled: {
                on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
                off: "",
              },
            },
            toggle: {
              base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden",
              icon: "h-6 w-6 shrink-0",
            },
          },
          badge: {
            root: {
              color: {
                info: "bg-blue-100 text-blue-800 group-hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-800 dark:group-hover:bg-blue-300",
              },
              size: {
                xs: "px-2 py-1 text-xs",
              },
            },
          },
          button: {
            base: "group relative flex items-center justify-center text-center font-medium focus:z-10 focus:outline-none [&>span]:rounded-lg",
            color: {
              gray: ":ring-blue-700 border border-gray-200 bg-white text-gray-900 focus:text-blue-700 focus:ring-2 enabled:hover:bg-gray-100 enabled:hover:text-blue-700 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:bg-gray-700 dark:enabled:hover:text-white",
              info: "bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
            },
            outline: {
              color: {
                gray: "border border-gray-200 dark:border-gray-500",
              },
            },
          },
          checkbox: {
            root: {
              base: "h-4 w-4 rounded border border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600",
              color: {
                default:
                  "text-blue-600 focus:ring-blue-600 dark:ring-offset-blue-600 dark:focus:ring-blue-600",
              },
            },
          },
          datepicker: {
            popup: {
              footer: {
                button: {
                  base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-blue-300",
                  today:
                    "bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
                },
              },
            },
            views: {
              days: {
                items: {
                  item: {
                    selected: "bg-blue-700 text-white hover:bg-blue-600",
                  },
                },
              },
              months: {
                items: {
                  item: {
                    selected: "bg-blue-700 text-white hover:bg-blue-600",
                  },
                },
              },
              years: {
                items: {
                  item: {
                    selected: "bg-blue-700 text-white hover:bg-blue-600",
                  },
                },
              },
              decades: {
                items: {
                  item: {
                    selected: "bg-blue-700 text-white hover:bg-blue-600",
                  },
                },
              },
            },
          },
          megaMenu: {
            link: {
              active: {
                on: twMerge(
                  theme.megaMenu.link.active.on,
                  "bg-blue-700 md:text-blue-700",
                ),
                off: twMerge(
                  theme.megaMenu.link.active.off,
                  "md:hover:text-blue-700",
                ),
              },
            },
            dropdown: {
              toggle: {
                inlineWrapper:
                  "block border-b border-gray-100 py-2 pl-3 pr-4 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
              },
            },
            dropdownToggle: {
              base: twMerge(
                theme.megaMenu.dropdownToggle.base,
                "border-0 text-sm font-medium dark:text-white md:hover:text-blue-700",
              ),
            },
          },
          pagination: {
            pages: {
              selector: {
                active: twMerge(
                  theme.pagination.pages.selector.active,
                  "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700",
                ),
              },
            },
          },
          progress: {
            color: {
              cyan: "bg-blue-600",
            },
          },
          radio: {
            root: {
              base: "h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:bg-blue-600 dark:focus:ring-blue-600",
            },
          },
          select: {
            field: {
              select: {
                colors: {
                  gray: "border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
                },
              },
            },
          },
          tabs: {
            tablist: {
              tabitem: {
                base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
                styles: {
                  default: {
                    active: {
                      on: "bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-500",
                    },
                  },
                  underline: {
                    base: "rounded-t-lg",
                    active: {
                      on: "active rounded-t-lg border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500",
                    },
                  },
                  pills: {
                    base: "",
                    active: {
                      on: "rounded-lg bg-blue-600 text-white",
                    },
                  },
                  fullWidth: {
                    base: "ml-0 flex w-full rounded-none first:ml-0",
                    active: {
                      on: "active rounded-none bg-gray-100 p-4 text-gray-900 dark:bg-gray-700 dark:text-white",
                    },
                  },
                },
              },
            },
          },
          textarea: {
            colors: {
              gray: "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
            },
          },
          textInput: {
            field: {
              input: {
                colors: {
                  gray: "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
                  info: "border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-700 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-400 dark:bg-blue-100 dark:focus:border-blue-500 dark:focus:ring-blue-500",
                },
                withIcon: {
                  on: "pl-10",
                },
              },
            },
          },
          toggleSwitch: {
            toggle: {
              base: twMerge(
                theme.toggleSwitch.toggle.base,
                "group-focus:ring-blue-500/25",
              ),
              checked: {
                color: {
                  blue: "border-blue-700 bg-blue-700",
                },
              },
            },
          },
          tooltip: {
            base: twMerge(theme.tooltip.base, "!mx-0"),
          },
          spinner:{
            color:{
              info:"fill-blue-600"
            }
          }
        },
      }}
    >
      {children}
    </Flowbite>
  );
}
