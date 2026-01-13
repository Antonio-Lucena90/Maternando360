import {z} from 'zod'

export const editSchema = z.object ({
      name: z.string()
            .min(3, 'Nombre muy corto')
            .max(50, 'Nombre debe de ser menor de 50 caracteres')
            .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'El nombre no puede contener números ni caracteres especiales'),
      last_name: z.string()
              .min(3, 'Apellidos muy cortos')
              .max(70, 'Apellidos debe de ser menor de 70 caracteres')
              .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Los apellidos no pueden contener números ni caracteres especiales'),
      phone: z.string()
              .regex(/^\d{7,15}$/, 'Solo introducir números')
})