"use client";

import { AlertCircle, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
const chartData = [
  {
    day: "Day 1",
    sleep: 8.2,
    sleepQ: 63,
    steps: 3145,
    workout: 0,
    calories: 385,
    carbs: 362,
    protein: 65,
    water: 1400,
    alcohol: 3200,
    meetings: 4,
    productivity: 87,
    focus: 64,
    mood: 72,
    rhr: 69,
  },
  {
    day: "Day 2",
    sleep: 8.4,
    sleepQ: 65,
    steps: 3423,
    workout: 0,
    calories: 506,
    carbs: 352,
    protein: 78,
    water: 1500,
    alcohol: 3300,
    meetings: 6,
    productivity: 75,
    focus: 82,
    mood: 69,
    rhr: 69,
  },
  {
    day: "Day 3",
    sleep: 8.5,
    sleepQ: 67,
    steps: 5820,
    workout: 35,
    calories: 820,
    carbs: 320,
    protein: 65,
    water: 1600,
    alcohol: 3400,
    meetings: 2.5,
    productivity: 82,
    focus: 85,
    mood: 78,
    rhr: 69,
  },
  {
    day: "Day 4",
    sleep: 8,
    sleepQ: 72,
    steps: 7902,
    workout: 60,
    calories: 1292,
    carbs: 284,
    protein: 102,
    water: 2000,
    alcohol: 2200,
    meetings: 1.2,
    productivity: 93,
    focus: 87,
    mood: 85,
    rhr: 68,
  },
  {
    day: "Day 5",
    sleep: 7.5,
    sleepQ: 78,
    steps: 9578,
    workout: 71,
    calories: 1653,
    carbs: 235,
    protein: 164,
    water: 2300,
    alcohol: 1900,
    meetings: 0,
    productivity: 99,
    focus: 94,
    mood: 92,
    rhr: 68,
  },
  {
    day: "Day 6",
    sleep: 7.2,
    sleepQ: 85,
    steps: 10962,
    workout: 69,
    calories: 1853,
    carbs: 198,
    protein: 187,
    water: 3000,
    alcohol: 1100,
    meetings: 0,
    productivity: 114,
    focus: 110,
    mood: 98,
    rhr: 67,
  },
  {
    day: "Day 7",
    sleep: 7.0,
    sleepQ: 87,
    steps: 11823,
    workout: 84,
    calories: 1789,
    carbs: 142,
    protein: 245,
    water: 4000,
    alcohol: 0,
    meetings: 2.5,
    productivity: 120,
    focus: 120,
    mood: 104,
    rhr: 67,
  },
  {
    day: "Day 8",
    sleep: 6.7,
    sleepQ: 88,
    steps: 12562,
    workout: 66,
    calories: 1954,
    carbs: 107,
    protein: 278,
    water: 4200,
    alcohol: 0,
    meetings: 4.5,
    productivity: 104,
    focus: 102,
    mood: 94,
    rhr: 67,
  },
  {
    day: "Day 9",
    sleep: 6.2,
    sleepQ: 93,
    steps: 10245,
    workout: 45,
    calories: 2103,
    carbs: 82,
    protein: 302,
    water: 4300,
    alcohol: 0,
    meetings: 2.5,
    productivity: 105,
    focus: 127,
    mood: 120,
    rhr: 67,
  },
  {
    day: "Day 10",
    sleep: 6.1,
    sleepQ: 97,
    steps: 14823,
    workout: 85,
    calories: 2205,
    carbs: 62,
    protein: 332,
    water: 4300,
    alcohol: 0,
    meetings: 6,
    productivity: 120,
    focus: 135,
    mood: 129,
    rhr: 66,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-md font-medium">Peter Von Demo</p>
              <p className="text-sm text-slate-11 font-light">@McDemo</p>
            </div>
          </div>
        </CardTitle>
        <CardDescription>Vitality over the last 3 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-0">
            <p className="text-sm font-light">Sleep</p>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={500}
                  height={200}
                  data={chartData}
                  syncId="chartSync"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis
                    dataKey="sleep"
                    tickLine={false}
                    axisLine={false}
                    yAxisId="sleep"
                    tickMargin={8}
                    hide={true}
                    domain={["dataMin - 1", "dataMax + 1"]}
                  />
                  <YAxis
                    dataKey="quality"
                    label="Quality"
                    tickLine={false}
                    axisLine={false}
                    yAxisId="quality"
                    tickMargin={8}
                    hide={true}
                    domain={[50, 100]}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line
                    dataKey="sleep"
                    name="Sleep"
                    unit="h"
                    type="monotone"
                    fill="var(--amber-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--amber-9)"
                    yAxisId="sleep"
                  />
                  <Line
                    dataKey="sleepQ"
                    name="Sleep Quality"
                    unit="%"
                    type="monotone"
                    fill="var(--amber-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--blue-9)"
                    yAxisId="quality"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="flex flex-col gap-0">
            <p className="text-sm font-light">Movement</p>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={500}
                  height={200}
                  data={chartData}
                  syncId="chartSync"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis
                    dataKey="steps"
                    tickLine={false}
                    axisLine={false}
                    yAxisId="steps"
                    tickMargin={8}
                    hide={true}
                    domain={[0, "dataMax + 3000"]}
                  />
                  <YAxis
                    dataKey="workout"
                    tickLine={false}
                    axisLine={false}
                    yAxisId="workout"
                    tickMargin={8}
                    hide={true}
                    domain={[0, "dataMax + 25"]}
                  />
                  <YAxis
                    dataKey="calories"
                    tickLine={false}
                    axisLine={false}
                    yAxisId="calories"
                    tickMargin={8}
                    hide={true}
                    domain={[0, "dataMax + 300"]}
                  />
                  <YAxis
                    dataKey="rhr"
                    tickLine={false}
                    axisLine={false}
                    yAxisId="rhr"
                    tickMargin={8}
                    hide={true}
                    domain={[70, "dataMax + 2"]}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line
                    dataKey="steps"
                    type="monotone"
                    name="Steps"
                    fill="var(--violet-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--violet-9)"
                    yAxisId="steps"
                  />
                  <Line
                    dataKey="rhr"
                    type="monotone"
                    name="RHR"
                    unit="bpm"
                    fill="var(--mint-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--mint-9)"
                    yAxisId="rhr"
                  />
                  <Line
                    dataKey="workout"
                    type="monotone"
                    name="Workout"
                    unit="min"
                    fill="var(--orange-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--orange-9)"
                    yAxisId="workout"
                  />
                  <Line
                    dataKey="calories"
                    type="monotone"
                    name="Burned Calories"
                    unit="cal"
                    fill="var(--red-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--red-9)"
                    yAxisId="calories"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="flex flex-col gap-0">
            <p className="text-sm font-light">Food</p>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={500}
                  height={200}
                  data={chartData}
                  syncId="chartSync"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis
                    dataKey="carbs"
                    yAxisId="carbs"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    hide={true}
                    domain={[0, "dataMax + 100"]}
                  />
                  <YAxis
                    dataKey="protein"
                    yAxisId="protein"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    hide={true}
                    domain={[0, "dataMax + 100"]}
                  />
                  <YAxis
                    dataKey="water"
                    yAxisId="water"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    hide={true}
                    domain={[0, "dataMax + 100"]}
                  />
                  <YAxis
                    dataKey="alcohol"
                    yAxisId="alcohol"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    hide={true}
                    domain={[0, "dataMax + 1000"]}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line
                    dataKey="carbs"
                    type="monotone"
                    name="Carbs"
                    unit="g"
                    fill="var(--jade-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--jade-9)"
                    yAxisId="carbs"
                  />
                  <Line
                    dataKey="protein"
                    type="monotone"
                    name="Protein"
                    unit="g"
                    fill="var(--mint-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--mint-9)"
                    yAxisId="protein"
                  />
                  <Line
                    dataKey="water"
                    type="monotone"
                    name="Water"
                    unit="ml"
                    fill="var(--blue-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--blue-9)"
                    yAxisId="water"
                  />
                  <Line
                    dataKey="alcohol"
                    type="monotone"
                    name="Alcohol"
                    unit="ml"
                    fill="var(--red-9)"
                    strokeWidth={0}
                    fillOpacity={1}
                    markerWidth={10}
                    markerHeight={10}
                    stroke="var(--red-9)"
                    yAxisId="alcohol"
                    dot={{ strokeWidth: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="flex flex-col gap-0">
            <p className="text-sm font-light">Work</p>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={500}
                  height={200}
                  data={chartData}
                  syncId="chartSync"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis
                    dataKey="productivity"
                    tickLine={false}
                    axisLine={false}
                    yAxisId="productivity"
                    tickMargin={8}
                    hide={true}
                    domain={[70, "dataMax + 3"]}
                  />
                  <YAxis
                    dataKey="meetings"
                    yAxisId="meetings"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    hide={true}
                    domain={[0, "dataMax + 1"]}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line
                    dataKey="productivity"
                    name="Productivity"
                    unit="%"
                    type="monotone"
                    fill="var(--pink-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--pink-9)"
                    yAxisId="productivity"
                  />
                  <Line
                    dataKey="meetings"
                    type="monotone"
                    name="Meetings"
                    unit="hrs"
                    fill="var(--grass-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--grass-9)"
                    yAxisId="meetings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="flex flex-col gap-0">
            <p className="text-sm font-light">Mind</p>

            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={500}
                  height={200}
                  data={chartData}
                  syncId="chartSync"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis
                    dataKey="mood"
                    tickLine={false}
                    axisLine={false}
                    yAxisId="mood"
                    tickMargin={8}
                    hide={true}
                    domain={[50, 150]}
                  />
                  <YAxis
                    dataKey="focus"
                    label="focus"
                    tickLine={false}
                    axisLine={false}
                    yAxisId="focus"
                    tickMargin={8}
                    hide={true}
                    domain={[40, 150]}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line
                    dataKey="mood"
                    name="Mood"
                    unit="%"
                    type="monotone"
                    fill="var(--amber-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--amber-9)"
                    yAxisId="mood"
                  />
                  <Line
                    dataKey="focus"
                    name="Focus"
                    unit="%"
                    type="monotone"
                    fill="var(--sky-9)"
                    strokeWidth={4}
                    fillOpacity={0.4}
                    stroke="var(--sky-9)"
                    yAxisId="focus"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Alert>
          <TrendingUp className="h-4 w-4" />
          <AlertTitle>New 10 Day Trend!</AlertTitle>
          <AlertDescription>
            <p>
              <span className="font-bold text-slate-11">SarAi</span>:
            </p>
            <p>
              Your Work trend has improved by{" "}
              <span className="font-bold">+32.5%</span> and your Mood trend has
              improved by <span className="font-bold">42.7%</span>.
            </p>
            <p>
              This seems to be tied to your increase in movement, water and
              protein consumption, combined with decrease in alcohol and carbs.
            </p>
            <p>
              Your sleep quality has improved by{" "}
              <span className="font-bold">+12.5%</span>
            </p>
            <p>
              Your RHR has decreased by <span className="font-bold">+1.2%</span>
            </p>
            <p>
              Your new estimated life expectancy is{" "}
              <span className="font-bold">125 years</span>
            </p>
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Burnout Risk Detected</AlertTitle>
          <AlertDescription>
            <p>
              <span className="font-bold text-red-11">SarAi</span>:
            </p>
            <p>
              Your hours in meetings has increased and general activity is at an
              all time high.
            </p>
            <p>Ensure you are taking enough time to relax and recover.</p>
            <p>
              Try taking a hike in nature or attend the Open Source meetup in
              San Francisco in 3 days. Event link is here.
            </p>
            <p>
              Your current burnout risk is{" "}
              <span className="font-bold">12.5%</span>
            </p>
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
}

// "use client";

// import { TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;

// export function Component() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Bar Chart - Multiple</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart accessibilityLayer data={chartData}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="dashed" />}
//             />
//             <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
//             <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total visitors for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

// function generateHealthData(days: number) {
//   const data = [];
//   let alcoholEffect = 0;
//   let cumulativePositiveEffect = 0;

//   // Base ranges for variables
//   const ranges = {
//     sleep: { min: 5, max: 8.5 },
//     sleepQ: { min: 60, max: 98 },
//     steps: { min: 3000, max: 15000 },
//     workout: { min: 0, max: 90 },
//     calories: { min: 600, max: 2500 },
//     carbs: { min: 50, max: 350 },
//     protein: { min: 80, max: 400 },
//     water: { min: 2000, max: 5000 },
//     alcohol: { min: 0, max: 2500 },
//     meetings: { min: 2, max: 8 },
//     productivity: { min: 65, max: 150 },
//     focus: { min: 60, max: 150 },
//     mood: { min: 60, max: 150 },
//     rhr: { min: 62, max: 75 },
//   };

//   // Generate data for each day
//   for (let i = 0; i < days; i++) {
//     // Gradually decrease negative habits over time
//     const timeProgress = i / days;
//     const negativeHabitProbability = Math.max(0.1, 1 - timeProgress * 1.2);

//     // Calculate alcohol consumption with decreasing probability
//     const hasAlcohol = Math.random() < negativeHabitProbability;
//     const alcoholAmount = hasAlcohol ? Math.random() * ranges.alcohol.max : 0;

//     // Update alcohol effect (3-day lag)
//     alcoholEffect = Math.max(
//       0,
//       alcoholEffect * 0.7 + (alcoholAmount > 0 ? 1 : 0)
//     );

//     // Increase positive effect over time when maintaining good habits
//     if (alcoholAmount === 0) {
//       cumulativePositiveEffect = Math.min(1, cumulativePositiveEffect + 0.01);
//     } else {
//       cumulativePositiveEffect = Math.max(0, cumulativePositiveEffect - 0.03);
//     }

//     // Generate daily data
//     const dayData = {
//       day: `Day ${i + 1}`,
//       sleep:
//         ranges.sleep.min +
//         Math.random() * (ranges.sleep.max - ranges.sleep.min),
//       sleepQ:
//         ranges.sleepQ.min +
//         (1 - alcoholEffect) * (ranges.sleepQ.max - ranges.sleepQ.min),
//       steps:
//         ranges.steps.min +
//         (1 - alcoholEffect * 0.5) * (ranges.steps.max - ranges.steps.min),
//       workout:
//         Math.random() < negativeHabitProbability
//           ? 0
//           : ranges.workout.min +
//             Math.random() * (ranges.workout.max - ranges.workout.min),
//       calories:
//         ranges.calories.min +
//         Math.random() * (ranges.calories.max - ranges.calories.min),
//       carbs:
//         ranges.carbs.min +
//         negativeHabitProbability * (ranges.carbs.max - ranges.carbs.min),
//       protein:
//         ranges.protein.min +
//         (1 - negativeHabitProbability) *
//           (ranges.protein.max - ranges.protein.min),
//       water:
//         ranges.water.min +
//         (1 - alcoholEffect) * (ranges.water.max - ranges.water.min),
//       alcohol: alcoholAmount,
//       meetings:
//         ranges.meetings.min +
//         Math.random() * (ranges.meetings.max - ranges.meetings.min),
//       productivity:
//         ranges.productivity.min +
//         (1 - alcoholEffect + cumulativePositiveEffect) *
//           (ranges.productivity.max - ranges.productivity.min),
//       focus:
//         ranges.focus.min +
//         (1 - alcoholEffect + cumulativePositiveEffect) *
//           (ranges.focus.max - ranges.focus.min),
//       mood:
//         ranges.mood.min +
//         (1 - alcoholEffect + cumulativePositiveEffect) *
//           (ranges.mood.max - ranges.mood.min),
//       rhr: ranges.rhr.min + alcoholEffect * (ranges.rhr.max - ranges.rhr.min),
//     };

//     // Round numerical values to appropriate precision
//     Object.keys(dayData).forEach((key) => {
//       if (typeof dayData[key] === "number") {
//         dayData[key] = Number(dayData[key].toFixed(1));
//       }
//     });

//     data.push(dayData);
//   }

//   return data;
// }
