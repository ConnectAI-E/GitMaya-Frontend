import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import clsx from 'clsx';
import { StepIcon } from './step-guide';
import { LarkIcon } from '@/components/icons';
import { useForm, Controller } from 'react-hook-form';

export interface LarkInstallationRef {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const StepOne = () => {
  return (
    <div>
      <h1 className="text-lg font-bold mb-4">创建机器人</h1>
      <div className="flex flex-col gap-4">
        <Button className="p-4 text-left rainbow text-white connectai-auto-deploy-lark">
          一键重新部署至（Connect-AI）
        </Button>
        <Button className="p-4 text-left">自行前往开发者平台，创建应用</Button>
      </div>
    </div>
  );
};

const StepTwo = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      app_id: '',
      app_secret: '',
      encrypt_key: '',
      verification_token: '',
    },
  });
  return (
    <form className="flex flex-col gap-4">
      <div className="flex items-center gap-6 max-w-lg">
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input isRequired label="NAME" placeholder="Enter your robot name " {...field} />
          )}
        />
        <Controller
          name="app_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input isRequired label="APP_ID" placeholder="Enter your app id " {...field} />
          )}
        />
      </div>
      <div className="flex items-center gap-6 max-w-lg">
        <Controller
          name="app_secret"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input isRequired label="APP_SECRET" placeholder="Enter your app secret " {...field} />
          )}
        />
        <Controller
          name="encrypt_key"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              isRequired
              label="ENCRYPT_KEY"
              placeholder="Enter your encrypt key "
              {...field}
            />
          )}
        />
      </div>
      <div className="flex items-center gap-6 max-w-lg">
        <Controller
          name="verification_token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              isRequired
              label="VERIFICATION_TOKEN"
              placeholder="Enter your verification token "
              {...field}
            />
          )}
        />
      </div>
    </form>
  );
};

const stepComponents: Record<number, React.FC> = {
  0: StepOne,
  1: StepTwo,
};

export const LarkInstallation = forwardRef<LarkInstallationRef>((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: '创建机器人',
    },
    {
      title: '填写配置信息',
    },
    {
      title: '获取回调地址',
    },
  ];

  const StepComponent = stepComponents[step];

  useImperativeHandle(ref, () => ({
    isOpen,
    onOpen,
    onClose,
  }));

  return (
    <Modal size={'4xl'} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-1">
              <LarkIcon /> <span>Lark Setting</span>
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full">
                <div className="w-1/3">guide</div>
                <div className="flex-1">
                  <div>
                    <nav className="w-full">
                      <ol role="list" className="overflow-hidden flex w-full gap-2">
                        {steps.map((stepProps, index) => (
                          <li key={index} className={clsx('pb-10 flex-center flex-1')}>
                            <StepIcon className="flex-shrink-0" index={index} step={step} />
                            <span
                              className={clsx(
                                'text-sm font-medium flex-grow mx-2 whitespace-nowrap',
                                {
                                  'rainbow-text': index === step,
                                  'text-gray-500': step <= index,
                                  'text-black': step > index,
                                },
                              )}
                            >
                              {stepProps.title}
                            </span>
                            {index !== steps.length - 1 && (
                              <span className="h-1 w-full rainbow"></span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </nav>
                    <StepComponent />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                取消
              </Button>
              {step > 0 && (
                <Button variant="light" onPress={() => setStep((step) => step - 1)}>
                  上一步
                </Button>
              )}
              {step < 2 && (
                <Button
                  color="primary"
                  onPress={() => setStep((step) => step + 1)}
                  className="rainbow"
                >
                  下一步
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
