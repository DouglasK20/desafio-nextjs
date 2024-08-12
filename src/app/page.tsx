'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"

interface Licenca {
  id: number;
  numero: string;
  orgao: string;
}

interface Empresa {
  id: number;
  razao: string;
  cnpj: string;
  licencas?: Licenca[];
}

const HomePage = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const response = await fetch('/api/empresa');
      const data = await response.json();
      setEmpresas(data);
    };

    fetchEmpresas();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir esta empresa?");
    if (!confirmed) return;

    const response = await fetch(`/api/empresa/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setEmpresas(empresas.filter((empresa) => empresa.id !== id));
    } else {
      console.error("Erro ao excluir empresa");
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white text-center flex-grow">Gerenciamento de Empresas</h1>
        <Link href="/empresa/nova">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300">Nova Empresa</button>
        </Link>
      </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          {empresas.length > 0 ? (
            <ul className="space-y-6">
              {empresas.map((empresa) => (
                <li key={empresa.id} className="bg-gray-700 rounded-lg p-4 shadow flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-white">
                      <span className="font-semibold text-lg">{empresa.razao}</span> - <span className="text-gray-400 text-md">{empresa.cnpj}</span>
                    </div>
                    <div className="flex space-x-4">
                      <Link href={`/empresa/${empresa.id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-200">Editar</button>
                      </Link>
                      <button onClick={() => handleDelete(empresa.id)} className="bg-red-600 text-white px-3 py-1 rounded shadow hover:bg-red-700 transition-colors duration-200">
                        Excluir
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg mt-4">
                    <h2 className="text-lg font-semibold text-white mb-2">Licenças:</h2>
                    {empresa.licencas && empresa.licencas.length > 0 ? (
                      <ul className="space-y-2">
                        {empresa.licencas.map((licenca) => (
                        <li key={licenca.id} className="text-gray-300">
                          <span className="font-medium">{licenca.numero}</span> - <span className="text-gray-400">{licenca.orgao}</span>
                        </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">Nenhuma licença cadastrada.</p>
                    )}
                    <div className="flex justify-end mt-2">
                      <Link href={`/licenca/nova?empresaId=${empresa.id}`}>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors duration-300">Adicionar Licença</button>
                      </Link>
                    </div>
                  </div>                  
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">Nenhuma empresa cadastrada.</p>
          )}
      </div>
    </main>
  );
};

export default HomePage;