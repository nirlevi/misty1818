import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[50px] sm:h-[60px] border-b border-neutral-300 py-2 px-2 sm:px-8 items-center justify-between">
      <div className="font-thin tracking-wide text-3xl flex items-center text-white">
        <a
          className="ml-2 hover:opacity-50"
          href="https://code-scaffold.vercel.app"
        >
          <div className="flex">
            <img src="misty_1818.png" alt="misty gini" className=" w-14 justify-center justify-items-center rounded-full" />
            <span className="justify-self-center pt-2 pl-2">Misty 1818</span> 
          </div>
        </a>
      </div>
    </div>
  );
};
