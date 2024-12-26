import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { KassalappProduct } from '@/types/ProductTypes';
import ThumbnailImage from '../ThumbnailImage';

interface ShowSearchResultsProps {
  products: KassalappProduct[];
  handleClick: (product: KassalappProduct) => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

const ShowSearchResults: React.FC<ShowSearchResultsProps> = ({
  products,
  handleClick,
  ref,
}: ShowSearchResultsProps) => {
  return (
    <div
      className="rounded-xl w-full shadow-sm p-1 space-y-1 border-t-0 border-2"
      ref={ref}
    >
      {products.length > 0 ? (
        products.map((product, index) => (
          <div
            key={index}
            className="rounded-md flex justify-stretch border border-gray-300 border-opacity-70 hover:cursor-pointer hover:bg-green-700 hover:bg-opacity-20"
            onClick={() => handleClick(product)}
          >
            <ThumbnailImage imageSrc={product.image ? product.image : ''} />
            <div className="my-auto pl-2 sm:pl-8 w-full font-normal sm:font-semibold rounded-md ">
              {product.name}
            </div>
            <div className=" w-6/12 h-20 flex items-center justify-center hover:cursor-pointer">
              <div className="hidden sm:block">Se detaljer</div>{' '}
              <ArrowRightIcon className="w-6 h-6 mx-2" />
            </div>
          </div>
        ))
      ) : (
        <>Ingen produkter funnet</>
      )}
    </div>
  );
};

export default ShowSearchResults;
