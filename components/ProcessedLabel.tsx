import { ProcessedClass } from '@/types/ProductTypes';

interface ProcessedStylingProps {
  processedClass: ProcessedClass;
  size?: string;
}

export default function getProcessedStyling({
  processedClass,
  size = 'lg',
}: ProcessedStylingProps) {
  let styling = '';
  let label = '';

  switch (processedClass) {
    case ProcessedClass.ONE:
    case ProcessedClass.TWO:
      styling = 'text-green-700 text-lg font-bold';
      label = 'Renvare';
      break;
    case ProcessedClass.THREE:
      styling = 'text-orange-600 text-lg font-bold';
      label = 'Prosessert';
      break;
    case ProcessedClass.FOUR:
      styling = 'text-red-600 text-lg font-bold ';
      label = 'Ultraprosessert';
      break;
    default:
      styling = ' bg-gray-200';
      label = 'Ukjent prosesseringsgrad';
  }

  return (
    <span
      className={`text-${size} sm:text-${size == 'lg' ? '2xl' : 'md'} rounded-lg ${styling}`}
    >
      {label}
    </span>
  );
}
