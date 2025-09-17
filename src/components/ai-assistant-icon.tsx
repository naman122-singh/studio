import { cn } from "@/lib/utils";

export function AiAssistantIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("w-full h-full", className)}
    >
      <g>
        {/* Skin */}
        <path fill="#f0c08b" d="M35,45 a15,15 0 1,1 30,0 v15 a15,15 0 0,1 -30,0 z" />
        <path fill="#f0c08b" d="M40,70 l-5,10 l20,0 l-5,-10z" />
        {/* Turban */}
        <path fill="#d9534f" d="M30,45 a25,20 0 0,1 40,0 a20,20 0 0,1 -40,0" />
        <path stroke="#fff" strokeWidth="1" fill="none" d="M35,35 q15,-10 30,0" />
        <path stroke="#fff" strokeWidth="1" fill="none"d="M32,42 q18,-8 36,0" />
        <path stroke="#fff" strokeWidth="1" fill="none"d="M38,28 q12,-5 24,0" />
         <path stroke="#fff" strokeWidth="1" fill="none"d="M45,23 q5,-3 10,0" />

        {/* Eyes */}
        <circle cx="45" cy="50" r="3" fill="#000" />
        <circle cx="55" cy="50" r="3" fill="#000" />
        <path d="M42,47 q3,-2 6,0" fill="none" stroke="#000" strokeWidth="1"/>
        <path d="M52,47 q3,-2 6,0" fill="none" stroke="#000" strokeWidth="1"/>

        {/* Mustache */}
        <path d="M40,60 q5,5 10,0 q5,-5 10,0" fill="none" stroke="#000" strokeWidth="2" />

        {/* Mouth */}
        <path d="M45,65 a5,3 0 0,0 10,0" fill="#fff" />

        {/* Earrings */}
        <circle cx="35" cy="55" r="3" fill="none" stroke="#f0c08b" strokeWidth="2" />
        <circle cx="65" cy="55" r="3" fill="none" stroke="#f0c08b" strokeWidth="2" />

        {/* Body */}
        <path fill="#ffc107" d="M35,70 l-5,20 l40,0 l-5,-20z" />
        
        {/* Vest */}
        <path fill="#46b8da" d="M32,70 l-7,25 l20,0 v-25z" />
        <path fill="#46b8da" d="M68,70 l7,25 l-20,0 v-25z" />

        {/* Hands */}
        <path fill="#f0c08b" d="M40,75 a10,10 0 0,1 10,10" />
        <path fill="#f0c08b" d="M60,75 a10,10 0 0,0 -10,10" />
      </g>
    </svg>
  );
}
