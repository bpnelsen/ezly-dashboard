const EzlyLogo = ({ className }: { className?: string }) => {
  return (
    <img
      src="/ezly-logo.png"
      alt="Ezly Logo"
      className={`w-full h-auto ${className || ''}`}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default EzlyLogo;
