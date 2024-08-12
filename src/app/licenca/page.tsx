'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHome } from 'react-icons/fa';

interface Licenca {
    id: number;
    numero: string;
    orgao: string;
    emissao: string;
    validade: string;
    empresa: {
        razao: string;
    };
}

const LicencaPage = () => {
    const [licencas, setLicencas] = useState<Licenca[]>([]);

    useEffect(() => {
        async function fetchLicencas() {
            const response = await fetch("/api/licenca");
            const data = await response.json();
            setLicencas(data);
        }

        fetchLicencas();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = confirm("Tem certeza que deseja excluir esta licenca?");
        if (!confirmed) return;
    
        const response = await fetch(`/api/licenca/${id}`, {
          method: "DELETE",
        });
    
        if (response.ok) {
            setLicencas(licencas.filter((licenca) => licenca.id !== id));
        } else {
          console.error("Erro ao excluir a licenca");
        }
      };

    return (
        <main className="min-h-screen bg-gray-900 p-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <Link href="/">
                    <button className="text-green-500 text-3xl hover:text-green-400 transition-colors duration-200">
                        <FaHome />
                    </button>
                    </Link>
                </div>
                <h1 className="text-3xl font-bold text-white text-center flex-grow">Licenças Ambientais</h1>
                <Link href="/licenca/nova">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200">Nova Licença</button>
                </Link>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                {licencas.length > 0 ? (
                <ul className="space-y-6">
                    {licencas.map((licenca) => (
                    <li key={licenca.id} className="bg-gray-700 rounded-lg p-6 shadow flex justify-between items-center">
                        <div className="text-white">
                            <span className="font-semibold text-lg">{licenca.numero}</span> - <span className="text-gray-400 text-md">{licenca.orgao}</span> - <span className="text-gray-300 text-lg">{licenca.empresa.razao}</span>
                        </div>
                        <div className="flex space-x-4">
                            <Link href={`/licenca/${licenca.id}`}>
                                <button className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition-colors duration-200">Editar</button>
                            </Link>
                            <button onClick={() => handleDelete(licenca.id)} className="bg-red-600 text-white px-3 py-1 rounded shadow hover:bg-red-700 transition-colors duration-200">
                                Excluir
                            </button>
                        </div>
                    </li>
                    ))}
                </ul>
                ) : (
                <p className="text-gray-400">Nenhuma licença cadastrada.</p>
                )}
            </div>
        </main>
    );
};

export default LicencaPage;