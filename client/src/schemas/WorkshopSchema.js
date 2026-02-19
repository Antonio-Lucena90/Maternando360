import {z} from 'zod';

export const workshopSchema = z.object({
  workshop_name: z.string()
                .min(3, 'Muy corto')
                .max(200, 'Muy largo'),
  description: z.string(),
  city:    z.string()
            .min(2, 'Nombre muy corto')
            .max(100, 'Nombre debe de ser menor de 50 caracteres'),
  duration:z.string()
})