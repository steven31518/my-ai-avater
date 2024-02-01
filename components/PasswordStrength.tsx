import { cn } from "@/lib/utils";

interface props {
  passStrength: number;
}

export default function PasswordStrength({ passStrength }: props) {
  return (
    <div
      className={cn("col-span-2 flex gap-2 justify-around", {
        "justify-start": passStrength < 3,
        "justify-around": passStrength === 3,
      })}
    >
      {Array.from({ length: passStrength + 1 }).map((i, index) => {
        return (
          <div
            key={index}
            className={cn("h-2 w-12 rounded-md", {
              "bg-red-500": passStrength === 0,
              "bg-yellow-500": passStrength === 1,
              "bg-green-500": passStrength === 2,
              "bg-blue-500": passStrength === 3,
            })}
          ></div>
        );
      })}
    </div>
  );
}
