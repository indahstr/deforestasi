"use client";

import Loader from "@/components/common/Loader";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import { Dropdown } from "flowbite-react";
import L from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import Image from "next/image";

interface Geolocs {
  id: String;
  geoId: number;
  name: String;
  geojs: GeoJSON.GeoJsonObject;
  color?: string;
  geodatas?: GeoDatas[];
}
interface GeoDatas {
  id: String;
  tahun: String;
  tahun_mulai: number;
  provinsi: String;
  kawasan_hutan: number;
  bukan_kawasan_hutan: number;
  total_deforestasi: number;
}
const MapComponent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [geolocs, setGeolocs] = useState<Geolocs[]>([]);
  const [calculations, setCalculations] = useState({
    mean: 0,
    std: 0,
    n: 0,
    upper: 0,
    lower: 0,
  });
  const [year, setYear] = useState<number>(2013);
  const [yearDD, setYearDD] = useState<any>(null);

  const mean = (data: Geolocs[], calc: { count: number; mean: number }) => {
    let count = 0;
    let sum = 0;
    data.forEach((elem) => {
      if (elem.geodatas?.length == 1) {
        count += 1;
        sum += elem.geodatas[0]?.total_deforestasi;
      }
    });
    if (count != 0) {
      calc.count = count;
      calc.mean = sum / count;
    }
  };

  const std = (
    data: Geolocs[],
    calc: { count: number; mean: number; std: number }
  ) => {
    let sum = 0;
    data.forEach((elem) => {
      if (elem.geodatas?.length == 1) {
        sum += Math.pow(elem.geodatas[0]?.total_deforestasi - calc.mean, 2);
      }
    });
    if (calc.count != 0) {
      calc.std = Math.sqrt(sum / (calc.count - 1));
    }
  };

  const assignColor = (
    data: Geolocs[],
    calc: {
      upper: { val: number; exist: boolean };
      lower: { val: number; exist: boolean };
    }
  ) => {
    const result = data.map((elem) => {
      if (elem.geodatas?.length == 1) {
        if (elem.geodatas[0]?.total_deforestasi > calc.upper.val) {
          calc.upper.exist = true;
          elem.color = "green";
          return elem;
        }
        if (elem.geodatas[0]?.total_deforestasi < calc.lower.val) {
          calc.lower.exist = true;
          elem.color = "red";
          return elem;
        }
        if (
          elem.geodatas[0]?.total_deforestasi >= calc.lower.val &&
          elem.geodatas[0]?.total_deforestasi <= calc.upper.val
        ) {
          elem.color = "yellow";
          return elem;
        }
      }
      return elem;
    });
    return result;
  };

  const calculate = (data: Geolocs[]) => {
    if (data.length == 0) {
      return data;
    }
    let calc_var = {
      count: 0,
      mean: 0,
      std: 0,
      n: 1,
      upper: { val: 0, exist: false },
      lower: { val: 0, exist: false },
    };
    mean(data, calc_var);
    if (calc_var.count == 0) {
      return data;
    }
    std(data, calc_var);
    let tries = 0;
    let temp = data;
    while ((!calc_var.upper.exist || !calc_var.lower.exist) && tries != 8) {
      console.log(calc_var.n);
      calc_var.upper.val = calc_var.mean + calc_var.n * calc_var.std;
      calc_var.lower.val = calc_var.mean - calc_var.n * calc_var.std;
      temp = assignColor(data, calc_var);
      if (!calc_var.upper.exist || !calc_var.lower.exist) {
        calc_var.n -= 0.1;
      }
      tries += 1;
    }
    setCalculations({
      mean: calc_var.mean,
      std: calc_var.std,
      n: calc_var.n,
      upper: calc_var.upper.val,
      lower: calc_var.lower.val,
    });
    const result = temp;
    return result;
  };

  const geolocsAPI = async () => {
    const res = await fetch(
      "/api/geoloc?" +
        new URLSearchParams({
          year: year.toString(),
        }),
      {
        method: "GET",
      }
    );
    const yearDD = await fetch("/api/geodata/year", {
      method: "GET",
    });
    const { data }: { data: Geolocs[] } = await res.json();
    const { data: dataYear }: { data: any } = await yearDD.json();
    setYearDD(dataYear);
    const result = calculate(data);
    setGeolocs(result);
  };

  useEffect(() => {
    setLoading(true);
    geolocsAPI();
    setTimeout(() => setLoading(false), 1000);
  }, [year]);

  return (
    <div className="relative flex flex-col items-center h-full">
      {loading ? <Loader /> : null}
      <MapContainer
        center={[-6.8675549, 117.1377759]}
        zoom={5}
        scrollWheelZoom={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geolocs?.map((item: Geolocs) => {
          const percent = Math.floor(Math.random() * (80 - 20 + 1) + 20);
          return (
            <GeoJSON
              key={JSON.stringify(item)}
              data={item.geojs}
              pointToLayer={function (geoJsonPoint, latlng) {
                return L.marker(latlng, {
                  icon: new L.Icon({
                    iconUrl: MarkerIcon.src,
                    iconRetinaUrl: MarkerIcon.src,
                    iconSize: [25, 41],
                    iconAnchor: [12.5, 41],
                    popupAnchor: [0, -41],
                  }),
                });
              }}
              onEachFeature={function (feature, layer) {
                let sumstr = "";
                item.geodatas?.forEach(
                  (elem) =>
                    (sumstr +=
                      elem.provinsi +
                      " " +
                      elem.tahun +
                      " " +
                      elem.total_deforestasi +
                      "<br />")
                );
                const popUpContent = `<Popup>
                                ${sumstr}
                            </Popup>`;
                layer.bindPopup(popUpContent);
              }}
              pathOptions={{
                fillColor: item.color != undefined ? item.color : "blue",
                fillOpacity: 0.4,
                weight: 1,
                opacity: 1,
                color: "black",
              }}
            />
          );
        })}
      </MapContainer>
      <div className="fixed  top-20 right-4  z-1200 flex items-start w-fit   rounded p-2">
<Dropdown
            label="Tahun"
            dismissOnClick={false}
            style={{ backgroundColor: "#2E5B00", color: "white" }} 
          >
            {yearDD?.map((item: any) => {
              console.log(item);
              return (
                <Dropdown.Item key={item} onClick={() => setYear(item.tahun)}>
                  {item.tahun}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
      </div>
      <div className="fixed  bottom-2    z-1200 flex items-start w-fit bg-dark shadow-md rounded p-2">
        <div>
          <Card className="max-w-sm">
            <div className="flex items-center justify-between">
              <h6 className="text-sm font-bold leading-none text-gray-900 dark:text-white">
                Information
              </h6>
            </div>
            <div className="flow-root">
            
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-1 sm:py-2">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Deforestasi tinggi
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <div className="w-3 h-3 mx-2 bg-green-500 rounded-full"></div>{" "}
                      {/* Hijau */}
                    </div>
                  </div>
                </li>
                <li className="py-1 sm:py-2">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Deforestasi sedang{" "}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <div className="w-3 h-3 mx-2 bg-yellow-300 rounded-full"></div>{" "}
                      {/* Kuning */}
                    </div>
                  </div>
                </li>
                <li className="py-1 sm:py-2">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Deforestasi rendah{" "}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <div className="w-3 h-3 mx-2 bg-red-500 rounded-full"></div>{" "}
                      {/* Merah */}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Card>
        </div>
        <div>
          <Card className="max-w-sm ml-4">
            {/* <div className=" flex items-center justify-between">
              <h6 className="text-sm font-bold leading-none text-gray-900 dark:text-white">
                Information
              </h6>
            </div> */}
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-1 sm:py-2">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        n
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {calculations.n}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        std
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {calculations.std}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        upper
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {calculations.upper}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        mean
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {calculations.mean}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        lower
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {calculations.lower}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
