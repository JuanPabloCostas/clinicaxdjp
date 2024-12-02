import { PrismaClient } from "@prisma/client"

const primsaClientSingleton = () => new PrismaClient()

declare global {
    var prismaGlobal: undefined | ReturnType<typeof primsaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? primsaClientSingleton();

export default prisma