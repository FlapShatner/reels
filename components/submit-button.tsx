import { Loader2Icon } from 'lucide-react';
import { Button } from './ui/button';

function SubmitButton({
  handleGet,
  isLoading,
  urls,
}: {
  handleGet: () => void;
  isLoading: boolean;
  urls: string[];
}) {
  return (
    <Button
      onClick={handleGet}
      size="lg"
      className="w-full max-w-md"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2Icon
            size={24}
            className="animate-spin"
          />{' '}
          This might take a minute or two{' '}
        </div>
      ) : urls.filter((url) => url.trim() !== '').length === 0 ? (
        'No URLs entered yet'
      ) : (
        `Get Data from ${urls.filter((url) => url.trim() !== '').length} URL${
          urls.filter((url) => url.trim() !== '').length !== 1 ? 's' : ''
        }`
      )}
    </Button>
  );
}

export default SubmitButton;
