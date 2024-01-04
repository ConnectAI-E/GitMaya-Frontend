import { Logo, GithubIcon, GitLabIcon, SlackIcon } from '@/components/icons';
import { useLocalStorageState } from 'ahooks';
import clsx from 'clsx';
const Login = () => {
  const [showCookie, setShowCookie] = useLocalStorageState(`showCookie`, {
    serializer: JSON.stringify,
    deserializer: JSON.parse,
    defaultValue: true
  });
  return (
    <div className="flex flex-col min-h-screen bg-black-dark overflow-hidden relative isolate">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none"></path>
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          ></path>
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        ></rect>
      </svg>
      <svg
        viewBox="0 0 1108 632"
        aria-hidden="true"
        className="absolute top-10 left-[calc(50%-4rem)] -z-10 w-[69.25rem] max-w-none transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
      >
        <path
          fill="url(#175c433f-44f6-4d59-93f0-c5c51ad5566d)"
          fillOpacity=".2"
          d="M235.233 402.609 57.541 321.573.83 631.05l234.404-228.441 320.018 145.945c-65.036-115.261-134.286-322.756 109.01-230.655C968.382 433.026 1031 651.247 1092.23 459.36c48.98-153.51-34.51-321.107-82.37-385.717L810.952 324.222 648.261.088 235.233 402.609Z"
        ></path>
        <defs>
          <linearGradient
            id="175c433f-44f6-4d59-93f0-c5c51ad5566d"
            x1="1220.59"
            x2="-85.053"
            y1="432.766"
            y2="638.714"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4F46E5"></stop>
            <stop offset="1" stopColor="#80CAFF"></stop>
          </linearGradient>
        </defs>
      </svg>
      <div className="grow flex flex-col">
        <div className="w-full grow items-center justify-center flex p-2">
          <div className="p-[1px]  rounded-xl shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            <div className="items-center justify-center flex flex-col gap-y-4 p-20 rounded-xl bg-[#1e293b]">
              <h1 className="text-black-light-light text-3xl font-bold">
                <span> Welcome to </span>
                <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text font-extrabold text-transparent">
                  GitMaya
                </span>
                <span>, let's get started!</span>
              </h1>
              <div className="flex flex-col text-left w-full gap-y-6 items-center mt-6">
                <p className="text-black-light-light text-md w-full">
                  · Sign in with your team's repository
                  <span className="text-gray-400 font-light">(preferred)</span>.
                </p>
                <div className="flex flex-col lg:flex-row w-full gap-4 align-top content-end">
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      className="text-black bg-white font-bold rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white/90 me-2 mb-2 w-64 justify-center"
                    >
                      <GithubIcon className="me-2" size={20} />
                      Sign in with Github
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      className="text-black bg-white font-bold rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white/90 me-2 mb-2 w-64 justify-center"
                    >
                      <GitLabIcon className="me-2" size={20} />
                      Sign in with GitLab
                      <span className="text-gray-400 font-light text-xs ml-1">
                        (SaaS)
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      disabled
                      type="button"
                      className="text-black bg-white font-bold rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white/90 me-2 mb-2 cursor-not-allowed w-64 justify-center"
                    >
                      <GitLabIcon className="me-2 fill-black" size={20} />
                      Sign in with GitLab
                    </button>
                    <p className="text-gray-400 text-xs mx-2">
                      Hosted on https://
                      <span className="text-black-light-light font-light">
                        <input
                          className="border-none  focus:border-info focus:ring-info w-36 p-1 text-sm rounded-sm"
                          type="text"
                          placeholder="gitlab.gitmaya.com"
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-md w-full">
                · Not a developer? Log in with your team's Slack workspace
                <span className="text-gray-400 font-light">
                  (in view-only mode)
                </span>
                .
              </p>
              <button
                type="button"
                className="text-black bg-white font-bold rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-white/90 me-2 mb-2 w-64 justify-center"
              >
                <SlackIcon className="me-2" size={20} />
                Sign in with Slack
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="static bottom-0 w-full">
        <div className="h-[1px] w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
        <div className="flex items-center max-w-6xl mx-auto px-4 sm:px-6 my-8">
          <div className="flex items-center">
            <a href="/">
              <Logo height={35} width={35} />
            </a>
          </div>
          <div className="text-xl font-black mx-4 text-gradient"> GitMaya </div>
          <div className="text-black-light text-sm">
            © All rights reserved.
          </div>
          <div className="ml-auto flex gap-5">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                aria-labelledby="icon"
                viewBox="0 0 50 50"
                stroke-width=""
                stroke=""
              >
                <g fill="#cbd5e1">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M39.5833 0H10.4167C4.66458 0 0 4.66458 0 10.4167V39.5833C0 45.3354 4.66458 50 10.4167 50H39.5833C45.3375 50 50 45.3354 50 39.5833V10.4167C50 4.66458 45.3375 0 39.5833 0ZM16.6667 39.5833H10.4167V16.6667H16.6667V39.5833ZM13.5417 14.025C11.5292 14.025 9.89583 12.3792 9.89583 10.35C9.89583 8.32083 11.5292 6.675 13.5417 6.675C15.5542 6.675 17.1875 8.32083 17.1875 10.35C17.1875 12.3792 15.5562 14.025 13.5417 14.025ZM41.6667 39.5833H35.4167V27.9083C35.4167 20.8917 27.0833 21.4229 27.0833 27.9083V39.5833H20.8333V16.6667H27.0833V20.3438C29.9917 14.9563 41.6667 14.5583 41.6667 25.5021V39.5833Z"
                  ></path>
                </g>
              </svg>
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                aria-labelledby="icon"
                viewBox="0 0 30 30"
                stroke-width=""
                stroke=""
              >
                <g fill="#cbd5e1">
                  <path d="M6.30293 18.9576C6.30293 20.6922 4.88599 22.1091 3.15147 22.1091C1.41694 22.1091 0 20.6922 0 18.9576C0 17.2231 1.41694 15.8062 3.15147 15.8062H6.30293V18.9576ZM7.89088 18.9576C7.89088 17.2231 9.30782 15.8062 11.0423 15.8062C12.7769 15.8062 14.1938 17.2231 14.1938 18.9576V26.8485C14.1938 28.5831 12.7769 30 11.0423 30C9.30782 30 7.89088 28.5831 7.89088 26.8485V18.9576Z"></path>
                  <path d="M11.0423 6.30293C9.30782 6.30293 7.89088 4.88599 7.89088 3.15147C7.89088 1.41694 9.30782 0 11.0423 0C12.7769 0 14.1938 1.41694 14.1938 3.15147V6.30293H11.0423ZM11.0423 7.89088C12.7769 7.89088 14.1938 9.30782 14.1938 11.0423C14.1938 12.7769 12.7769 14.1938 11.0423 14.1938H3.15147C1.41694 14.1938 0 12.7769 0 11.0423C0 9.30782 1.41694 7.89088 3.15147 7.89088H11.0423V7.89088Z"></path>
                  <path d="M23.697 11.0423C23.697 9.30782 25.114 7.89088 26.8485 7.89088C28.583 7.89088 30 9.30782 30 11.0423C30 12.7769 28.583 14.1938 26.8485 14.1938H23.697V11.0423ZM22.1091 11.0423C22.1091 12.7769 20.6921 14.1938 18.9576 14.1938C17.2231 14.1938 15.8062 12.7769 15.8062 11.0423V3.15147C15.8062 1.41694 17.2231 0 18.9576 0C20.6921 0 22.1091 1.41694 22.1091 3.15147V11.0423V11.0423Z"></path>
                  <path d="M18.9576 23.6971C20.6921 23.6971 22.1091 25.114 22.1091 26.8485C22.1091 28.5831 20.6921 30 18.9576 30C17.2231 30 15.8062 28.5831 15.8062 26.8485V23.6971H18.9576ZM18.9576 22.1091C17.2231 22.1091 15.8062 20.6922 15.8062 18.9576C15.8062 17.2231 17.2231 15.8062 18.9576 15.8062H26.8485C28.583 15.8062 30 17.2231 30 18.9576C30 20.6922 28.583 22.1091 26.8485 22.1091H18.9576Z"></path>
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'fixed z-40 bottom-0 w-full text-white bg-[#1e293b] h-50 ',
          `${showCookie ? 'block' : 'hidden'}`
        )}
      >
        <div className="max-w-6xl mx-auto px-5 py-5 sm:px-6 flex items-center">
          <div>
            We use cookies in this website to give you the best experience on
            our site. To find out more, read our
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              <span> privacy policy </span>
            </a>
            and
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              <span> cookies policy </span>
            </a>
          </div>
          <div className="ml-3">
            <button
              onClick={() => setShowCookie(false)}
              className="text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[3px] rounded-lg w-full max-w-[300px] font-bold h-9 text-sm"
            >
              <div className="bg-black hover:bg-[#1e293b] flex w-full h-full items-center justify-center  rounded-md px-4">
                <div>Okay</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
