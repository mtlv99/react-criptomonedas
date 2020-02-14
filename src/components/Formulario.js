import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import Axios from "axios";
import Error from "./Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ setMoneda, setCriptomoneda }) => {
  const MONEDAS = [
    { codigo: "CRC", nombre: "Colón Costarricense" },
    { codigo: "USD", nombre: "Dólar de Estados Unidos" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
    { codigo: "MXN", nombre: "Peso Mexicano" }
  ];

  // State del error de validacion del form
  const [error, setError] = useState(false);

  // State del listado de criptomonedas
  const [listaCripto, setListaCripto] = useState([]);

  // Utilizar useMoneda
  const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", "", MONEDAS);

  // Utilizar useCriptomoneda
  const [criptomoneda, SeleccionarCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listaCripto
  );

  // Ejecutar llamado a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await Axios.get(url);

      console.log(resultado);

      setListaCripto(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  // cuando el usuario hace submit
  const cotizarMoneda = e => {
    e.preventDefault();

    // validar si ambos campos estan llenos
    if (moneda === "" || criptomoneda === "") {
      setError(true);
      return;
    }

    setMoneda(moneda);
    setCriptomoneda(criptomoneda);

    setError(false);
  };
  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SelectMonedas />

      <SeleccionarCripto />

      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
