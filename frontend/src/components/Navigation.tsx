import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";


export function Navegation() {
  const [activeOrDesative, setActivesOrDesative] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/actives") {
      setActivesOrDesative(true);
    }
    if (location.pathname === "/graficos") {
      setActivesOrDesative(false);
    }
  }, [activeOrDesative, location]);

  return (
    <div className="flex justify-center ">
      <NavLink
        className={`hover:text-zinc-400 transition ease-in 1s ${
          activeOrDesative !== false && "bg-green-800"
        } px-8 py-1 font-bold rounded-bl-lg `}
        to={`/actives`}
      >
        Ativos
      </NavLink>
      <NavLink
        className={`hover:text-zinc-400 transition ease-in 1s  px-8 py-1 font-bold rounded-br-lg ${
          activeOrDesative !== true && "bg-green-800"
        }`}
        to={`/graficos`}
      >
        Graficos
      </NavLink>
    </div>
  );
}
