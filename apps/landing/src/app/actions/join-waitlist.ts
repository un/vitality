"use server";

import { actionClient } from "@/lib/safe-action";
import { waitlistSchema } from "./join-waitlist-schema";
import { supabase } from "@/lib/db";
import { resend } from "@/lib/resend";

export const addToWaitlist = actionClient
  .schema(waitlistSchema)
  .action(async ({ parsedInput: { name, email } }) => {
    const { data: existing } = await supabase
      .from("waitlist")
      .select("position,publicid")
      .eq("email", email);

    if (existing?.length) {
      return {
        data: {
          position: existing[0].position,
          publicid: existing[0].publicid,
        },
        error: "Email already on waitlist",
      };
    }

    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact" });

    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        { name: name, email: email, position: count ? count + 100 : 100 },
      ])
      .select();

    if (!data) {
      return { data: null, error: "Failed to add to waitlist" };
    }

    resend.contacts.create({
      email: email,
      firstName: name,
      unsubscribed: false,
      audienceId: "3ea2df4c-acda-4fdc-b70f-f42255d00c93",
    });

    return {
      data: {
        position: data[0].position,
        publicid: data[0].publicid,
      },
      error,
    };
  });
