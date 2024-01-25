import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';

import { link as linkStyles } from '@nextui-org/theme';
import { Tooltip, Image } from '@nextui-org/react';

import clsx from 'clsx';
import { GithubIcon, Logo, LarkWhiteIcon } from '@/components/icons';
// import { ThemeSwitch } from '@/components/theme-switch';
import { I18nSwitch } from '@/components/i18n-switch';

import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAccountStore, useTeamInfoStore } from '@/stores';
import { Avatar } from '@/components/avatar';

import { appSiteConfig } from '@/config/app';

import useSwr from 'swr';

import { getTeams, switchTeam } from '@/api';

import {
  Select,
  SelectItem,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { useEffect, useMemo } from 'react';
import useSWRMutation from 'swr/mutation';
import LarkQR from '@/assets/lark-group-QR.jpg';
import { isNull } from 'lodash-es';

export const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const navigate = useNavigate();
  const account = useAccountStore.use.account();
  const updateAccount = useAccountStore.use.updateAccount();
  const getTeamInfo = useTeamInfoStore.use.updateTeamInfo();
  const teamInfo = useTeamInfoStore.use.teamInfo();

  const team_id = account?.current_team as string;

  useEffect(() => {
    if (team_id) {
      getTeamInfo(team_id);
    }
  }, [team_id, getTeamInfo]);

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

  const { data } = useSwr('/api/team', getTeams);

  const teams =
    useMemo(
      () =>
        data?.data
          .map((item) => ({
            label: item.name,
            value: item.id,
          }))
          .concat({
            label: 'Create a team',
            value: 'create',
          }),
      [data?.data],
    ) || [];

  const selectTeam = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const team_id = e.target.value;
    if (team_id === 'create') {
      navigate('/app/induction');
    } else {
      await trigger({
        current_team: team_id,
      });
      updateAccount();
      navigate('/app/people', { replace: true });
    }
  };

  const shouldShowOnboarding = useMemo(() => {
    const onInductionPage = location.pathname === '/app/induction';
    return !onInductionPage && (isNull(teamInfo?.im_application) || isNull(account?.current_team));
  }, [account?.current_team, location.pathname, teamInfo?.im_application]);

  useEffect(() => {
    if (shouldShowOnboarding) {
      setTimeout(onOpen, 1000);
    }
  }, [onOpen, shouldShowOnboarding]);

  const onboarding = () => {
    onClose();
    navigate('/app/induction');
  };

  return (
    <>
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <Link className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <div className="text-xl font-black mx-4 text-gradient text-maya">GitMaya</div>
            </Link>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {appSiteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: 'foreground' }),
                    'data-[active=true]:text-primary data-[active=true]:font-medium',
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>
        {shouldShowOnboarding && (
          <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
            <Button onPress={onboarding} variant="bordered">
              {t("Complete your team's onboarding...")}
            </Button>
          </NavbarContent>
        )}
        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="hidden sm:flex">
            <Select
              label="Select a team"
              className="max-w-xs min-w-48"
              size="sm"
              onChange={selectTeam}
              selectedKeys={[team_id]}
              items={teams}
              disallowEmptySelection
            >
              {(team) => (
                <SelectItem key={team.value} value={team.value}>
                  {team.label}
                </SelectItem>
              )}
            </Select>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex gap-2">
            <Link isExternal href={appSiteConfig.links.github} aria-label="Github">
              <GithubIcon className="text-default-500" />
            </Link>
            <Tooltip
              content={<Image src={LarkQR} width={300} />}
              placement="bottom"
              className="p-0 bg-transparent"
            >
              <span className="cursor-pointer">
                <LarkWhiteIcon className="text-default-500" />
              </span>
            </Tooltip>
            {/* <ThemeSwitch /> */}
            <I18nSwitch />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            {account ? (
              <Avatar
                name={account.user?.name}
                email={account.user?.email}
                avatarUrl={account.user?.avatar}
              />
            ) : (
              <RouterLink to={'/login'}>
                <button className="text-white bg-maya p-[3px] rounded-lg w-full max-w-[300px] font-bold h-9 text-sm">
                  <div className="bg-black hover:bg-[#1e293b] flex w-full h-full items-center justify-center  rounded-md px-4">
                    {t('Sign in')}
                  </div>
                </button>
              </RouterLink>
            )}
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal href={appSiteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          {/* <ThemeSwitch /> */}
          <NavbarMenuToggle />
        </NavbarContent>
        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {appSiteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? 'primary'
                      : index === appSiteConfig.navMenuItems.length - 1
                        ? 'danger'
                        : 'foreground'
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("Complete your team's onboarding")}
              </ModalHeader>
              <ModalBody>
                <div className="mx-auto w-full flex items-center justify-center rounded-full">
                  <GithubIcon size={50} />
                  <div className="h-1 w-1 rounded-full bg-black animate-pulse mx-3 ml-5"></div>
                  <div className="h-1 w-1 rounded-full bg-black animate-pulse mx-3 mr-5"></div>
                  <Logo size={60} />
                  <div className="h-1 w-1 rounded-full bg-black animate-pulse mx-3 ml-5"></div>
                  <div className="h-1 w-1 rounded-full bg-black animate-pulse mx-3 mr-5"></div>
                  <LarkWhiteIcon size={50} />
                </div>
                {!account?.current_team ? (
                  <p className="text-sm text-gray-500 text-center">
                    {t(
                      'In order for Gitmaya to work properly,we need to add it to your code repository.Learn about our data privacy policy, permissions and security measures here.',
                    )}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 text-center">
                    {t('In order for Gitmaya to work properly, we need to add')}
                    <span className="text-maya"> Lark </span>{' '}
                    {t(
                      'to your team. Learn about our data privacy policy, permissions and security measures here.',
                    )}
                  </p>
                )}

                <Button color="danger" onPress={onboarding}>
                  {t('Continue onboarding')}
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t('Keep exploring (remind me next time)')}
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
