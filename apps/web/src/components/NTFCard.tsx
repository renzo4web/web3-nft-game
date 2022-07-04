import Image from "next/image";
import { TokenURI } from "../../type";
import { percentage } from "../helper";

interface Props extends TokenURI {
  isBoss?: boolean;
  maxHp?: string;
  hp?: string;
  attackDamage?: string;
}

export default function NFTCard({
  image,
  name,
  attributes,
  isBoss = false,
  hp,
  attackDamage,
  maxHp,
  ...rest
}: Props) {
  const currentHealth = isBoss
    ? percentage(Number(hp), Number(maxHp))
    : percentage(
        attributes.find(({ trait_type }) => trait_type === "Health Points")
          ?.value,
        attributes.find(({ trait_type }) => trait_type === "Health Points")
          ?.max_value
      );
  const damage = isBoss
    ? attackDamage
    : attributes.find(({ trait_type }) => trait_type === "Attack Damage").value;

  return (
    <section className="w-50 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">
          {isBoss ? "Boss" : `Hero ${rest["NFT#"]}`}
        </span>
        <span className="text-emerald-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </span>
      </div>
      <div className="mt-6 w-fit mx-auto">
        {!!image && (
          <Image
            src={image}
            className="rounded-full"
            alt="Game Boss"
            width="200"
            height="100"
          />
        )}
      </div>

      <div className="mt-8 ">
        <h2 className="text-white font-bold text-2xl tracking-wide">{name}</h2>
      </div>
      <p className="text-emerald-400 font-semibold mt-2.5">
        Attack Damage: {damage}
      </p>

      <div className="h-1 w-full bg-black mt-8 rounded-full">
        <div
          style={{ width: `${currentHealth}%` }}
          className="h-1 rounded-full  bg-yellow-500 "
        ></div>
      </div>
      <div className="mt-3 text-white text-sm">
        <span className="text-gray-400 font-semibold">Health: </span>
        <span>{currentHealth} / 100</span>
      </div>
    </section>
  );
}
