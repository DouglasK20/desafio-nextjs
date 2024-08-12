import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Função para listar todas as licenças
export async function GET() {
    try {
        const licencas = await prisma.licenca.findMany({
            include: {
                empresa: true
            }
        });
        return NextResponse.json(licencas);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar licenças' }, { status: 500 });
    }
}

// Função para criar uma nova licença
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const novaLicenca = await prisma.licenca.create({
            data: {
                numero: body.numero,
                orgao: body.orgao,
                emissao: new Date(body.emissao),
                validade: new Date(body.validade),
                empresaId: body.empresaId
            },
        });
        return NextResponse.json(novaLicenca, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar licença' }, { status: 500 });
    }
}