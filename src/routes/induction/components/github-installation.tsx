// import { Link } from 'react-router-dom';
import { GithubIcon } from '@/components/icons';
import { useOauthDialog } from '@/hooks';
import useSWRMutation from 'swr/mutation';
import { switchTeam } from '@/api';
import { useAccountStore } from '@/stores';

export const GithubInstallation = ({
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const updateAccount = useAccountStore.use.updateAccount();

  const { trigger } = useSWRMutation(
    `api/account`,
    (
      _url,
      {
        arg,
      }: {
        arg: {
          current_team: string;
        };
      },
    ) => switchTeam(arg),
  );
  const handleSignInGithub = useOauthDialog({
    url: '/api/github/install',
    event: 'installation',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: async (data: any) => {
      await trigger({
        current_team: data?.team_id,
      });
      updateAccount();
      setStep((step) => step + 1);
    },
  });
  return (
    <main className="max-w-4xl">
      <div className="grid grid-cols-1 items-center justify-center mt-8">
        {/* <Link className="flex items-center text-center text-sm underline text-primary" to="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Using GitLab ?
        </Link> */}
        <div onClick={handleSignInGithub} className="flex flex-col items-center">
          <div className="inline-block justify-center w-full max-w-[300px] mb-8">
            <div className="relative group">
              <button className="transition duration-500 relative leading-none flex items-center justify-center text-white font-medium rounded-md py-2.5 text-center px-4 w-full max-w-[300px] bg-maya  h-14 text-base">
                <div className="flex gap-2 md:gap-4 margin-auto">
                  <GithubIcon size={30} />
                  <span className="m-auto">Add to GitHub</span>
                </div>
              </button>
            </div>
          </div>
          <div
            className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>Only supports organization repositories</div>
          </div>
        </div>
      </div>
    </main>
  );
};
