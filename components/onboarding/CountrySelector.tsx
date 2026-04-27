import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const COUNTRIES = [
  { label: 'United States (+1)', value: 'United States (+1)' },
  { label: 'Canada (+1)', value: 'Canada (+1)' },
  { label: 'United Kingdom (+44)', value: 'United Kingdom (+44)' },
  { label: 'Australia (+61)', value: 'Australia (+61)' },
  { label: 'Germany (+49)', value: 'Germany (+49)' },
  { label: 'France (+33)', value: 'France (+33)' },
  { label: 'Japan (+81)', value: 'Japan (+81)' },
  { label: 'China (+86)', value: 'China (+86)' },
  { label: 'India (+91)', value: 'India (+91)' },
  { label: 'Brazil (+55)', value: 'Brazil (+55)' },
  { label: 'Mexico (+52)', value: 'Mexico (+52)' },
  { label: 'Spain (+34)', value: 'Spain (+34)' },
  { label: 'Italy (+39)', value: 'Italy (+39)' },
  { label: 'Netherlands (+31)', value: 'Netherlands (+31)' },
  { label: 'Sweden (+46)', value: 'Sweden (+46)' },
  { label: 'Switzerland (+41)', value: 'Switzerland (+41)' },
  { label: 'South Korea (+82)', value: 'South Korea (+82)' },
  { label: 'Singapore (+65)', value: 'Singapore (+65)' },
];

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-12 border-neutral-300 text-base">
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        {COUNTRIES.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            {country.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
