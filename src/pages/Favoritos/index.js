import { useEffect, useState } from 'react';
import './favoritos.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Favoritos()
{
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {

        const minhaLista = localStorage.getItem("@primeFlix");
        setFilmes(JSON.parse(minhaLista) || []);

    }, [])

    function excluirFilme(id)
    {
      let filtroFilmes = filmes.filter((item) => {
          return(item.id !== id)
      })

      setFilmes(filtroFilmes);
      localStorage.setItem('@primeFlix', JSON.stringify(filtroFilmes));
      toast.success("Filme removido com sucesso");
    }

    //Apos clicar no filme que eu vou excluir eu salvo todos os outros que eu nao cliquei no localstorage, e o que eu cliquei eu retiro de la, 
    //lembrando que devemos passar o JSON.stringfly para converter a array em uma string pois nao é possivel salvar uma array dentro do localstorage

    return(
        <div className="meus-filmes">
          <h1>Meus filmes</h1>

         {filmes.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}
          <ul>
            {filmes.map((item) => {
                return(
                    <li key={item.id}>
                    <span>{item.title}</span>

                    <div>
                       <Link to={`/filme/${item.id}`}>Ver detalhes</Link> 
                       <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                    </div>
                </li>
                )
            })}
          </ul>
        </div>
    )

}

export default Favoritos;