import { Footer } from '@/layout/footer';
import { ContactForm, StepGuide, GithubInstallation, WorkSpaceInstallation } from './components';
import { useState } from 'react';
const Induction = () => {
  const [step, setStep] = useState(0);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <ContactForm step={step} setStep={setStep} />;
      case 1:
        return <GithubInstallation step={step} setStep={setStep} />;
      case 2:
        return <WorkSpaceInstallation step={step} setStep={setStep} />;
      default:
        return <ContactForm step={step} setStep={setStep} />;
    }
  };

  const HeaderContent = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <header className="pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
      </div>
      <div>{children}</div>
    </header>
  );

  const renderStepHero = () => {
    switch (step) {
      case 0:
        return (
          <HeaderContent title="Let's meet each other! 👋">
            <p className="text-md text-black-light-light max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-6">
              We would like to be able to reach out to you via email to better understand the needs
              of your team and to provide taylored assistance if needed.
            </p>
            <p className="text-md text-black-light-light max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-6">
              If you require help or want to provide feedback to GitMaya, you can also contact us
              at: hello@gitmaya.com.
            </p>
          </HeaderContent>
        );
      case 1:
        return (
          <HeaderContent title="Connect to your code repository">
            <p className="text-md text-black-light-light max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              Choose the code repository that your team uses. Follow the installation process so
              that Pullpo can connect and keep track of your development metrics.
            </p>
            <p className="text-md text-black-light-light max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              To get you started, Pullpo will process data from the last three months. This can take
              a few minutes depending on the size of your organization.
            </p>
          </HeaderContent>
        );
      case 2:
        return null;
      default:
        return (
          <HeaderContent title="Let's meet each other! 👋">
            <p className="text-md text-black-light-light max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-6">
              We would like to be able to reach out to you via email to better understand the needs
              of your team and to provide taylored assistance if needed.
            </p>
            <p className="text-md text-black-light-light max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-6">
              If you require help or want to provide feedback to GitMaya, you can also contact us
              at: hello@gitmaya.com.
            </p>
          </HeaderContent>
        );
    }
  };

  return (
    <div className="bg-black-light-light flex-grow flex flex-col">
      <div className="bg-black">{renderStepHero()}</div>
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 flex-grow bg-white">
        <div className="grow flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepGuide step={step} setStep={setStep} />
          <div className="grow p-8 max-w-3xl">{renderStepContent()}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Induction;
