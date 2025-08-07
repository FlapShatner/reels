'use client';

import { useState } from 'react';
import { ModeToggle } from '@/components/mode-toggle';
import { DatePicker } from '@/components/date-picker';
import SubmitButton from '@/components/submit-button';
import UrlInputs from '@/components/url-inputs';
import { getTestData } from '@/lib/apify';

export default function Home() {
  const [urls, setUrls] = useState<string[]>(['']);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const filledUrls = urls.filter((url) => url.trim() !== '');
    console.log('All URLs:', filledUrls);
    console.log('Date:', date);
    const testData = await getTestData();
    console.log('Test data:', testData);
    setIsLoading(false);
  };

  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Reels Data Getter</h1>
        <ModeToggle />
      </div>
      <div className="w-full max-w-md space-y-3 flex flex-col gap-3">
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
    </div>
  );
}
