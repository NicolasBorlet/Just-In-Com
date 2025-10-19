export default function PageContent({ children }: { children: React.ReactNode } ) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-12 md:px-24 lg:px-24 xl:px-[120px]">
      {children}
    </div>
  );
}
