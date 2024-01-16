import { Input, Checkbox, Select, SelectItem, Button } from '@nextui-org/react';
import { useAccountStore } from '@/stores';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { updateTeamContact } from '@/api';
import { toast } from 'sonner';

interface IFormInput {
  first_name: string;
  last_name?: string;
  email: string;
  role: string;
  newsletter?: boolean;
}

export const ContactForm = ({
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const account = useAccountStore.use.account();
  const { trigger, isMutating } = useSWRMutation(
    '/api/team/contact',
    (_url, { arg }: { arg: IFormInput }) => updateTeamContact(arg),
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      first_name: account?.user.name || '',
      last_name: '',
      email: account?.user.email || '',
      role: 'Developer',
      newsletter: false,
    },
  });

  const save: SubmitHandler<IFormInput> = async (data) => {
    await trigger(data);
    toast.success('Saved !');
    setStep((step) => step + 1);
  };

  return (
    <div>
      <form className="flex flex-col gap-4">
        <div className="flex items-center gap-6 max-w-lg">
          <Controller
            name="first_name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                label="First name"
                placeholder="Enter your first name "
                {...field}
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <Input label="Last name" placeholder="Enter your last name " {...field} />
            )}
          />
        </div>
        <div className="max-w-lg">
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                isRequired
                label="Email address"
                placeholder="Enter your email"
                type="email"
                {...field}
              />
            )}
          />
        </div>
        <div className="max-w-lg">
          <Controller
            name="role"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                defaultSelectedKeys={['Developer']}
                isRequired
                label="Role"
                placeholder="Select an role"
                selectedKeys={[field.value]}
              >
                {Roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
        <div className="max-w-lg mb-2">
          <Controller
            name="newsletter"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                className="items-start"
                onChange={onChange}
                isSelected={value}
                color="default"
              >
                <span className="text-black">I'd like to subscribe to the monthly newsletter</span>
                <p className="text-gray-500">
                  Subscribe to our monthly newsletter to be the first one to hear about product
                  updates. No spam, we promise.
                </p>
              </Checkbox>
            )}
          />
        </div>
      </form>
      <div className="max-w-lg flex">
        <div className="ml-auto">
          <div className="inline-block justify-center w-full max-w-[300px]">
            <div className="relative group">
              <Button
                isLoading={isMutating}
                onClick={handleSubmit(save)}
                className="transition duration-500 relative leading-none flex items-center justify-center text-white rounded-md py-2.5 text-center px-4 w-full max-w-[300px] bg-maya font-bold h-9 text-sm"
              >
                <div className="flex gap-2 md:gap-4 margin-auto">
                  <span className="m-auto">Save</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="ml-2">
          <button className="text-white bg-maya p-[3px] rounded-lg w-full max-w-[300px] font-bold h-9 text-sm">
            <div className="bg-white text-black hover:bg-gray-200 flex w-full h-full items-center justify-center  rounded-md px-4">
              <div>Cancel</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export const Roles = [
  {
    label: 'Developer',
    value: 'Developer',
  },
  {
    label: 'Team Leader',
    value: 'Team Leader',
  },
  {
    label: 'Engineering Director',
    value: 'Engineering Director',
  },
  {
    label: 'VP/CTO',
    value: 'VP/CTO',
  },
  {
    label: 'Product Manager',
    value: 'Product Manager',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];
