'use client';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
export default function SelectScroll(data, selectedData, setSelectedData,  label,  placeholder) {

    const handleValueChnage = (value) => {
      setSelectedData(value);
    };
  return (
    <Select onValueChange={handleValueChnage}>
      <SelectTrigger className="w-full ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{ label }</SelectLabel>
          {data.map((data) => (
            <SelectItem key={data.value} value={data.value}>
              {data.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
