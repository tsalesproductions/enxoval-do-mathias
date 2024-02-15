import Footer from "./components/footer/footer";
import Header from "./components/header";
import DetailsProduct from "./components/shelfs/detailsProduct";
import Shelfs from "./components/shelfs/shelfs";

export default function Home() {
  return (
    <>
    <Header/>

    <main className="w-full container  py-8 flex flex-col gap-12 lg:gap-16 lg:py-10 mx-auto">
      
      <div className="others-options grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 m-2 sm:m-0">
        <a
            href="/faq/enviar"
            className="group rounded-lg border  px-5 py-4 transition-colors hover:bg-teal-500 hover:text-white"
          >
          
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Quero enviar algo
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Achou algo que não estava na lista e acha que vale a pena termos? Clique aqui para ver mais detalhes de como você pode nos enviar.
            </p>
          </a>

          <a
            href="/faq/pix"
            className="group rounded-lg border  px-5 py-4 transition-colors hover:bg-teal-500 hover:text-white"
          >
          
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Quero fazer um pix
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Quer deixar que a gente escolha e só enviar um valor para ajudar? Clique aqui para ver como.
            </p>
          </a>
      </div>

      <div className="shelfs mb-32 flex flex-col ">
        <Shelfs/>
        <DetailsProduct/>
      </div>
    </main>

    <Footer/>
    </>
  );
}
