const EzlyLogo = ({ className = "w-[480px] h-[160px]" }: { className?: string }) => {
  return (
    <img
      src="/ezly-logo.png"
      alt="Ezly Logo"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default EzlyLogo;
