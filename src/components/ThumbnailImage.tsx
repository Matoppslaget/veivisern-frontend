import Image from 'next/image';

interface ThumbnailImageProps {
  imageSrc: string;
}

export default function ThumbnailImage({ imageSrc }: ThumbnailImageProps) {
  return (
    <div className="min-w-20 min-h-20 max-w-20 max-h-20 rounded-lg">
      <Image
        className="p-1 h-full w-full object-contain text-sm"
        sizes="(max-width: 768px) 100vw, 33vw"
        src={imageSrc}
        alt={''}
        width={20}
        height={20}
      />
    </div>
  );
}
