import * as Yup from "yup";

export const carteirasValidationSchema = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  sobrenome: Yup.string().required("O sobrenome é obrigatório"),
  email: Yup.string().email("Insira um formato de e-mail válido").required("O e-mail é obrigatório"),
  valor_carteira: Yup.number().required("O valor de compra é obrigatório")
})