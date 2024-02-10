import { Component, SyntheticEvent } from "react"

interface State {
  nome: string
  contato: string
  pedido: string
}

const env = import.meta?.env ? import.meta.env : process.env

export default class Order extends Component<NonNullable<unknown>, State> {
  constructor(props: NonNullable<unknown>) {
    super(props)
    this.state = { nome: '', contato: '', pedido: '' }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    
    const xhr = new XMLHttpRequest()

    xhr.open('POST', env.VITE_WEBHOOK_URL);
    xhr.setRequestHeader('Content-Type', 'application/json')

    const data = JSON.stringify({
      "content": "Cliente interessado!\n||@everyone||",
      "embeds": [
        {
          "title": "Nome do Cliente",
          "description": this.state.nome
        },
        {
          "title": "Contato do Cliente",
          "description": this.state.contato
        },
        {
          "title": "Pedido",
          "description": this.state.pedido
        },
      ],
    })

    try {
      xhr.send(data)
      alert('Pedido enviado com sucesso!')
    } catch(err) {
      console.log(`Não foi possível enviar o pedido (discord webhook req): ${err}`)
      alert('Não foi possível enviar seu pedido.')
    }
  }

  render() {
    return (
      <div className="order">
        <div className="headers">
          <h1>Quer evitar <span>estresse</span> com planilhas?</h1>
          <h2>Então encomende a <span>solução</span> para seus problemas</h2>
        </div>
        <form className="orderForm" onSubmit={this.handleFormSubmit}>
          <div className="questions">
            <label htmlFor="nome">Qual Seu Nome?</label>
            <input type="text" name="nome" placeholder="Digite seu nome" required onChange={(e) => this.setState({ nome: e.target.value })} />
          </div><br />
          <div className="questions">
            <label htmlFor="contato">Como Posso te Contatar?</label>
            <input type="text" name="nome" placeholder="Digite seu contato" required onChange={(e) => this.setState({ contato: e.target.value })} />
            <span>(telefone, instagram ou email)</span>
          </div><br />
          <textarea name="pedido" cols={20} rows={10} placeholder="Descreva seu pedido..." required onChange={(e) => this.setState({ pedido: e.target.value })}></textarea><br /><br />
          <button type="submit">ENVIAR PEDIDO</button>
        </form>
      </div>
    )
  }
}
