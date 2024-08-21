"use client";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import React, { useState } from "react";
import LanguageChanger from "./LanguageChange";
import { usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { usePathname as usePathname_, useRouter } from "next/navigation";
import { handleRequest } from "@/utils/auth-helpers/client";
import { SignOut } from "@/utils/auth-helpers/server";
import { Users } from "@/utils/db-operation";
import { createStripePortal } from "@/utils/stripe/server";
import { Cash, UserCircle } from "flowbite-react-icons/solid";
import { Link } from "./Link";
import { UserHeadset } from "flowbite-react-icons/outline";
import { useToast } from "./ui/FlowbiteToasts/use-toast";
import config from "@/config";

interface NavBarProps {
  user: Users | null;
  points: number | null | undefined;
  locale?: string;
}

export default function NavBar({ user, locale, points }: NavBarProps) {
  const { toast } = useToast();
  const router = useRouter();
  const localePath = usePathname();
  const normalPath = usePathname_();
  const currentPath = locale && locale !== "en" ? localePath : normalPath;
  const t = useTranslations("navbar");
  const [isLoading, setIsLoding] = useState(false);
  const navLink = [
    {
      text: `${t("home")}`,
      href: `/`,
      active: currentPath === `/`,
    },
    {
      text: `${t("pricing")}`,
      href: `/pricing`,
      active: currentPath === `/pricing`,
    },
    {
      text: `${t("blog")}`,
      href: `/blog`,
      active: currentPath === `/blog`,
    },
  ];

  /** 开启stripe客户门户 */
  const handleStripePortalRequest = async () => {
    setIsLoding(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsLoding(false);
    return router.push(redirectUrl);
  };

  /** 客服support */
  const handleSupport = async () => {
    try {
      await navigator.clipboard.writeText(config.siteMetadata.email);
      toast({
        description: t("emailCopyDescription"),
        variant: "default",
      });
    } catch (err) {
      console.error("Copy error:", err);
    }
  };

  return (
    <Navbar
      className="py-[22px] dark:bg-transparent"
      theme={{
        root: {
          inner: {
            fluid: {
              off: "container max-w-[1280px]",
            },
          },
        },
      }}
    >
      <Navbar.Brand
        as={Link}
        href="/"
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img
          src={config.siteMetadata.siteLogo}
          className="h-8"
          alt="site logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          {config.siteMetadata.applicationName}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-2">
        {user ? (
          <Dropdown
            dismissOnClick={false}
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={user.avatar_url ?? ""}
                rounded
                size="sm"
              />
            }
            size="lg"
            className="w-[224px] dark:bg-gray-600"
          >
            <Dropdown.Header>
              <Link
                href={`/@${user.username}`}
                className="hover:text-primary-500"
              >
                <span className="block text-sm leading-tight font-semibold dark:text-inherit">
                  {user.username}
                </span>
                <span className="block truncate text-sm font-normal leading-tight dark:text-gray-400">
                  {user.email}
                </span>
              </Link>
            </Dropdown.Header>
            <Dropdown.Item
              as={Link}
              href="/pricing"
              className="dark:hover:!bg-gray-600 dark:text-white dark:hover:text-primary-500"
            >
              <span className="flex items-center font-normal leading-tight text-sm cursor-pointer">
                {t("generateTimes", { points: points })}
              </span>
              <ChevronRightIcon className="absolute right-3" />
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              href={`/@${user.username}`}
              className="dark:text-white dark:hover:text-primary-500"
            >
              <UserCircle className="text-inherit w-[18px] h-[18px] mr-[6px]" />
              <span className=" font-normal leading-tight text-sm cursor-pointer">
                {t("profile")}
              </span>
            </Dropdown.Item>
            {user && user.plan_type === 1 && (
              <>
                <Dropdown.Item
                  className="dark:text-white dark:hover:text-primary-500"
                  onClick={handleSupport}
                >
                  <UserHeadset className="text-inherit w-[18px] h-[18px] mr-[6px]" />
                  <span className=" font-normal leading-tight text-sm cursor-pointer">
                    {t("support")}
                  </span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleStripePortalRequest}
                  as={"div"}
                  className="dark:text-white dark:hover:text-primary-500"
                >
                  <Button
                    isProcessing={isLoading}
                    className="dark:enabled:hover:bg-transparent enabled:hover:bg-transparent bg-transparent dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none dark:focus:bg-gray-600 dark:focus:ring-transparent focus:ring-0 focus:ring-transparent border-0 text-inherit"
                    theme={{
                      base: "group relative flex items-stretch justify-center p-0 text-center font-medium focus:z-10 focus:outline-none",
                      size: {
                        md: "p-0 text-sm",
                      },
                      inner: {
                        isProcessingPadding: {
                          md: "pr-12",
                        },
                      },
                      spinnerLeftPosition: {
                        md: "right-0",
                      },
                    }}
                  >
                    <Cash className="text-inherit w-[18px] h-[18px] mr-[6px]" />
                    <span className="flex items-center  font-normal leading-tight text-sm cursor-pointer text-inherit">
                      {t("billing")}
                    </span>
                  </Button>
                  <ChevronRightIcon className="absolute right-3" />
                </Dropdown.Item>
              </>
            )}
            <Dropdown.Divider />
            <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
              <input type="hidden" name="pathName" value={currentPath} />
              <button
                type="submit"
                className={
                  "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none dark:focus:bg-gray-600 leading-tight dark:text-white dark:hover:text-primary-500"
                }
              >
                {t("signOut")}
              </button>
            </form>
          </Dropdown>
        ) : (
          <Button
            theme={{
              size: {
                md: "px-0 py-0 text-sm",
              },
            }}
            as={Link}
            href="/sign-in"
            className="dark:bg-transparent items-center dark:hover:text-whiteduration-0 focus:ring-0 dark:focus:ring-0"
          >
            {t("signIn")}
          </Button>
        )}
        {locale ? (
          <LanguageChanger locale={locale!} />
        ) : (
          <div className="hidden h-[42px] md:block"></div>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navLink.map((link) =>
          typeof link === "object" && "text" in link ? (
            <Navbar.Link
              as={Link}
              key={link.text}
              href={link.href}
              active={link.active}
              theme={{
                base: "block py-2 pl-3 pr-4 md:p-0",
                active: {
                  on: "text-white bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:p-0 md:dark:text-primary-500",
                  off: "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700",
                },
              }}
            >
              {link.text}
            </Navbar.Link>
          ) : null,
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

const ChevronRightIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.34188 9.5C3.17742 9.49996 3.01666 9.44722 2.87993 9.34845C2.74319 9.24967 2.63663 9.1093 2.57369 8.94507C2.51076 8.78084 2.49429 8.60014 2.52637 8.42579C2.55844 8.25145 2.63762 8.0913 2.7539 7.96559L5.49255 5.00552L2.7539 2.04546C2.67446 1.96254 2.61111 1.86335 2.56752 1.75368C2.52393 1.64401 2.50099 1.52606 2.50003 1.40671C2.49907 1.28735 2.52011 1.16899 2.56193 1.05851C2.60375 0.948043 2.6655 0.84768 2.74359 0.76328C2.82167 0.67888 2.91453 0.612135 3.01674 0.566937C3.11895 0.52174 3.22846 0.498997 3.33889 0.500034C3.44931 0.501071 3.55844 0.525868 3.65991 0.572978C3.76138 0.620089 3.85314 0.688569 3.92986 0.774422L7.2565 4.37C7.41241 4.53857 7.5 4.76717 7.5 5.00552C7.5 5.24388 7.41241 5.47247 7.2565 5.64104L3.92986 9.23662C3.77393 9.40521 3.56243 9.49995 3.34188 9.5Z"
        fill="white"
      />
    </svg>
  );
};
