import Image from 'next/image';

const EzlyLogo = ({ className = "w-full h-full" }: { className?: string }) => {
  return (
    <Image
      src="/ezly-logo.png"
      alt="Ezly Logo"
      width={480}
      height={160}
      className={className}
      style={{ objectFit: 'contain' }}
      priority
    />
  );
};

export default EzlyLogo;
