import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <div className="my-[25vh] flex flex-col items-center">
      <p className="text-7xl font-bold">404</p>
      <h2 className="mt-2 text-xl">Not Found</h2>
    </div>
  );
}
