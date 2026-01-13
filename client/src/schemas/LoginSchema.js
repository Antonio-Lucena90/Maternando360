import {z} from 'zod';

export const loginSchema = z.object({
  email: z.email('Email no válido'),
  password: z 
          .string()
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, 'Contraseña no segura')
})