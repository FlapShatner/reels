'use client';

import { useEffect, useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from './ui/button';
import { Table } from '@tanstack/react-table';
import { Reel } from '@/data-types';

function DownloadButton({ table }: { table: Table<Reel> }) {
  const [selectedColumnIds, setSelectedColumnIds] = useState<string[]>([]);

  useEffect(() => {
    if (selectedColumnIds.length === 0) {
      const ids = table.getAllLeafColumns().map((c) => c.id);
      if (ids.length > 0) setSelectedColumnIds(ids);
    }
  }, [table, selectedColumnIds.length]);

  function getColumnHeaderText(colId: string): string {
    const col = table.getAllLeafColumns().find((c) => c.id === colId);
    const header = col?.columnDef.header as unknown;
    if (typeof header === 'string' || typeof header === 'number')
      return String(header);
    return colId;
  }

  function valueFor(row: Reel, colId: string): unknown {
    if (colId === 'link') return row.url || row.inputUrl || '';
    const col = table.getAllLeafColumns().find((c) => c.id === colId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accessorKey = (col?.columnDef as any)?.accessorKey as
      | keyof Reel
      | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val = accessorKey ? (row as any)[accessorKey] : undefined;
    if (Array.isArray(val)) return val.join(' ');
    if (val === null || val === undefined) return '';
    return val;
  }

  function escapeCsv(value: unknown): string {
    const s = value === null || value === undefined ? '' : String(value);
    if (/[",\n\r]/.test(s)) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  function toCsv(rows: Reel[], colIds: string[]): string {
    const headerRow = colIds
      .map((id) => escapeCsv(getColumnHeaderText(id)))
      .join(',');
    const dataRows = rows
      .map((row) => colIds.map((id) => escapeCsv(valueFor(row, id))).join(','))
      .join('\n');
    return `${headerRow}\n${dataRows}`;
  }

  function handleDownloadCsv(): void {
    const rows = table.getSortedRowModel().rows.map((r) => r.original as Reel);
    if (rows.length === 0 || selectedColumnIds.length === 0) return;
    const csv = toCsv(rows, selectedColumnIds);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reels.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto"
        >
          Download CSV
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-72"
      >
        <div className="flex flex-col gap-3">
          <div className="text-sm font-medium">Columns</div>
          <div className="max-h-[200px] overflow-auto pr-1">
            <div className="flex flex-col gap-2">
              {table.getAllLeafColumns().map((col) => {
                const id = col.id;
                const checked = selectedColumnIds.includes(id);
                return (
                  <label
                    key={id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        setSelectedColumnIds((prev) =>
                          e.target.checked
                            ? Array.from(new Set([...prev, id]))
                            : prev.filter((x) => x !== id)
                        );
                      }}
                    />
                    <span>{getColumnHeaderText(id)}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <Button
            onClick={handleDownloadCsv}
            disabled={
              selectedColumnIds.length === 0 ||
              table.getSortedRowModel().rows.length === 0
            }
          >
            Download
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DownloadButton;
