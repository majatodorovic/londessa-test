"use client";
import GoogleMapReact from "google-map-react";
import { footerMapStyle } from "./FooterMapStyle";
import Image from "next/image";
import pin from "@/public/pin.png";
import { useEffect } from "react";

const Marker = () => {
  return (
    <div
      className={"relative"}
      style={{
        color: "white",
        width: "40px",
        height: "80px",
        padding: "15px 10px",
        display: "inline-flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Image src={pin} alt="" layout="fill" objectFit="contain" />
    </div>
  );
};

const Map = ({ lat, lng, loading, setLoading }) => {
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [lat, lng, loading]);

  return (
    <div className={`h-[500px] lg:h-full`}>
      <div className={`rounded-lg`} style={{ height: "100%", width: "100%" }}>
        {loading ? (
          <div className={`h-full w-full bg-slate-300 animate-pulse`}></div>
        ) : (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAb3yABiMy-kIRMSGFD1YQMMp8pMHPZ2m0",
            }}
            defaultCenter={{ lat: lat, lng: lng }}
            defaultZoom={12}
            options={{ styles: footerMapStyle }}
            yesIWantToUseGoogleMapApiInternals={true}
            draggable={false}
          >
            <Marker lat={lat} lng={lng} />
          </GoogleMapReact>
        )}
      </div>
    </div>
  );
};

export default Map;
