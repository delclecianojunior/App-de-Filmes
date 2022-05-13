import { useEffect, useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css'
import { toast } from 'react-toastify'

function Filme() 
{
  const {id} = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme(){
       await api.get(`/movie/${id}`, {
         params: {
           api_key: "9a3cc90d43e4d52a42cfb4f3f74ab03e",
           language: "pt-BR",
         }
       })
       .then((response) => {
         setFilme(response.data);
         setLoading(false);
       })
       .catch(() =>{
         console.log("FILME NÃO ENCONTRADO");
         navigate("/", { replace: true});
         return;
       })
    }

    loadFilme();

    return() => {
      console.log("COMPONENTE FOI DESMONTADO");
    }

  }, [navigate, id])

  function salvarFilme()
  {
    const minhaLista = localStorage.getItem("@primeFlix");

    let filmesSalvos = JSON.parse(minhaLista) || []; 
    let temFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

    if(temFilme)
    {
      toast.warn("Esse filme já está na sua lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  //Se tiver vai ficar dentro da variavel filmesSalvo se nao tiver eu vou identificar como uma array vazia ou melhor vai identificar undefnid e retornar uma array vazia
  //Depois é feito uma verificação se o filme ja esta salvo, caso ja esteja nao deixa salvar novamente, caso nao tenha eu deixo salvar

  if(loading)
  {
    return(
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }


  return(
      <div className="filme-info">
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {filme.vote_average} / 10</strong>

        <div className="area-buttons">
          <button onClick={salvarFilme}>Salvar</button>
          <button>
            <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
              Trailer
            </a>
          </button>
        </div>
      </div>
  )
}

export default Filme;