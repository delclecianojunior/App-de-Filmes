import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css'

//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=9a3cc90d43e4d52a42cfb4f3f74ab03e

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "9a3cc90d43e4d52a42cfb4f3f74ab03e",
          language: "pt-BR",
          page: 1,
        }
      })

      // console.log(response.data.results.slice(0,10));
      setFilmes(response.data.results.slice(0,10));
      setLoading(false);
    }

    loadFilmes();

  }, []);

  if(loading)
  {
    return(
      <div className='loading'>
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='lista-filmes'>
        {filmes.map((filme) => {
          return(
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Home;

//Porque estamos importanto os hooks, se eu quero quando o ususario abra a aplicação e apareça os filmes, ae o useEffect vai la na api e busca os filmes, e o useState pra dpeois que ele buscar ele armazena isso em algum estado pra me conseguir utilizar na aplicação
//Criamos uma função assincrona onde ela vai ser a primeira função a ser rodada antes de tudo, e dentro dela colocamos para que ela espere a api buscar todos os filmes
//Resumindo a gente utiliza o await pra esperar a requisição api.get acontecer, e assim que acaba a gente mostra no console o nome dos filmes que estao em cartaz