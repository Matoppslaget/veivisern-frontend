import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip, Typography } from "./MaterialTailwind"
import { KassalappProduct } from "./ApiResponse";
import Image from 'next/image';


const redIngredients = ["vann", "100% bananer", "hydrolysert protein av kylling", "hydrolysert protein av laks"];
const yellowIngredients = ["sitronjuicekonsentrat", "sitronjuicekonsentrat", "betaglukaner fra gjær"];

export default function ProductCard({ product }: { product: KassalappProduct }) {

  return (
    <div className="shadow-lg  border-4 border-opacity-55 border-green-800 flex justify-center w-full ">
      <div className="">
        <span className="flow-root my-3 text-center text-2xl"> {product.name} </span>
        <div className='flow-root my-6 mx-auto box-border h-32 w-32'>
          <Image className="h-full w-full object-contain" sizes="(max-width: 768px) 100vw, 33vw" src={product.image} alt={product.name} width={20} height={20} />
        </div>
        <div className="flow-root my-6 py-1 mx-auto text-center italic font-semibold"> Produktet er ultraprosessert ! </div>
        <div className="flow-root my-6 ">
          {(!product.ingredients || product.ingredients.length === 0) ?
            <div className="py-2">
              <div className="text-2xl">Ingredienser ikke tilgjengelig</div>
              <span> Produsenten har ikke oppgitt noen ingredienser.</span>
            </div>
            : <div className="grid">
              <div className="pl-2 p-2 text-xl">Ingredienser: </div>
                <div className=" max-h-80 overflow-auto grid p-2 border-2 border-gray-100 shadow-lg">
                  {product.ingredients.split(",").map((ingredient) => (
                    <div className="p-1 flex" key={ingredient}>
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
                                  Det æ fali det!
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="text-lg opacity-80"
                                >
                                  Denne vil du ikke spise!!
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
                                  Mye som tyder på at denna ikke er helt bra.
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
          }
        </div>

      </div >
    </div >


  )


}