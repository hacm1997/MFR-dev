const config = {
    API_URL: process.env.NEXT_PUBLIC_BASE_URL,
    USERNAME: process.env.NEXT_PUBLIC_USERNAME,
    PASSWORD: process.env.NEXT_PUBLIC_LOGIN_PASSWORD,
    TOKEN_SESSION: process.env.NEXT_PUBLIC_TOKEN_SESSION,
    TENANT: process.env.NEXT_PUBLIC_TENANT,
    CLIENT_ID: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_CLIENT_ID as string,
    CLIENT_SECRET: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_CLIENT_SECRET as string,
    API_KEY: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_API_KEY as string,
    CALENDAR_ID: process.env.NEXT_PUBLIC_REACT_APP_CALENDAR_ID,
    S3_SERVICE: process.env.NEXT_PUBLIC_S3_SERVICE as string,
    DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN_URL as string
};

export default config;
