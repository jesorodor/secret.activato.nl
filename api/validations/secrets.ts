import { z } from 'zod';
import { EXPIRATION_TIMES_SECONDS } from '../lib/constants';
import {
    idParamSchema,
    paginationQuerySchema,
    processPaginationParams,
    uint8ArraySchema,
} from './shared';

// Hard ceiling for encrypted payloads at parse time (prevents memory exhaustion).
// Configurable via env var in KB, defaults to 1024 KB (1MB).
const MAX_ENCRYPTED_PAYLOAD_KB = parseInt(
    process.env.HEMMELIG_MAX_ENCRYPTED_PAYLOAD_SIZE || '1024',
    10
);
export const MAX_ENCRYPTED_SIZE = MAX_ENCRYPTED_PAYLOAD_KB * 1024;

// Re-export shared schemas for backwards compatibility
export const secretsIdParamSchema = idParamSchema;

export const secretsQuerySchema = paginationQuerySchema;

const secretSchema = {
    salt: z.string(),
    secret: uint8ArraySchema(
        MAX_ENCRYPTED_SIZE,
        `Encrypted payload (max ${MAX_ENCRYPTED_PAYLOAD_KB} KB)`
    ),
    title: uint8ArraySchema(
        MAX_ENCRYPTED_SIZE,
        `Encrypted title (max ${MAX_ENCRYPTED_PAYLOAD_KB} KB)`
    )
        .optional()
        .nullable(),
    password: z.string().optional(),
    // Admin-controlled: any standard expiration value is accepted.
    // The frontend always submits the instance default, so in practice
    // every secret uses whatever the admin configured.
    expiresAt: z
        .number()
        .refine(
            (val) =>
                EXPIRATION_TIMES_SECONDS.includes(val as (typeof EXPIRATION_TIMES_SECONDS)[number]),
            { message: 'Invalid expiration time' }
        ),
    // Activato policy: max views hard-locked to 1
    views: z
        .number()
        .int()
        .refine((val) => val === 1, { message: 'Views are locked to 1' })
        .optional()
        .default(1),
    // Activato policy: burn-after-time removed
    isBurnable: z
        .boolean()
        .refine((val) => val === false, { message: 'Burn after time is disabled' })
        .optional()
        .default(false),
    // Activato policy: IP restriction removed
    ipRange: z.null().optional().default(null),
    // Activato policy: file uploads removed
    fileIds: z
        .array(z.string())
        .max(0, { message: 'File uploads are disabled' })
        .optional()
        .default([]),
};

export const createSecretsSchema = z.object(secretSchema);

export const getSecretSchema = z.object({
    password: z.string().optional(),
});

export const processSecretsQueryParams = (
    query: z.infer<typeof secretsQuerySchema>
): { skip: number; take: number } => {
    return processPaginationParams(query);
};
