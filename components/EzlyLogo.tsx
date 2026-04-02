import Image from 'next/image';

const EzlyLogo = ({ className = "w-32 h-12" }: { className?: string }) => {
  return (
    <Image
      src="/ezly-logo.png"
      alt="Ezly Logo"
      width={128}
      height={48}
      className={className}
      style={{ objectFit: 'contain' }}
      priority
    />
  );
};

export default EzlyLogo;
