export function StepperIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      className="h-8 w-8 fill-current"
    >
      <g clipPath="url(#a)">
        <circle
          cx="16"
          cy="16"
          r="15"
          fill="#fff"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="16" cy="16" r="5.5" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
