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
      styling = 'border-green-600 border-2 bg-green-200';
      label = 'Renvare';
      break;
    case ProcessedClass.THREE:
      styling = 'border-orange-600 border-2 bg-orange-200';
      label = 'Prosessert';
      break;
    case ProcessedClass.FOUR:
      styling = 'border-red-600 border-2 bg-red-200';
      label = 'Ultraprosessert';
      break;
    default:
      styling = ' bg-gray-200';
      label = 'Ukjent prosesseringsgrad';
  }

  return (
    <span
      className={`text-${size} sm:text-${size == 'lg' ? '2xl' : 'md'} font-normal px-2 rounded-lg ${styling}`}
    >
      {label}
    </span>
  );
}
