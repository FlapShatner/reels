'use client';

import { useState } from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import { DatePicker } from '@/components/date-picker';
import SubmitButton from '@/components/submit-button';
import UrlInputs from '@/components/url-inputs';
import { getTestData } from '@/lib/apify';
import { getReelsData } from '@/lib/apify';
import { DataTable } from '@/components/data-table/data-table';
import { Reel } from '@/data-types';

export default function Home() {
  const [urls, setUrls] = useState<string[]>(['']);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Reel[] | null>(null);

  const addUrlInput = () => {
    setUrls([...urls, '']);
  };

  const removeUrlInput = (index: number) => {
    if (urls.length > 1) {
      const newUrls = urls.filter((_, i) => i !== index);
      setUrls(newUrls);
    }
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleGet = async () => {
    if (!date) {
      alert('Please select a date');
      return;
    }
    setIsLoading(true);
    const filledUrls = urls.filter((url) => url.trim() !== '');
    const reelsData = await getReelsData(filledUrls, date);
    setData(reelsData as Reel[]);
    // const testData = await getTestData();
    // setData(testData as Reel[]);
    setIsLoading(false);
  };

  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-geo text-3xl font-bold">Reels Data Getter</h1>
        <ModeToggle />
      </div>
      <div className="w-full max-w-md space-y-3 flex flex-col gap-3 my-12">
        <DatePicker
          date={date}
          setDate={setDate}
        />
        <UrlInputs
          urls={urls}
          updateUrl={updateUrl}
          addUrlInput={addUrlInput}
          removeUrlInput={removeUrlInput}
        />
        <SubmitButton
          handleGet={handleGet}
          isLoading={isLoading}
          urls={urls}
        />
      </div>
      <DataTable data={data || []} />
    </div>
  );
}
