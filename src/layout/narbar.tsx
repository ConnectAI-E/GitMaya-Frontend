import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { Tooltip, Image, Button } from '@nextui-org/react';

import { link as linkStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config';
import clsx from 'clsx';
import { GithubIcon, Logo, LarkWhiteIcon, SolarIcon } from '@/components/icons';
// import { ThemeSwitch } from '@/components/theme-switch';
import { I18nSwitch } from '@/components/i18n-switch';

import { useTranslation } from 'react-i18next';
import { useAccountStore } from '@/stores';
import { Avatar } from '@/components/avatar';
import LarkQR from '@/assets/lark-group-QR.jpg';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const account = useAccountStore.use.account();
  const getAccount = useAccountStore.use.updateAccount();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const login = async () => {
    await getAccount();
    navigate('/app/people');
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <div className="text-xl font-black mx-4 text-gradient text-maya">GitMaya</div>
          </Link>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium',
                )}
                color="foreground"
                href={item.href}
              >
                {t(item.label)}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <Tooltip
            delay={300}
            content={<Image src={LarkQR} width={300} />}
            placement="bottom"
            className="p-0 bg-transparent"
          >
            <span className="cursor-pointer">
              <LarkWhiteIcon className="text-default-500" />
            </span>
          </Tooltip>
          <Link isExternal href={siteConfig.links.document} target="_blank">
            <SolarIcon className="text-default-500" />
          </Link>
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
            <Button
              onPress={login}
              className="text-white bg-maya p-[3px] rounded-lg w-full max-w-[300px] font-bold h-9 text-sm"
            >
              <div className="bg-black hover:bg-[#1e293b] flex w-full h-full items-center justify-center rounded-md px-4">
                {t('Sign in')}
              </div>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
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
  );
};
