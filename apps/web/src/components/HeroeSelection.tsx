import Image from "next/image";
import * as React from "react";

export function HeroeSelection(props: {
  src: string;
  alt: string;
  onClick: () => Promise<void>;
  account: any;
  heroName: string;
}) {
  return (
    <div className="max-w-sm bg-white  rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <Image src={props.src} alt={props.alt} width={200} height={200} />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {props.alt}
        </h5>
        <button
          onClick={props.onClick}
          className="disabled:bg-blue-400 w-full  disabled:cursor-not-allowed"
          type="submit"
          disabled={
            props.account?.address === undefined || !props.heroName.trim()
          }
        >
          Mint
        </button>
      </div>
    </div>
  );
}
