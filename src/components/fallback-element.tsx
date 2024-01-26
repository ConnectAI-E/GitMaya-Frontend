import { Logo } from '@/components/icons';
import { useTranslation } from 'react-i18next';

export const FallbackElement = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center h-screen" role="status">
      <Logo size={48} />
      <span className="sr-only">{t('Loading...')}</span>
    </div>
  );
};
