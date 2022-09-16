import React, { useEffect, useState } from "react";
import "./home.css";

const Home = () => {
  const localStorageTurnos = localStorage.getItem("TURNO_UNO");
  const localStorageTurnos2 = localStorage.getItem("TURNO_DOS");
  let parseTurnos;
  let parseTurnos2;

  if (!localStorageTurnos) {
    localStorage.setItem("TURNO_UNO", JSON.stringify([]));

    parseTurnos = [];
  } else {
    parseTurnos = JSON.parse(localStorageTurnos);
  }

  if (!localStorageTurnos2) {
    localStorage.setItem("TURNO_DOS", JSON.stringify([]));
  } else {
    parseTurnos2 = JSON.parse(localStorageTurnos2);
  }

  const [cantidadRojos, setCantidadRojos] = useState<number>(0);
  const [cantidadBlancos, setCantidadBlancos] = useState<number>(0);
  const [cantidadTurnoUno, setCantidadTurnoUno] = useState<number>(0);
  const [turno, setTurno] = useState("uno");
  const [tipo, setTipo] = useState("");

  const turnoUno = [
    {
      turno: "uno",
      cantidadRojos: 0,
      cantidadBlancos: 0,
      totalPrecioRojos: 0,
      totalPrecioBlancos: 0,
      totalPrecioTurno: 0,
    },
  ];

  const turnoDos = [
    {
      turno: "dos",
      cantidadRojos: 0,
      cantidadBlancos: 0,
      totalPrecioRojos: 0,
      totalPrecioBlancos: 0,
      totalPrecioTurno: 0,
    },
  ];

  const [arr, setArr] = useState<any>([]);
  const [arr2, setArr2] = useState<any>([]);

  const AddTurno = () => {
    let TotalPrecioRojos = cantidadRojos * 200;
    let TotalPrecioBlancos = cantidadRojos * 150;
    let TotalTurnos = TotalPrecioRojos + TotalPrecioBlancos;

    if (turno === "uno") {
      let miOtroArray = turnoUno;
      turnoUno.push({
        turno: "uno",
        cantidadRojos: cantidadRojos,
        cantidadBlancos: cantidadBlancos,
        totalPrecioRojos: TotalPrecioRojos,
        totalPrecioBlancos: TotalPrecioBlancos,
        totalPrecioTurno: TotalTurnos,
      });
      localStorage.setItem("TURNO_UNO", JSON.stringify(turnoUno));
    }

    if (turno === "dos") {
      let miOtroArray2 = turnoDos;
      turnoDos.push({
        turno: "dos",
        cantidadRojos,
        cantidadBlancos,
        totalPrecioRojos: TotalPrecioRojos,
        totalPrecioBlancos: TotalPrecioBlancos,
        totalPrecioTurno: TotalTurnos,
      });
      localStorage.setItem("TURNO_DOS", JSON.stringify(turnoDos));
    }
  };

  const uno = parseTurnos?.filter((dato: any) => {
    return dato.turno === "uno";
  });

  const dos = parseTurnos2?.filter((dato: any) => {
    return dato.turno === "dos";
  });

  let v1 = uno?.map((e: any) => e.cantidadRojos);
  let v2 = uno?.map((e: any) => e.cantidadBlancos);
  let v3 = dos?.map((e: any) => e.cantidadRojos);
  let v4 = dos?.map((e: any) => e.cantidadBlancos);

  const i = 0;

  const d1 = v1?.reduce(
    (previousValue: any, currentValue: any) => previousValue + currentValue,
    i
  );

  const d2 = v2?.reduce(
    (previousValue: any, currentValue: any) => previousValue + currentValue,
    i
  );

  const d3 = v3?.reduce(
    (previousValue: any, currentValue: any) => previousValue + currentValue,
    i
  );

  const d4 = v4?.reduce(
    (previousValue: any, currentValue: any) => previousValue + currentValue,
    i
  );

  const [cantidadBlancosTurno1, setCantidadBlancosTurno1] = useState(d2);
  const [cantidadRojosTurno1, setCantidadRojosTurno1] = useState(d1);

  const [cantidadBlancosTurno2, setCantidadBlancosTurno2] = useState(d4);
  const [cantidadRojosTurno2, setCantidadRojosTurno2] = useState(d3);

  const [tpbt1, setTpbt1] = useState(0);
  const [tprt1, setTprt1] = useState(0);
  const [tpbt2, setTpbt2] = useState(0);
  const [tprt2, setTprt2] = useState(0);
  const [tpt1, setTpt1] = useState(0);
  const [tpt2, setTpt2] = useState(0);

  const [tt, setTt] = useState(0);

  console.log(d1, d2, d3, d4);

  const reportes = () => {
    let precioRojos = 200;
    let precioBlancos = 150;

    let totalPrecioBlancosTurno1 = cantidadBlancosTurno1 * precioBlancos;
    let totalPrecioRojosTurno1 = cantidadRojosTurno1 * precioRojos;
    let TotalTurno1 = totalPrecioBlancosTurno1 + totalPrecioRojosTurno1;
    setTpbt1(totalPrecioBlancosTurno1);
    setTprt1(totalPrecioRojosTurno1);
    setTpt1(TotalTurno1);

    let totalPrecioBlancosTurno2 = cantidadBlancosTurno2 * precioBlancos;
    let totalPrecioRojosTurno2 = cantidadRojosTurno2 * precioRojos;
    let TotalTurno2 = totalPrecioBlancosTurno2 + totalPrecioRojosTurno2;
    setTpbt2(totalPrecioBlancosTurno2);
    setTprt2(totalPrecioRojosTurno2);
    setTpt2(TotalTurno2);

    let Def = TotalTurno1 + TotalTurno2;

    setTt(Def);
  };

  useEffect(() => {
    reportes();
  }, []);

  return (
    <div className="container">
      <div className="reportes">
        <div className="seccion">
          <div>
            <h3>Turno 1</h3>
            <div className="tipos">
              <span>Huevos Rojos</span>
              <span>{cantidadRojosTurno1}</span>
            </div>
            <div className="tipos">
              <span>Huevos Blancos</span>
              <span>{cantidadBlancosTurno1}</span>
            </div>
            <div className="tipos">
              <span>Total Turno</span>
              <span>{cantidadRojosTurno1 + cantidadBlancosTurno1}</span>
            </div>
            <div className="tipos">
              <span>Total Precio</span>
              <span>{tpt1}</span>
            </div>
          </div>
        </div>
        <div className="seccion">
          <div>
            <h3>Turno 2</h3>
            <div className="tipos">
              <span>Huevos Rojos</span>
              <span>{cantidadRojosTurno2}</span>
            </div>
            <div className="tipos">
              <span>Huevos Blancos</span>
              <span>{cantidadBlancosTurno2}</span>
            </div>
            <div className="tipos">
              <span>Total Turno</span>
              <span>{cantidadRojosTurno2 + cantidadBlancosTurno2}</span>
            </div>
            <div className="tipos">
              <span>Total Precio</span>
              <span>{tpt2}</span>
            </div>
          </div>
        </div>

        <div className="seccion">
          <div>
            <h3>Precio Total</h3>
            <h3>{tt}</h3>
          </div>
        </div>
      </div>
      <div className="card-principal">
        <div className="form">
          <form onSubmit={AddTurno}>
            <div className="select">
              <label htmlFor="types">Elige el turno actual</label>
              <select
                name="types"
                id="types"
                form="typeform"
                onChange={(e) => setTurno(e.target.value)}
              >
                <option value="uno">Turno 1</option>
                <option value="dos">Turno 2</option>
              </select>
            </div>

            <div className="input">
              <label htmlFor="types">Cantidad Rojos</label>
              <input
                type="number"
                value={cantidadRojos}
                onChange={(e) => setCantidadRojos(e.target.valueAsNumber)}
              />
            </div>

            <div className="input">
              <label htmlFor="types">Cantidad Blancos</label>
              <input
                type="number"
                value={cantidadBlancos}
                onChange={(e) => setCantidadBlancos(e.target.valueAsNumber)}
              />
            </div>

            <input type="submit" className="submit" value={"Guardar"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
