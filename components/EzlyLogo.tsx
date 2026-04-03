import Image from 'next/image';

const EzlyLogo = ({ className = "w-[480px] h-[160px]" }: { className?: string }) => {
  return (
    <Image
      src="/ezly-logo.png"
      alt="Ezly Logo"
      width={400}
      height={160}
      className={className}
      style={{ objectFit: 'contain' }}
      priority
    />
  );
};

export default EzlyLogo;
