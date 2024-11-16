import {
  DocumentTextIcon,
  CalendarDaysIcon,
  FingerPrintIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Søk opp akkurat dine favorittprodukter',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Planlegg din neste handel med et enkelt søk',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget.',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Se ingredienser og prosesseringsgrad',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo.',
    icon: DocumentTextIcon,
  },
];

export default function FeatureOverview() {
  return (
    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        {features.map((feature) => (
          <div key={feature.name} className="relative pl-16">
            <dt className="text-base font-semibold leading-7 text-gray-900">
              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-700">
                <feature.icon
                  aria-hidden="true"
                  className="h-6 w-6 text-white"
                />
              </div>
              {feature.name}
            </dt>
            <dd className="mt-2 text-base leading-7 text-gray-600">
              {feature.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
