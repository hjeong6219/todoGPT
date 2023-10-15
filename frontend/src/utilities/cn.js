import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(input) {
  return twMerge(clsx(input));
}
