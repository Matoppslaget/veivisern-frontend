import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Product } from '@/types/ProductTypes';
import ThumbnailImage from '../ThumbnailImage';

interface ShowSearchResultsProps {
  query: string;
  products: Product[];
  handleProductClick: (product: Product) => void;
  handleShowAllResults: () => void;
  ref: React.RefObject<HTMLDivElement>;
}

const ShowSearchResults: React.FC<ShowSearchResultsProps> = ({
  query,
  products,
  handleProductClick,
  handleShowAllResults,
  ref,
}: ShowSearchResultsProps) => {
  return (
    // TODO: Add a spinner while loading
    <>
      <div
        className="rounded-xl w-full shadow-sm p-1 border-t-0 border-2 flex flex-col h-full"
        ref={ref}
      >
        {products.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto space-y-1">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="rounded-md flex justify-stretch border border-gray-300 border-opacity-70 hover:cursor-pointer hover:bg-green-700 hover:bg-opacity-20"
                  onClick={() => handleProductClick(product)}
                >
                  <ThumbnailImage
                    imageSrc={product.image ? product.image : ''}
                  />
                  <div className="my-auto pl-2 sm:pl-8 w-full font-normal sm:font-semibold rounded-md ">
                    {product.name}
                  </div>
                  <div className="w-6/12 h-20 flex items-center justify-center hover:cursor-pointer">
                    <div className="hidden sm:block">Se detaljer</div>
                    <ArrowRightIcon className="w-6 h-6 mx-2" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-2">
            Fant ingen resultater for <span className='italic'>{query}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowSearchResults;
