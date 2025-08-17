import * as Yup from "yup";

export const carteirasValidationSchema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  sobrenome: Yup.string().required("O sobrenome é obrigatório"),
  email: Yup.string().email("Insira um formato de e-mail válido").required("O e-mail é obrigatório"),
  valor_carteira: Yup.number().positive('O valor precisa ser positivo').typeError('Insira o valor da compra').max(100000, 'Valor máximo de compra de bitcoin excedido!').required("O valor de compra é obrigatório")
})

export const searchValidationSchema = Yup.object().shape({
  nome: Yup.string().optional(),
  sobrenome: Yup.string().optional(),
  email: Yup.string().email('E-mail inválido').optional()
})