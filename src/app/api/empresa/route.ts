import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Função para listar todas as empresas
export async function GET() {
    try {
        const empresas = await prisma.empresa.findMany({
        include: {
            licencas: true, // Incluir as licenças associadas a cada empresa
          },
        });
        return NextResponse.json(empresas);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar empresas' }, { status: 500 });
    }
}

// Função para criar uma nova empresa
export async function POST( req: Request ) {
    try {
        const body = await req.json();
        const novaEmpresa = await prisma.empresa.create({
            data: {
                razao: body.razao,
                cnpj: body.cnpj,
                cep: body.cep,
                cidade: body.cidade,
                estado: body.estado,
                bairro: body.bairro,
                complemento: body.complemento
            },
        });
        return NextResponse.json(novaEmpresa, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar empresa' }, { status: 500 });
    }
}