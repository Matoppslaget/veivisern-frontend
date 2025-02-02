interface TitleProps {
  style: string;
  isLogo?: boolean;
}

export default function Title({ style, isLogo = false }: TitleProps) {
  return (
    <div className={style}>
      {isLogo ? (
        <>
          <span className="hidden md:inline">🦉 MATOPPSLAGET</span>
          <span className="md:hidden">🦉</span>
        </>
      ) : (
        <h1 className="text-center font-bold text-gray-900 tracking-tight text-4xl pb-4 sm:text-5xl sm:pb-12 md:text-6xl">
          🦉 MATOPPSLAGET
        </h1>
      )}
    </div>
  );
}
