import { DeliverPartner } from "../../generated/prisma/client.ts";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                isAdmin?: boolean
            }
            partner?: DeliverPartner
        }
    }
}

export {};