import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '../../../components/modalsoftwarehouse';
import InformacoesContato from '../../../components/efd/informacoescontrato';
import style from '../../../styles/components/efd/adicionar/style.module.scss';
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import InformacoesContribuinte from '../../../components/efd/informacoescontribuinte';
import Validade from '../../../components/efd/validadeinformacoes';

export default function Home() {

  const [open,setOpen] = useState(false)
  const handleClose = () =>{
    setOpen(false)
  }

  const asyncFuncToLoadData = async() =>(
    {
      "id": "10",
      "ideEvento": {
        "tpAmb": "*",
        "procEmi": "*",
        "verProc": "********"
      },
      "ideContri": {
        "tpInsc": "*",
        "nrInsc": "******"
      },
      "infoContri": {
        "alteracao": {
          "idePeriodo": {
            "iniValid": "***",
            "fimValid": "***"
          },
          "infoCadastro": {
            "clasTrib": "**",
            "indEscrituracao": "*",
            "indDesoneracao": "*",
            "indAcordoSemMulta": "*",
            "indSitPJ": "*",
            "indUniao": "*",
            "dtTransfFinsLucr": "****",
            "dtObito": "****",
            "contato": {
              "nmCtt": "************************",
              "cpfCtt": "*****",
              "foneFixo": "*****",
              "foneCel": "*****",
              "email": "********************"
            },
            "softHouse": [
              "629e6bd8376b320677695561"
            ],
            "infoEFR": {
              "ideEFR": "*",
              "cnpjEFR": "******"
            },
            "novaValidade": {
              "iniValid": "***",
              "fimValid": "***"
            }
          }
        }
      }
    }
  )
  
  const { register, handleSubmit,getValues,setValue } = useForm();
  const [resp,setResp] = useState();

  useEffect(()=>{
    asyncFuncToLoadData().then((e)=>{
      setResp(e)
      setClassificacao(e?.classificacaoContribuinte ?? '')
      setPessoa(e?.situacaoPessoaJuridica ?? '')
      setRadioOptions({
        escrituracao:e.escrituracao,
        desoneracao:e.desoneracao,
        acordo:e.acordo,
      })
      setValue('nome',e.informacoesContribuinte.nome)
      setValue('cpf',e.informacoesContribuinte.cpf)
      setValue('telefone',e.informacoesContribuinte.telefone)
      setValue('email',e.informacoesContribuinte.email)

    });
    
  },[])

  const [inicioValidade, setInicioValidade] = useState();
  const [fimValidade, setFimValidade] = useState();
  const [classificacao, setClassificacao] = useState('');
  const [pessoa, setPessoa] = useState( '');
  const [softwareHouse,setSoftwareHouse] = useState(null);
  const [radioOptions,setRadioOptions] = useState(null);

  const onSubmit = (data) =>{
    const resp ={
      inicioValidade:inicioValidade.toJSON(),
      fimValidade:fimValidade.toJSON(),
      classificacaoContribuinte:classificacao,
      situacaoPessoaJuridica:pessoa,
      ...radioOptions,
      softwareHouse:{
        ...softwareHouse
      },
      informacoesContribuinte:{
        ...getValues()
      },
    }
    console.log(resp)
  }



  const incricao = resp?.inscricao || '00.000.000/0000-00'

  return (
    <>
      {open && ( 
      <Modal 
        open={open} 
        handleClose={handleClose} 
        setData={setSoftwareHouse}
        defaultValues={resp.softwareHouse}
      /> 
      )}
      
        <CssBaseline />
        <Typography  variant="h4" className={style.titlePage} >
          <strong>
          EFD-REINF
          </strong>
        </Typography>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <Validade
            incricao={incricao}
            inicioValidade={inicioValidade}
            setInicioValidade={setInicioValidade}
            fimValidade={fimValidade}
            setFimValidade={setFimValidade}
          />

          <InformacoesContribuinte 
            classificacao={classificacao}
            setClassificacao={setClassificacao}
            pessoa={pessoa}
            setPessoa={setPessoa}
            setRadioOptions={setRadioOptions}
          />

          <InformacoesContato
            register={register}
          />

          <Container maxWidth="sm" className={style.conteiner}>
            <Typography  variant="h5" className={style.title} >
              Software House
            </Typography>
            <div className={style.buttonSW}>
              <button variant="contained" onClick={()=>{setOpen(true)}}
                className={style.button}
                label='text'
                type='button'
              >Incluir Software House</button>
            </div>
            
          </Container>

          <br/>
          <Container maxWidth="sm">
          <div className={style.inputDivided}>
              <button variant="contained"
              className={style.buttonOk}
              label='text'
              type="submit"
              >Confirmar Edição</button>
            </div>          
            <div className={style.inputDivided}>
              <button variant="contained"
              className={style.buttonNotOk}
              label='text'
              >Cancelar Edição</button>
            </div>
          </Container>
      </form>
    </>
  )
}
