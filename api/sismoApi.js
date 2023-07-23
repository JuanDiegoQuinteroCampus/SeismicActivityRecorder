const sismoapi = async()=>{
  try{
  const response = await fetch ('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson');
  const data = await response.json();
  /* const sismoUrls = await data.features.map(sismo => sismo.properties.url);
  console.log(sismoUrls);
  return sismoUrls; */
  const sismosInfo = data.features.map((sismo) =>{
      return {
          idSismo: sismo.id,
          fecha: new Date(sismo.properties.time).toLocaleDateString(),
          hora_local: new Date(sismo.properties.time).toLocaleTimeString(),
          magnitud: sismo.properties.mag,
          tipo_mag: sismo.properties.magType,
          profundidad_km: sismo.geometry.coordinates[2],
          intensidad_max: sismo.properties.sig,
          area_epicentro: sismo.properties.place
      }
  })
  /* console.log(sismosInfo); */
  return sismosInfo;
} catch (error) {
  console.error('Error al obtener los datos de la API:', error);
  return [];
}
}
let sismo
export default sismo = await sismoapi()

