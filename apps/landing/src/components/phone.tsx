import Image from "next/image";
import Link from "next/link";

export function Phone() {
  return (
    <div className="min-w-[270px] max-w-[320px] ">
      <Link href="./Demo.png" target="_blank">
        <Image src="/Demo.png" alt="Demo screenshot" width={473} height={932} />
      </Link>
    </div>
  );
}
