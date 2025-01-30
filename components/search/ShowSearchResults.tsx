import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Product } from '@/types/ProductTypes';
import ThumbnailImage from '../ThumbnailImage';
import PrimaryButton from '../PrimaryButton';
import { useWindowDimensions } from '@/utils/CommonFunctions';
import ProcessedLabel from '../ProcessedLabel';

interface ShowSearchResultsProps {
  query: string;
  products: Product[];
  handleProductClick: (product: Product) => void;
  handleShowAllResults: () => void;
  resultsTableRef: React.RefObject<HTMLDivElement>;
  showResults: boolean;
  showResultsButtonRef: React.RefObject<HTMLButtonElement>;
}

export default function ShowSearchResults({
  query,
  products,
  handleProductClick,
  handleShowAllResults,
  resultsTableRef,
  showResults,
  showResultsButtonRef,
}: ShowSearchResultsProps): JSX.Element {
  const { height } = useWindowDimensions();

  let tableTopOffset = 428;
  if (resultsTableRef.current) {
    tableTopOffset = resultsTableRef.current.getBoundingClientRect().top;
  }
  let showResultsButtonOffset = 55;
  if (showResultsButtonRef.current) {
    showResultsButtonOffset =
      showResultsButtonRef.current.getBoundingClientRect().height;
  }
  return (
    // TODO: Add a spinner while loading
    <div className="absolute top-full left-0 right-0 bg-background bg-white shadow-lg z-50 rounded-xl border-t-0 border">
      <div
        className={`w-full shadow-sm pt-0.5 flex flex-col`}
        style={{
          maxHeight:
            window.innerWidth >= 640
              ? `${height - tableTopOffset - showResultsButtonOffset - 140}px` // Desktop
              : `${height - tableTopOffset - showResultsButtonOffset - 5}px`, // Mobile
        }}
        ref={resultsTableRef}
      >
        {products.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto space-y-0">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="pl-2 flex justify-stretch border-b-2 border-gray-300 border-opacity-70 hover:cursor-pointer hover:bg-green-700 hover:bg-opacity-20"
                  onClick={() => handleProductClick(product)}
                >
                  <ThumbnailImage
                    imageSrc={product.image ? product.image : ''}
                  />
                  <div className='flex flex-col w-6/12'>
                    <div className="my-auto pl-2 sm:pl-8 w-full font-normal sm:font-semibold rounded-md ">
                      {product.name}
                    </div>
                    <div>
                      {product.processedClass && (
                        <ProcessedLabel processedClass={product.processedClass} />
                      )}
                    </div>
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
}
