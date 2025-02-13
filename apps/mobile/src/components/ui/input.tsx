import type { TextInputProps } from "react-native";
import * as React from "react";
import { TextInput } from "react-native";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        "web:flex native:h-12 web:w-full web:py-2 native:text-lg native:leading-[1.25] web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 placeholder:text-sand-8 h-10 rounded-md border border-input bg-background px-3 text-center font-mono text-base text-foreground file:border-0 file:bg-transparent file:font-medium lg:text-sm",
        props.editable === false && "web:cursor-not-allowed opacity-50",
        className,
      )}
      placeholderClassName={cn("text-sand-8", placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
