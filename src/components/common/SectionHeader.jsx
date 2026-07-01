export default function SectionHeader({ title, highlight, subtitle }) {
  return (
    <div className="text-center mb-16">
      {subtitle && (
        <p className="text-[#3fb950] text-sm font-mono mb-2 tracking-widest">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl font-bold text-white">
        {title} <span className="text-[#3fb950]">{highlight}</span>
      </h2>
    </div>
  );
}