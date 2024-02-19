import { ListViewContent } from "../model/list.model";

export class ListViewDefault{
  public static getContent(): ListViewContent{
    return {
      btnFechar: "Fechar",
      btnLista: "Listar",
      btnNovo: "Novo",
      btnPesquisar: "Pesquisar",
      codigoCampanha: "Código da Campanha",
      smtp: "Smtp",
      zenvia: "Zenvia",
      tipoMensagem: "Tipo da Mensagem"
    }
  }
}
