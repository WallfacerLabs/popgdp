import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearchState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = (
    ...entries: Array<[key: string, value: string]>
  ) => {
    const newParams = new URLSearchParams(searchParams.toString());

    for (const [key, value] of entries) {
      if (!value || value === "") {
        newParams.delete(key);
        continue;
      }

      if (Array.isArray(value)) {
        newParams.delete(key);
        for (const item of value) {
          newParams.append(key, String(item));
        }
      } else {
        newParams.set(key, String(value));
      }
    }

    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return { searchParams, updateSearchParams };
}
