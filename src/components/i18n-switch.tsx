import { Tooltip, Button } from '@nextui-org/react';
import { I18nIcon } from '@/components/icons';
import i18n from '@/i18n';

export const I18nSwitch = () => {
  const onAction = (key: string | number) => {
    i18n.changeLanguage(key as string);
  };
  return (
    <div className="flex items-center gap-4">
      <Tooltip
        delay={100}
        content={
          <div className="bg-default-300 flex flex-col rounded-xl">
            <Button
              color="default"
              className="hover:bg-default-400"
              onClick={() => onAction('en-US')}
            >
              English
            </Button>
            <Button
              color="default"
              className="hover:bg-default-400"
              onClick={() => onAction('zh-CN')}
            >
              简体中文
            </Button>
            <Button
              color="default"
              className="hover:bg-default-400"
              onClick={() => onAction('vi-VN')}
            >
              Tiếng
            </Button>
          </div>
        }
        placement="bottom"
        className="p-0 bg-transparent"
      >
        <span className="cursor-pointer">
          <I18nIcon className="text-default-500" />
        </span>
      </Tooltip>
    </div>
  );
};
