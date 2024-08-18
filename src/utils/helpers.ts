import { v4 as uuidv4 } from 'uuid';
import sha256 from 'sha256';

export const getURL = (path: string = "") => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
      process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
      process?.env?.NEXT_PUBLIC_VERCEL_URL &&
        process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
        "http://localhost:3000/";

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, "");
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, "");

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

export const toDateTime = (secs: number) => {
  var t = new Date(+0); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export const calculateTrialEndUnixTimestamp = (
  trialPeriodDays: number | null | undefined
) => {
  // Check if trialPeriodDays is null, undefined, or less than 2 days
  if (
    trialPeriodDays === null ||
    trialPeriodDays === undefined ||
    trialPeriodDays < 2
  ) {
    return undefined;
  }

  const currentDate = new Date(); // Current date and time
  const trialEnd = new Date(
    currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000
  ); // Add trial days
  return Math.floor(trialEnd.getTime() / 1000); // Convert to Unix timestamp in seconds
};

const toastKeyMap: { [key: string]: string[] } = {
  status: ["status", "status_description"],
  error: ["error", "error_description"],
};

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType];

  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`;

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(
      toastDescription
    )}`;
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`;
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`;
  }

  return redirectPath;
};

export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
) =>
  getToastRedirect(
    path,
    "status",
    statusName,
    statusDescription,
    disableButton,
    arbitraryParams
  );

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
) =>
  getToastRedirect(
    path,
    "error",
    errorName,
    errorDescription,
    disableButton,
    arbitraryParams
  );

// mock generate song data
export const fakeData = [
  {
    audio_url: "",
    duration: 0,
    id: "",
    image_url: "",
    model_name: "",
    prompt: "",
    tags: "",
    title: "",
    album_id: 0,
    created_at: "",
    status: "",
    updated_at: "",
    user_id: "",
    genres: [],
    username: "",
    is_private: false
  },
  {
    audio_url: "",
    duration: 0,
    id: "",
    image_url: "",
    model_name: "",
    prompt: "",
    tags: "",
    title: "",
    album_id: 0,
    created_at: "",
    status: "",
    updated_at: "",
    user_id: "",
    genres: [],
    username: "",
    is_private: false
  },
];

export const fakeGenerateData = {
  code: 200,
  data: {
    callbackType: "text",
    data: [
      {
        audio_url:
          "",
        createTime: Date.now(),
        duration: 0,
        id: uuidv4(),
        image_url:
          "",
        model_name: "chirp-v3",
        prompt: "",
        tags: "",
        title: "",
      },
      {
        audio_url:
          "",
        createTime: Date.now(),
        duration: 0,
        id: uuidv4(),
        image_url:
          "",
        model_name: "chirp-v3",
        prompt: "",
        tags: "",
        title: "",
      },
    ],
  },
  msg: "All generated successfully.",
};


/** 随机生成头像 */
export const generateGravatarUrl = (email: string) => {
  const address = String(email).trim().toLowerCase();

  // Create a SHA256 hash of the final string
  const hash = sha256(address);

  // Grab the actual image URL
  return `https://www.gravatar.com/avatar/${hash}?d=retro`;
}

/** 首字母大写 */
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const flowbiteColor = {
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  red: {
    50: '#FDF2F2',
    100: '#FDE8E8',
    200: '#FBD5D5',
    300: '#F8B4B4',
    400: '#F98080',
    500: '#F05252',
    600: '#E02424',
    700: '#C81E1E',
    800: '#9B1C1C',
    900: '#771D1D',
  },
  orange: {
    50: '#FFF8F1',
    100: '#FEECDC',
    200: '#FCD9BD',
    300: '#FDBA8C',
    400: '#FF8A4C',
    500: '#FF5A1F',
    600: '#D03801',
    700: '#B43403',
    800: '#8A2C0D',
    900: '#771D1D',
  },
  yellow: {
    50: '#FDFDEA',
    100: '#FDF6B2',
    200: '#FCE96A',
    300: '#FACA15',
    400: '#E3A008',
    500: '#C27803',
    600: '#9F580A',
    700: '#8E4B10',
    800: '#723B13',
    900: '#633112',
  },
  green: {
    50: '#F3FAF7',
    100: '#DEF7EC',
    200: '#BCF0DA',
    300: '#84E1BC',
    400: '#31C48D',
    500: '#0E9F6E',
    600: '#057A55',
    700: '#046C4E',
    800: '#03543F',
    900: '#014737',
  },
  teal: {
    50: '#EDFAFA',
    100: '#D5F5F6',
    200: '#AFECEF',
    300: '#7EDCE2',
    400: '#16BDCA',
    500: '#0694A2',
    600: '#047481',
    700: '#036672',
    800: '#05505C',
    900: '#014451',
  },
  blue: {
    50: '#EBF5FF',
    100: '#E1EFFE',
    200: '#C3DDFD',
    300: '#A4CAFE',
    400: '#76A9FA',
    500: '#3F83F8',
    600: '#1C64F2',
    700: '#1A56DB',
    800: '#1E429F',
    900: '#233876',
  },
  indigo: {
    50: '#F0F5FF',
    100: '#E5EDFF',
    200: '#CDDBFE',
    300: '#B4C6FC',
    400: '#8DA2FB',
    500: '#6875F5',
    600: '#5850EC',
    700: '#5145CD',
    800: '#42389D',
    900: '#362F78',
  },
  purple: {
    50: '#F6F5FF',
    100: '#EDEBFE',
    200: '#DCD7FE',
    300: '#CABFFD',
    400: '#AC94FA',
    500: '#9061F9',
    600: '#7E3AF2',
    700: '#6C2BD9',
    800: '#5521B5',
    900: '#4A1D96',
  },
  pink: {
    50: '#FDF2F8',
    100: '#FCE8F3',
    200: '#FAD1E8',
    300: '#F8B4D9',
    400: '#F17EB8',
    500: '#E74694',
    600: '#D61F69',
    700: '#BF125D',
    800: '#99154B',
    900: '#751A3D',
  },
}

/** 风格卡片背景色，随机取预设color中4，700的值 */
export const cardBackgroundColor = [
  flowbiteColor.gray[400],
  flowbiteColor.gray[700],

  flowbiteColor.red[400],
  flowbiteColor.red[700],

  flowbiteColor.orange[400],
  flowbiteColor.orange[700],

  flowbiteColor.yellow[400],
  flowbiteColor.yellow[700],

  flowbiteColor.green[400],
  flowbiteColor.green[700],

  flowbiteColor.teal[400],
  flowbiteColor.teal[700],

  flowbiteColor.blue[400],
  flowbiteColor.blue[700],

  flowbiteColor.indigo[400],
  flowbiteColor.indigo[700],

  flowbiteColor.purple[400],
  flowbiteColor.purple[700],

  flowbiteColor.pink[400],
  flowbiteColor.pink[700],

]


// 秒转为分秒格式
export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.round(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};


// badge 颜色随机取预设值
export const color = [
  "gray",
  "red",
  "yellow",
  "blue",
  "cyan",
  "dark",
  "green",
  "indigo",
  "light",
  "lime",
  "pink",
  "purple",
  "teal",
];