import Link from "next/link";

export default function Home() {

  return (
      <main className="flex flex-row flex-wrap justify-center gap-[32px] row-start-2 items-center sm:items-start p-20">
        <Link href="/tareas" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/task.png" alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Aplicacion De Tareas</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Gestiona tus tareas pendientes</p>
            </div>
        </Link>
      </main>
  );
}
