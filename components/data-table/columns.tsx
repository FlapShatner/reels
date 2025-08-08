import { Reel } from '@/data-types';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const numberFormatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function formatDuration(seconds?: number): string {
  if (!seconds && seconds !== 0) return '-';
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  const m = Math.floor((seconds / 60) % 60)
    .toString()
    .padStart(2, '0');
  const h = Math.floor(seconds / 3600);
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
}

export const columns: ColumnDef<Reel>[] = [
  {
    accessorKey: 'caption',
    header: 'Caption',
    cell: ({ getValue }) => {
      const value = (getValue<string>() || '').trim();
      if (!value) return '-';
      const truncated = value.length > 30 ? `${value.slice(0, 30)}…` : value;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="link"
              className="px-0 h-auto underline underline-offset-4"
            >
              {truncated}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            style={{ maxWidth: 400, width: 'max-content' }}
          >
            <p className="whitespace-pre-wrap break-words text-sm">{value}</p>
          </PopoverContent>
        </Popover>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'hashtags',
    header: 'Hashtags',
    filterFn: (row, columnId, filterValue) => {
      const value = (filterValue as string)?.trim().toLowerCase();
      if (!value) return true;
      const needle = value.startsWith('#') ? value.slice(1) : value;
      const tags = (row.getValue<string[]>(columnId) || []).filter(Boolean);
      return tags.some((t) =>
        (t.startsWith('#') ? t.slice(1) : t).toLowerCase().includes(needle)
      );
    },
    cell: ({ getValue }) => {
      const tags = (getValue<string[]>() || []).filter(Boolean);
      if (tags.length === 0) return '-';
      const normalized = tags.map((t) => (t.startsWith('#') ? t : `#${t}`));
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
            >
              {normalized.length} items
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="flex flex-wrap gap-2">
              {normalized.map((tag) => (
                <span
                  key={tag}
                  className="text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'ownerUsername',
    header: 'Owner',
    enableSorting: false,
  },
  {
    accessorKey: 'likesCount',
    header: 'Likes',
    cell: ({ getValue }) => numberFormatter.format(getValue<number>() || 0),
    meta: { align: 'right' },
    sortingFn: 'basic',
  },
  {
    accessorKey: 'commentsCount',
    header: 'Comments',
    cell: ({ getValue }) => numberFormatter.format(getValue<number>() || 0),
    meta: { align: 'right' },
    sortingFn: 'basic',
  },
  {
    accessorKey: 'videoViewCount',
    header: 'Views',
    cell: ({ getValue }) => numberFormatter.format(getValue<number>() || 0),
    meta: { align: 'right' },
    sortingFn: 'basic',
  },
  {
    accessorKey: 'videoPlayCount',
    header: 'Play Count',
    cell: ({ getValue }) => numberFormatter.format(getValue<number>() || 0),
    meta: { align: 'right' },
    sortingFn: 'basic',
  },
  {
    accessorKey: 'videoDuration',
    header: 'Duration',
    cell: ({ getValue }) => formatDuration(getValue<number>()),
    meta: { align: 'right' },
    sortingFn: 'basic',
  },
  {
    accessorKey: 'timestamp',
    header: 'Date',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      if (!value) return '-';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return value;
      return dateFormatter.format(d);
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue<string | undefined>(columnId);
      const b = rowB.getValue<string | undefined>(columnId);
      const da = a ? new Date(a).getTime() : 0;
      const db = b ? new Date(b).getTime() : 0;
      return da === db ? 0 : da > db ? 1 : -1;
    },
  },
  {
    id: 'link',
    header: 'Link',
    cell: ({ row }) => {
      const href = row.original.url || row.original.inputUrl;
      if (!href) return '-';
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-primary underline underline-offset-4"
        >
          Open
        </a>
      );
    },
    enableSorting: false,
  },
];
