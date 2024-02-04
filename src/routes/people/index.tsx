import { Hero } from '@/layout/app';
import { Footer } from '@/layout/footer';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Select,
  SelectItem,
  Spinner,
} from '@nextui-org/react';
import { useCallback, useState, useEffect, useMemo } from 'react';
import {
  getPlatformMember,
  getTeamMember,
  bindTeamMember,
  updatePlatformUser,
  getTaskStatus,
} from '@/api';
import useSwr from 'swr';
import useSWRMutation from 'swr/mutation';
import { useAccountStore } from '@/stores';
import { RefreshIcon } from '@/components/icons';
import { motion, useAnimation } from 'framer-motion';
import clsx from 'clsx';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const People = () => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const [taskId, setTaskId] = useState<string>('');
  const [refreshInterval, setRefreshInterval] = useState(0);
  const account = useAccountStore.use.account();

  const team_id = account?.current_team as string;

  const columns = [
    {
      name: t('GitHub handle'),
      uid: 'github',
    },
    {
      name: t('Lark handle'),
      uid: 'lark',
    },
    { name: t('Role'), uid: 'role' },
  ];

  const { trigger } = useSWRMutation(
    `api/team/${team_id}/member`,
    (
      _url,
      {
        arg,
      }: {
        arg: {
          code_user_id: string;
          im_user_id: string;
        };
      },
    ) => bindTeamMember(team_id, arg),
  );

  const { trigger: triggerLarkUser } = useSWRMutation(`api/team/${team_id}/lark/user`, () =>
    updatePlatformUser(team_id, 'lark'),
  );

  const { data, mutate } = useSwr(team_id ? `/api/team/${team_id}/member` : null, () =>
    getTeamMember(team_id),
  );

  const { data: taskStatusData } = useSwr(
    team_id && taskId ? `/api/team/${team_id}/task/${taskId}` : null,
    () => getTaskStatus(team_id, taskId),
    {
      refreshInterval,
    },
  );

  const taskStatus = taskStatusData?.data?.status;

  const {
    data: larkUserData,
    isLoading,
    mutate: mutateLark,
  } = useSwr(team_id ? `/api/team/${team_id}/lark/user` : null, () =>
    getPlatformMember<Lark.User[]>(team_id, 'lark'),
  );

  const larkUsers = useMemo(() => larkUserData?.data, [larkUserData]);
  const teamMember = useMemo(() => data?.data || [], [data]);

  const bindMember = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>, user: Github.TeamMember) => {
      const { value } = e.target;
      try {
        await trigger({
          code_user_id: user.code_user.id,
          im_user_id: value,
        });
        mutate();
      } catch (error) {
        console.error(error);
      }
    },
    [mutate, trigger],
  );

  const renderCell = useCallback(
    (user: Github.TeamMember, columnKey: string) => {
      switch (columnKey) {
        case 'github':
          return (
            <User
              name={user.code_user.name}
              avatarProps={{ radius: 'lg', src: user.code_user.avatar }}
              description={user.code_user.email}
            >
              {user.code_user.email}
            </User>
          );
        case 'lark':
          return (
            <Select
              label="Select a user"
              className="max-w-xs"
              size="sm"
              onChange={(e) => bindMember(e, user)}
              items={larkUsers}
              defaultSelectedKeys={[user.im_user?.id]}
              disallowEmptySelection
            >
              {(user) => <SelectItem key={user.value}>{user.label}</SelectItem>}
            </Select>
          );

        default:
          return null;
      }
    },
    [bindMember, larkUsers],
  );

  const refreshUser = useCallback(async () => {
    mutate();
    mutateLark();
    toast.success('Refreshed!');
  }, [mutate, mutateLark]);

  const refreshUserTask = useCallback(async () => {
    const { data } = await triggerLarkUser();
    setTaskId(data?.task_id);
  }, [triggerLarkUser]);

  useEffect(() => {
    if (taskStatus === 'PENDING') {
      controls.start({
        rotate: 360,
        transition: { duration: 2, repeat: Infinity },
      });
      setRefreshInterval(1000);
    } else if (taskStatus === 'SUCCESS') {
      controls.stop();
      refreshUser();
      setRefreshInterval(0);
    }
  }, [taskStatus, controls, refreshUser]);

  return (
    <div className="flex-grow flex flex-col">
      <div className="bg-black-light-light flex-grow flex flex-col">
        <Hero>
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-3xl font-bold text-white mr-5">{t('My organization')}</h1>
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
            <span className="sr-only">{t('Info')}</span>
            <div>
              <span className="font-medium">{t('Configuration needed!')}</span>{' '}
              {t(
                'Please, associate the GitHub username to the respective Lark handle of each of your team members.',
              )}
            </div>
          </div>
        </Hero>
        <main className="bg-light container -mt-32 max-w-7xl mx-auto flex-grow relative">
          {isLoading ? (
            <Spinner label="Loading..." color="warning" className="absolute inset-0" />
          ) : (
            <Table>
              <TableHeader>
                {columns.map((column) => (
                  <TableColumn key={column.uid} align="start">
                    <div className="flex items-center gap-2">
                      {column.name}
                      {column.uid === 'github' && (
                        <RefreshIcon size={18} className="cursor-pointer" onClick={refreshUser} />
                      )}
                      {column.uid === 'lark' && (
                        <motion.div animate={controls}>
                          <RefreshIcon
                            size={18}
                            className={clsx('cursor-pointer', {
                              'cursor-not-allowed pointer-events-none': taskStatus === 'PENDING',
                            })}
                            onClick={refreshUserTask}
                          />
                        </motion.div>
                      )}
                    </div>
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {teamMember.map((item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default People;
