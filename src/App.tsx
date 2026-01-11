import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store'
import { adicionarAoCarrinho } from './storeCarrinho'
import { toggleFavorito } from './storeFavoritos'
import { useGetProdutosQuery } from './services/produtosApi'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'
import { Produto } from './types/Produto'

function App() {
  const { data: produtos = [], isLoading } = useGetProdutosQuery()
  const carrinho = useSelector((state: RootState) => state.carrinho.itens)
  const favoritos = useSelector((state: RootState) => state.favoritos.itens)
  const dispatch = useDispatch()

  function handleAdicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(adicionarAoCarrinho(produto))
    }
  }

  function handleFavoritar(produto: Produto) {
    dispatch(toggleFavorito(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        {isLoading ? (
          <p>Carregando produtos...</p>
        ) : (
          <Produtos
            produtos={produtos}
            favoritos={favoritos}
            favoritar={handleFavoritar}
            adicionarAoCarrinho={handleAdicionarAoCarrinho}
          />
        )}
      </div>
    </>
  )
}

export default App
