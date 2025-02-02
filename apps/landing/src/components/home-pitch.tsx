"use client";

import { AudioPlayer } from "./audio-player";

export function HomePitch() {
  // const [showPitch, setShowPitch] = useState(false);

  return (
    <>
      {/* <div className="flex flex-col md:flex-row gap-4">
        <Button onClick={() => setShowPitch(!showPitch)}>
          {showPitch ? "Hide the pitch" : "Show the pitch"}
        </Button>
      </div> */}

      <div className="flex flex-col gap-4 ml-8 border-l-2 border-slate-9 pl-4 bg-slate-1 rounded-lg rounded-l-none  text-sm">
        <AudioPlayer />
        <p>
          <span>&ldquo;</span> Before the invention of GPS navigation, we&apos;d
          use paper maps. You had to pre-plan your journey, follow very strict
          turns, and if you got lost it could mean driving around for hours till
          you find a point on the map before continuing.
        </p>
        <p>
          GPS navigation came along, would plan the route for you in seconds,
          show you exactly where you are and when you need to turn. It changed
          the way we move around. Now GPS navigation even tells you about
          traffic, speed limits, works out faster routes, and lets you know if
          you need to take a charging break before getting to your destination.
        </p>
        <p>
          The same was true of personal development and growth. Thousands of
          books will tell you a rough route of how to get somewhere. But cant
          show you the exact route because they don&apos;t know where you are
          now. And you might think you&apos;re on the right path heading in the
          right direction, but you missed a fork in the road and ended up going
          east instead of north.
        </p>
        <p>
          We&apos;re building the GPS navigation system for longevity and
          vitality, knowing exactly where you are now, tracking you on your
          journey, suggesting new routes, correcting wrong turns, and making
          sure you have enough re-charging stops to maximize your life.
        </p>
      </div>
    </>
  );
}
