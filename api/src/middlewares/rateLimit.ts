import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
        error: "Muitas requisições. Tente novamente em alguns minutos.",
    },
});

export const simplifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
        error: "Limite de simplificações atingido. Aguarde alguns minutos.",
    },
});

export const extractLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
        error: "Limite de extrações atingido. Aguarde alguns minutos.",
    },
});

