export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
}) {
  const base = 'inline-block font-medium rounded-lg transition-all duration-200 px-6 py-2.5 text-sm';
  const variants = {
    primary: 'bg-[#238636] hover:bg-[#2ea043] text-white border border-[#2ea043] hover:shadow-lg hover:shadow-[#2ea04330]',
    secondary: 'bg-transparent text-[#3fb950] border border-[#3fb95066] hover:border-[#3fb950] hover:bg-[#3fb95011]',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }

  return (
    <button onClick={onClick} className={classes}>{children}</button>
  );
}