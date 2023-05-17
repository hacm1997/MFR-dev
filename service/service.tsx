import config from "../infrastructure/config";

export const DevHospedaje = [
    {
        id: 1,
        title: 'Apto 719',
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod\n" +
            "                    tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,\n" +
            "                    quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo\n" +
            "                    consequat.",
        props: {
            char1: "Máximo 5 personas",
            char2: "1 Alcoba",
            char3: "1 Cama doble, 2 sofá camas",
            char4: "2 baños"
        },
        characteristic: [
            {
                id: 1,
                img: "/images/icono-caracteristicas/wifi.png",
                name: "WiFi"
            },
            {
                id: 2,
                img: "/images/icono-caracteristicas/vista-al-mar.png",
                name: "Vista al mar"
            },
            {
                id: 3,
                img: "/images/icono-caracteristicas/parqueadero.png",
                name: "Parqueadero"
            },
            {
                id: 4,
                img: "/images/icono-caracteristicas/picsina.png",
                name: "Piscina"
            },
            {
                id: 5,
                img: "/images/icono-caracteristicas/comidas.png",
                name: "Cocina"
            },
            {
                id: 6,
                img: "/images/icono-caracteristicas/playa.png",
                name: "Acceso a la playa"
            },
            {
                id: 7,
                img: "/images/icono-caracteristicas/aire-acondicionado.png",
                name: "Aire acondicionado"
            },
            {
                id: 8,
                img: "/images/icono-caracteristicas/lavadora.png",
                name: "Lavadora y secadora"
            }
        ],
        location: {
            map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15697.649172879304!2d-75.51954228465576!3d10.388791671040252!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x622d0be4ba51fe6f!2sBOSQUE%20EJECUTIVO!5e0!3m2!1sen!2sco!4v1661878422004!5m2!1sen!2sco",
            location_info: [
                {
                    img: "/images/icono-caracteristicas/ubicacion.png",
                    description: "Edif. Morros 3 - Apartamento 719"
                },
                {
                    img: "/images/icono-caracteristicas/horario.png",
                    description: "Hora de entrada: 12:00 PM",
                },
                {
                    img: "/images/icono-caracteristicas/avion.png",
                    description: "Cerca al aeropuerto",
                },
                {
                    img: "/images/icono-caracteristicas/horario.png",
                    description: "Hora de salida: 03:00 PM",
                },
                {
                    img: "/images/icono-caracteristicas/centro-historico.png",
                    description: "Cerca al centro hístorico",
                },
                {
                    img: "/images/icono-caracteristicas/mascota.png",
                    description: "Se admiten mascotas",
                },
                {
                    img: "/images/icono-caracteristicas/cerca-a-la-playa.png",
                    description: "Cerca a las playas",
                },
                {
                    img: "/images/icono-caracteristicas/no-fumar.png",
                    description: "Prohibido fumar",
                }
            ]
        }

    }
]
export const  DevApartamento = [
    {
        id: 1,
        title: 'Apto 719',
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod\n" +
            "                    tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,\n" +
            "                    quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo\n" +
            "                    consequat.",
        characteristic: [
            {
                id: 1,
                img: "/images/icono-caracteristicas/wifi.png",
                name: "WiFi"
            },
            {
                id: 2,
                img: "/images/icono-caracteristicas/vista-al-mar.png",
                name: "Vista al mar"
            },
            {
                id: 3,
                img: "/images/icono-caracteristicas/parqueadero.png",
                name: "Parqueadero"
            },
            {
                id: 4,
                img: "/images/icono-caracteristicas/picsina.png",
                name: "Piscina"
            },
            {
                id: 5,
                img: "/images/icono-caracteristicas/comidas.png",
                name: "Cocina"
            },
            {
                id: 6,
                img: "/images/icono-caracteristicas/playa.png",
                name: "Acceso a la play"
            },
            {
                id: 7,
                img: "/images/icono-caracteristicas/aire-acondicionado.png",
                name: "Aire acondicionado"
            },
            {
                id: 8,
                img: "/images/icono-caracteristicas/lavadora.png",
                name: "Lavadora y secadora"


            }
        ],
        amenities: [
            {
                id: 1,
                img: "/images/icono-caracteristicas/metros.png",
                name: "150 m2"
            },
            {
                id: 2,
                img: "/images/icono-caracteristicas/garaje.png",
                name: "2"
            },
            {
                id: 4,
                img: "/images/icono-caracteristicas/elevador.png",
                name: "Elevador"
            },
            {
                id: 5,
                img: "/images/icono-caracteristicas/baños.png",
                name: "2 Baños"


            },
            {
                id: 6,
                img: "/images/icono-caracteristicas/aire-acondicionado.png",
                name: "Aire acondicionado"
            },
            {
                id: 7,
                img: "/images/icono-caracteristicas/balcon.png",
                name: "Balcon"
            },
            {
                id: 8,
                img: "/images/icono-caracteristicas/vista-al-mar.png",
                name: "Vista al mar"
            }
        ]
    }
]

//Set Format to Number Price's
export const formatNumber = (number: number) => {
    return new Intl.NumberFormat().format(number);
}

export const getGoogleUrl = (from: string, client_id: string, redirect:string) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

    const options = {
        redirect_uri: redirect,
        client_id: client_id,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/calendar"
        ].join(" "),
        state: from,
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
};

export const getMicrosoftUrl = () => {
    const rootUrl = `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT as string}/oauth2/v2.0/authorize`;
    const client_id = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID as string;
    const client_secret = process.env.NEXT_PUBLIC_MICROSOFT_CLIENTE_SECRET as string;
    const redirectUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL as string}/dashboard/auth-microsoft`;


    return `${rootUrl}?client_id=${client_id}&response_type=code&redirect_uri=${redirectUrl}
            &response_mode=query&scope=offline_access%20${client_id}%2f.default&state=12345&sso_reload=true`
}
