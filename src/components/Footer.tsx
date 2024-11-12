const Footer = () => {
  return (
    <div className="bg-greyBg text-whiteColor p-2 flex justify-between items-center">
      <a
        href="https://github.com/S-Sajith"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:no-underline text-sm"
      >
        Built by Sajith
      </a>
      <div className="relative group">
        <a
          href="https://github.com/S-Sajith/top-spotter/blob/main/PrivacyPolicy.md"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="EULA & Privacy Policy"
          className="hover:no-underline text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-whiteColor"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2C6.13 2 2 3.17 2 6.25v6c0 2.68 2.87 5.27 7.65 5.92a1 1 0 0 0 .7 0C15.13 17.52 18 14.93 18 12.25v-6C18 3.17 13.87 2 10 2zM10 4c2.98 0 5 .78 5 1.75 0 1.64-2.13 4.1-5 5.86-2.87-1.76-5-4.22-5-5.86C5 4.78 7.02 4 10 4zm0 12c-3.98 0-7-1.28-7-2.75 0-.63.73-1.39 1.96-2.07C6.72 13.22 8.29 14 10 14s3.28-.78 4.04-1.82C16.27 12.86 17 13.62 17 14.25c0 1.47-3.02 2.75-7 2.75z" />
          </svg>
        </a>
        <div className="absolute bottom-full right-0 mb-1 hidden w-32 bg-gray-700 text-white text-xs rounded-md p-2 group-hover:block">
          End user agreement & Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default Footer;
