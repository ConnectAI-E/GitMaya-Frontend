import { useLocalStorageState } from 'ahooks';
import clsx from 'clsx';
import { Logo, LarkWhiteIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import LarkQR from '@/assets/lark-group-QR.jpg';
import { Tooltip, Image } from '@nextui-org/react';

export const Footer = ({ className }: { className?: string }) => {
  const [showCookie, setShowCookie] = useLocalStorageState(`showCookie`, {
    serializer: JSON.stringify,
    deserializer: JSON.parse,
    defaultValue: true,
  });
  return (
    <footer className={className}>
      <div className="static bottom-0 w-full">
        <div className="h-[1px] w-full bg-maya"></div>
        <div className="flex items-center max-w-6xl mx-auto px-4 sm:px-6 my-8">
          <div className="flex items-center">
            <Link to="/">
              <Logo height={35} width={35} />
            </Link>
          </div>
          <div className="text-xl font-black mx-4 text-gradient text-maya">GitMaya</div>
          <div className="text-black-light text-sm">© All rights reserved.</div>
          <div className="ml-auto flex gap-5">
            <Tooltip
              content={<Image src={LarkQR} width={300} />}
              placement="top"
              className="p-0 bg-transparent"
            >
              <div className="cursor-pointer flex-center gap-4">
                <LarkWhiteIcon />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'fixed z-40 bottom-0 w-full text-white bg-[#1e293b] h-50 ',
          `${showCookie ? 'block' : 'hidden'}`,
        )}
      >
        <div className="max-w-7xl mx-auto px-5 py-5 sm:px-6 flex items-center">
          <div>
            We use cookies in this website to give you the best experience on our site. To find out
            more, read our
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-blue-400">
              <span> privacy policy </span>
            </a>
            and
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-blue-400">
              <span> cookies policy </span>
            </a>
          </div>
          <div className="ml-3">
            <button
              onClick={() => setShowCookie(false)}
              className="text-white bg-maya p-[3px] rounded-lg w-full max-w-[300px] font-bold h-9 text-sm"
            >
              <div className="bg-black hover:bg-[#1e293b] flex w-full h-full items-center justify-center  rounded-md px-4">
                <div>Okay</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
