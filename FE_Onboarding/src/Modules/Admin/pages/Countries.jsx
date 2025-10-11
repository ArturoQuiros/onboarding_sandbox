// src/Modules/Admin/pages/Countries.jsx
import React, { useContext, useEffect, useMemo } from "react";
import { CrudDashboard } from "../components";
import { UIContext } from "../../../Global/Context";
import { BsGlobeAmericas } from "react-icons/bs";
import { useCountriesQuery } from "../hooks";

const Countries = () => {
  const { setEntityIcon } = useContext(UIContext);

  const { countriesQuery, createCountry, updateCountry, deleteCountry } =
    useCountriesQuery();

  useEffect(() => {
    setEntityIcon(<BsGlobeAmericas />);
  }, [setEntityIcon]);

  // ✅ Define campos con useMemo (antes de returns condicionales)
  const countryFields = useMemo(
    () => [
      { key: "id", labelKey: "countries.table.id", type: "text" },
      { key: "name", labelKey: "countries.table.name", type: "text" },
    ],
    []
  );

  const countryValidations = useMemo(
    () => ({
      name: (value) => {
        if (!value) return "El nombre es obligatorio";
        if (value.length < 3) return "Debe tener al menos 3 caracteres";
        if (value.length > 50) return "No puede superar 50 caracteres";
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value))
          return "Solo se permiten letras y espacios";
        return null;
      },
    }),
    []
  );

  // ✅ Returns condicionales DESPUÉS de todos los hooks
  if (countriesQuery.isLoading) return <p>Cargando países...</p>;
  if (countriesQuery.isError) return <p>Error cargando países</p>;

  return (
    <CrudDashboard
      entityName="countries"
      fields={countryFields}
      getItems={() => countriesQuery.data ?? []}
      createItem={createCountry.mutateAsync}
      updateItem={updateCountry.mutateAsync}
      deleteItem={deleteCountry.mutateAsync}
      validations={countryValidations}
    />
  );
};

export default Countries;
