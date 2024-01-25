import { Footer } from '@/layout/footer';
import { ContactForm, StepGuide, GithubInstallation, WorkSpaceInstallation } from './components';
import { useEffect, useState } from 'react';
import { HeaderContent } from '@/layout/app';
import { useTeamInfoStore } from '@/stores';
import { useTranslation } from 'react-i18next';

type StepComponentType = React.FC<{
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}>;

const stepComponents: Record<number, StepComponentType> = {
  0: ContactForm,
  1: GithubInstallation,
  2: WorkSpaceInstallation,
};

const Induction = () => {
  const { t } = useTranslation();
  const teamInfo = useTeamInfoStore.use.teamInfo();
  const [step, setStep] = useState(0);
  const StepComponent = stepComponents[step];
  useEffect(() => {
    if (teamInfo?.code_application && !teamInfo.im_application) {
      setStep(2);
    }
  }, [teamInfo?.code_application, teamInfo?.im_application]);

  return (
    <div className="bg-black-light-light flex-grow flex flex-col">
      <div className="bg-black">
        <HeaderContent title={t(`stepHeaders.${step}.title`)}>
          <p className="text-md text-black-light-light max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-6">
            {t(`stepHeaders.${step}.content1`)}
          </p>
          <p className="text-md text-black-light-light max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-6">
            {t(`stepHeaders.${step}.content2`)}
          </p>
        </HeaderContent>
      </div>
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 flex-grow bg-white">
        <div className="grow flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepGuide step={step} setStep={setStep} />
          <div className="grow p-8">{<StepComponent step={step} setStep={setStep} />}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Induction;
