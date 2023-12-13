"use client";
import { useRouter } from "next/navigation";

export default function ForceGraph({ width = 250, height = 250 }) {
  const router = useRouter();

  const handleRoute = (route) => {
    router.push(route);
  };

  return (
    <svg
      className={`w-[${width}px] h-[${height}px] bg-white drop-shadow-lg rounded-md`}
      viewBox={`${-width / 2}, ${-height / 2}, ${width}, ${height}`}
    ></svg>
  );
}