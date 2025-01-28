import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Product } from '@/types/ProductTypes';
import ThumbnailImage from '../ThumbnailImage';
import PrimaryButton from '../PrimaryButton';

interface ShowSearchResultsProps {
  query: string;
  products: Product[];
  handleProductClick: (product: Product) => void;
  handleShowAllResults: () => void;
  resultsTableRef: React.RefObject<HTMLDivElement>;
  showResults: boolean;
  showResultsButtonRef: React.RefObject<HTMLButtonElement>;
}

const ShowSearchResults: React.FC<ShowSearchResultsProps> = ({
  query,
  products,
  handleProductClick,
  handleShowAllResults,
  resultsTableRef,
  showResults,
  showResultsButtonRef,
}: ShowSearchResultsProps) => {
  return (
    // TODO: Add a spinner while loading
    <div className="rounded-xl border-t-0 border">
      {/* TODO: Make height dynamic */}
      <div
        className={` w-full shadow-sm p-1  flex flex-col max-h-[428px] sm:max-h-[428px]`}
        ref={resultsTableRef}
      >
        {products.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto space-y-1">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-stretch border-b-2 border-gray-300 border-opacity-70 hover:cursor-pointer hover:bg-green-700 hover:bg-opacity-20"
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
            Fant ingen resultater for <span className="italic">{query}</span>
          </div>
        )}
      </div>
      {showResults && products.length > 0 && (
        <div className="w-full mx-auto p-1 pt-0 bg-white  rounded-xl flex justify-center sticky bottom-0">
          <PrimaryButton
            buttonText="Vis alle resultater"
            onClick={handleShowAllResults}
            ref={showResultsButtonRef}
          />
        </div>
      )}
    </div>
  );
};

export default ShowSearchResults;
