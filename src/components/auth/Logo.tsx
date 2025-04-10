interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 12 }: LogoProps) {
  const textSize = `[${size * 2}px]`;
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className={`h-${size} w-${size} rounded-full bg-primary flex items-center justify-center`}
      >
        <span className={`text-black text-${textSize} font-bold`}>B.</span>
      </div>
    </div>
  );
}
