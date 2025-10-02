import { Geist, Geist_Mono } from "next/font/google";
import { useGlobalQuery } from "@/services/globals/globalsQuery";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { data, isLoading, error } = useGlobalQuery();

  useEffect(() => {
    if (data) {
      console.log("Global data:", data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading global data...</div>;
  }

  if (error) {
    return <div>Error loading global data</div>;
  }

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
    </div>
  );
}
