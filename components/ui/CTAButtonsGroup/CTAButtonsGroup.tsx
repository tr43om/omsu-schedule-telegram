import Link from "next/link";
import { MdOutlineWavingHand, MdOutlineInstallMobile } from "react-icons/md";

const CTAButtonsGroup = () => {
  return (
    <div className="relative z-[10000] mb-2 flex gap-2">
      <Link href="/install" className="btn-sm btn animate-pulse gap-2">
        <MdOutlineInstallMobile className="h-5 w-5 " />
        установить
      </Link>
      <Link
        href="/contacts"
        className="btn-sm btn animate-pulse  items-center gap-2"
      >
        <MdOutlineWavingHand className="h-5 w-5 " />
        Связаться
      </Link>
    </div>
  );
};

export default CTAButtonsGroup;
