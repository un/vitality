import { HomePitch } from "@/components/home-pitch";
import { Phone } from "@/components/phone";
import { StarGithub } from "@/components/star-github";
import { Waitlist } from "@/components/waitlist";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl  text-slate-12 gap-8 p-6 md:p-16">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start pt-2">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex flex-col gap-8 ">
            <nav className="flex flex-row items-center justify-between w-full ">
              <h1 className="text-4xl font-bold">
                <Link href="/">Augment</Link>
              </h1>
            </nav>
            <h2 className="text-2xl font-semibold flex flex-col gap-2 border-l-2 border-orange-9 pl-4 bg-orange-1 rounded-lg rounded-l-none">
              <span>Open Source Longevity System</span>
              <span className="flex flex-wrap gap-2">
                <span className="text-slate-11">Live</span>
                <span className="text-orange-9 font-bold">Longer</span>
                <span className=" text-slate-11">+</span>
                <span className="text-orange-9 font-bold">Sharper</span>
                <span className="text-slate-11">+</span>
                <span className="text-orange-9 font-bold">Better</span>
              </span>
            </h2>
            <div className="flex flex-col gap-4">
              <p>
                We&apos;re building the world&apos;s most advanced system for
                your personal longevity and vitality.
              </p>
              <p>
                All your{" "}
                <span className="text-slate-12 font-bold">
                  daily activities
                </span>{" "}
                are automatically{" "}
                <span className="text-slate-12 font-bold">
                  tracked and analyzed
                </span>
                .
              </p>
              <p>
                We use help you discover{" "}
                <span className="text-slate-12 font-bold">
                  trends and cycles
                </span>
                {", "}
                <br />
                predictively suggesting changes to{" "}
                <span className="text-slate-12 font-bold">
                  maximize your progress
                </span>
                .
              </p>
              <p>
                <span className="text-slate-12 font-bold">Open Source</span>{" "}
                lets us build a new{" "}
                <span className="text-slate-12 font-bold">
                  open health ecosystem
                </span>{" "}
                <br />
                focused on accelerating longevity and vitality, while protecting
                your data and privacy.
              </p>
            </div>
          </div>
          <Phone />
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-8 items-center pt-2 grow">
          <HomePitch />
        </div>
        <StarGithub />
        <Waitlist />
        <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-3">
          <div className="flex flex-wrap md:flex-col gap-2">
            <p>
              <span className="text-slate-11 font-bold">Trackables:</span>{" "}
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Heart Rate</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Sleep Quality</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Workouts</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">App usage</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Journals</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Manual Data</span>
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2">
            <p>
              <span className="text-slate-11 font-bold">Trends:</span>{" "}
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Health Metrics</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Motivation</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Productivity</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Focus</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Mood</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Targets</span>
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2">
            <p>
              <span className="text-slate-11 font-bold">Predictions:</span>{" "}
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">
                Negative Patterns
              </span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Health Issues</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Hyper Focus</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Energy Boosts</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Happiness</span>
            </p>
            <p className="flex flex-row gap-2 items-start">
              <span className="text-3xl font-thin">*</span>{" "}
              <span className="text-blue-11 font-semibold">Burnout</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="">
            <span className="text-slate-11 font-bold">Auto Capture:</span>{" "}
            Adaptors for any device, sensor or input source; including APIs and
            physical click buttons. GPS geolocation tracking for events (If
            within area of gym, log workout).
          </span>
          <span className="">
            <span className="text-slate-11 font-bold">Data Analysis:</span>{" "}
            Upload of medical data and tests such as genetics, blood, dexascan
            to fine tune your suggestions and predictions.
          </span>
          <span className="">
            <span className="text-slate-11 font-bold">
              Up to date guidance:
            </span>{" "}
            Largest continually updated knowledge base of scientific papers,
            methodologies, and insights fed into your custom guidance system.
          </span>
        </div>
        {/* <Chart /> */}
      </main>
    </div>
  );
}
