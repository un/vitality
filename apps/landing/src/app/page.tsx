import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl font-[family-name:var(--font-geist-mono)] text-slate-12  gap-16">
      <nav className="flex flex-row items-center justify-between w-full ">
        <h1 className="text-2xl font-bold">
          <Link href="/">Vita</Link>
        </h1>
      </nav>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start pt-8">
        <h2 className="text-2xl font-semibold flex flex-row gap-2 border-l-2 border-orange-9 pl-4">
          <span>The system that makes you live</span>
          <span className="text-orange-9 font-bold">Longer</span>
          <span className="font-bold">+</span>
          <span className="text-orange-9 font-bold">Better</span>
        </h2>
        <div className="flex flex-col gap-4">
          <p>
            We&apos;re building the world&apos;s most advanced system for your
            personal longevity and vitality.
          </p>
          <p>
            All your{" "}
            <span className="text-slate-12 font-bold">daily activities</span>{" "}
            are automatically{" "}
            <span className="text-slate-12 font-bold">
              tracked and analyzed
            </span>
            . With the latest in{" "}
            <span className="text-slate-12 font-bold">AI and science</span>, you
            discover{" "}
            <span className="text-slate-12 font-bold">trends and cycles</span>{" "}
            with predictive suggestions to{" "}
            <span className="text-slate-12 font-bold">
              maximize your progress
            </span>
            .
          </p>
          <p>
            And we&apos;re{" "}
            <span className="text-slate-12 font-bold">fully open source</span>,
            so any code that touches your data can be viewed publicly and
            verified independently.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p>
            <span className="text-slate-11 font-semibold">Trackables:</span>{" "}
          </p>
          <p className="flex flex-row gap-2 items-start">
            <span className="text-3xl font-thin">*</span>{" "}
            <span className="text-blue-9 font-semibold">Heart Rate</span>
          </p>
          <p className="flex flex-row gap-2 items-start">
            <span className="text-3xl font-thin">*</span>{" "}
            <span className="text-blue-9 font-semibold">Sleep Quality</span>
          </p>
          <p className="flex flex-row gap-2 items-start">
            <span className="text-3xl font-thin">*</span>{" "}
            <span className="text-blue-9 font-semibold">Workouts</span>
          </p>
          <p className="flex flex-row gap-2 items-start">
            <span className="text-3xl font-thin">*</span>{" "}
            <span className="text-blue-9 font-semibold">App usage</span>
          </p>
          <p className="flex flex-row gap-2 items-start">
            <span className="text-3xl font-thin">*</span>{" "}
            <span className="text-blue-9 font-semibold">Journals</span>
          </p>
        </div>
      </main>
      {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
