import Image from 'next/image';

const EzlyLogo = ({ className = "w-48 h-16" }: { className?: string }) => {
  return (
    <Image
      src="/ezly-logo.png"
      alt="Ezly Logo"
      width={200}
      height={80}
      className={className}
      style={{ objectFit: 'contain' }}
      priority
    />
  );
};

export default EzlyLogo;
