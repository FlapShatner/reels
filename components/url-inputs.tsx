import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

function UrlInputs({
  urls,
  updateUrl,
  addUrlInput,
  removeUrlInput,
}: {
  urls: string[];
  updateUrl: (index: number, value: string) => void;
  addUrlInput: () => void;
  removeUrlInput: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Label className="px-1">
        Get reels data from the following accounts:
      </Label>
      {urls.map((url, index) => (
        <div
          key={index}
          className="flex items-center gap-2"
        >
          <Input
            type="text"
            placeholder={`Enter account url ${index + 1}`}
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
  );
}

export default UrlInputs;
