import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip, Typography } from './utils/MaterialTailwind';
import { NovaClass } from '@/types/ProductTypes';


interface CustomTooltipProps {
  novaClass: NovaClass;
}

export default function CustomTooltip({ novaClass }: CustomTooltipProps) {
  let titleText;
  let detailText;

  if (novaClass === NovaClass.THREE) {
    titleText = 'Prosessert ingrediens';
    detailText =
      'Denne ingrediensen faller under kategori 3 av Nova-klassifiseringen';
  } else {
    // (novaClass === NovaClass.FOUR)
    titleText = 'Ultraprosessert ingrediens';
    detailText =
      'Denne ingrediensen faller under kategori 4 av Nova-klassifiseringen';
  }

  return (
    <span>
      <Tooltip
        className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
        content={
          <div className="w-80">
            <Typography color="blue-gray" className="text-lg font-bold">
              {titleText}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="text-lg opacity-80"
            >
              {detailText}
            </Typography>
          </div>
        }
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <QuestionMarkCircleIcon className="hover:cursor-pointer pl-2 w-[34px] h-[28px]"></QuestionMarkCircleIcon>
      </Tooltip>
    </span>
  );
}
