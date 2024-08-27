import Product from "./Product";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip, Typography } from "./MaterialTailwind"

const redIngredients = ["hydrolysert protein av kylling", "hydrolysert protein av laks"];
const yellowIngredients = ["Ertestivelse", "biprodukter av vegetabilsk opprinnelse", "betaglukaner fra gjær"];

export default function ProductCard({ product }: { product: Product }) {

  return (
    <div className="relative py-4 rounded-lg ">
      <div className="py-2 ">
        <span className="py-2 text-3xl"> {product.name} </span>
        <img className=" p-10 border justify-self-end" src={product.imageUrl} alt="product image" />
        {product.ingredients.length === 0 ?
          <div className="py-4">
            <div className="text-2xl">Ingredienser ikke tilgjengelig</div>
            <span> Produsenten har ikke oppgitt noen ingredienser.</span>
          </div>
          : <div className="grid ">
            <div className="pt-8 py-4 text-2xl">Ingredienser: </div>
            <div className="max-h-80 overflow-auto">
              <div className="grid space-y-2 p-2">
                {product.ingredients.map((ingredient) => (
                  <div className="w-[fit-content] p-2 flex items-center" key={ingredient}>
                    <div
                      className={`
                              ${redIngredients.includes(ingredient) || yellowIngredients.includes(ingredient) ?
                          'rounded-lg'
                          : 'bg-gray-100'}  
                              ${redIngredients.includes(ingredient) ?
                          'bg-red-600 hover:border-red-500 text-gray-50'
                          : yellowIngredients.includes(ingredient) ?
                            'bg-yellow-400 hover:border-yellow-500 '
                            : ''}  
                              px-2 py-1 text-lg`}
                    >
                      {ingredient}
                    </div>
                    {redIngredients.includes(ingredient) &&
                      <span>
                        <Tooltip
                          className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                          content={
                            <div className="w-80">
                              <Typography color="blue-gray" className="text-lg font-bold">
                                Jævlig farlig ingrediens!!
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="text-lg opacity-80"
                              >
                                Ayla, vår hundeernæringsfysiolog, sier du ikke bør spise denne. Det fucker opp tarmen til bikkja&apos;ri!!
                              </Typography>
                            </div>
                          }
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}>
                          <QuestionMarkCircleIcon className="hover:cursor-pointer pl-2 w-[34px] h-[28px]"></QuestionMarkCircleIcon>
                        </Tooltip>
                      </span>
                    }
                    {yellowIngredients.includes(ingredient) &&
                      <span>
                        <Tooltip
                          className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                          content={
                            <div className="w-80">
                              <Typography color="blue-gray" className="text-lg font-bold">
                                Hvem vet, kanskje denne er farlig?
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="text-lg opacity-80"
                              >
                                Tupèter, vår bezzerwizzer, sier at dette må da være farlig? Tenk på alt dritet dem får i seg, dem bikkjene.
                              </Typography>
                            </div>
                          }
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}>
                          <QuestionMarkCircleIcon className="hover:cursor-pointer pl-2 w-[34px] h-[28px]"></QuestionMarkCircleIcon>
                        </Tooltip>
                      </span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

      </div >
    </div >


  )


}