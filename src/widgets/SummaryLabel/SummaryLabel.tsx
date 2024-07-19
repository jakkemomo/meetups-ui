import { ReactElement } from 'react';

interface SummaryLabelProps {
  title: string;
  count: number;
}

function SummaryLabel({ title, count }: SummaryLabelProps): ReactElement {
  return (
    <p className="text-[#9E9E9E]">{title}: {count}</p>
  );
}

export default SummaryLabel;