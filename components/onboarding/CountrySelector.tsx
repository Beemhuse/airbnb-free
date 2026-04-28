import { useState } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Country {
  label: string;
  value: string;
  code: string;
}

interface CountrySelectorProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (_value: string) => void;


  label?: string;
  containerClassName?: string;
}

interface RawCountry {
  name: { common: string };
  idd?: { root?: string; suffixes?: string[] };
}

const fetchCountries = async (): Promise<Country[]> => {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd");
  if (!res.ok) throw new Error("Failed to fetch countries");
  const data: RawCountry[] = await res.json();

  return data
    .map((c: RawCountry) => {
      const root = c.idd?.root || "";
      const suffix = c.idd?.suffixes?.[0] || "";
      const dialCode = root + suffix;

      if (!dialCode) return null;

      return {
        label: `${c.name.common} (${dialCode})`,
        value: `${c.name.common} (${dialCode})`,
        code: dialCode,
      };
    })
    .filter((c: Country | null): c is Country => c !== null)
    .sort((a: Country, b: Country) => a.label.localeCompare(b.label));
};


export function FloatingCountrySelector({
  value,
  onChange,
  label = "Country / Region",
  containerClassName,
}: CountrySelectorProps) {
  const [open, setOpen] = useState(false);

  const { data: countries = [], isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: Infinity, // Countries don't change often
  });

  const isActive = open || !!value;

  return (
    <div
      className={clsx(
        "relative border border-neutral-300 border-b px-3 pt-5 pb-2 transition-all",
        open && "border-neutral-500 ring-2 ring-neutral-200",
        containerClassName,
      )}
    >
      {/* LABEL */}
      <label
        className={clsx(
          "absolute left-3 transition-all duration-200 pointer-events-none",
          isActive
            ? "top-1 text-xs text-neutral-500"
            : "top-3 text-base text-neutral-400",
        )}
      >
        {label}
      </label>

      <Select value={value} onValueChange={onChange} onOpenChange={setOpen}>
        <SelectTrigger className="w-full h-auto p-0 bg-transparent border-none shadow-none focus:ring-0">
          <SelectValue placeholder={isLoading ? "Loading..." : ""} />
        </SelectTrigger>

        <SelectContent className="max-h-72 overflow-y-auto">
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

