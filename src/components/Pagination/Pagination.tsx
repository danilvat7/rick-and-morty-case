import React from 'react';
import MaterialPagenation from '@material-ui/lab/Pagination';
import { IPagination } from '../../interfaces/pagination';

type Props = {
  pagination: IPagination;
  onChange: (page: number) => void;
};

/**
 * Pagination component
 */
export default function Pagination({ pagination, onChange }: Props) {
  return (
    <div>
      <MaterialPagenation
        count={pagination.pages}
        page={pagination.page}
        onChange={(_, page) => onChange(page)}
        size="small"
        shape="rounded"
      />
    </div>
  );
}
