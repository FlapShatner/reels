'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  const [urls, setUrls] = useState<string[]>(['']);

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

  const handleGet = () => {
    const filledUrls = urls.filter((url) => url.trim() !== '');
    console.log('All URLs:', filledUrls);
    // Here you can access all the URL values
    // You can process them as needed
  };

  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Reels Data Getter</h1>
        <ModeToggle />
      </div>

      <div className="w-full max-w-md space-y-3">
        {urls.map((url, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            <Input
              type="text"
              placeholder={`Enter profile url ${index + 1}`}
              value={url}
              onChange={(e) => updateUrl(index, e.target.value)}
              className="flex-1"
            />
            {urls.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeUrlInput(index)}
                className="px-3"
              >
                ×
              </Button>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addUrlInput}
          className="w-full"
        >
          + Add Another URL
        </Button>
      </div>

      <Button
        onClick={handleGet}
        className="w-full max-w-md"
      >
        {urls.filter((url) => url.trim() !== '').length === 0
          ? 'No URLs entered yet'
          : `Get Data from ${
              urls.filter((url) => url.trim() !== '').length
            } URL${
              urls.filter((url) => url.trim() !== '').length !== 1 ? 's' : ''
            }`}
      </Button>
    </div>
  );
}
