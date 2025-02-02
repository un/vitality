"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { waitlistSchema } from "@/app/actions/join-waitlist-schema";
import { addToWaitlist } from "@/app/actions/join-waitlist";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { StarGithub } from "./star-github";
import { JoinDiscord } from "./join-discord";
import { Share } from "lucide-react";

export function Waitlist() {
  const [waiting, setWaiting] = useState(false);
  const [shared, setShared] = useState(false);

  const { execute, result, isPending, hasErrored } = useAction(addToWaitlist, {
    onSuccess: () => {
      setWaiting(true);
    },
    onError: ({}) => {
      setWaiting(false);
    },
  });
  const form = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
  });
  async function onSubmit(values: z.infer<typeof waitlistSchema>) {
    execute(values);
  }

  function handleShare() {
    navigator.clipboard.writeText(
      `I've joined the Augment waitlist to live longer, sharper, and better.\nI'm in waitlist position ${result?.data?.data?.position}, get yours at: https://augment.day and join the movement!`
    );
    setShared(true);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Join The Augment Movement</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Augment Waitlist</DialogTitle>
          <DialogDescription>
            {!waiting && (
              <p>Be among the first people to Augment their life.</p>
            )}

            {result?.data?.error && (
              <p className="text-sm text-red-500">{result?.data?.error}</p>
            )}
            {hasErrored && (
              <>
                <p className="text-sm text-red-500">Something went wrong</p>
                <p className="text-sm text-red-500">{result?.serverError}</p>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        {!waiting && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John McLiveForever" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="John@150yrsold.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button disabled={isPending} type="submit">
                  {isPending ? "Joining..." : "Join"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
        {waiting && (
          <>
            <div className="flex flex-col gap-4 items-center pb-8 pt-4">
              <p className="text-sm text-slate-11 text-center">
                You&apos;re gonna be among the first people to Augment their
                life.
              </p>
              <p className="">Your position on the waitlist is </p>
              <span className=" text-5xl text-bold text-slate-11">
                {result?.data?.data?.position}
              </span>
              <span className=" text-5xl text-bold text-slate-11">🎉</span>
              <p className="text-sm text-slate-11 text-center">
                Help us spread the message and all live longer, sharper, and
                better.
              </p>
            </div>
            <Button onClick={handleShare}>
              <div className="flex items-center gap-4">
                <Share className="w-4 h-4" /> Share
              </div>
            </Button>
            {shared && (
              <p className="text-sm text-green-500 text-center">
                Message copied to your clipboard!
              </p>
            )}
            <StarGithub />
            <JoinDiscord />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
