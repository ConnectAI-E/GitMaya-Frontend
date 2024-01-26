import { CheckIcon, MoreIcon } from '@/components/icons';
import { useTranslation } from 'react-i18next';

export const LarkTutior = ({ step }: { step: number }) => {
  const { t } = useTranslation();

  const steps = [
    {
      content: t('Click Create App, select Custom App'),
      number: 1,
      step: 1,
    },
    {
      content: t('Add App Capability - Robot'),
      number: 2,
      step: 1,
    },
    {
      content: t('Open Permission Management - Check All Permissions in Messages and Group Chats'),
      number: 3,
      step: 1,
    },
    {
      content: t('Open Permission Management - Access Address Book as an App'),
      number: 4,
      step: 1,
    },
    {
      content: t('Open Permission Management - View Knowledge Base'),
      number: 5,
      step: 1,
    },
    {
      content: t('Open Permission Management - View Latest Documents'),
      number: 6,
      step: 1,
    },
    {
      content: t('Go to Basic Information - Copy App Credential'),
      number: 7,
      step: 2,
    },
    {
      content: t('Go to Event Subscription - Copy Encryption Key'),
      number: 8,
      step: 3,
    },
    {
      content: t('Event Subscription - Configure Request Address'),
      number: 9,
      step: 3,
    },
    {
      content: t('Robot - Configure Message Card Request Address'),
      number: 10,
      step: 3,
    },
    {
      content: t('Add Event Subscription - Messages and Group Chats - Message Read'),
      number: 11,
      step: 3,
    },
    {
      content: t('Add Event Subscription - Messages and Group Chats - Receive Messages'),
      number: 12,
      step: 3,
    },
  ];

  return (
    <ol className="relative text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {steps.map((item) => (
        <li className="mb-4 ms-6">
          <div className="flex items-center gap-2">
            {step + 1 >= item.step ? (
              <CheckIcon className="text-maya" />
            ) : (
              <MoreIcon className="text-maya" />
            )}
            <h3 className="leading-tight text-xs">{item.content}</h3>
          </div>
        </li>
      ))}
    </ol>
  );
};
